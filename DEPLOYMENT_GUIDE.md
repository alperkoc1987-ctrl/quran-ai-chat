# Deployment Guide: Quran & Hadith AI Chat Web Application

## Überblick

Die Quran & Hadith AI Chat-Anwendung besteht aus zwei Komponenten:

1. **Frontend:** React 19 + TypeScript + TailwindCSS (statische Web-App)
2. **Backend:** Python FastAPI mit RAG-Logik (API-Server)

Dieses Dokument beschreibt die Schritte zur Bereitstellung beider Komponenten.

---

## Teil 1: Frontend-Bereitstellung

### Option A: Vercel (Empfohlen für Anfänger)

Vercel ist eine kostenlose Plattform, die speziell für React-Anwendungen optimiert ist.

1.  **Vorbereitung:**
    - Laden Sie das Frontend-Verzeichnis (`/client`) auf GitHub hoch.
    - Erstellen Sie ein Konto auf [https://vercel.com](https://vercel.com).

2.  **Deployment:**
    - Verbinden Sie Ihr GitHub-Repository mit Vercel.
    - Vercel erkennt automatisch, dass es sich um ein React-Projekt handelt.
    - Klicken Sie auf "Deploy".

3.  **Umgebungsvariablen setzen:**
    - Gehen Sie zu "Settings" → "Environment Variables".
    - Fügen Sie `VITE_API_URL` hinzu und setzen Sie den Wert auf die URL Ihres Backend-Servers (z.B. `https://your-backend.com`).

### Option B: Netlify

Netlify ist eine weitere beliebte Alternative zu Vercel.

1.  **Vorbereitung:**
    - Laden Sie das Frontend-Verzeichnis auf GitHub hoch.
    - Erstellen Sie ein Konto auf [https://netlify.com](https://netlify.com).

2.  **Deployment:**
    - Verbinden Sie Ihr GitHub-Repository mit Netlify.
    - Setzen Sie den "Build command" auf `pnpm build`.
    - Setzen Sie das "Publish directory" auf `dist`.
    - Klicken Sie auf "Deploy".

3.  **Umgebungsvariablen setzen:**
    - Gehen Sie zu "Site settings" → "Build & deploy" → "Environment".
    - Fügen Sie `VITE_API_URL` hinzu.

### Option C: Selbst-Hosting (Advanced)

Wenn Sie einen eigenen Server haben:

1.  **Build erstellen:**
    ```bash
    cd client
    pnpm install
    pnpm build
    ```

2.  **Dateien hochladen:**
    - Laden Sie den Inhalt des `dist/` Verzeichnisses auf Ihren Web-Server hoch (z.B. Apache, Nginx).

3.  **Web-Server konfigurieren:**
    - Stellen Sie sicher, dass alle Anfragen auf `index.html` weitergeleitet werden (für Client-Side-Routing).

    **Nginx-Beispiel:**
    ```nginx
    location / {
        try_files $uri /index.html;
    }
    ```

---

## Teil 2: Backend-Bereitstellung

### Voraussetzungen

- Python 3.8+
- pip oder pnpm
- OpenAI API-Schlüssel (oder ein anderes LLM)
- Hadith API-Schlüssel (optional, aber empfohlen)

### Option A: Heroku (Kostenlos mit Einschränkungen)

Heroku bietet kostenlose Dynos, aber mit begrenzten Ressourcen.

1.  **Vorbereitung:**
    - Erstellen Sie ein Konto auf [https://heroku.com](https://heroku.com).
    - Installieren Sie die Heroku CLI.

2.  **Deployment:**
    ```bash
    heroku login
    heroku create your-app-name
    git push heroku main
    ```

3.  **Umgebungsvariablen setzen:**
    ```bash
    heroku config:set OPENAI_API_KEY=your_key
    heroku config:set HADITH_API_KEY=your_key
    ```

### Option B: Railway (Empfohlen)

Railway ist eine moderne Alternative zu Heroku mit besserer Performance.

1.  **Vorbereitung:**
    - Erstellen Sie ein Konto auf [https://railway.app](https://railway.app).
    - Verbinden Sie Ihr GitHub-Repository.

2.  **Deployment:**
    - Railway erkennt automatisch die Python-Anwendung.
    - Klicken Sie auf "Deploy".

3.  **Umgebungsvariablen setzen:**
    - Gehen Sie zu "Variables".
    - Fügen Sie `OPENAI_API_KEY` und `HADITH_API_KEY` hinzu.

### Option C: AWS EC2 (Für Produktionsumgebungen)

Für eine produktionsreife Anwendung:

1.  **EC2-Instanz erstellen:**
    - Starten Sie eine Ubuntu 20.04 LTS-Instanz auf AWS EC2.

2.  **Abhängigkeiten installieren:**
    ```bash
    sudo apt update
    sudo apt install python3-pip python3-venv
    ```

3.  **Anwendung bereitstellen:**
    ```bash
    git clone your-repo
    cd your-repo
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

4.  **Mit Gunicorn starten:**
    ```bash
    gunicorn -w 4 -b 0.0.0.0:8000 main:app
    ```

5.  **Mit Nginx als Reverse Proxy:**
    - Konfigurieren Sie Nginx, um Anfragen an den Gunicorn-Server weiterzuleiten.

### Option D: Google Cloud Run (Serverless)

Google Cloud Run ist eine serverlose Option, die automatisch skaliert.

1.  **Dockerfile erstellen:**
    ```dockerfile
    FROM python:3.11
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install -r requirements.txt
    COPY . .
    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```

2.  **Deployment:**
    ```bash
    gcloud run deploy quran-chat-backend --source . --platform managed --region us-central1
    ```

---

## Teil 3: Verbindung Frontend ↔ Backend

Nach der Bereitstellung beider Komponenten müssen Sie die Frontend-URL des Backends aktualisieren.

1.  **Backend-URL ermitteln:**
    - Notieren Sie die URL, unter der Ihr Backend erreichbar ist (z.B. `https://your-backend.railway.app`).

2.  **Frontend-Umgebungsvariable aktualisieren:**
    - Setzen Sie `VITE_API_URL` auf die Backend-URL.
    - Beispiel: `VITE_API_URL=https://your-backend.railway.app`

3.  **Frontend neu deployen:**
    - Vercel/Netlify werden automatisch neu gebaut, wenn Sie die Umgebungsvariablen ändern.

---

## Teil 4: Sicherheit und Best Practices

### API-Schlüssel schützen

- **Niemals** API-Schlüssel in den Code committen.
- Verwenden Sie Umgebungsvariablen auf dem Server.
- Aktivieren Sie CORS nur für bekannte Domänen.

### CORS-Konfiguration (Backend)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Rate Limiting

Um Missbrauch zu verhindern, implementieren Sie Rate Limiting:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/chat")
@limiter.limit("10/minute")
async def chat_endpoint(request: ChatRequest):
    ...
```

### SSL/TLS

- Verwenden Sie HTTPS für alle Verbindungen.
- Vercel und Railway bieten automatisch SSL-Zertifikate an.

---

## Teil 5: Monitoring und Wartung

### Logs überwachen

- **Vercel:** Dashboard → "Functions" → Logs
- **Railway:** Dashboard → "Logs"
- **AWS:** CloudWatch

### Fehler beheben

Wenn die Anwendung nicht funktioniert:

1.  **Frontend-Logs überprüfen:** Browser Developer Tools (F12) → Console
2.  **Backend-Logs überprüfen:** Server-Logs ansehen
3.  **API-Verbindung testen:** `curl https://your-backend.com/chat` (sollte einen Fehler zurückgeben, da keine Daten gesendet werden)

---

## Häufig gestellte Fragen

**F: Wie viel kostet die Bereitstellung?**

A: Die Frontend-Bereitstellung ist kostenlos auf Vercel/Netlify. Das Backend kostet je nach Anbieter (Railway: ab $5/Monat, AWS: pay-as-you-go). OpenAI API kostet je nach Nutzung.

**F: Kann ich die App offline nutzen?**

A: Nein, die aktuelle Version erfordert eine Internetverbindung für die KI-Logik. Sie könnten ein lokales LLM-Modell verwenden, um offline zu arbeiten.

**F: Wie kann ich die Koran- und Hadith-Daten aktualisieren?**

A: Die Daten werden von externen APIs (`alquran.cloud` und `hadithapi.com`) abgerufen. Sie können die Retrieval-Logik in `main.py` anpassen, um andere Quellen zu verwenden.

---

## Nächste Schritte

1.  Wählen Sie einen Hosting-Anbieter für Frontend und Backend.
2.  Folgen Sie den Anweisungen für Ihren gewählten Anbieter.
3.  Setzen Sie die erforderlichen Umgebungsvariablen.
4.  Testen Sie die Anwendung gründlich.
5.  Überwachen Sie die Logs und beheben Sie Fehler.

Viel Erfolg bei der Bereitstellung Ihrer Anwendung!
