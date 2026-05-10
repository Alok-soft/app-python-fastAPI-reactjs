from src.tasks.dtos import TaskSchema, TaskUpdateSchema
from sqlalchemy import text
from sqlalchemy.orm import Session
from src.tasks.models import TaskModel
from fastapi import HTTPException


def create_task(body:TaskSchema, db:Session):
    data = body.model_dump()
    insData = TaskModel(title=data["title"], 
                        description=data["description"], 
                        status=data["status"], 
                        created_by="1"
                        )
    db.add(insData)
    db.commit()
    db.refresh(insData)
    return insData

def get_tasks(db:Session):
    task = db.query(TaskModel).all()
    # reslt = db.execute(text('SELECT * FROM user_task'))
    # task = [dict(row._mapping) for row in reslt.fetchall()]
    return task

def get_task(task_id:int, db:Session):
    task = db.query(TaskModel).get(task_id)
    if not task:
        raise HTTPException(404, detail="Task ID is incorrect..")
    
    return task


def update_task(body:TaskUpdateSchema, task_id:int, db:Session):
    data = body.model_dump(exclude_unset=True)
    chk_task = db.query(TaskModel).get(task_id)
    if not chk_task:
        raise HTTPException(404, detail="Task ID is incorrect..")
    
    # Update records which specify manually mention:
    # chk_task.title = data['title']
    # chk_task.description = data['description']
    # chk_task.status = data['status']

    for field, value in data.items():
        setattr(chk_task, field, value)
    
    db.add(chk_task)
    db.commit()
    db.refresh(chk_task)

    return chk_task


def delete_task(task_id:int, db:Session):
    data = db.query(TaskModel).get(task_id)
    if not data:
        raise HTTPException(404, detail="Task ID is incorrect..")
    
    db.delete(data)
    db.commit()

    return None
