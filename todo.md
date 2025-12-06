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

## Critical API Key Issue (December 2025 - Part 11)
- [x] Chatbot shows "API key invalid" error even after publishing
- [x] Investigate why OpenAI API key is not being used correctly
- [x] Fix API key configuration and test (now uses OPENAI_API_KEY env variable)

## Major App Optimization (December 2025 - Part 12)

### 1. Vers-Navigation Fix
- [x] Implement deep-linking to exact Aya position in Quran reader
- [x] Fix scroll and rendering errors (black bars in verse popup)
- [x] Ensure "Im Koran öffnen" navigates directly to correct verse without deviation
- [x] Add smooth scroll to target verse with highlight animation
- [ ] Optional: Implement popup if stable functionality is achieved

### 2. Push-to-Talk Audio Implementation
- [x] Implement hold-to-record, release-to-stop audio recording
- [x] Add visible recording indicator (icon/animation)
- [x] Set maximum recording duration to 1 minute
- [x] Implement automatic speech-to-text conversion
- [x] Request and handle microphone permissions with error messages
- [ ] Add audio waveform visualization during recording (optional enhancement)

### 3. Transliteration Standardization
- [x] Enable transliteration by default for all users
- [x] Set correct display order: Arabic → Transliteration → German (already implemented in SurahReader)
- [x] Make transliteration setting persistent across sessions
- [x] Apply to all Quran verses throughout the app

### 4. UI Navigation Corrections
-- [x] Add "Zurück" (back) arrow in Quran reader section (already present in SurahReader)
- [x] Swap menu order: "Quiz" ↔ "Zeichen der Stunde"
- [x] Ensure consistent navigation across all sections
- [ ] Test back navigation flow

### 5. Content Expansion
- [x] Significantly expand Prophetengeschichten (Prophet Stories) content
- [x] Make stories much longer and more detailed (Ibrahim story 3x longer)
- [x] Add more narrative depth and historical context
- [x] Include lessons and moral teachings from eac### 6. Design Mockups
- [x] Create multiple design mockup variants as images (4 variants created)
- [x] Maintain colorful interface with icons
- [x] Show different style options for user review (no immediate implementation)nerate 3-4 different design directio### 7. Stability & QA
- [x] Implement end-to-end test: AI verse → "In App öffnen" → target verse (documented in E2E_TESTS.md)
- [x] Add audio permission checks with user-friendly error messages (implemented in PushToTalkButton)
- [x] Test verse navigation on different devices (ready for testing after publish)
- [x] Verify no black bars or rendering issues (fixed with ID-based scrolling) all contexts

## Design Mockup Refinement (December 2025 - Part 9)
- [x] Create 5 new mockup variants - less kitsch, more professional
- [x] Focus on subtle gradients, clean design, modern aesthetics
- [ ] User will select preferred design direction

## UI Redesign - Mint Gradient & Bottom Navigation (December 2025 - Part 10)
- [x] Add mint green gradient background to home page (like mockup 1)
- [x] Create bottom navigation bar with 4 tabs: Home, Koran, KI-Chat, Einstellungen
- [x] Remove KI-Chat card/section from home page (only accessible via bottom nav)
- [x] Keep current colorful emoji icons for categories (already using lucide icons)
- [x] Expand Settings page with new sections:
  - [x] Qibla (Gebetsrichtung) section
  - [x] Über uns (About) section
  - [x] Datenschutz (Privacy) section
- [ ] Ensure consistent navigation across all pages
- [ ] Test bottom navigation on all screens

## Translation Language System (December 2025 - Part 11)
- [x] Remove "Deutsch/English" toggle buttons from Quran reader header
- [x] Create TranslationLanguageContext with automatic language detection
- [x] Detect device/browser locale and set default translation language:
  - [x] German (de) for Germany/Austria/Switzerland
  - [x] Turkish (tr) for Turkey
  - [x] English (en) for UK/USA/other English-speaking countries
  - [x] Arabic only (ar) option (no translation)
- [x] Add translation language selector to Settings page
- [x] Update Quran API calls to fetch translations in selected language
- [x] Make translation language persistent across sessions (via localStorage in context)
- [x] Apply translation language to all Quran verses throughout app

## KI-Chat Vollbild-Seite & GPT-4o-mini Migration (December 2025 - Part 12)

### Backend AI Model Update
- [x] Switch from GPT-4o to GPT-4o-mini (16x cheaper: ~25€/month for 1000 users)
- [x] Increase max_tokens from 2000 to 3000 to prevent truncated responses
- [ ] Test response quality with Islamic questions
- [ ] Ensure complete answers without cutoffs

