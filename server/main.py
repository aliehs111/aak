# server/app/main.py

# 0) Load your .env immediately:
from dotenv import load_dotenv
load_dotenv()

# 1) Database setup (so your Base/engine use the right URL)
from config import engine, SessionLocal, Base
import models  # ensure your models are imported so Base.metadata knows about them

# 2) Create tables
Base.metadata.create_all(bind=engine)

# 3) Create the FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="aak_API")

# 4) Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 5) Mount static uploads folder
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 6) Define your dependencies (auth, DB session, S3 client)
import os, secrets, uuid, boto3
from fastapi import Depends, HTTPException, status, File, UploadFile, Path
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import schemas
from schemas import ProjectRead, ProjectCreate, ProjectUpdate

# … define get_admin, get_db, s3 client here …

# 7) Define your routes
@app.get("/", tags=["health"])
def health():
    return {"message": "Hello, Architect!"}

# … all your /admin, /upload-image, /projects routes, etc. …


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

from fastapi import FastAPI, Depends, HTTPException, status, Path, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session
import os, secrets, uuid, boto3

from config import engine, SessionLocal, Base
import models, schemas

# 1) Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="aak_API")

# serve ./uploads locally at /uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# CORS (allow your React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic‐Auth for one admin
security = HTTPBasic()
def get_admin(credentials: HTTPBasicCredentials = Depends(security)):
    user = os.getenv("ADMIN_USERNAME", "")
    pw   = os.getenv("ADMIN_PASSWORD", "")
    if not (secrets.compare_digest(credentials.username, user)
            and secrets.compare_digest(credentials.password, pw)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# DB‐session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# S3 client if you have S3_BUCKET in your .env
s3_bucket = os.getenv("S3_BUCKET")
s3 = boto3.client("s3") if s3_bucket else None

@app.post(
    "/projects",
    response_model=schemas.ProjectRead,
    dependencies=[Depends(get_admin)],
    tags=["projects"]
)
async def create_project_and_image(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    # 1) create the Project row
    proj = models.Project(
        title=title,
        description=description,
        user_id=1,  # your lone admin
    )
    db.add(proj)
    db.commit()
    db.refresh(proj)

    # 2) if a file was sent, upload it + create an Image row
    if file:
        # generate a unique key/filename
        filename = f"{uuid.uuid4().hex}_{file.filename}"
        key = f"projects/{filename}"
        content = await file.read()

        if s3_bucket:
            s3.put_object(
                Bucket=s3_bucket,
                Key=key,
                Body=content,
                ContentType=file.content_type,
            )
        else:
            # save locally under ./uploads/projects/
            local_dir = os.path.join("uploads", "projects")
            os.makedirs(local_dir, exist_ok=True)
            with open(os.path.join(local_dir, filename), "wb") as out:
                out.write(content)

        # now link that file to the project in DB
        img = models.Image(
            user_id=1,
            project_id=proj.id,
            s3_key=key,
            caption="",
            type=models.ImageType.space_photo,
            sort_order=0
        )
        db.add(img)
        db.commit()
        db.refresh(img)

    # 3) reload project (with its images) and return it
    proj = db.get(models.Project, proj.id)
    return proj


# serve files in ./uploads under the /uploads URL path
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")



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



