from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Force .env path relative to this file
dotenv_path = os.path.join(os.path.dirname(__file__), "..", ".env")
load_dotenv(dotenv_path=dotenv_path)

# Get JAWSDB_URL from env
raw_url = os.getenv("JAWSDB_URL")
if not raw_url:
    raise RuntimeError("❌ JAWSDB_URL not set in environment variables.")

print("DEBUG: JAWSDB_URL =", raw_url)  # You can remove this later

# SQLAlchemy expects +pymysql for MySQL
DATABASE_URL = raw_url.replace("mysql://", "mysql+pymysql://", 1)

# SQLAlchemy engine/session setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


