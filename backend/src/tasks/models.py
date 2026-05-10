from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from datetime import datetime
from src.utils.db import Base

class TaskModel(Base):
    __tablename__ = 'user_task'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    status = Column(Boolean, default=False)
    created_by = Column(Integer)
    created_at = Column(DateTime(timezone='Asia/calcuta'), server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())