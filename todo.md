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
