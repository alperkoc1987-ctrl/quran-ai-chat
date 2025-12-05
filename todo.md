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