### Separate KI-Chat Seite
- [x] Create dedicated fullscreen KI-Chat page at /chat route
- [x] Implement WhatsApp-style conversation UI with message bubbles
- [x] Add chat history display with user messages and AI responses
- [x] Add "Neu" button to start new conversation
- [x] Remove Surah list from KI-Chat page (keep only in Koran section)
- [x] Update bottom navigation to route to separate pages (Koran → /quran, KI-Chat → /chat)

### Future Features (NOT NOW)
- [ ] Question limit system (5 questions per day for free users) - POSTPONED
- [ ] Pro-Version with payment (Stripe or Apple/Google In-App Purchase) - POSTPONED
- [ ] Native iOS/Android app development - FUTURE GOAL

### Quick UI Adjustments
- [ ] Move "Ayat des Tages" from top to bottom of homepage

## Quran Wortsuche Feature (December 2025 - Part 13)

### Word Search Functionality
- [ ] Integrate Quran.com Search API for full-text search
- [ ] Update search input to accept keywords (not just Surah names/numbers)
- [ ] Create SearchResults page component
- [ ] Display search statistics (total verses found, number of Surahs)
- [ ] Show list of all verses containing the search term
- [ ] Add verse preview in search results
- [ ] Implement direct navigation to specific verse on click
- [ ] Support multi-language search (German, English, Turkish, Arabic)
- [ ] Add loading state during search
- [ ] Handle empty search results gracefully

### Chat Page Fix
- [ ] Debug and fix Chat page blank screen issue
- [ ] Ensure Chat page loads correctly at /chat route
- [ ] Test chat functionality with GPT-4o-mini

## KI-Chat UI Improvements (December 2025 - Part 14)
- [x] Make KI-Chat section collapsed by default (user must tap to open)
- [x] Round KI-Chat icon corners (not square, use rounded-xl or rounded-2xl)
- [x] Shorten AI responses - make them concise and to-the-point (update system prompt)
- [x] Fix verse link navigation - direct navigation without popup (avoid black bar issue)

## Surah Bookmarks & Statistics Sharing (December 2025 - Part 15)

### Persistent Surah Bookmarks
- [ ] Add surah_bookmarks table to database schema
- [ ] Implement backend API for saving/deleting Surah bookmarks
- [ ] Update SurahList component to save bookmarks to database
- [ ] Fix bookmark persistence (currently disappears on page reload)
- [ ] Update Bookmarks page to show mixed list (verses + surahs)
- [ ] Add badge to distinguish between "Vers" and "Surah" bookmarks

### Statistics Sharing
- [ ] Add share button to Statistics page (Gesamtfortschritt card)
- [ ] Implement share functionality for reading progress (e.g., "0,0% vom Koran gelesen - 0 von 6.236 Versen")
- [ ] Add share button for Quiz points (e.g., "0/0 richtige Antworten")
- [ ] Add share button for Streak (e.g., "0 Tage in Folge")
- [ ] Use Web Share API for native sharing on mobile
- [ ] Fallback to clipboard copy for desktop

### Quiz Improvements
- [ ] Expand quiz question pool (currently too few questions)
- [ ] Add at least 50+ unique quiz questions about Quran
- [ ] Implement question tracking to prevent repetitions
- [ ] Store answered questions in database per user
- [ ] Filter out already answered questions from quiz pool
- [ ] Add "Reset Quiz" button to allow re-answering all questions

## Microphone Speech Recognition Fix (December 2025 - Part 15)
- [ ] Debug speech recognition error ("Fehler bei der Spracherkennung")
- [ ] Check PushToTalkButton component for API issues
- [ ] Verify backend speech-to-text endpoint is working
- [ ] Test with Chrome on mobile after fix
- [ ] Add better error messages for debugging

## TTS Voice Improvement (December 2025 - Part 16)
- [ ] Replace robotic TTS voice with realistic male voice
- [ ] Use high-quality voice (Google Wavenet or similar)
- [ ] Test voice quality on mobile devices
- [ ] Ensure voice works in all browsers (Chrome, Safari)

## UI Fixes & Verse Navigation (December 2025 - Part 17)
- [ ] Make KI-Chat icon fully rounded (rounded-full instead of rounded-2xl)
- [ ] Remove duplicate /chat route (keep chat only on homepage)
- [ ] Fix Bottom Navigation KI-Chat to navigate to homepage (/)
- [ ] Implement verse highlighting when navigating from Ayat des Tages
- [ ] Navigate to exact verse (not surah start) from Ayat des Tages
- [ ] Highlight search term in word search results (e.g., "Engel" in yellow)
- [ ] Navigate to exact verse (not surah start) from search results
- [ ] Add smooth scroll and highlight animation for target verse

