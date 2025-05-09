# server/app/routers/projects.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import models, schemas
from app.main import get_db  # adjust import as your layout requires

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=schemas.Project)
def create_project(
    project_in: schemas.ProjectCreate,
    db: Session = Depends(get_db),
):
    project = models.Project(**project_in.dict(), user_id=1)  # TODO: wire real user_id
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.get("/", response_model=list[schemas.Project])
def list_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Project).offset(skip).limit(limit).all()

@router.get("/{project_id}", response_model=schemas.Project)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.get(models.Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Not found")
    return project
