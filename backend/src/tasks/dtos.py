from pydantic import BaseModel
from typing import Optional

class TaskSchema(BaseModel):
    title: str
    description: str
    status: bool = False

class TaskUpdateSchema(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[bool] = False

class TaskResponceSchema(BaseModel):
    id: int #if i want to send in responce a perticular value
    title:str
    description:str