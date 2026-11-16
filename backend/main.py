from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, Base
from pydantic import BaseModel, ValidationError
import models
import schemas
from ai_service import analyze_message_with_ai
import json
from datetime import datetime

app = FastAPI(title="ActionFlow AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allows editing Title, Description, Priority, and Status
class TaskUpdate(BaseModel):
    title: str = None
    description: str = None
    status: str = None
    priority: str = None

@app.post("/api/import-json")
async def import_json(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        content = await file.read()
        data = json.loads(content)
        try:
            validated_data = schemas.JSONImportSchema(**data)
        except ValidationError as e:
            raise HTTPException(status_code=400, detail=f"Invalid JSON structure: {e.errors()}")
        
        imported_count = 0
        for msg in validated_data.messages:
            existing = db.query(models.Message).filter(models.Message.id == msg.id).first()
            if existing: continue
                
            new_msg = models.Message(
                id=msg.id, type=msg.type, sender_name=msg.sender.name,
                sender_email=msg.sender.email, recipient=msg.recipient,
                subject=msg.subject, date=msg.date, content=msg.content,
                attachments=msg.attachments
            )
            db.add(new_msg)
            imported_count += 1
        
        db.commit()
        return {"message": f"Successfully imported {imported_count} messages."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze/{message_id}")
def analyze_message(message_id: str, db: Session = Depends(get_db)):
    message = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not message: raise HTTPException(status_code=404, detail="Message not found")
    if message.is_analyzed: return {"message": "Already analyzed", "data": "Cached"}

    try:
        ai_result = analyze_message_with_ai(message.subject, message.content, message.date)
        if not ai_result: raise HTTPException(status_code=500, detail="AI failed to analyze.")

        message.ai_summary = ai_result.get("summary", "No summary provided.")
        message.ai_category = ai_result.get("category", "General")
        message.ai_intent = ai_result.get("intent", "Unknown")
        message.ai_priority = ai_result.get("priority", "Low")
        message.requires_response = ai_result.get("requires_response", False)
        message.suggested_reply = ai_result.get("suggested_reply")
        message.is_analyzed = True

        tasks = ai_result.get("extracted_tasks", [])
        for t in tasks:
            raw_date = t.get("due_date")
            clean_date = None
            if raw_date:
                try: clean_date = datetime.fromisoformat(raw_date.replace("Z", "+00:00"))
                except Exception: clean_date = None 

            new_task = models.Task(
                message_id=message.id, title=t.get("title", "Untitled Task"),
                description=t.get("description", "No description"),
                priority=message.ai_priority, due_date=clean_date, status="Pending"
            )
            db.add(new_task)

        db.commit()
        db.refresh(message) 
        return {"message": "Analysis complete", "ai_data": ai_result}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/messages")
def get_messages(db: Session = Depends(get_db)):
    db.expire_all() 
    return db.query(models.Message).all()

@app.get("/api/tasks")
def get_tasks(db: Session = Depends(get_db)):
    db.expire_all() 
    return db.query(models.Task).all()

@app.patch("/api/tasks/{task_id}")
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not task: raise HTTPException(status_code=404, detail="Task not found")
    
    if task_update.title is not None: task.title = task_update.title
    if task_update.description is not None: task.description = task_update.description
    if task_update.status is not None: task.status = task_update.status
    if task_update.priority is not None: task.priority = task_update.priority
        
    db.commit()
    db.refresh(task) 
    return task