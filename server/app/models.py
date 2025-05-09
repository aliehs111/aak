# server/app/models.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from config import Base

class User(Base):
    __tablename__ = "users"
    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String, nullable=False)
    email        = Column(String, unique=True, nullable=False, index=True)
    password_hash= Column(String, nullable=False)
    role         = Column(String, default="viewer")

    projects     = relationship("Project", back_populates="owner")

class Project(Base):
    __tablename__ = "projects"
    id           = Column(Integer, primary_key=True, index=True)
    title        = Column(String, nullable=False)
    description  = Column(Text)
    user_id      = Column(Integer, ForeignKey("users.id"))
    created_at   = Column(TIMESTAMP, server_default=func.now())

    owner        = relationship("User", back_populates="projects")
    images       = relationship("ProjectImage", back_populates="project")

class ProjectImage(Base):
    __tablename__ = "project_images"
    id           = Column(Integer, primary_key=True, index=True)
    project_id   = Column(Integer, ForeignKey("projects.id"))
    s3_key       = Column(String, nullable=False)
    caption      = Column(Text, default="")
    uploaded_at  = Column(TIMESTAMP, server_default=func.now())

    project      = relationship("Project", back_populates="images")
