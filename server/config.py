# server/config.py
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())


import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Always resolve to the server/ folder
BASE_DIR = Path(__file__).resolve().parent  # …/aak/server

# Use the populated DB in server/aak.db
default_sqlite = BASE_DIR / "aak.db"

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{default_sqlite}"
)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    echo=True,
    future=True,
    connect_args=connect_args,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()




