from dotenv import load_dotenv
load_dotenv()
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import boto3, secrets, uuid
from pathlib import Path as PathLib
from fastapi import FastAPI, Depends, HTTPException, status, Path, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
import schemas
from schemas import ProjectRead, ProjectCreate, ProjectUpdate
from config import engine, SessionLocal, Base
import models

Base.metadata.create_all(bind=engine)

app = FastAPI(title="aak_API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://aak-9981efe13834.herokuapp.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBasic()
def get_admin(credentials: HTTPBasicCredentials = Depends(security)):
    user = os.getenv("ADMIN_USERNAME", "")
    pw = os.getenv("ADMIN_PASSWORD", "")
    if not (secrets.compare_digest(credentials.username, user)
            and secrets.compare_digest(credentials.password, pw)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

s3_bucket = os.getenv("S3_BUCKET")
s3 = boto3.client("s3") if s3_bucket else None

@app.post("/projects", response_model=schemas.ProjectRead, dependencies=[Depends(get_admin)], tags=["projects"])
async def create_project_and_image(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    proj = models.Project(title=title, description=description, user_id=1)
    db.add(proj)
    db.commit()
    db.refresh(proj)
    if file:
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        key = f"projects/{filename}"
        content = await file.read()
        if s3_bucket:
            s3.put_object(Bucket=s3_bucket, Key=key, Body=content, ContentType=file.content_type)
        else:
            local_dir = os.path.join("uploads", "projects")
            os.makedirs(local_dir, exist_ok=True)
            with open(os.path.join(local_dir, filename), "wb") as out:
                out.write(content)
        img = models.Image(user_id=1, project_id=proj.id, s3_key=key, caption="", type=models.ImageType.space_photo, sort_order=0)
        db.add(img)
        db.commit()
        db.refresh(img)
    proj = db.get(models.Project, proj.id)
    return proj

uploads_path = PathLib(__file__).parent / "uploads"
app.mount("/uploads", StaticFiles(directory=str(uploads_path), html=False), name="uploads")

@app.get("/admin", dependencies=[Depends(get_admin)], tags=["health"])
def admin_health():
    return {"status": "ok"}

@app.get("/projects", response_model=list[ProjectRead], tags=["projects"])
def list_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Project).offset(skip).limit(limit).all()

@app.get("/projects/{project_id}", response_model=ProjectRead, tags=["projects"])
def get_project(project_id: int, db: Session = Depends(get_db)):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

@app.put("/projects/{project_id}", response_model=ProjectRead, dependencies=[Depends(get_admin)], tags=["projects"])
def update_project(project_id: int = Path(..., gt=0), project_in: ProjectUpdate = Depends(), db: Session = Depends(get_db)):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    update_data = project_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(proj, field, value)
    db.commit()
    db.refresh(proj)
    return proj

@app.delete("/projects/{project_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_admin)], tags=["projects"])
def delete_project(project_id: int = Path(..., gt=0), db: Session = Depends(get_db)):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(proj)
    db.commit()

# (Your existing main.py with conditional mount)
DIST = PathLib(__file__).resolve().parent.parent / "client" / "dist"
print(f"Static mount path: {DIST}")
if "DYNO" in os.environ:
    if DIST.exists():
        app.mount("/", StaticFiles(directory=str(DIST), html=True), name="static")
        print(f"🚀 Serving SPA from {DIST} on Heroku")
    else:
        print(f"⚠️ No build found at {DIST}")
else:
    app.mount("/", StaticFiles(directory=str(DIST), html=True), name="static")
    print("⚠️ Development mode: static mount enabled")