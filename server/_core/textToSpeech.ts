/**
 * Text-to-Speech API Route Handler
 * Uses OpenAI TTS API to generate realistic speech audio
 */

import { Express } from "express";
import { ENV } from "./env";

export function setupTextToSpeechRoute(app: Express) {
  app.post("/api/tts", async (req, res) => {
    try {
      const { text } = req.body;

      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }

      // Limit text length to prevent abuse
      if (text.length > 4000) {
        return res.status(400).json({ error: "Text too long (max 4000 characters)" });
      }

      // Use OpenAI TTS API
      const apiKey = process.env.OPENAI_API_KEY || ENV.forgeApiKey;
      const apiUrl = process.env.OPENAI_API_KEY 
        ? (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1/audio/speech")
        : "https://forge.manus.ai/v1/audio/speech";

      if (!apiKey) {
        return res.status(500).json({ error: "API key not configured" });
      }

      // Call OpenAI TTS API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          voice: "amber", // Warm, friendly male voice
          input: text,
          speed: 1.0,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("TTS API error:", errorText);
        return res.status(response.status).json({ 
          error: "TTS generation failed",
          details: errorText 
        });
      }

      // Stream audio back to client
      const audioBuffer = await response.arrayBuffer();
      
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.byteLength.toString());
      res.send(Buffer.from(audioBuffer));

    } catch (error: any) {
      console.error("TTS error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: error.message 
      });
    }
  });
}
