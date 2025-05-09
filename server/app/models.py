from sqlalchemy import (
    Column, Integer, String, Text,
    ForeignKey, TIMESTAMP, Enum, func
)
from sqlalchemy.orm import relationship
from config import Base
import enum


class UserRole(str, enum.Enum):
    architect = "architect"
    viewer = "viewer"


class ImageType(str, enum.Enum):
    space_photo = "space_photo"
    sketch = "sketch"
    other = "other"


class User(Base):
    __tablename__ = "users"

    id             = Column(Integer, primary_key=True, index=True)
    name           = Column(String(255), nullable=False)
    email          = Column(String(255), nullable=False, unique=True, index=True)
    password_hash  = Column(String(255), nullable=False)
    role           = Column(Enum(UserRole), nullable=False, default=UserRole.viewer)
    created_at     = Column(TIMESTAMP, server_default=func.now())

    # relations
    projects       = relationship("Project", back_populates="owner", cascade="all, delete-orphan")
    images         = relationship("Image",   back_populates="owner",   cascade="all, delete-orphan")


class Project(Base):
    __tablename__ = "projects"

    id             = Column(Integer, primary_key=True, index=True)
    user_id        = Column(Integer, ForeignKey("users.id"), nullable=False)
    title          = Column(String(255), nullable=False)
    description    = Column(Text, default="")
    created_at     = Column(TIMESTAMP, server_default=func.now())
    updated_at     = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    # relations
    owner          = relationship("User",  back_populates="projects")
    images         = relationship("Image", back_populates="project", cascade="all, delete-orphan")


class Image(Base):
    __tablename__ = "images"

    id             = Column(Integer, primary_key=True, index=True)
    user_id        = Column(Integer, ForeignKey("users.id"),    nullable=False)
    project_id     = Column(Integer, ForeignKey("projects.id"), nullable=True)
    s3_key         = Column(String(512), nullable=False)
    caption        = Column(Text, default="")
    type           = Column(Enum(ImageType), default=ImageType.other)
    sort_order     = Column(Integer, default=0)
    uploaded_at    = Column(TIMESTAMP, server_default=func.now())

    # relations
    owner          = relationship("User",    back_populates="images")
    project        = relationship("Project", back_populates="images")
