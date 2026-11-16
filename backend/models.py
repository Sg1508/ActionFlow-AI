from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(String(50), primary_key=True, index=True) # MSG001
    type = Column(String(20), nullable=False) # email or message
    sender_name = Column(String(100), nullable=False)
    sender_email = Column(String(100), nullable=False)
    recipient = Column(String(100), nullable=False)
    subject = Column(String(255), nullable=True)
    date = Column(DateTime, nullable=False) # ISO 8601
    content = Column(Text, nullable=False)
    attachments = Column(JSON, nullable=True)
    
    # AI Analysis Fields
    ai_summary = Column(Text, nullable=True)
    ai_category = Column(String(100), nullable=True)
    ai_intent = Column(String(100), nullable=True)
    ai_priority = Column(String(20), nullable=True) # High, Medium, Low
    requires_response = Column(Boolean, default=False)
    suggested_reply = Column(Text, nullable=True)
    is_analyzed = Column(Boolean, default=False)

    # Relationship to tasks
    tasks = relationship("Task", back_populates="message", cascade="all, delete-orphan")


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    message_id = Column(String(50), ForeignKey("messages.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), nullable=False) # High, Medium, Low
    due_date = Column(DateTime, nullable=True) # Null if not mentioned!
    status = Column(String(20), default="Pending") # Pending, In Progress, Completed
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to message
    message = relationship("Message", back_populates="tasks")