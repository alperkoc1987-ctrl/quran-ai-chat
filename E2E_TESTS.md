# End-to-End Tests für Koran & Hadith KI-Chat

## Test 1: Vers-Navigation von KI-Chat zum Koran-Reader

**Ziel**: Sicherstellen, dass die Navigation von einem Vers im Chat direkt zum richtigen Vers im Koran-Reader führt.

### Testschritte:
1. Öffne die App und navigiere zum KI-Chat
2. Stelle eine Frage, die einen Koran-Vers als Antwort enthält (z.B. "Was sagt der Koran über Geduld?")
3. Warte auf die Antwort mit Vers-Referenz (z.B. [2:45])
4. Klicke auf die Vers-Referenz
5. Verifiziere, dass der Koran-Reader geöffnet wird
6. Verifiziere, dass zur richtigen Sure navigiert wurde
7. Verifiziere, dass zum richtigen Vers gescrollt wurde
8. Verifiziere, dass der Vers hervorgehoben ist (gelber Hintergrund für 2 Sekunden)

### Erwartetes Ergebnis:
- ✅ Koran-Reader öffnet sich
- ✅ Richtige Sure wird geladen (z.B. Sure 2 - Al-Baqarah)
- ✅ Automatisches Scrollen zum Zielvers
- ✅ Vers wird kurz hervorgehoben
- ✅ Keine schwarzen Balken oder Rendering-Fehler
- ✅ Smooth Scroll-Animation

### Testdaten:
| Frage | Erwartete Vers-Referenz | Sure | Vers |
|-------|------------------------|------|------|
| "Was sagt der Koran über Geduld?" | [2:45] oder [2:153] | 2 | 45 oder 153 |
| "Erzähle mir über die Schöpfung" | [2:30] | 2 | 30 |
| "Was ist Bismillah?" | [1:1] | 1 | 1 |
| "Erzähle von Prophet Ibrahim" | [2:124] oder [21:68-69] | 2 oder 21 | 124 oder 68-69 |

---

## Test 2: Push-to-Talk Audio-Aufnahme

**Ziel**: Sicherstellen, dass die Sprachaufnahme funktioniert und korrekt in Text umgewandelt wird.

### Testschritte:
1. Öffne die App und navigiere zum KI-Chat
2. Halte das Mikrofon-Icon gedrückt
3. Verifiziere, dass der Aufnahme-Indikator erscheint (pulsierendes rotes Icon)
4. Spreche eine Frage (z.B. "Was bedeutet Sabr im Islam?")
5. Lasse das Mikrofon-Icon los
6. Warte auf die Speech-to-Text-Umwandlung
7. Verifiziere, dass der Text im Input-Feld erscheint
8. Verifiziere, dass die KI-Antwort generiert wird

### Erwartetes Ergebnis:
- ✅ Mikrofon-Berechtigung wird angefordert (beim ersten Mal)
- ✅ Aufnahme-Indikator ist sichtbar während der Aufnahme
- ✅ Audio wird aufgenommen (max. 1 Minute)
- ✅ Speech-to-Text-Umwandlung erfolgt automatisch
- ✅ Text erscheint im Input-Feld
- ✅ KI-Antwort wird generiert
- ✅ Bei fehlender Berechtigung: Benutzerfreundliche Fehlermeldung

### Fehlerszenarien:
| Szenario | Erwartetes Verhalten |
|----------|---------------------|
| Keine Mikrofon-Berechtigung | Toast-Nachricht: "Mikrofon-Zugriff erforderlich. Bitte erlauben Sie den Zugriff in den Einstellungen." |
| Aufnahme länger als 1 Minute | Automatischer Stopp nach 60 Sekunden, Umwandlung des aufgenommenen Audios |
| Kein Audio erkannt | Toast-Nachricht: "Keine Sprache erkannt. Bitte versuchen Sie es erneut." |
| Netzwerkfehler | Toast-Nachricht: "Fehler bei der Spracherkennung. Bitte überprüfen Sie Ihre Internetverbindung." |

---

## Test 3: Transliteration standardmäßig aktiv

**Ziel**: Sicherstellen, dass Transliteration für neue Nutzer standardmäßig aktiviert ist.

### Testschritte:
1. Öffne die App im Inkognito-Modus / lösche localStorage
2. Navigiere zum Koran-Reader
3. Öffne eine beliebige Sure
4. Verifiziere die Reihenfolge der Anzeige

