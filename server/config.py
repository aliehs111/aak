# server/config.py
from dotenv import load_dotenv
load_dotenv()
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base



# If you haven’t set a DATABASE_URL env var, this will default to a local SQLite file.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./aak.db")

# Only SQLite needs the check_same_thread flag
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()
