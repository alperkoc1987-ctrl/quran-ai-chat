"""
FastAPI backend for Quran & Hadith AI Chat
Handles OpenAI API calls and Quran data processing
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from typing import Optional, List

# Initialize FastAPI app
app = FastAPI(title="Quran AI Chat Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    userQuery: str
    language: str = "de"
    translationEdition: str = "de.bubenheim"
    apiKey: str

class Source(BaseModel):
    type: str
    reference: str
    text: str

class ChatResponse(BaseModel):
    generatedAnswer: str
    sources: List[Source]

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat requests using OpenAI API
    """
    try:
        if not request.apiKey:
            raise HTTPException(status_code=400, detail="API Key is required")
        
        # Set OpenAI API key
        openai.api_key = request.apiKey
        
        # Create system prompt
        system_prompt = f"""Sie sind ein hilfreicher KI-Assistent, der Fragen zum Koran und den Hadithen beantwortet.
Beantworten Sie Fragen auf {'Deutsch' if request.language == 'de' else 'Englisch'}.
Seien Sie respektvoll und informativ.
Zitieren Sie relevante Verse oder Hadithe, wenn möglich."""
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.userQuery}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        generated_answer = response.choices[0].message.content
        
        return ChatResponse(
            generatedAnswer=generated_answer,
            sources=[
                {
                    "type": "quran",
                    "reference": "OpenAI GPT-3.5",
                    "text": generated_answer
                }
            ]
        )
    
    except openai.error.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid API Key")
    except openai.error.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