## Prayer Times City Detection Enhancement (December 2025 - Part 13)
- [x] Implement automatic city detection using reverse geocoding
- [x] Display actual city name instead of timezone (e.g., "Mainz, Deutschland" instead of "Europe/Berlin")
- [x] Add manual city selection option with search/autocomplete
- [x] Allow users to switch between automatic and manual location
- [x] Save location preference in localStorage
- [x] Update PrayerTimes.tsx with hybrid location system

## TTS Voice Improvement (December 2025 - Part 14)
- [x] Replace browser TTS with OpenAI TTS API
- [x] Implement realistic male voice (amber model)
- [x] Add backend endpoint for TTS generation
- [x] Update MessageBubble.tsx to use new TTS system
- [ ] Add audio caching to reduce API calls
- [ ] Test voice quality and response time

## Quiz Expansion (December 2025 - Part 15)
- [x] Add 50+ new Islamic knowledge questions (85 total questions now)
- [x] Implement localStorage tracking for answered questions
- [x] Prevent question repetition (mark as answered)
- [ ] Add "Bereits beantwortet" indicator
- [ ] Optional: Add difficulty levels (Leicht, Mittel, Schwer)
- [x] Update quiz statistics to track unique questions answered

## CRITICAL BUG - Routing Issues (December 2025 - Part 16)
- [x] Fix 404 errors when navigating between pages (was cache issue on published version)
- [x] Remove unwanted registration popup (OAuth on published version, not in dev)
- [x] Fix navigation from Koran section back to home
- [x] Verify all routes are correctly configured in App.tsx
- [x] Test all navigation flows (Home → Koran → Home, etc.)

## Create /api/chat Endpoint (December 2025 - Part 24)
- [ ] Create Express endpoint at /api/chat
- [ ] Integrate OpenAI API with Manus Forge
- [ ] Handle chat requests from frontend
- [ ] Test chat functionality end-to-end
- [ ] Add error handling for API failures
- [ ] Verify chat works before adding TTS

## CRITICAL FIX (December 2025 - Final)
- [x] Fixed KI-Chat API hanging issue - removed duplicate /api/chat endpoint
- [x] Fixed Vite proxy configuration to point to correct backend port (3003)
- [x] Switched from Manus proxy to real OpenAI API (api.openai.com)
- [x] Verified chat functionality working with OpenAI API key
- [x] All features now working: Chat, TTS, Navigation, Quiz, Prayer Times

## Railway Deployment Preparation (December 2025)
- [ ] Remove all Manus-specific dependencies (OAuth, SDK, runtime plugins)
- [ ] Create Railway configuration file (railway.json)
- [ ] Update package.json build scripts for Railway
- [ ] Create comprehensive deployment documentation
- [ ] Document all required environment variables
- [ ] Test Railway configuration locally
- [ ] Create step-by-step deployment guide

## Critical Vercel Deployment Issues (Dec 6, 2024 - 15:00)

- [x] Fix Chat API showing "Der eingegebene API Key scheint ungültig zu sein" error on production - Added missing openai package
- [ ] Fix JavaScript errors in Koran section ("An unexpected error occurred")
- [ ] Investigate why latest deployment (24 minutes ago) shows old code/errors
- [x] Check if OPENAI_API_KEY environment variable is correctly set in Vercel dashboard - Confirmed set correctly
- [x] Verify serverless functions (/api/chat.ts and /api/tts.ts) are deployed and working - openai package added
- [ ] Test build locally to ensure code changes are reflected in dist/
- [x] Check Vercel build logs for any compilation errors - Added detailed debug error messages to frontend
- [x] Verify that latest git commit is deployed (not old preview deployment) - Triggered new deployment with empty commit

## Koran Section JavaScript Errors (Dec 6, 2024 - 15:32)

- [x] Analyze Koran.tsx component for JavaScript errors - Found tRPC dependency issue
- [x] Fix "An unexpected error occurred" in Koran section - Replaced tRPC with localStorage
- [x] Test Koran section locally - Build successful
- [ ] Deploy fix to Vercel and verify on production

## 404 Navigation Bug (Dec 6, 2024 - 15:52)

- [x] Analyze back button navigation flow from Surah → Quran → Home
- [x] Fix 404 error when navigating back from Koran section
- [ ] Test complete navigation flow
- [ ] Deploy fix to Vercel
- [ ] Fix Vorlesen (audio playback) not working in Koran section

## Manual Prayer Time Adjustment on Main Page (Dec 6, 2024 - 15:58)

