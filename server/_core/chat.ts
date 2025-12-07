/**
 * chat.ts
 * Express endpoint for handling chat requests with OpenAI API
 */

import { Request, Response } from "express";
import OpenAI from "openai";
import { ENV } from "./env";

// Try to use OpenAI API key from environment, fallback to Manus Forge API
const apiKey = process.env.OPENAI_API_KEY || ENV.forgeApiKey;
const baseURL = process.env.OPENAI_API_KEY 
  ? (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1")
  : ENV.forgeApiUrl;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey,
  baseURL,
});

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { messages, userQuery } = req.body;

    // Frontend sends messages array, use it directly
    let chatMessages = messages;
    
    // Legacy support: if userQuery is provided instead of messages
    if (!chatMessages && userQuery) {
      chatMessages = [
        { role: "user", content: userQuery },
      ];
    }

    if (!chatMessages || !Array.isArray(chatMessages) || chatMessages.length === 0) {
      return res.status(400).json({
        error: "Missing required field: messages array",
      });
    }

    console.log(`Chat request with ${chatMessages.length} messages`);

    // Call OpenAI API with GPT-4o-mini (94% cheaper than GPT-4o)
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chatMessages as any,
      max_tokens: 4000,
      temperature: 0.7,
    });

    console.log("OpenAI response received successfully");

    // Return response in format expected by frontend
    return res.json(completion);
  } catch (error: any) {
    console.error("Chat API error:", error);
    console.error("Error details:", error.response?.data || error.message);
    
    return res.status(500).json({
      error: "Failed to process chat request",
      details: error.message || "Unknown error",
    });
  }
}
