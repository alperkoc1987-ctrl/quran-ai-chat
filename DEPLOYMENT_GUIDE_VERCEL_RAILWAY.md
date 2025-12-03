# Deployment Guide: Vercel + Railway

Dieses Handbuch führt Sie durch die Bereitstellung der Quran & Hadith KI-Chat-App in der Produktion.

## Übersicht

Die App besteht aus zwei Teilen:

1. **Frontend (React)** → Vercel (kostenlos)
2. **Backend (Python/FastAPI)** → Railway (~$5-10/Monat)

---

## Phase 1: Frontend auf Vercel deployen

### Schritt 1: GitHub-Repository vorbereiten

Sie müssen den Code auf GitHub hochladen, damit Vercel ihn automatisch deployen kann.

**1.1 Öffnen Sie GitHub und erstellen Sie ein neues Repository:**
- Gehen Sie zu https://github.com/new
- Repository-Name: `quran-ai-chat`
- Beschreibung: `Quran & Hadith AI Chat Application`
- Wählen Sie "Public" (damit Vercel Zugriff hat)
- Klicken Sie "Create repository"

**1.2 Laden Sie den Code hoch:**

Öffnen Sie Terminal/PowerShell auf Ihrem Computer und führen Sie diese Befehle aus:

```bash
# Navigieren Sie zum Projekt-Verzeichnis
cd /path/to/quran_ai_chat

# Initialisieren Sie Git
git init
git add .
git commit -m "Initial commit: Quran AI Chat App"

# Verbinden Sie mit GitHub
git remote add origin https://github.com/YOUR_USERNAME/quran-ai-chat.git
git branch -M main
git push -u origin main
```

**Ersetzen Sie `YOUR_USERNAME` mit Ihrem GitHub-Benutzernamen!**

### Schritt 2: Vercel-Deployment

**2.1 Gehen Sie zu Vercel:**
- Öffnen Sie https://vercel.com
- Klicken Sie auf "New Project"
- Wählen Sie "Import Git Repository"
- Suchen Sie nach `quran-ai-chat` und wählen Sie es aus

**2.2 Konfigurieren Sie das Projekt:**
- **Project Name:** `quran-ai-chat`
- **Framework:** Vite (sollte automatisch erkannt werden)
- **Root Directory:** `./client`
- Klicken Sie "Deploy"

**2.3 Warten Sie auf den Deploy:**
- Vercel wird den Code automatisch bauen und deployen
- Nach ~2-3 Minuten sehen Sie eine URL wie: `https://quran-ai-chat.vercel.app`

**Das ist Ihre Frontend-URL!**

---

## Phase 2: Backend auf Railway deployen

### Schritt 1: Railway-Account erstellen

- Gehen Sie zu https://railway.app
- Klicken Sie "Start Project"
- Wählen Sie "Deploy from GitHub"
- Verbinden Sie Ihren GitHub-Account

### Schritt 2: Backend-Repository vorbereiten

Sie müssen ein separates Repository für das Backend erstellen.

**2.1 Erstellen Sie ein neues GitHub-Repository:**
- Gehen Sie zu https://github.com/new
- Repository-Name: `quran-ai-chat-backend`
- Wählen Sie "Public"
- Klicken Sie "Create repository"

**2.2 Laden Sie den Backend-Code hoch:**

```bash
# Erstellen Sie ein neues Verzeichnis
mkdir quran-ai-chat-backend
cd quran-ai-chat-backend

# Kopieren Sie die Backend-Dateien
cp /path/to/quran_ai_chat/main.py .
cp /path/to/quran_ai_chat/models.py .
cp /path/to/quran_ai_chat/requirements.txt .

# Initialisieren Sie Git
git init
git add .
git commit -m "Initial commit: Backend"

# Verbinden Sie mit GitHub
git remote add origin https://github.com/YOUR_USERNAME/quran-ai-chat-backend.git
git branch -M main
git push -u origin main
```

### Schritt 3: Railway-Deployment

**3.1 Auf Railway deployen:**
- Gehen Sie zu https://railway.app/dashboard
- Klicken Sie "New Project"
- Wählen Sie "Deploy from GitHub"
- Suchen Sie nach `quran-ai-chat-backend`
- Klicken Sie "Deploy"

**3.2 Umgebungsvariablen konfigurieren:**

Nach dem Deploy müssen Sie die OpenAI API-Key hinzufügen:

- Gehen Sie zum Projekt auf Railway
- Klicken Sie auf "Variables"
- Fügen Sie folgende Variable hinzu:
  - **Key:** `OPENAI_API_KEY`
  - **Value:** Ihr OpenAI API-Schlüssel

**3.3 Backend-URL abrufen:**

- Gehen Sie zu "Deployments"
- Sie sehen eine URL wie: `https://quran-ai-chat-backend-production.up.railway.app`

**Das ist Ihre Backend-URL!**

---

## Phase 3: Frontend und Backend verbinden

### Schritt 1: Frontend-Umgebungsvariable aktualisieren

Sie müssen die Frontend-App so konfigurieren, dass sie die Backend-URL verwendet.

**1.1 Öffnen Sie `.env` im Frontend-Verzeichnis:**

```bash
# Erstellen Sie eine .env.production Datei
cd /path/to/quran_ai_chat/client
echo "VITE_API_URL=https://quran-ai-chat-backend-production.up.railway.app" > .env.production
```

**Ersetzen Sie die URL mit Ihrer tatsächlichen Railway-URL!**

**1.2 Pushen Sie die Änderung zu GitHub:**

```bash
cd /path/to/quran_ai_chat
git add .env.production
git commit -m "Add production API URL"
git push
```

**Vercel wird automatisch neu deployen!**

### Schritt 2: CORS konfigurieren

Das Backend muss Anfragen vom Frontend akzeptieren.

**2.1 Öffnen Sie `main.py` im Backend:**

Stellen Sie sicher, dass CORS aktiviert ist:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://quran-ai-chat.vercel.app"],  # Ihre Vercel-URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**2.2 Pushen Sie zu GitHub:**

```bash
git add main.py
git commit -m "Configure CORS for production"
git push
```

**Railway wird automatisch neu deployen!**

---

## Phase 4: Testen

### Schritt 1: Frontend testen

- Öffnen Sie https://quran-ai-chat.vercel.app
- Die App sollte laden

### Schritt 2: Chat testen

- Schreiben Sie eine Frage wie "Hallo" oder "Dua für mehr Geld"
- Der Bot sollte antworten

Wenn Sie einen Fehler bekommen, überprüfen Sie:
- Ist die Backend-URL korrekt in `.env.production`?
- Ist CORS im Backend konfiguriert?
- Ist der OpenAI API-Schlüssel auf Railway gespeichert?

---

## Häufig gestellte Fragen

**F: Wie viel kostet das?**
A: Frontend (Vercel) ist kostenlos. Backend (Railway) kostet ~$5-10/Monat.

**F: Wie aktualisiere ich die App?**
A: Pushen Sie Änderungen zu GitHub. Vercel und Railway deployen automatisch neu.

**F: Was ist, wenn der Backend ausfällt?**
A: Railway hat 99.9% Uptime. Sie können auch Logs auf Railway überprüfen.

**F: Kann ich meine eigene Domain verwenden?**
A: Ja! Vercel und Railway unterstützen Custom Domains.

---

## Support

Wenn Sie Probleme haben, überprüfen Sie:
1. GitHub-Repository ist öffentlich
2. Umgebungsvariablen sind korrekt gespeichert
3. OpenAI API-Schlüssel ist gültig
4. CORS ist im Backend konfiguriert
