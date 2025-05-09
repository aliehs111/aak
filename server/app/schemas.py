from pydantic import BaseModel, EmailStr, constr
from typing  import List, Optional
import enum


class UserRole(str, enum.Enum):
    architect = "architect"
    viewer    = "viewer"


# ----- USER SCHEMAS -----
class UserBase(BaseModel):
    name:  str
    email: EmailStr

class UserCreate(UserBase):
    password: constr(min_length=8)

class UserRead(UserBase):
    id:         int
    role:       UserRole
    created_at: Optional[str]

    class Config:
        orm_mode = True


# ----- IMAGE SCHEMAS -----
class ImageBase(BaseModel):
    caption: Optional[str] = ""
    type:    Optional[str] = "other"
    sort_order: Optional[int] = 0

class ImageCreate(ImageBase):
    project_id: Optional[int] = None
    # image upload will be handled separately via file upload endpoint

class ImageRead(ImageBase):
    id:          int
    user_id:     int
    project_id:  Optional[int]
    s3_key:      str
    uploaded_at: str

    class Config:
        orm_mode = True


# ----- PROJECT SCHEMAS -----
class ProjectBase(BaseModel):
    title:       str
    description: Optional[str] = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title:       Optional[str] = None
    description: Optional[str] = None

class ProjectRead(ProjectBase):
    id:          int
    user_id:     int
    created_at:  str
    updated_at:  str
    images:      List[ImageRead] = []

    class Config:
        orm_mode = True

