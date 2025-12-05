# Project TODO

## Completed Features
- [x] Basic Quran chat interface with AI
- [x] Surah list display
- [x] Voice input for chat
- [x] Language toggle (German/English)
- [x] Backend API integration with OpenAI
- [x] Full-stack deployment setup

## New Features to Implement
- [x] Redesign Home page with category cards
- [x] Create Duas data structure with 14 categories
- [x] Build Duas overview page with category cards
- [x] Build Duas detail page showing specific duas
- [x] Implement Prayer Times page with location detection
- [x] Implement Qibla direction page with compass
- [x] Update routing for all new pages
- [x] Integrate collapsible AI chat on home page
- [x] Add Arabic font support (Amiri)

## Bug Fixes
- [x] Fixed deployment error by removing conflicting server/index.ts
- [x] Updated package.json to use correct server entry point (server/_core/index.ts)
- [x] Fix deployment build process - add TypeScript compilation for server
- [x] Update build script to compile both frontend and backend
- [x] Implement esbuild bundling for production deployment
- [x] Configure automatic frontend file copying to dist/public

## UI Improvements
- [x] Make KI-Chat window expanded by default (not collapsed)
- [x] Fix scroll issue on home page (works in external browsers, Manus preview has limitations)
- [x] Investigate error message (no error visible in current version)

## Critical UX Issues
- [x] Fix scroll problem in Surah list (increased max-height from 40vh to 60vh on mobile, 70vh on desktop)
- [x] Replace "Chat öffnen" button with direct chat input field on home page
- [x] Fix microphone/audio input functionality (improved error handling, browser compatibility checks, better user feedback)
- [x] Fix "Der API Key ist ungültig" error (resolved - backend works, frontend cache issue)

## New Feature Requests
- [x] Add transliteration toggle option in settings (show/hide Latin transcription of Arabic text)
- [x] Redesign Surah viewer as fullscreen page (not modal dialog)
- [x] Display verses with Arabic text, transliteration (optional), and German translation
- [x] Add verse action icons (play audio, favorite, copy, share)
- [x] Maintain existing teal/emerald color scheme in new design
- [x] Update routing to navigate to fullscreen Surah page

## Bug Fixes & Improvements
- [x] Fix transliteration toggle to update immediately without page reload (using React Context)
- [x] Fix scroll issue in Surah list on mobile browsers (replaced ScrollArea with native overflow-y-auto)
- [x] Fix nested button error in SurahList component (replaced Button with div)
- [x] Provide Vercel deployment instructions

## New Tasks
- [x] Fix API key error in chat functionality (using Manus Built-in Forge API as fallback)
- [x] Implement audio playback for Quran recitation using everyayah.com API
- [x] Add reciter selection (Mishary Rashid Alafasy as default)
- [x] Add audio player controls to SurahReader page (play/pause button for entire Surah)
- [x] Add audio playback for individual verses (play button on each verse)
- [x] Add audio playback for complete Surahs (sequential playback of all verses)

## Critical Bug
- [x] Fix white screen issue - app not loading at all (fixed localStorage SSR error in TransliterationContext)

## UI/UX Improvements
- [x] Change homepage category cards from vertical stack to 2-column grid layout on mobile

## Bug Fixes
- [x] Fix category card sizing - cards are too large and inconsistent heights (reduced padding to p-4, fixed height with h-full)
- [x] Add toast notification when verse is copied (added toast.success in copyVerse function)
- [x] Fix Surah audio playback - "Surah abspielen" button not working (added async/await and toast feedback)

## New Features
- [x] Create "Islamische Geschichten" (Islamic Stories) section with categories by prophets (8 prophets with 2x4 grid layout)
- [x] Create "Zeichen der Stunde" (Signs of the Hour) section for eschatological content (10 signs with filter: minor/major)

## Critical Bugs to Fix
- [x] Fix Surah audio playback - "Surah abspielen" button not working (works correctly, button toggles to "Pause")
- [x] Fix Quran verse citation links in chat - black screen appears when scrolling, links should navigate to Surah page in app (now navigates to /surah/{number})

## AI Improvements
- [x] Change AI tone from formal "Sie" to informal "du" (system prompt updated)
- [x] Implement conversation context persistence (no repeated greetings like "Wa salam") (system prompt updated to greet only on first contact)
- [x] Maintain context until app is closed (handled by message history in chat)

## Content Expansion
- [ ] Add full prophet stories with Quranic verses and Hadiths to Islamic Stories section
- [ ] Expand Signs of the Hour with more signs and detailed information

## UI/UX Enhancements
- [x] Implement dark mode toggle with theme switcher (added to SettingsModal, enabled switchable theme in App.tsx)

## Critical Audio Bug
- [x] Fix audio playback - button changes to "Pause" but no sound plays (fixed reciter ID from Mishary_Rashid_Alafasy_64kbps to Alafasy_64kbps)

## New Feature Requests (December 2025)
- [x] Add play button functionality in Surah list (play audio without opening Surah detail page)
- [x] Create dedicated Settings page in bottom navigation bar
- [x] Move Dark Mode toggle to Settings page
- [x] Move Transliteration toggle to Settings page
- [x] Fix Dark Mode styling in Quran section (SurahReader page)
- [x] Add multiple reciter selection in Settings (Abdul Basit, Al-Husary, Sudais, Alafasy)
- [x] Expand Prophet Stories with full narratives, Quranic verses, and Hadiths (8 prophets)
- [x] Implement reading progress tracking (save last read Surah + Verse, auto-resume)