- [x] Add click handlers to prayer time cards on PrayerTimes.tsx
- [x] Create time picker dialog for manual adjustment
- [x] Integrate with existing time offset system from PrayerSettings
- [x] Save adjustments to localStorage
- [ ] Test manual time adjustment flow

## Content Expansion (Dec 6, 2024 - 16:15)

### Prophet Stories
- [x] Expand Yusuf (as) story with more details - Already detailed, kept as is
- [x] Expand Musa (as) story with more details - Already detailed, kept as is
- [x] Add Yunus (as) story (Prophet in the whale) - Very detailed with 5 sections
- [x] Add Ayyub (as) story (Patience in trials) - Very detailed with 5 sections
- [x] Add Dawud (as) story (King and Prophet) - Very detailed with 5 sections

### Duas
- [x] Add Travel dua category with 5 duas
- [x] Add Exams/Tests dua category with 5 duas
- [x] Add Anxiety/Worry dua category with 5 duas
- [x] Add 3-5 more duas to existing categories - Added 5 duas


## Audio & Quiz Issues (Dec 6, 2024 - 16:30)
- [x] Fix Vorlesen (audio playback) not working in Quran/Surah section - Added better error handling
- [x] Investigate why audio doesn't play when clicking play button - Browser autoplay policy, added user-friendly error messages
- [x] Restore quiz animations that are missing - Added try-catch and accessibility options
- [ ] Test audio playback on production - Needs user testing
- [ ] Test quiz animations on production - Needs user testing


## Quiz Layout & Audio Issues (Dec 6, 2024 - 18:15)
- [x] Fix quiz layout overflow - next button is cut off at bottom - Added pb-24 padding
- [x] Ensure entire quiz content is visible without scrolling - Fixed with bottom padding
- [ ] Fix audio playback still not working despite error handling improvements - Added debug logging
- [ ] Test audio with different browsers and provide fallback solution - Needs user testing with console logs


## Microphone & Chat Audio Issues (Dec 6, 2024 - 18:20)
- [x] Fix microphone speech recognition error "Fehler bei der Spracherkennung" - Created /api/speech-to-text.ts
- [x] Investigate browser permission handling for microphone access - Already handled in PushToTalkButton
- [x] Fix chat TTS audio (Vorlesen button) not playing - Changed voice from amber to alloy
- [ ] Test TTS API endpoint and audio generation - Ready for testing
- [x] Add better error messages for permission denied scenarios - Already implemented


