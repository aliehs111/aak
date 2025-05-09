# server/app/schemas.py
from pydantic import BaseModel
from typing import List, Optional

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    user_id: int
    class Config:
        orm_mode = True

class User(BaseModel):
    id: int
    name: str
    email: str
    role: str
    class Config:
        orm_mode = True
