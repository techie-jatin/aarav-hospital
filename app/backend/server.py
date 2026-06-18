from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define simple schemas
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.get("/")
async def root():
    return {
        "message": "Aarav Maternity and Multispecialty Hospital Backend API",
        "status": "online",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.get("/doctors")
async def get_doctors():
    # Return doctors list dynamically for frontend ingestion
    return [
        {
            "id": "dr-rupesh-goel",
            "name": "Dr. Rupesh Goel",
            "specialty_en": "MD Physician, Pain and Critical Care Specialist",
            "specialty_hi": "एमडी फिजिशियन, दर्द और गंभीर देखभाल विशेषज्ञ",
            "qualification": "MD Physician, Pain & Critical Care Specialist",
            "opd_hours": "10 AM - 4 PM (Emergency 24x7)",
            "image": "https://images.unsplash.com/photo-1612349316228-5942a9b489c2"
        },
        {
            "id": "dr-vinita-goel",
            "name": "Dr. Vinita Goel",
            "specialty_en": "DGO, Infertility Specialist",
            "specialty_hi": "डीजीओ, बांझपन विशेषज्ञ",
            "qualification": "DGO, Infertility Specialist",
            "opd_hours": "10 AM - 4 PM (Emergency 24x7)",
            "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
        },
        {
            "id": "dr-shrey-singh",
            "name": "Dr. Shrey Singh",
            "specialty_en": "DNB Orthopaedic",
            "specialty_hi": "डीएनबी ऑर्थोपेडिक (हड्डी रोग विशेषज्ञ)",
            "qualification": "DNB Orthopaedic",
            "opd_hours": "10 AM - 4 PM",
            "image": "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0"
        },
        {
            "id": "dr-manas-prakash",
            "name": "Dr. Manas Prakash",
            "specialty_en": "MCH Neurosurgeon",
            "specialty_hi": "एमसीएच न्यूरोसर्जन",
            "qualification": "MCH Neurosurgeon",
            "opd_hours": "Flexible / Calls on Emergency",
            "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7"
        },
        {
            "id": "dr-pk-verma",
            "name": "Dr. P.K. Verma",
            "specialty_en": "MCH Neurosurgeon",
            "specialty_hi": "एमसीएच न्यूरोसर्जन (मस्तिष्क रोग विशेषज्ञ)",
            "qualification": "MCH Neurosurgeon",
            "opd_hours": "Flexible / Calls on Emergency",
            "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2"
        },
        {
            "id": "dr-durgesh-tripathi",
            "name": "Dr. Durgesh Tripathi",
            "specialty_en": "MS Surgeon",
            "specialty_hi": "एमएस सर्जन",
            "qualification": "MS Surgeon",
            "opd_hours": "10 AM - 4 PM",
            "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d"
        },
        {
            "id": "dr-vikas-kumar",
            "name": "Dr. Vikas Kumar",
            "specialty_en": "MCH Urologist",
            "specialty_hi": "एमसीएच यूरोलॉजिस्ट (मूत्र रोग विशेषज्ञ)",
            "qualification": "MCH Urologist",
            "opd_hours": "10 AM - 4 PM",
            "image": "https://images.unsplash.com/photo-1594824813573-246434e33963"
        },
        {
            "id": "dr-shivendra",
            "name": "Dr. Shivendra",
            "specialty_en": "MD Pediatrician",
            "specialty_hi": "एमडी पीडियाट्रिशियन (बाल रोग विशेषज्ञ)",
            "qualification": "MD Pediatrician",
            "opd_hours": "10 AM - 4 PM (Emergency 24x7)",
            "image": "https://images.unsplash.com/photo-1584467541268-b040f83be3fd"
        }
    ]

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()