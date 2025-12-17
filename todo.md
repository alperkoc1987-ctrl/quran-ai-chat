# Project TODO

## Current Priority Tasks (December 2025)
- [x] Rename "Statistiken" to "Fortschritt" throughout the app
- [x] Change Statistics icon from TrendingUp to BarChart (📊)
- [x] Remove "Zeichen der Stunde" section completely
- [x] Update navigation and routing after removal
- [ ] Test changes on live site
- [x] Commit and push to GitHub

## Multi-Language Support (Next Priority)
- [ ] Create i18n translation system with language context
- [ ] Implement automatic language detection based on device language
- [ ] Create translation files for German, English, Turkish, and Arabic
- [ ] Translate all UI texts (buttons, labels, menus, navigation)
- [ ] Add language selector to Settings page (4 languages with flags)
- [ ] Implement instant language switching without app restart
- [ ] Store language preference in localStorage
- [ ] Test all 4 languages thoroughly
- [ ] Commit and push changes to GitHub

## Previous Completed Features
- [x] Fixed KI-Chat API Error 500 by updating OpenAI API key and fixing vite.config.ts proxy
- [x] Removed overly strict validation that blocked chat requests
- [x] Classic theme as default with teal/green accents (no more yellow/gold)
- [x] Gemini 2.5 Flash AI model (50% cost savings)
- [x] Conversation history in KI-Chat
- [x] Dhikr counter with scrollable overlay
- [x] Ayat des Tages with verse navigation
- [x] Quiz system with 85 questions
- [x] Prayer notification system
- [x] Bottom Navigation: Home | Koran | Duas | Dhikr | Einstellungen

## Dhikr Counter Modal Fix (December 2025)
- [x] Fix bottom padding in Dhikr counter modal to prevent bottom navigation overlap
- [x] Ensure counter area ("0 von 1") is always visible
- [ ] Test on mobile devices
- [ ] Commit and push to GitHub

## Theme Color Fixes (December 2025)
- [x] Apply Classic theme colors to Duas page (dark blue background)
- [x] Apply Classic theme colors to Quiz page (dark blue background)
- [x] Keep light theme unchanged (white/light gray backgrounds)
- [x] Verify text readability in all pages (white/light text on dark backgrounds)
- [ ] Test both Classic and light themes
- [ ] Commit and push to GitHub

## Intelligent KI-Chat with Function Calling (December 2025)
- [x] Design function calling system architecture
- [x] Create prayer times helper functions (get current prayer times, calculate time until next prayer)
- [x] Create statistics helper functions (reading progress, quiz stats, dhikr stats)
- [x] Update chat API endpoint to support OpenAI function calling
- [x] Add function definitions for prayer times queries
- [x] Add function definitions for statistics queries
- [ ] Test prayer time questions ("Wann ist Dhuhr?", "Wie lange noch bis zum nächsten Gebet?")
- [ ] Test statistics questions ("Zeig mir meinen Fortschritt")
- [ ] Ensure natural language understanding works
- [ ] Commit and push to GitHub

## Dhikr Header Title Fix (December 2025)
- [x] Update Dhikr counter page header to show short title (e.g., "Ayat al-Kursi") instead of full Arabic text
- [x] Ensure full Arabic text is still visible in the counter view below
- [ ] Test with long Dhikr texts (Ayat al-Kursi, morning/evening Adhkar)
- [ ] Commit and push to GitHub

## Quiz Auto-Scroll Fix (December 2025)
- [x] Add automatic scroll to top when clicking "Nächste Frage" button
- [x] Ensure smooth scroll behavior for better UX
- [ ] Test on mobile devices
- [ ] Commit and push to GitHub

## Dhikr Transliteration Display Fix (December 2025)
- [ ] Fix transliteration text truncation in DhikrCounter component
- [ ] Ensure full transliteration text is visible (scrollable or multi-line)
- [ ] Test with long texts like Ayat al-Kursi
- [ ] Commit and push to GitHub

