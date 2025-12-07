# Vercel Architecture Documentation

## Why We Use Serverless Functions Only

This project is deployed on **Vercel**, which has specific architectural requirements:

### The Problem with Express Servers on Vercel

- Vercel does **NOT** support long-running Express servers like `server/_core/index.ts`
- Express servers are designed for traditional hosting (Railway, Render, AWS EC2, etc.)
- On Vercel, Express servers would timeout and fail

### The Solution: Vercel Serverless Functions

- Vercel uses **Serverless Functions** in the `/api` directory
- Each file in `/api` becomes an HTTP endpoint automatically
- Example: `/api/chat.ts` → `https://yourapp.vercel.app/api/chat`

## Current Architecture

### Chat Endpoint
- **File:** `/api/chat.ts`
- **Endpoint:** `POST /api/chat`
- **Purpose:** Handle OpenAI chat requests
- **Environment Variables:**
  - `OPENAI_API_KEY` (primary)
  - `BUILT_IN_FORGE_API_KEY` (fallback)

### TTS Endpoint
- **File:** `/api/tts.ts`
- **Endpoint:** `POST /api/tts`
- **Purpose:** Generate text-to-speech audio
- **Environment Variables:**
  - `OPENAI_API_KEY`

## Local Development

For local development, we still use the Express server (`server/_core/index.ts`) for:
- tRPC API routes
- OAuth authentication
- Speech-to-text
- Vite dev server

But the **chat endpoint** is handled by the Vercel function even in local development via Vite proxy.

## Important Notes

1. **Never add chat logic to `server/_core/`** - It won't work on Vercel
2. **Always use `/api/` directory** for new API endpoints
3. **Set environment variables on Vercel Dashboard** - Not in code
4. **Test on Vercel** - Local development may behave differently

## Deployment Checklist

Before deploying to Vercel:

- [ ] All API endpoints are in `/api/` directory
- [ ] Environment variables are set on Vercel Dashboard
- [ ] No Express routes duplicate Vercel functions
- [ ] Frontend uses `/api/` endpoints (not `/server/`)

## Why This Matters

**Previous Issue:** We had TWO chat endpoints:
- `server/_core/chat.ts` (Express) - Works locally, FAILS on Vercel
- `/api/chat.ts` (Serverless) - Works on Vercel

This caused confusion and recurring errors. Now we have **ONLY** the Vercel serverless function.
