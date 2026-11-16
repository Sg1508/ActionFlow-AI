from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class SenderSchema(BaseModel):
    name: str
    email: str

class MessageSchema(BaseModel):
    id: str
    type: str
    sender: SenderSchema
    recipient: str
    subject: Optional[str] = None
    date: datetime
    content: str
    attachments: Optional[List[str]] = []

class JSONImportSchema(BaseModel):
    messages: List[MessageSchema]