## Dhikr Transliteration Display Fix (December 2025)
- [x] Remove height restriction on transliteration text in DhikrCounter
- [x] Allow full transliteration text to display across multiple lines
- [ ] Test with long texts like Ayat al-Kursi
- [ ] Commit and push to GitHub

## Verse Navigation Fix (December 2025)
- [x] Fix Ayat des Tages "Vers lesen" to jump to specific verse (not surah start)
- [x] Fix KI-Chat verse references to jump to specific verse
- [x] Add verse highlighting when navigating from external links
- [ ] Test with various verses (e.g., Al-Hujurat 49:13)
- [ ] Commit and push to GitHub

## Dhikr Header Overflow & Toast Readability Fix (December 2025)
- [x] Add shortName to all long Dhikr entries (Shahada, long Duas)
- [x] Fix toast notification colors for better readability (dark text on light bg or vice versa)
- [ ] Test with various Dhikr texts
- [ ] Commit and push to GitHub

## Dhikr Title Display Fix (December 2025)
- [x] Add title field to Dhikr interface
- [x] Add titles to morning, evening, after prayer, before sleep Dhikr entries
- [x] Add titles to remaining Dhikr entries (after wudu, general)
- [ ] Update Dhikr list to display title instead of long arabic text
- [x] Update Dhikr.tsx header to use title field
- [ ] Test all Dhikr entries (morning, evening, after prayer, before sleep)
- [ ] Commit and push to GitHub

## Prayer Times Chat Function Fix (December 2025)
- [x] Find correct localStorage key for prayer times
- [x] Update PrayerTimes.tsx to save times to localStorage
- [ ] Test KI chat with prayer times questions
- [ ] Commit and push to GitHub

## Background Audio Playback (December 2025)
- [x] Implement Media Session API for background playback
- [x] Add lock screen controls (Play/Pause/Skip/Previous/Next)
- [x] Display Surah name and progress in notification
- [ ] Test on iOS Safari and Android Chrome
- [ ] Commit and push to GitHub

## UX Improvements - December 7, 2025 (Evening)
- [x] Make toast notifications more visible (larger font, better contrast, top-center position)
- [x] Add PWA manifest for "Add to Home Screen" functionality
- [x] Verify service worker is registered (already implemented)
- [x] Generate app icons (192x192 and 512x512)
- [x] Add PWA meta tags to HTML (theme-color, apple-mobile-web-app-capable)
- [ ] Test PWA installation on mobile devices (user testing required)
- [ ] Test background audio playback when app is in background (user testing required)
- [ ] Commit and push to GitHub

## Toast Position Fix - December 7, 2025
- [x] Change toast position from top-center to bottom-center
- [x] Ensure toast doesn't overlap with bottom navigation
- [x] Fix missing Dua category icons (Kinder, Hingabe, Führung)
- [x] Fix audio auto-play - continues to next verse automatically (preloading system)
- [ ] Test continuous playback in background (PWA) - user testing required
- [ ] Test toast visibility on mobile - user testing required
- [ ] Commit and push to GitHub

## Settings & Qibla UX Improvements - December 7, 2025 (Evening)
- [x] Fix Settings page text contrast (titles too dark, hard to read)
- [x] Improve Settings section headings visibility (all white text)
- [x] Modernize Qibla page design (darker background, elegant compass)
- [x] Add compass activation button for iOS permission request
- [x] Redesign compass with teal accents and modern dark theme
- [ ] Test compass functionality on iOS Chrome/Safari (user testing required)
- [ ] Commit and push to GitHub

## Qibla & Audio Player Improvements - December 7, 2025 (Late Evening)
- [x] Replace green dot with Kaaba icon in Qibla compass
- [x] Add compass smoothing algorithm to prevent erratic movement
- [x] Create halftransparent audio player overlay with Surah info when playing
- [x] Add prayer times widget to home page
- [x] Update widget colors to match app design (dark blue bg, orange time)
- [x] Add vibration feedback to prayer notifications
- [x] Create widget customization settings (show/hide widgets)
- [ ] Test all changes on mobile
- [ ] Commit and push to GitHub

