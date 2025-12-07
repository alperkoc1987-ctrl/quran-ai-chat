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
