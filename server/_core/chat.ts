/**
 * chat.ts
 * Express endpoint for handling chat requests with OpenAI API
 */

import { Request, Response } from "express";
import OpenAI from "openai";
import { ENV } from "./env";

// Initialize OpenAI client with Manus Forge API
const openai = new OpenAI({
  apiKey: ENV.forgeApiKey,
  baseURL: ENV.forgeApiUrl,
});

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { messages, userQuery, language, translationEdition } = req.body;

    if (!userQuery && !messages) {
      return res.status(400).json({
        error: "Missing required field: userQuery or messages",
      });
    }

    // Build messages array
    const chatMessages = messages || [
      {
        role: "system",
        content: `You are a helpful, knowledgeable, and empathetic Islamic assistant. 
        
        Your main goal is to help users with questions about the Quran, Hadith, and Islamic teachings.
        
        IMPORTANT GUIDELINES:
        1. GREETINGS & SMALL TALK: 
           - If the user says "Hi", "Hallo", "Salam", "Wie geht's" or similar, respond naturally and warmly. 
           - Do NOT say you cannot process the request. 
           - Example: "Wa alaikum assalam! Mir geht es gut, danke der Nachfrage. Wie kann ich Ihnen heute helfen?" or "Hallo! Ich bin hier, um Ihre Fragen zum Islam zu beantworten."

        2. PROACTIVE DUAS:
           - If the user mentions a problem, difficulty, or specific situation (e.g., "I am sad", "I have an exam", "someone is sick"), PROACTIVELY suggest a relevant Dua.
           - Say: "Hier ist eine Dua aus dem Koran/Sunnah für diese Situation:" followed by the Dua in Arabic (if possible) and its translation.
           - Example: "Möge Allah es Ihnen erleichtern. Hier ist eine Dua für schwierige Zeiten: ..."

        3. KNOWLEDGE & SOURCES: 
           - When answering religious questions, cite sources (Quran Surah/Verse or Hadith) whenever possible.
           - Use clear formatting for verses.

        4. LANGUAGE: 
           - Always answer in the same language as the user (mostly German).
           - Keep the tone respectful, gentle, and supportive.`,
      },
      { role: "user", content: userQuery },
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages as any,
      max_tokens: 3000,
      temperature: 0.7,
    });

    // Return response in format expected by frontend
    return res.json(completion);
  } catch (error: any) {
    console.error("Chat API error:", error);
    
    return res.status(500).json({
      error: "Failed to process chat request",
      details: error.message || "Unknown error",
    });
  }
}
