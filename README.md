# Copy YouTube Transcript

Browser-Erweiterung (Chrome, Manifest V3), die **Untertitel/Transkripte von YouTube-Videos** direkt aus dem Player heraus in die Zwischenablage kopiert — optional mit Zeitstempeln und als **Klartext** oder **Markdown**.

## Funktionen

- **„Copy transcript“-Button** in der Aktionsleiste unter dem Video (neben Teilen, Speichern usw.), sobald ein Transkript verfügbar ist
- **Kein separates Öffnen** des YouTube-Transkript-Panels nötig; das Transkript wird im Hintergrund geladen und bei Klick kopiert
- **Einstellungen** über das Erweiterungs-Popup:
  - **Ausgabe:** Plain Text oder Markdown (Aufzählungslisten mit `-`)
  - **Zeitstempel:** ein- oder ausschaltbar (`[mm:ss]` bzw. `[hh:mm:ss]` bei langen Videos)
- Einstellungen werden über `chrome.storage.sync` gespeichert (bei angemeldetem Chrome-Konto geräteübergreifend nutzbar)
- Wenn **kein Untertitel/Transkript** existiert, zeigt der Button einen deaktivierten Zustand („No transcript“)

## Voraussetzungen

- **Chromium-basierter Browser** mit Unterstützung für Manifest V3 (z. B. Google Chrome, Microsoft Edge, Brave)
- Nutzung auf **youtube.com** (die Erweiterung ist nur dort aktiv)

## Installation aus dem Quellcode (Entwickler-Modus)

1. Repository klonen oder als ZIP herunterladen und entpacken.
2. Im Browser **Erweiterungen verwalten** öffnen:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
3. **Entwicklermodus** aktivieren.
4. **Entpackte Erweiterung laden** wählen und den Ordner auswählen, der die `manifest.json` enthält (Projektroot).

Nach der Installation auf einer YouTube-Watch-Seite (`youtube.com/watch?v=…`) erscheint der Button, sobald die Seite geladen ist.

## Bedienung

1. Video mit verfügbaren Untertiteln öffnen (automatisch erzeugte oder manuelle Untertitel zählen mit).
2. Auf **Copy transcript** klicken — der Text landet in der Zwischenablage.
3. Format und Zeitstempel bei Bedarf im **Popup** der Erweiterung (Klick auf das Erweiterungssymbol) anpassen.

## Berechtigungen (kurz erklärt)

| Berechtigung        | Zweck |
|---------------------|--------|
| `storage`           | Speichern der Popup-Einstellungen (Format, Zeitstempel). |
| `clipboardWrite`  | Transkript in die Zwischenablage schreiben (über den Hintergrund-Service-Worker). |
| `*://*.youtube.com/*` (Host) | Skripte und Netzwerkzugriffe nur auf YouTube-Domains für Captions und die InnerTube-API. |

Es werden keine Daten an Drittanbieter-Server der Erweiterung gesendet; Anfragen laufen im Kontext von YouTube (Cookies/Session wie im Browser).

## Technischer Überblick

- **`manifest.json`** — Manifest V3, Content Script, Service Worker, Popup
- **`content.js`** — UI-Button, Abruf der Player-/Caption-Metadaten, Fetch der Untertitel (u. a. timedtext / json3), Formatierung
- **`content.css`** — Styling des Buttons
- **`background.js`** — Service Worker für `navigator.clipboard.writeText`
- **`popup.html` / `popup.js`** — Einstellungen

Kein Build-Step: reines HTML/CSS/JS, direkt ladbar.

## Beiträge & Fehler

Issues und Pull Requests sind willkommen. Bitte bei Bugs möglichst angeben:

- Browser und Version  
- Link oder Video-ID  
- ob Untertitel in der YouTube-Oberfläche sichtbar sind  
- erwartetes vs. tatsächliches Verhalten  

## Lizenz

Dieses Projekt ist Open Source. Wenn noch keine `LICENSE`-Datei im Repository liegt, solltest du eine freie Lizenz deiner Wahl hinzufügen (häufig: **MIT**), damit andere Nutzungsbedingungen klar sind.

---

*Hinweis: YouTube ist eine Marke von Google. Dieses Projekt ist nicht von Google betrieben oder offiziell unterstützt.*