### Erwartetes Ergebnis:
- ✅ Transliteration ist standardmäßig aktiviert
- ✅ Reihenfolge: Arabisch → Transliteration → Deutsche Übersetzung
- ✅ Einstellung wird persistent gespeichert
- ✅ Nach Deaktivierung und Neustart bleibt die Einstellung erhalten

---

## Test 4: UI-Navigation

**Ziel**: Sicherstellen, dass alle Navigations-Elemente korrekt funktionieren.

### Testschritte:
1. Öffne die App
2. Verifiziere die Menü-Reihenfolge auf der Startseite
3. Navigiere zum Koran-Reader
4. Verifiziere, dass der Zurück-Pfeil vorhanden ist
5. Klicke auf den Zurück-Pfeil
6. Verifiziere, dass zur Startseite navigiert wird

### Erwartetes Ergebnis:
- ✅ Menü-Reihenfolge: Der Koran, Duas, Zeichen der Stunde, Quiz, ... (Quiz und Zeichen getauscht)
- ✅ Zurück-Pfeil ist im Koran-Reader sichtbar
- ✅ Zurück-Pfeil funktioniert korrekt
- ✅ Konsistente Navigation in allen Bereichen

---

## Test 5: Erweiterte Prophetengeschichten

**Ziel**: Sicherstellen, dass die Prophetengeschichten deutlich länger und detaillierter sind.

### Testschritte:
1. Öffne die App
2. Navigiere zu "Islamische Geschichten"
3. Öffne die Geschichte von Prophet Ibrahim
4. Verifiziere die Länge und Details

### Erwartetes Ergebnis:
- ✅ Geschichte ist mindestens 3x länger als vorher
- ✅ Enthält historischen Kontext
- ✅ Enthält mehrere Abschnitte
- ✅ Enthält Koran-Verse mit Referenzen
- ✅ Enthält Lektionen und Weisheiten

---

## Automatisierte Tests (Optional)

Für automatisierte End-to-End-Tests können folgende Tools verwendet werden:
- **Playwright** oder **Cypress** für Browser-Tests
- **Jest** für Unit-Tests
- **React Testing Library** für Komponenten-Tests

### Beispiel Playwright-Test:

```typescript
import { test, expect } from '@playwright/test';

test('Vers-Navigation von Chat zum Koran-Reader', async ({ page }) => {
  // Navigiere zur App
  await page.goto('https://quranchat-dwd5zzuz.manus.space/');
  
  // Stelle eine Frage
  await page.fill('input[placeholder*="Frage"]', 'Was sagt der Koran über Geduld?');
  await page.click('button[type="submit"]');
  
  // Warte auf Antwort
  await page.waitForSelector('a[href*="/surah/"]');
  
  // Klicke auf Vers-Referenz
  await page.click('a[href*="/surah/2#verse-45"]');
  
  // Verifiziere Navigation
  await expect(page).toHaveURL(/\\/surah\\/2#verse-45/);
  
  // Verifiziere, dass Vers hervorgehoben ist
  const verse = page.locator('#verse-45');
  await expect(verse).toHaveClass(/bg-yellow-200/);
});
```

---

## Manuelle Test-Checkliste

Vor jedem Release sollten folgende Tests manuell durchgeführt werden:

- [ ] Vers-Navigation funktioniert korrekt
- [ ] Push-to-Talk Audio funktioniert
- [ ] Transliteration ist standardmäßig aktiv
- [ ] UI-Navigation ist konsistent
- [ ] Prophetengeschichten sind erweitert
- [ ] Keine schwarzen Balken im Koran-Reader
- [ ] Smooth Scrolling funktioniert
- [ ] Mikrofon-Berechtigungen werden korrekt behandelt
- [ ] Fehlerbehandlung funktioniert
- [ ] App funktioniert auf iOS und Android
- [ ] App funktioniert in verschiedenen Browsern (Chrome, Safari, Firefox)
- [ ] Dark Mode funktioniert korrekt
- [ ] Alle Icons und Bilder werden geladen
- [ ] Keine Console-Fehler

---

## Bekannte Einschränkungen

1. **Push-to-Talk auf iOS Safari**: Web-Audio-API hat Einschränkungen auf iOS Safari. Nutzer müssen möglicherweise die Berechtigung mehrmals erteilen.
2. **Service Worker**: Push-Benachrichtigungen funktionieren nur auf HTTPS (nicht auf localhost).
3. **Speech-to-Text**: Benötigt Internetverbindung und OpenAI API Key.

---

## Kontakt

Bei Problemen oder Fragen zu den Tests, bitte melden Sie sich bei:
- **Entwickler**: Manus AI Team
- **Projekt**: Koran & Hadith KI-Chat
- **Version**: 1.5
