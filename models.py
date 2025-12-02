from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

# --- Models for API Contract (Mirroring Swift) ---

class SourceType(str, Enum):
    quran = "Koran"
    hadith = "Hadith"

class SourceReference(BaseModel):
    type: SourceType
    reference: str
    text: str

class ChatRequest(BaseModel):
    userQuery: str
    language: str
    translationEdition: str

class ChatResponse(BaseModel):
    generatedAnswer: str
    sources: List[SourceReference]

# --- Models for External API Data (Simplified for RAG Context) ---

class SurahReference(BaseModel):
    number: int
    name: str
    englishName: str
    englishNameTranslation: str
    revelationType: str

class Ayah(BaseModel):
    number: int
    text: str
    surah: SurahReference
    numberInSurah: int
    juz: int
    manzil: int
    page: int
    ruku: int
    hizbQuarter: int
    sajda: bool
    translation: Optional[str] = None

class Hadith(BaseModel):
    book: str
    chapter: str
    hadithNumber: int
    textArabic: str
    textEnglish: str
    grade: Optional[str] = None