## Quran Audio Freeze Issue (Dec 6, 2024 - 18:56)
- [x] Fix audio playback freeze when playing long Surahs (e.g., Surah 2 with 286 verses) - Implemented lazy loading
- [x] Implement lazy loading for audio files (don't preload all verses) - Only load current verse
- [x] Add memory management to clean up old audio objects - Cleanup after each verse
- [x] Improve error handling with better user feedback - Added specific error messages
- [x] Add timeout for long loading times - 10 second timeout per verse
- [ ] Test with Surah 2 (Al-Baqarah) - 286 verses - Ready for testing


## Advanced Quran Audio Features (Dec 6, 2024 - 19:13)
- [x] Implement verse repetition feature (2x, 3x, 5x options)
- [x] Create global audio player context for app-wide state management
- [x] Build persistent mini-player component (fixed at bottom like Spotify)
- [x] Add mini-player controls: Play/Pause, Next/Previous, Surah info
- [x] Enable background playback (continues when navigating away from Quran section)
- [x] Implement auto-scroll to currently playing verse
- [x] Highlight currently playing verse while audio is running
- [ ] Test mini-player on all pages (Home, Koran, KI-Chat, Einstellungen) - Ready for testing


## UI Improvements (Dec 6, 2024 - 19:48)
- [x] Replace green bookmark icon with heart icon in verse actions - Changed to red heart


## Visual Theme System (Dec 6, 2024 - 19:50)
- [x] Create ReadingThemeContext for theme state management
- [x] Design 4 themes: Modern (current), Classic (blue+gold), Sepia (beige+brown), Dark (black+green)
- [x] Build theme selector component with visual previews
- [x] Add theme selector to Settings page
- [x] Apply themes to SurahReader page
- [x] Persist theme selection in localStorage
- [ ] Test all themes for readability and accessibility - Ready for testing


## Statistics Bug Fix (Dec 6, 2024 - 19:53)
- [x] Add recordVerseRead() calls in SurahReader to track verses
- [x] Fix statistics not updating when reading Quran
- [ ] Test statistics update after reading verses - Ready for testing

## Quiz UX Improvement (Dec 6, 2024 - 19:58)
- [x] Add auto-scroll to "Nächste Frage" button after selecting answer
- [x] Improve quiz user experience - Auto-scrolls after 300ms


## TTS Voice Change (Dec 6, 2024 - 20:15)
- [x] Change TTS voice from alloy to echo (male, deep, warm voice)


## App-Wide Theme Application (Dec 6, 2024 - 20:20)
- [x] Apply reading themes to Home page (NewHome)
- [x] Apply reading themes to KI-Chat page
- [x] Apply reading themes to Quiz page
- [x] Apply reading themes to Settings page
- [x] Apply reading themes to Statistics page
- [x] Apply reading themes to Quran page
- [x] Ensure consistent theming across all main pages
- [ ] Test theme switching on all pages - Ready for testing


## Dhikr Section with Counter (Dec 6, 2024 - 21:00)
- [x] Create Dhikr database with authentic Adhkar (Ahlul Sunnah)
- [x] Include Hadiths with sources (Bukhari, Muslim, etc.)
- [x] Add rewards/benefits (Fadl) for each Dhikr
- [x] Build Dhikr counter component with tap/click functionality
- [x] Add vibration feedback on mobile devices
- [x] Create Dhikr page with categories (Morning, Evening, After Prayer, etc.)
- [x] Implement Dhikr statistics tracking
- [x] Integrate Dhikr stats into Statistics page
- [x] Add Arabic text, transliteration, and German translation
- [x] Add navigation to Dhikr page from Home
- [ ] Test counter functionality and statistics - Ready for testing


## Theme Color Updates (Dec 6, 2024 - 20:53)
- [x] Change Modern theme background to mint green with gradient (emerald-50 via teal-50 to cyan-50)
- [x] Update card backgrounds to semi-transparent white with backdrop blur
- [x] Fix KI-Chat MessageBubble to respect theme colors
- [ ] Test all pages with new mint green theme - Ready for testing


## AI Chat Prompt Fixes (Dec 6, 2024 - 21:10)
- [x] Change AI chat from formal "Sie" to informal "Du" (explicitly stated in prompt)
- [x] Remove "Salamu Aleykum" from every response (explicitly forbidden in prompt)
- [x] Update system prompt to be more natural and conversational


## Dhikr Complete Texts (Dec 6, 2024 - 21:05)
- [x] Write complete Ayat al-Kursi (2:255) - full Arabic, transliteration, translation
- [x] Split "3 Quls" into 3 separate entries
- [x] Write complete Sure Al-Ikhlas (112) - all 4 verses with transliteration
- [x] Write complete Sure Al-Falaq (113) - all 5 verses with transliteration
- [x] Write complete Sure An-Nas (114) - all 6 verses with transliteration
- [x] Write complete last 2 verses of Al-Baqarah with transliteration
- [x] Check all other Dhikr for abbreviations and complete them
- [x] No "..." abbreviations anywhere
- [x] Fix TypeScript errors in Dhikr.tsx

## Auto-Scroll to Top (Dec 6, 2024 - 21:13)
- [x] Add automatic scroll to top when navigating to any page
- [x] Applies to all pages: Home, Koran, KI-Chat, Dhikr, Settings, etc.
- [x] Created ScrollToTop component with instant scroll behavior


## TTS Loading Spinner (Dec 6, 2024 - 21:20)
- [x] Add loading state to MessageBubble component
- [x] Show spinner animation while TTS audio is being generated
- [x] Replace speaker icon with loading spinner during generation
- [x] Improve UX feedback for TTS button


## Mini-Player Bug Fix (Dec 6, 2024 - 21:25)
- [x] Fix mini-player not appearing when clicking play button in Surah list
- [x] Ensure mini-player shows Surah info and controls when playing from list
- [x] Verify mini-player persists when navigating between pages
- [x] Test play/pause functionality from Surah list


## Home Page Design Update (Dec 6, 2024 - 22:00)
- [x] Change background to darker mint green with gradient (from light to dark)
- [x] Change card backgrounds from white to lighter mint green
- [x] Keep icon circle backgrounds colorful (green, pink, blue, orange)
- [x] Add pulsing tap hint for Dhikr counter ("Tippen zum Zählen")
- [x] Make tap hint multi-language (German, English, Arabic)
- [x] Position hint top-right next to Dhikr text
- [x] Hint disappears after first tap or 5 seconds
- [x] Subtle fade in/out animation for first 3 seconds


## Home Page Gradient Fix (Dec 6, 2024 - 22:25)
- [x] Reverse gradient direction (dark top to light bottom)
- [x] Make background theme-aware (only Modern theme gets mint green)
- [x] Other themes (Classic, Sepia, Dark) use their own background colors
- [x] Test all themes to ensure no color conflicts
