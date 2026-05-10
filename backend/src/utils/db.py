from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from src.utils.settings import Settings

Base = declarative_base()

engine = create_engine(url=Settings.DB_CONNECTION)

local_session = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )

def get_db():
    session = local_session()

    try:
        yield session
    finally:
        session.close()