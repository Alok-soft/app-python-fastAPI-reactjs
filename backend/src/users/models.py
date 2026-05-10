from enum import IntEnum
from sqlalchemy import Column, String, Integer, Boolean, Enum, DateTime, func
from datetime import datetime
from src.utils.db import Base


class Status(IntEnum):
    INACTIVE = 0
    ACTIVE = 1

class userType(IntEnum):
    SUPERADMIN = 1
    ADMIN = 2
    USER = 3

class UserModel(Base):
    # __tableName__ = "users"
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    fname = Column(String, nullable=False)
    mname = Column(String)
    lname = Column(String, nullable=False)
    username = Column(String, nullable=False)
    hash_password = Column(String, nullable=False)
    email_id = Column(String, nullable=False)
    mobile_no = Column(String, nullable=False)
    user_type = Column(Integer, default=userType.USER)
    status = Column(Integer, default=Status.INACTIVE)
    created_at = Column(DateTime(timezone='Asia/calcuta'), server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

