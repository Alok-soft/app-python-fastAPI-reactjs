from functools import lru_cache
from fastapi import FastAPI
import socket
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter
from src.utils.db import Base, engine
from src.tasks.models import TaskModel
from src.users.models import UserModel
from src.tasks.routers import task_routers
from src.users.routers import user_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title='User Panel', description='user Panel of call records', version='1.0')

# Allowed frontend origins
# origins = [
#     "http://localhost:5173",
#     "http://127.0.0.1:5173",
#     "http://127.18.0.2:5173",
#     "http://127.18.0.3:5173",
#     "http://172.18.0.4:5173",
#     "http://localhost:8080",
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,   # frontend URL 
    allow_origin_regex=r"http://.*:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_routers, prefix="/api")
app.include_router(user_router, prefix="/api")

@app.get('/')
async def root():
    return {
        "message": "FastAPI Production Setup",
        "server": socket.gethostname()
    }