## Bug Fixes - December 7, 2025 (Late Evening)
- [x] Fix PrayerTimesWidget crash when returning to home page
- [x] Add proper error handling and loading states to widget
- [ ] Test navigation flow: Home → Prayer Times → Back → Home (user testing required)
- [ ] Commit and push to GitHub

## Widget Removal & Geolocation Fix - December 7, 2025 (Late Evening)
- [x] Remove PrayerTimesWidget from home page (not working correctly)
- [x] Remove widget customization settings from Settings page
- [ ] Fix geolocation permission handling for Qibla and Prayer Times
- [ ] Test geolocation on mobile devices
- [ ] Commit and push to GitHub

## Rate Limiting for AI Chat - December 7, 2025 (Night)
- [ ] Create database schema for chat rate limiting (daily + per-minute counters)
- [ ] Add migration for rate_limits table
- [ ] Implement rate limiting middleware (10 msgs/day, 5 msgs/minute)
- [ ] Add rate limit check in chat API endpoint
- [x] Display remaining messages in chat UI
- [ ] Show friendly error message when limit reached
- [ ] Test rate limiting with multiple messages
- [ ] Write vitest tests for rate limiting logic
- [ ] Commit and push to GitHub

## Qibla & Audio Player Bug Fixes - December 7, 2025 (Night)
- [x] Fix Qibla direction calculation (showing wrong direction)
- [x] Debug compass rotation logic (arrow vs compass ring)
- [x] Make audio player overlay auto-dismiss after 2 seconds
- [x] Ensure audio continues playing when overlay disappears
- [x] Change chat greeting from "Sie" to "Du" (informal)
- [x] Add Islamic greeting "As-salamu alaikum" to welcome message
- [ ] Test Qibla accuracy with known direction (user testing required)
- [ ] Test audio player overlay behavior (user testing required)
- [ ] Commit and push to GitHub

# Cost Optimization & Rate Limiting

- [x] Remove TTS functionality completely (too expensive)
- [x] Remove speaker icons from MessageBubble component
- [x] Remove TTS API endpoint (/api/tts)
- [x] Remove TTS-related imports and functions
- [x] Implement rate limiting system (10 messages/day, 5/minute)
- [x] Create rate limiting database helper functions
- [x] Add rate limit tracking to chat API endpoint
- [x] Display remaining messages in chat UI
- [x] Show friendly error when rate limit reached

# Prayer Times Page Redesign

- [x] Redesign prayer times page with modern card layout
- [x] Add icons for each prayer (Fajr, Dhuhr, Asr, Maghrib, Isha)
- [x] Highlight current prayer with special styling
- [x] Add countdown timer showing time until next prayer
- [x] Apply Classic theme colors (dark blue with teal accents)
- [x] Show prayer names in German with Arabic names
- [x] Add visual indicators for past/current/upcoming prayers

# Audio Player & Reading Time Fixes

- [x] Remove per-verse audio player popups
- [x] Create single subtle audio indicator at top of page
- [x] Show "Surah wird abgespielt" message instead of per-verse indicators
- [x] Fix reading time tracking (currently shows "0m")
- [x] Ensure minutes are correctly calculated and displayed
- [x] Test reading time tracking with actual reading sessions

# Qibla Compass Fix

- [x] Fix compass: Arrow should rotate, not Kaaba
- [x] Arrow always points north (rotates with device)
- [x] Kaaba stays fixed at Qibla direction

# Prayer Time Adjustment Feature

- [x] Add settings/edit button for each prayer time
- [x] Create time adjustment dialog (±5, ±10, ±15, ±30 minutes)
- [x] Store adjustments in localStorage per prayer
- [x] Apply adjustments to displayed prayer times
- [x] Show indicator when time is adjusted (e.g., "+10 min")
- [x] Reset option to restore original times

