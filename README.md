# Quran & Hadith AI Chat

Eine moderne Web-Anwendung, die es Benutzern ermöglicht, Fragen zum Koran und den Hadithen zu stellen und KI-generierte Antworten mit Quellenangaben zu erhalten.

## Features

- **KI-gestützter Chat:** Stellen Sie Fragen zum Koran und den Hadithen.
- **Quellenangaben:** Jede Antwort wird mit relevanten Koran-Versen und Hadithen belegt.
- **Mehrsprachige Unterstützung:** Unterstützt Deutsch, Englisch und weitere Sprachen.
- **Responsive Design:** Funktioniert auf Desktop, Tablet und Mobilgeräten.
- **Moderne Technologie:** Gebaut mit React 19, TypeScript und TailwindCSS.

## Technologie-Stack

### Frontend
- **React 19:** UI-Framework
- **TypeScript:** Typsicherheit
- **TailwindCSS 4:** Styling
- **shadcn/ui:** UI-Komponenten
- **Wouter:** Client-Side Routing

### Backend
- **Python 3.11:** Programmiersprache
- **FastAPI:** Web-Framework
- **Pydantic:** Datenvalidierung
- **OpenAI API:** KI-Modell für Antwortgenerierung
- **External APIs:** `alquran.cloud` (Koran), `hadithapi.com` (Hadithe)

## Installation

### Frontend

```bash
cd client
pnpm install
pnpm dev
```

Die Anwendung ist dann unter `http://localhost:3000` erreichbar.

### Backend

```bash
# Abhängigkeiten installieren
pip install -r requirements.txt

# Umgebungsvariablen setzen
export OPENAI_API_KEY=your_key
export HADITH_API_KEY=your_key

# Server starten
uvicorn main:app --reload
```

Der Backend-Server läuft dann unter `http://localhost:8000`.

## Konfiguration

### Umgebungsvariablen

Erstellen Sie eine `.env`-Datei im Backend-Verzeichnis:

```
OPENAI_API_KEY=your_openai_api_key
HADITH_API_KEY=your_hadith_api_key
FRONTEND_URL=http://localhost:3000
```

### Frontend-API-URL

Im Frontend können Sie die Backend-URL über die Umgebungsvariable `VITE_API_URL` konfigurieren:

```bash
VITE_API_URL=http://localhost:8000 pnpm dev
```

## Verwendung

1.  Öffnen Sie die Anwendung im Browser.
2.  Geben Sie Ihre Frage zum Koran oder den Hadithen ein.
3.  Klicken Sie auf "Senden" oder drücken Sie Enter.
4.  Die KI generiert eine Antwort mit Quellenangaben.

## Deployment

Siehe [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) für detaillierte Anweisungen zur Bereitstellung auf verschiedenen Plattformen (Vercel, Railway, AWS, etc.).

## Struktur

```
quran_ai_chat/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Wiederverwendbare UI-Komponenten
│   │   ├── pages/            # Seiten-Komponenten
│   │   ├── hooks/            # Custom React Hooks
│   │   ├── lib/              # Utility-Funktionen und Typen
│   │   ├── App.tsx           # Haupt-App-Komponente
│   │   └── index.css         # Globale Styles
│   ├── public/               # Statische Assets
│   └── package.json
├── main.py                   # FastAPI Backend
├── models.py                 # Pydantic Datenmodelle
├── requirements.txt          # Python Abhängigkeiten
├── Dockerfile                # Docker-Konfiguration
└── DEPLOYMENT_GUIDE.md       # Bereitstellungsanleitung
```

## API-Endpunkte

### POST /chat

Sendet eine Benutzerfrage und erhält eine KI-generierte Antwort mit Quellenangaben.

**Request:**
```json
{
  "userQuery": "Was ist das Gebet im Islam?",
  "language": "de",
  "translationEdition": "de.bubenheim"
}
```

**Response:**
```json
{
  "generatedAnswer": "Das Gebet (Salah) ist...",
  "sources": [
    {
      "type": "Koran",
      "reference": "Sure 2: Vers 43",
      "text": "Und verrichtet das Gebet..."
    }
  ]
}
```

## Sicherheit

- API-Schlüssel sollten niemals in den Code committet werden.
- Verwenden Sie Umgebungsvariablen auf dem Server.
- Implementieren Sie Rate Limiting, um Missbrauch zu verhindern.
- Aktivieren Sie CORS nur für bekannte Domänen.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## Haftungsausschluss

Diese Anwendung generiert Antworten mit Hilfe von KI. Die Antworten dienen nur zu Informationszwecken und sollten nicht als endgültige religiöse Autorität betrachtet werden. Bitte konsultieren Sie einen islamischen Gelehrten für wichtige religiöse Fragen.

## Support

Für Fragen oder Probleme öffnen Sie bitte ein Issue im Repository.
