/**
 * Vercel Serverless Function for Gemini Chat API
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Missing required field: messages array",
      });
    }

    console.log(`Chat request with ${messages.length} messages`);

    // Get Gemini API key from environment
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("Error: Missing GEMINI_API_KEY in environment");
      return res.status(500).json({ 
        error: "Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.",
        details: "GEMINI_API_KEY not configured"
      });
    }

    // Convert OpenAI-style messages to Gemini format
    const systemPrompt = `Du bist ein hilfreicher islamischer Assistent. Antworte prägnant und informativ. Fasse dich kurz, aber erkläre wichtige religiöse Konzepte vollständig. Antworte in der Sprache der Frage.

WICHTIGE REGELN:
1. Antworte NUR auf die tatsächliche Frage des Nutzers. Erfinde KEINE Fragen, die der Nutzer nicht gestellt hat.
2. ⚠️ KRITISCH: Bei Koran-Zitaten IMMER Surah UND Vers-Nummer angeben!
   ✅ RICHTIG: "Sure 2, Vers 255" oder "Sure 2:255" oder "[2:255]"
   ❌ FALSCH: "Sure 2" oder "Sure Al-Baqara" (ohne Vers-Nummer!)
3. Jede Koran-Referenz MUSS eine spezifische Vers-Nummer haben, damit der Nutzer direkt zum Vers springen kann.`;
    
    const geminiMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.7,
      }
    });

    // Build proper history for Gemini (must alternate user-model-user-model)
    let history: any[] = [];
    let expectUser = true; // First message in history must be 'user'
    
    // Process all messages except the last one (which we'll send separately)
    for (let i = 0; i < geminiMessages.length - 1; i++) {
      const msg = geminiMessages[i];
      
      if (expectUser && msg.role === 'user') {
        history.push(msg);
        expectUser = false; // Next should be 'model'
      } else if (!expectUser && msg.role === 'model') {
        history.push(msg);
        expectUser = true; // Next should be 'user'
      }
      // Skip messages that don't fit the alternating pattern
    }
    
    const chat = model.startChat({
      history: history,
    });

    // Send the last message
    const lastMessage = geminiMessages[geminiMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = result.response;
    const text = response.text();

    console.log('Gemini response received successfully');

    // Return in OpenAI-compatible format
    return res.status(200).json({
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gemini-2.0-flash-exp",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: text,
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
      },
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      error: "Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.",
      details: error.message,
    });
  }
}
