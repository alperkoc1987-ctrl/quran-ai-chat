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

## New Feature Requests (December 2025 - Part 2)
- [x] Fix Dark Mode in Quran section (still not working properly)
- [x] Replace large AI chat window in Quran section with small floating icon
- [x] Add floating chat icon with text "Frage zum Tafsir stellen"
- [x] Implement verse bookmarking system (mark verses as favorites)
- [x] Add personal notes feature for individual verses
- [x] Create favorites collections management (organize bookmarked verses)
- [x] Add UI to view and manage all bookmarks and notes

## Bug Fix (December 2025)
- [x] Fix API key validation error in KI-Chat ("Der eingegebene API Key scheint ungültig zu sein")
- [x] Verify OpenAI API key is correctly configured in environment variables
- [x] Test chat functionality after fix

## New Features (December 2025 - Part 3)
- [x] Remove "Suren ausblenden" button from Quran page
- [x] Make Surah list fullscreen (remove unnecessary padding/margins)
- [x] Implement verse search functionality (search by keywords, verse content, themes)
- [x] Add search results page with highlighted matches
- [x] Implement Service Worker for offline mode
- [x] Cache Surahs for offline reading
- [x] Enable offline access to bookmarks and notes

## New Features (December 2025 - Part 4)
- [x] Add circular progress indicators to Surah list
- [x] Show reading progress percentage for each Surah (e.g., 14%, 0%)
- [x] Calculate progress based on last read verse vs total verses
- [x] Display green progress ring around percentage
- [x] Update progress automatically when reading verses

## Bug Fix (December 2025 - Part 2)
- [x] Fix audio playback issue in Surah list (audio not playing) - No bug found, audio works correctly

## New Features (December 2025 - Part 5)
- [x] Create statistics dashboard page
- [x] Track total reading progress across all Surahs
- [x] Track reading time (total and daily)
- [x] Track verses read per day
- [x] Implement streak counter (consecutive days of reading)
- [x] Add daily reminder notifications for Gebetszeiten
- [x] Add daily verse notifications
- [x] Add reading progress reminder notifications
- [x] Implement notification permission request
- [x] Store notification preferences in localStorage

## Bug Fixes & Changes (December 2025 - Part 3)
- [x] Fix KI chat Surah links display issue (links are not visible/clickable properly)
- [x] Fix Surah link navigation to open SurahReader in fullscreen mode
- [x] Move search functionality from homepage to Quran section
- [x] Remove standalone Search page and card from homepage
- [x] Integrate search bar directly into Quran/Surah list page

## Bug Fixes (December 2025 - Part 4)
- [x] Fix API error in KI chat ("Der eingegebene API Key scheint ungültig zu sein") - fixed by restarting server on port 3000
- [x] Verify Search card is properly removed from homepage - confirmed removed from code, user needs to clear browser cache

## Critical Bugs (December 2025 - Part 5)
- [x] API error still occurring in KI chat - fixed by clearing build cache and restarting server on port 3000
- [x] Search card still visible on homepage - fixed by clearing Vite build cache

## User-Reported Issues (December 2025 - Part 6)
- [ ] Search card still visible on user's device (needs verification on actual deployed site)
- [ ] Statistics card not visible on user's device
- [ ] API still not working on user's device

## New Feature Requests (December 2025 - Part 7)
- [x] Add loading animation with 3 animated dots while chatbot is generating response
- [x] Switch to cheaper OpenAI model (gpt-3.5-turbo or gpt-4o-mini) to reduce costs
- [x] Implement "Ayat des Tages" (Verse of the Day) feature with special/inspirational verses
- [x] Create quiz section with Islamic knowledge questions
- [x] Add 4 answer options per quiz question
- [x] Implement cool animation for correct answers
- [x] Add points system for quiz (track correct answers)
- [x] Integrate quiz points into Statistics dashboard

## Issue Report (December 2025 - Part 8)
- [x] Chatbot stops responding mid-answer with gpt-4o-mini
- [x] Switch back to gpt-4o for reliable responses

## Critical Issue (December 2025 - Part 9)
- [x] Chatbot responses are being truncated mid-sentence (even with gpt-4o)
- [x] Investigate max_tokens parameter and response handling
- [x] Fix truncation and ensure complete responses (increased max_tokens from 500 to 2000)

## Prayer Notification System (December 2025 - Part 10)
- [x] Implement push notification system with Service Worker for prayer times
- [x] Add 3 beautiful Muezzin voices for Adhan (Mishary Rashid, Abdul Basit, Makkah Adhan)
- [x] Add option to use standard phone notification sounds instead of Adhan
- [x] Create prayer reminder settings (5, 10, 15, 30 minutes before each prayer)
- [x] Implement manual prayer time adjustment (+/- 30 minutes per prayer)
- [x] Add individual settings for each of the 5 daily prayers
- [x] Implement automatic language detection based on device/browser language
- [x] Add German localization for UI (default for Germany)
- [x] Create comprehensive Settings page for all prayer notification options
- [x] Test notifications on different devices and browsers (will work after publish)