# Bug Fixes - Loading Issues

- [ ] Debug prayer times infinite loading
- [ ] Debug Qibla infinite loading
- [ ] Check geolocation API errors
- [ ] Check prayer times API endpoint
- [ ] Add error handling and user feedback

# Location Permission Fix - December 8, 2025

- [x] Fix: Don't auto-request geolocation on page load
- [x] Wait for user to click "Automatisch" button before requesting location
- [x] Save lat/lon to localStorage for future visits
- [x] Show proper error messages when permission denied
- [x] Qibla page already works correctly (no auto-load)
- [ ] Test on Vercel deployment

# Critical Bug Fixes - December 8, 2025 (Early Morning)

- [x] Fix Chat API Error 500 (Debug message showing)
- [x] Fix audio player: Should stay at top, not popup at every verse
- [x] Fix prayer times adjustment dialog: Text colors too dark (unreadable)
- [x] Fix Qibla: Add glow/highlight when aligned with Qibla direction
- [x] Redesign Qibla compass to match reference design:
  - [x] Kaaba icon stays centered/straight (not rotating)
  - [x] Compass needle/arrow rotates (shows device orientation)
  - [x] Add star/sun icon at top of compass ring (north indicator)
  - [x] Match teal color scheme from reference

# Qibla Compass Redesign - December 8, 2025 (Morning)

- [ ] Restore old Qibla compass design (white needle, dark background)
- [ ] Kaaba icon positioned at edge of compass (rotates to show Qibla direction)
- [ ] Make Kaaba icon larger and more visible
- [ ] White compass needle rotates with device (always points north)
- [ ] Add green glow effect around compass ring when aligned with Qibla (±5 degrees)
- [ ] Add vibration feedback when aligned with Qibla
- [ ] Show "Sie sind zur Qibla ausgerichtet" text when aligned
- [ ] Test alignment detection accuracy

# Critical Bug Fixes - December 8, 2025 (Morning) - Round 2

- [x] Fix prayer times dialog button text colors (gray on white → white on dark)
- [x] Fix KI-Chat API error ("momentan nicht verfügbar")
- [x] Validate OpenAI API key in backend
- [x] Restore old Qibla compass design (white needle, Kaaba at edge)
- [x] Add green glow effect when aligned with Qibla
- [x] Add vibration feedback when aligned
- [ ] Test all fixes on Vercel deployment

# Critical Bugs - December 8, 2025 (Morning) - Round 3

- [x] Fix prayer times dialog buttons - changed to white text on dark background (bg-slate-700/50)
- [x] Fix Qibla compass - Kaaba now FIXED at Qibla direction, only needle rotates with device
- [x] Fix Qibla compass alignment detection - green glow when needle points to Kaaba
- [x] Switch KI-Chat from OpenAI to Google Gemini (user needs to add API key)
- [ ] Test all fixes in local browser before deployment

# New Feature - Verse Audio Player - December 8, 2025

- [x] Add play button icon to each verse card (next to heart/bookmark/share icons)
- [x] Create repeat count selector dialog (1x, 2x, 3x, 5x, 7x, 10x)
- [x] Implement single verse playback (not entire Surah)
- [x] Add repeat functionality - play verse N times before stopping
- [x] Show playing indicator on active verse with count (e.g., "2/5")
- [x] Add repeat count button in header ("Wiederholung: 1x")
- [ ] Test with different repeat counts

# Switch to Google Gemini API - December 8, 2025

- [x] Replace OpenAI with Google Gemini in chat backend
- [x] Update chat.ts to use @google/generative-ai SDK
- [x] Install @google/generative-ai package
- [x] Convert OpenAI message format to Gemini format
- [x] Use Gemini 2.0 Flash Exp model (fast & cheap)
- [x] Update error handling for Gemini API
- [ ] User needs to add GEMINI_API_KEY via webdev_request_secrets
- [ ] Test chat with Gemini after API key is added

# URGENT FIXES - December 8, 2025 (07:00)

