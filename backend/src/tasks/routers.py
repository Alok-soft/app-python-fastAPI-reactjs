from fastapi import APIRouter, Depends, status
from src.tasks import controllers
from sqlalchemy.orm import Session
from src.tasks.dtos import TaskSchema, TaskUpdateSchema, TaskResponceSchema
from src.utils.db import get_db
from typing import List

task_routers = APIRouter(prefix='/tasks')

@task_routers.post('/create_task', response_model=TaskResponceSchema, status_code=status.HTTP_201_CREATED)
def create_task(body:TaskSchema, db:Session = Depends(get_db)):
    return controllers.create_task(body, db)

@task_routers.get('/get_all_task', response_model=List[TaskResponceSchema], status_code=status.HTTP_200_OK)
def get_tasks(db = Depends(get_db)):
    return controllers.get_tasks(db)

@task_routers.get('/get_task/{taskId}', response_model=TaskResponceSchema, status_code=status.HTTP_200_OK)
def get_task(taskId:int, db:Session = Depends(get_db)):
    return controllers.get_task(task_id=taskId, db=db)

@task_routers.put('/update_task/{taskId}', response_model=TaskResponceSchema, status_code=status.HTTP_202_ACCEPTED)
def upt_task(body:TaskUpdateSchema, taskId:int, db:Session = Depends(get_db)):
    return controllers.update_task(body=body, task_id=taskId, db=db)

@task_routers.delete('/delete_task/{taskId}', response_model=None, status_code=status.HTTP_204_NO_CONTENT)
def del_task(taskId:int, db:Session = Depends(get_db)):
    return controllers.delete_task(task_id=taskId, db=db)

