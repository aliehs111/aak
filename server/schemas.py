from pydantic import BaseModel, EmailStr, constr
from typing import List, Optional
from datetime import datetime
import enum


class UserRole(str, enum.Enum):
    architect = "architect"
    viewer = "viewer"

class ImageType(str, enum.Enum):
    space_photo = "space_photo"
    sketch = "sketch"
    other = "other"


# ----- USER SCHEMAS -----
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: constr(min_length=8)

class UserRead(UserBase):
    id: int
    role: UserRole
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


# ----- IMAGE SCHEMAS -----
class ImageBase(BaseModel):
    caption: Optional[str] = ""
    type: Optional[ImageType] = ImageType.other
    sort_order: Optional[int] = 0

class ImageCreate(ImageBase):
    project_id: Optional[int] = None
    s3_key: str

class ImageRead(ImageBase):
    id: int
    project_id: Optional[int]
    s3_key: str
    uploaded_at: datetime

    class Config:
        orm_mode = True


# ----- PROJECT SCHEMAS -----
class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class ProjectRead(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    images: List[ImageRead] = []

    class Config:
        orm_mode = True