- [ ] Prayer times dialog: "Aktuelle Zeit" label is gray - make it white
- [ ] Prayer times dialog: All button texts still gray - make them white
- [ ] Qibla compass: Kaaba is at wrong position - should be fixed at Qibla direction (not rotating)
- [ ] Qibla compass: No green highlight when aligned - fix alignment detection
- [ ] Test all fixes in LOCAL browser before pushing to Vercel
- [ ] Clear Vercel cache and force redeploy

# Qibla Compass Bugs - December 8, 2025 (07:18)

- [ ] Green highlight not showing when aligned with Qibla
- [ ] Needle rotates 360° quickly when pointing to Kaaba (0°/360° jump issue)
- [ ] Fix rotation smoothing to prevent jumps at 0° boundary

# CRITICAL BUG - Qibla Compass - December 8, 2025 (07:24)

- [ ] Needle points to NORTH instead of QIBLA
- [ ] When device faces Qibla, needle should point UP (to Kaaba)
- [ ] Currently: green glow works, but needle points wrong direction
- [ ] Fix: Needle rotation should be relative to Qibla, not north

# CRITICAL BUG - Qibla Calculation Wrong - December 8, 2025 (11:11)

- [x] Qibla direction calculation was WRONG (magnetic vs true north)
- [x] Compared with other Quran app - found magnetic declination issue
- [x] Added geomagnetism library for magnetic declination correction
- [x] Applied correction: correctedHeading = smoothedHeading + magneticDeclination
- [x] Needle now points correctly when device faces Qibla

# Qibla Compass Fix - December 8, 2025 (12:45)

- [x] Fixed needle rotation direction (inverted formula: correctedHeading - qiblaDirection)
- [x] Fixed alignment detection to match new rotation
- [x] Improved smoothing algorithm
- [x] Added debug logging
- [ ] Test on Vercel deployment (user testing required)
- [ ] Remove debug logs after confirmation
- [ ] Commit and push to GitHub

# URGENT - Visual Debug Panel (December 8, 2025 - 13:00)

- [ ] Add on-screen debug panel showing all compass values
- [ ] Display: Position, Qibla Direction, Raw Heading, Corrected Heading, Needle Rotation
- [ ] Make it visible on mobile devices
- [ ] Get screenshot from user to diagnose the actual problem

# URGENT - Needle Rotation Fix (December 8, 2025 - 13:05)

- [ ] Negate needle rotation formula: -(correctedHeading - qiblaDirection)
- [ ] Test that needle points UP when aligned with Qibla
- [ ] Remove debug panel after testing

# URGENT - Revert Compass Logic (December 8, 2025 - 13:15)

- [ ] Make Kaaba icon rotate with compass (like old design)
- [ ] Make needle fixed pointing up
- [ ] Remove debug panel
- [ ] Test that Kaaba points to Qibla direction

# Cleanup and Checkpoint (December 8, 2025 - 13:25)

- [x] Remove debug panel from Qibla page
- [x] Save checkpoint with working compass

# Text Readability Fixes (December 8, 2025 - 13:58)

- [x] Fix "Aktuelle Zeit" text color in prayer time adjustment dialog (gray on white → dark)
- [x] Fix "Erlauben Sie den Standortzugriff..." text color on Prayer Times page (gray on white → dark)
- [x] Fix toast notifications transparency - make background opaque to prevent text overlap
- [ ] Test all changes on mobile

# Favorites Tabs Feature (December 8, 2025 - 14:05)

- [x] Add tabs in Quran section: "Alle" | "Favoriten"
- [x] Filter surah list based on selected tab
- [x] Show only favorited surahs when "Favoriten" tab is active
- [x] Style tabs with teal color scheme
- [ ] Test favorites functionality
- [x] Save checkpoint

# Quiz Fixes (December 8, 2025 - 14:32)

- [x] Change "Azrail" to "Malak al-Maut" in quiz question (authentic Islamic terminology)
- [x] Auto-scroll already implemented (line 90 in Quiz.tsx)
- [x] Test quiz navigation
- [x] Save checkpoint

