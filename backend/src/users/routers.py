from fastapi import APIRouter, Depends, status
from src.users import controllers
from src.users.dtos import UserSchema, LoginSchema, UserResponceSchema
from src.utils.db import get_db
from sqlalchemy.orm import Session

user_router = APIRouter(prefix='/user')

@user_router.post('/register', response_model=UserResponceSchema, status_code=status.HTTP_201_CREATED)
def user_register(body:UserSchema, db:Session = Depends(get_db)):
    return controllers.UserRegister(body, db)

@user_router.post('/login', status_code=status.HTTP_200_OK)
def login(body:LoginSchema, db:Session=Depends(get_db)):
    return controllers.UserLogin(body=body, db=db)