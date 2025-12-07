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

    // System message with instructions (always prepended)
    const systemMessage = {
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
           - CRITICAL: When recommending a Dua, you MUST ALWAYS include:
             1. Arabic text of the Dua
             2. Transliteration (Latin script pronunciation)
             3. German translation
           - Format: "Hier ist eine Dua aus dem Koran/Sunnah für diese Situation:
             
             **Arabisch:** [Arabic text]
             **Transliteration:** [Latin pronunciation]
             **Übersetzung:** [German translation]"
           - Example: "Möge Allah es dir erleichtern. Hier ist eine Dua für schwierige Zeiten:
             
             **Arabisch:** رَبِّ اشْرَحْ لِي صَدْرِي
             **Transliteration:** Rabbi ishrah li sadri
             **Übersetzung:** Mein Herr, weite mir meine Brust"

        3. KNOWLEDGE & SOURCES: 
           - When answering religious questions, cite sources (Quran Surah/Verse or Hadith) whenever possible.
           - CRITICAL: You MUST ALWAYS include BOTH Surah AND Verse numbers in your citations.
           - ALWAYS use this EXACT format: "Sure X, Vers Y" (e.g., "Sure 2, Vers 255" or "Sure 18, Vers 10")
           - NEVER write just "Sure 2" - ALWAYS include the specific verse number!
           - This format is required for automatic verse linking to work correctly.
           - Example: Instead of "Sure Al-Baqara", write "Sure 2, Vers 255"

        4. LANGUAGE: 
           - Always answer in the same language as the user (mostly German).
           - Keep the tone respectful, gentle, and supportive.
        
        5. CONVERSATION CONTEXT:
           - You have access to the full conversation history.
           - When the user asks follow-up questions (e.g., "Kannst du mir auch eine Transliteration dazu schreiben?"), refer to previous messages in the conversation.
           - Maintain context across the entire conversation.`,
    };

    // Build messages array
    let chatMessages;
    if (messages) {
      // Filter out invalid messages before sending to OpenAI
      const validMessages = messages.filter((msg: any) => 
        msg && 
        msg.content && 
        typeof msg.content === 'string' && 
        msg.content.trim().length > 0
      );
      // If conversation history is provided, prepend system message
      chatMessages = [systemMessage, ...validMessages];
    } else {
      // Legacy single-query mode
      chatMessages = [systemMessage, { role: "user", content: userQuery }];
    }

    // Call Manus Forge API (supports multiple models including Gemini)
    const completion = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
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