# Reading Time Tracking Fix (December 8, 2025 - 14:35)

- [x] Debug reading time tracking (shows 0m despite reading 270 verses)
- [x] Fix formatTime() function to show seconds when under 1 minute
- [x] Test reading time tracking
- [x] Save checkpoint with both quiz and reading time fixes

# Chat Not Working (December 8, 2025 - 18:49)

- [ ] Debug why chat shows "KI-Chat ist momentan nicht verfügbar"
- [ ] Check if GEMINI_API_KEY is properly set in production environment
- [ ] Test chat endpoint locally with provided API key
- [ ] Fix any configuration issues
- [ ] Deploy and verify with user

## AI Model Update - Gemini 2.0 Flash (December 2025)
- [x] Update AI model from gemini-1.5-flash to gemini-2.0-flash-exp (free tier for testing)
- [x] Test AI chat functionality with new model
- [x] Verify chat responses are working correctly
- [x] Fixed frontend greeting filter to properly exclude initial greeting
- [x] Fixed backend history logic to ensure proper user-model alternation

## Vercel API Fix - Use Gemini instead of OpenAI
- [x] Rewrite /api/chat.ts to use Gemini 2.0 Flash
- [x] Remove database dependency from Vercel function
- [x] Test Vercel deployment
- [x] Verify chat works on live site

- [x] Change Ayat des Tages button from "Vers lesen" to "Zur Surah" (simpler, more reliable)

- [ ] Implement offline functionality with service worker caching
- [ ] Cache Quran API responses for offline reading
- [ ] Cache static assets (CSS, JS, images)
- [ ] Show offline indicator when no internet connection
- [ ] Test offline mode by disabling network

- [x] Create prayer times countdown widget for home page
- [x] Show "X Minuten bis [Nächstes Gebet]" with real-time countdown
- [x] Widget only appears when prayer times are configured
- [x] Click on widget navigates to prayer times page
- [x] Add toggle in Widget-Anpassung settings

- [x] Fix prayer times widget to read correct localStorage format
- [x] Widget not displaying despite prayer times being configured
- [x] Fix city name to show actual city instead of "Europe/Berlin"

- [x] Implement dynamic city name detection using reverse geocoding
- [x] Support any location worldwide, not hardcoded cities
- [x] Use Nominatim + geocode.maps.co as fallback for reliability

- [x] Swap order: Prayer times widget first, then KI-Assistent


## Full UI Translation - December 16, 2025
- [x] Audit current translation coverage across all pages
- [x] Add missing translations to LanguageContext dictionaries (Settings page)
- [x] Update Settings page with full translations
- [x] Update Quran page with full translations
- [x] Update Dhikr page with full translations
- [ ] Update Duas page with full translations
- [ ] Update Prayer Times page with full translations
- [ ] Update Qibla page with full translations
- [ ] Update Quiz page with full translations
- [ ] Update Statistics/Fortschritt page with full translations
- [ ] Update Prophet Stories page with full translations
- [ ] Update Bookmarks page with full translations
- [ ] Update KI-Chat page with full translations
- [ ] Test all pages in all 4 languages

## Dhikr Translation Fix - December 17, 2025
- [x] Identify all hardcoded German strings in Dhikr components
- [x] Add missing translation keys to LanguageContext (de/en/tr/ar)
- [x] Replace all hardcoded strings with t() function
- [x] Verify TypeScript check passes
- [x] Test all 4 languages in Dhikr overview and detail view
- [x] Save checkpoint and push to GitHub

## Dhikr Data Multilingual - December 17, 2025
- [x] Update adhkar.ts data structure (translation, reward, hadith, source → de/en/tr/ar)
- [x] Update DhikrCounter to use language-specific data
- [x] Update Dhikr.tsx to use language-specific data
- [x] TypeScript check and verify all 4 languages
- [x] Commit and push to GitHub
