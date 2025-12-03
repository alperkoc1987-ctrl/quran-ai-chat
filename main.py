import os
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from openai import OpenAI
from models import ChatRequest, ChatResponse, SourceReference, SourceType

# --- Setup ---
app = FastAPI(title="Quran & Hadith RAG Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI() # Uses OPENAI_API_KEY environment variable

# Placeholder for Hadith API Key (User must replace this)
HADITH_API_KEY = os.environ.get("HADITH_API_KEY", "YOUR_HADITH_API_KEY_HERE")

# --- RAG Helper Functions ---

def retrieve_quran_data(query: str) -> List[SourceReference]:
    """
    Retrieves relevant Quran verses based on query keywords.
    """
    print(f"Retrieving Quran data for query: {query}")
    query_lower = query.lower()
    
    # Comprehensive keyword mapping for different topics
    quran_database = {
        "prayer": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 43",
                text="Und verrichtet das Gebet und entrichtet die Zakah und verneigt euch mit den sich Verneigenden."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 29: Vers 45",
                text="Verlies, was dir vom Buch offenbart worden ist, und verrichte das Gebet. Gewiß, das Gebet hält davon ab, das Schändliche und Verwerfliche (zu tun)."
            )
        ],
        "ikhlas": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 112: Al-Ikhlas",
                text="Sprich: Er ist Allah, ein Einziger. Allah, der Unabhängige. Er zeugt nicht und wird nicht gezeugt. Und es gibt ihm keinen Ebenbürtigen."
            )
        ],
        "zakat": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 277",
                text="Diejenigen, die glauben und gute Werke tun und das Gebet verrichten und die Zakat entrichten, werden ihren Lohn bei ihrem Herrn erhalten."
            )
        ],
        "fasting": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 183",
                text="O ihr, die ihr glaubt, das Fasten ist euch zur Pflicht gemacht worden, wie es denen vor euch zur Pflicht gemacht wurde."
            )
        ],
        "hajj": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 3: Vers 97",
                text="Und (es ist) die Pilgerfahrt zum Hause (Allahs) eine Pflicht gegen Allah für die Menschen, wer die Mittel dazu hat."
            )
        ],
    }
    
    # Keywords mapping
    keyword_mapping = {
        "gebet": "prayer",
        "salah": "prayer",
        "beten": "prayer",
        "ikhlas": "ikhlas",
        "aufrichtigkeit": "ikhlas",
        "zakat": "zakat",
        "almosensteuer": "zakat",
        "spende": "zakat",
        "fasten": "fasting",
        "ramadan": "fasting",
        "sawm": "fasting",
        "hajj": "hajj",
        "pilgerfahrt": "hajj",
        "pilger": "hajj",
    }
    
    # Search for matching keywords
    for keyword, category in keyword_mapping.items():
        if keyword in query_lower:
            return quran_database.get(category, [])
    
    # Default response if no specific match found
    return [
        SourceReference(
            type=SourceType.quran,
            reference="Sure 2: Vers 2-3",
            text="Dies ist das Buch, in dem es keinen Zweifel gibt, eine Rechtleitung fuer die Gottesfruechtigen, die an das Unsichtbare glauben und das Gebet verrichten."
        )
    ]

def retrieve_hadith_data(query: str) -> List[SourceReference]:
    """
    Retrieves relevant Hadiths based on query keywords.
    """
    print(f"Retrieving Hadith data for query: {query}")
    query_lower = query.lower()
    
    if HADITH_API_KEY == "YOUR_HADITH_API_KEY_HERE":
        print("WARNING: Hadith API Key is a placeholder. Using simulated data.")
        
    # Simulation of relevant data based on keywords
    if "gebet" in query_lower or "salah" in query_lower:
        return [
            SourceReference(
                type=SourceType.hadith,
                reference="Sahih Bukhari, Hadith 8",
                text="Der Gesandte Allahs (Friede sei mit ihm) sagte: Der Islam ist auf fuenf Saeulen aufgebaut: dem Zeugnis, dass es keinen Gott ausser Allah gibt und Muhammad der Gesandte Allahs ist, dem Verrichten des Gebets, dem Entrichten der Zakah, der Pilgerfahrt (Hajj) und dem Fasten im Ramadan."
            )
        ]
    return []

def generate_ai_response(query: str, context: List[SourceReference]) -> str:
    """
    Generates the final AI response using the LLM based on the retrieved context.
    """
    context_text = "\n\n".join([f"[{src.type.value} - {src.reference}]: {src.text}" for src in context])
    
    system_prompt = (
        "Sie sind ein islamischer Gelehrter und KI-Assistent. Ihre Aufgabe ist es, die Benutzerfrage "
        "praezise und respektvoll zu beantworten, indem Sie ausschliesslich die bereitgestellten "
        "Koran- und Hadith-Zitate als Grundlage verwenden. Fassen Sie die Zitate zusammen und "
        "geben Sie eine klare Antwort. Zitieren Sie die Quellen explizit in Ihrer Antwort, "
        "bevor Sie die vollstaendigen Zitate am Ende auflisten."
    )
    
    user_prompt = (
        f"Benutzerfrage: {query}\n\n"
        f"Verfuegbarer Kontext:\n{context_text}\n\n"
        "Antworten Sie auf Deutsch und verwenden Sie nur den bereitgestellten Kontext."
    )
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return "Entschuldigung, die KI konnte die Antwort aufgrund eines internen Fehlers nicht generieren."

# --- FastAPI Endpoint ---

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Der Haupt-Endpunkt fuer die KI-Chat-Funktionalitaet.
    Fuehrt die RAG-Schritte (Retrieval, Augmentation, Generation) aus.
    """
    
    # 1. Retrieval (Abruf)
    quran_sources = retrieve_quran_data(request.userQuery)
    hadith_sources = retrieve_hadith_data(request.userQuery)
    
    all_sources = quran_sources + hadith_sources
    
    if not all_sources:
        # Fallback, wenn keine Quellen gefunden wurden
        return ChatResponse(
            generatedAnswer="Ich konnte keine direkten Koran- oder Hadith-Quellen zu Ihrer Frage finden. Bitte versuchen Sie eine andere Formulierung.",
            sources=[]
        )
    
    # 2. Augmentation & Generation (Erweiterung & Generierung)
    generated_answer = generate_ai_response(request.userQuery, all_sources)
    
    # 3. Response
    return ChatResponse(
        generatedAnswer=generated_answer,
        sources=all_sources
    )

# --- Server Start (for local testing) ---
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
