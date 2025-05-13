# server/app/main.py

import os, secrets
import uuid
import boto3  # or however you’re doing S3

from fastapi import FastAPI, Depends, HTTPException, status, Path, UploadFile, File
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from config import engine, SessionLocal, Base
import models, schemas
from schemas import ProjectRead, ProjectCreate, ProjectUpdate  

# 1) Create tables
Base.metadata.create_all(bind=engine)

# 2) FastAPI app
app = FastAPI(title="aak_API")

# (Optional) CORS so your React dev server can hit it
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your Vite dev server
    allow_credentials=True,                   # IMPORTANT: allow auth headers
    allow_methods=["*"],
    allow_headers=["*"],                      # allows multipart/form-data, authorization, etc.
)

# 3) Basic‐Auth for your single admin
security = HTTPBasic()
def get_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_user = os.getenv("ADMIN_USERNAME", "")
    correct_pass = os.getenv("ADMIN_PASSWORD", "")
    if not (secrets.compare_digest(credentials.username, correct_user)
            and secrets.compare_digest(credentials.password, correct_pass)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# 4) DB session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

s3_bucket = os.getenv("S3_BUCKET")
s3 = boto3.client("s3") if s3_bucket else None

@app.post("/upload-image", dependencies=[Depends(get_admin)])
async def upload_image(file: UploadFile = File(...)):
    # generate a unique filename under the "projects/" prefix
    filename = f"{uuid.uuid4().hex}_{file.filename}"
    key = f"projects/{filename}"
    content = await file.read()

    if s3_bucket:
        # upload to real S3 bucket
        s3.put_object(
            Bucket=s3_bucket,
            Key=key,
            Body=content,
            ContentType=file.content_type,
        )
    else:
        # local fallback: save under ./uploads/projects/
        local_dir = os.path.join(os.getcwd(), "uploads", "projects")
        os.makedirs(local_dir, exist_ok=True)
        local_path = os.path.join(local_dir, filename)
        with open(local_path, "wb") as f:
            f.write(content)

    return {"s3_key": key}

# serve files in ./uploads under the /uploads URL path
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 5) Health check
@app.get("/", tags=["health"])
def root():
    return {"message": "Hello, Architect!"}

@app.get(
    "/admin",
    dependencies=[Depends(get_admin)],
    tags=["health"],
)
def admin_health():
    return {"status": "ok"}


# 6) List projects (public)
@app.get(
    "/projects",
    response_model=list[ProjectRead],
    tags=["projects"],
)
def list_projects(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Project).offset(skip).limit(limit).all()

# 7) Get one project by ID (public)
@app.get(
    "/projects/{project_id}",
    response_model=ProjectRead,
    tags=["projects"],
)
def get_project(project_id: int, db: Session = Depends(get_db)):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return proj

# 8) Create new project (protected)
@app.post(
    "/projects",
    response_model=ProjectRead,
    tags=["projects"],
    dependencies=[Depends(get_admin)]
)
def create_project(
    project_in: schemas.ProjectCreate,
    db: Session = Depends(get_db),
):
    project = models.Project(**project_in.dict(), user_id=1)
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

# — Update an existing project —
@app.put(
    "/projects/{project_id}",
    response_model=ProjectRead,
    dependencies=[Depends(get_admin)],
    tags=["projects"],
)
def update_project(
    project_id: int = Path(..., gt=0),
    project_in: ProjectUpdate = Depends(),
    db: Session = Depends(get_db),
):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    # only update fields that were actually provided
    update_data = project_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(proj, field, value)
    db.commit()
    db.refresh(proj)
    return proj

# — Delete a project —
@app.delete(
    "/projects/{project_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(get_admin)],
    tags=["projects"],
)
def delete_project(
    project_id: int = Path(..., gt=0),
    db: Session = Depends(get_db),
):
    proj = db.get(models.Project, project_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(proj)
    db.commit()
    # 204 No Content implies successful delete with an empty body
    return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)



