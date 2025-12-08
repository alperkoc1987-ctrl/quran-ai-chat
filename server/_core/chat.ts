/**
 * chat.ts
 * Express endpoint for handling chat requests with Google Gemini API
 */

import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use Gemini API key from environment
const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("⚠️  GEMINI_API_KEY not set - chat will not work!");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

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

    // Convert OpenAI-style messages to Gemini format
    const systemPrompt = "Du bist ein hilfreicher islamischer Assistent. Antworte prägnant und informativ. Fasse dich kurz, aber erkläre wichtige religiöse Konzepte vollständig. Antworte in der Sprache der Frage.";
    
    // Gemini expects alternating user/model messages
    const geminiMessages = chatMessages
      .filter((msg: any) => msg.role !== 'system')
      .map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

    // Add system prompt to first user message
    if (geminiMessages.length > 0 && geminiMessages[0].role === 'user') {
      geminiMessages[0].parts[0].text = `${systemPrompt}\n\n${geminiMessages[0].parts[0].text}`;
    }

    // Use Gemini 1.5 Flash (stable with higher free tier limits)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      }
    });

    // Start chat session
    const chat = model.startChat({
      history: geminiMessages.slice(0, -1), // All messages except the last one
    });

    // Send the last message
    const lastMessage = geminiMessages[geminiMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = result.response;
    const text = response.text();

    console.log("Gemini response received successfully");

    // Return response in OpenAI-compatible format for frontend
    return res.json({
      id: `chatcmpl-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: "gemini-2.0-flash-exp",
      choices: [{
        index: 0,
        message: {
          role: "assistant",
          content: text,
        },
        finish_reason: "stop",
      }],
      usage: {
        prompt_tokens: 0, // Gemini doesn't provide token counts in the same way
        completion_tokens: 0,
        total_tokens: 0,
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    console.error("Error details:", error.message || error);
    
    // User-friendly error message
    let userMessage = "Es gab ein Problem bei der Verarbeitung Ihrer Anfrage.";
    
    if (error.message?.includes('API key')) {
      userMessage = "API-Schlüssel fehlt oder ist ungültig. Bitte fügen Sie einen gültigen Gemini API-Schlüssel hinzu.";
    } else if (error.message?.includes('quota') || error.message?.includes('limit')) {
      userMessage = "API-Limit erreicht. Bitte versuchen Sie es später erneut.";
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      userMessage = "Die Verbindung zum KI-Service konnte nicht hergestellt werden.";
    }
    
    return res.status(500).json({
      error: userMessage,
      details: error.message || "Unknown error",
    });
  }
}
