from fastapi import HTTPException, status
from src.users.dtos import UserSchema, LoginSchema
from sqlalchemy.orm import Session
from src.users.models import UserModel
from pwdlib import PasswordHash
import jwt
from src.utils.settings import Settings
from datetime import datetime, timedelta

password_hash = PasswordHash.recommended()

def get_password_hash(password):
    return password_hash.hash(password)

def verify_password(plain_password, hashed_password):
    return password_hash.verify(plain_password, hashed_password)

def UserRegister(body:UserSchema, db:Session):
    is_user = db.query(UserModel).filter(UserModel.username == body.username).first()
    if is_user:
        raise HTTPException(400, detail='Username already exist.')
    
    is_user = db.query(UserModel).filter(UserModel.email_id == body.email_id).first()
    if is_user:
        raise HTTPException(400, detail='Email ID already exist.')
    
    is_user = db.query(UserModel).filter(UserModel.mobile_no == body.mobile_no).first()
    if is_user:
        raise HTTPException(400, detail='Mobile number already exist.')
    
    hash_password = get_password_hash(body.password)

    addUser = UserModel(
        fname = body.fname,
        mname = body.mname,
        lname = body.lname,
        username = body.username,
        hash_password = hash_password,
        email_id = body.email_id,
        mobile_no = body.mobile_no
    )
    
    db.add(addUser)
    db.commit()
    db.refresh(addUser)
    
    return addUser


def UserLogin(body:LoginSchema, db:Session):
    user = db.query(UserModel).filter(UserModel.username == body.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='This User not registered')
    

    if not verify_password(body.password, user.hash_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Wrong password')

    exp_time = datetime.now() + timedelta(minutes=Settings.TOKEN_EXP_TIME)
    
    token = jwt.encode({"_id":user.id, "exp":exp_time}, Settings.SECRET_KEY, Settings.ALGORITHM)
      
    return {
        "access_token": token,
        "token_type": "bearer"
    }
