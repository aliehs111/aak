# server/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from config import engine, SessionLocal, Base
import models, schemas
from app.routers import projects
app.include_router(projects.router)

# create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", tags=["health"])
def root():
    return {"message": "Hello, Architect!"}


