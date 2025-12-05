# Vercel Deployment Anleitung

## Voraussetzungen
- Ein Vercel-Account (kostenlos unter https://vercel.com)
- Git installiert auf Ihrem Computer
- GitHub, GitLab oder Bitbucket Account

## Schritt 1: Code zu Git Repository hochladen

### Option A: Neues GitHub Repository erstellen
```bash
# In Ihrem lokalen Projektordner
cd /pfad/zu/ihrem/projekt

# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit erstellen
git commit -m "Initial commit"

# GitHub Repository erstellen (auf github.com)
# Dann Repository verbinden:
git remote add origin https://github.com/IHR_USERNAME/quran-ai-chat.git
git branch -M main
git push -u origin main
```

### Option B: Bestehendes Repository aktualisieren
```bash
# Änderungen hinzufügen
git add .

# Commit erstellen
git commit -m "Update: Transliteration feature and bug fixes"

# Zu GitHub pushen
git push origin main
```

## Schritt 2: Projekt auf Vercel deployen

1. **Vercel Dashboard öffnen**: Gehen Sie zu https://vercel.com/dashboard

2. **Neues Projekt importieren**:
   - Klicken Sie auf "Add New..." → "Project"
   - Wählen Sie Ihr Git-Repository aus (GitHub/GitLab/Bitbucket)
   - Suchen Sie nach "quran-ai-chat" und klicken Sie auf "Import"

3. **Projekt konfigurieren**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (Standard)
   - **Build Command**: `pnpm run build` (wird automatisch erkannt)
   - **Output Directory**: `dist` (wird automatisch erkannt)

4. **Umgebungsvariablen hinzufügen**:
   Klicken Sie auf "Environment Variables" und fügen Sie folgende Variablen hinzu:
   
   ```
   VITE_FORGE_API_KEY=<Ihr_OpenAI_API_Key>
   VITE_FORGE_API_URL=https://api.openai.com/v1
   DATABASE_URL=<Ihre_Datenbank_URL>
   JWT_SECRET=<Ihr_JWT_Secret>
   ```

5. **Deploy starten**: Klicken Sie auf "Deploy"

## Schritt 3: Automatische Updates einrichten

Nach dem ersten Deployment wird Vercel automatisch:
- Bei jedem `git push` zur main-Branch ein neues Deployment erstellen
- Eine Preview-URL für jeden Pull Request generieren
- Die Produktions-URL automatisch aktualisieren

## Schritt 4: Projekt aktualisieren

Um Ihre App auf Vercel zu aktualisieren:

```bash
# Änderungen machen
# ...

# Zu Git hinzufügen
git add .

# Commit erstellen
git commit -m "Beschreibung der Änderungen"

# Zu GitHub pushen
git push origin main
```

Vercel erkennt den Push automatisch und startet ein neues Deployment!

## Wichtige Hinweise

### Datenbank-Setup
Wenn Sie eine Datenbank verwenden, müssen Sie:
1. Eine PostgreSQL-Datenbank erstellen (z.B. bei Vercel Postgres, Supabase, oder Neon)
2. Die `DATABASE_URL` in den Vercel Environment Variables setzen
3. Migrations ausführen:
   ```bash
   pnpm db:push
   ```

### Custom Domain
Um eine eigene Domain zu verwenden:
1. Gehen Sie zu Ihrem Projekt auf Vercel
2. Klicken Sie auf "Settings" → "Domains"
3. Fügen Sie Ihre Domain hinzu und folgen Sie den DNS-Anweisungen

### Troubleshooting

**Problem**: Build schlägt fehl
- **Lösung**: Überprüfen Sie die Build-Logs in Vercel und stellen Sie sicher, dass alle Dependencies in `package.json` vorhanden sind

**Problem**: API-Fehler nach Deployment
- **Lösung**: Überprüfen Sie, ob alle Umgebungsvariablen korrekt gesetzt sind

**Problem**: Seite lädt nicht
- **Lösung**: Stellen Sie sicher, dass der Output Directory auf `dist` gesetzt ist

## Nützliche Links
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Dokumentation: https://vercel.com/docs
- Vercel CLI: https://vercel.com/docs/cli

## Support
Bei Problemen können Sie:
- Die Vercel-Dokumentation konsultieren
- Im Vercel Discord Server Hilfe suchen
- Ein Support-Ticket bei Vercel erstellen
