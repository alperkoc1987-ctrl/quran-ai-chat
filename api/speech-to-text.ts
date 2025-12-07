/**
 * Vercel Serverless Function for OpenAI Speech-to-Text (Whisper) API
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { audio, language = 'de' } = req.body;

    if (!audio || typeof audio !== "string") {
      return res.status(400).json({ error: "Audio data is required" });
    }

    // Use OpenAI Whisper API
    const apiKey = process.env.OPENAI_API_KEY || process.env.BUILT_IN_FORGE_API_KEY;
    const apiUrl = process.env.OPENAI_API_KEY 
      ? (process.env.OPENAI_BASE_URL?.replace('/chat/completions', '/audio/transcriptions') || "https://api.openai.com/v1/audio/transcriptions")
      : "https://forge.manus.ai/v1/audio/transcriptions";

    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured" });
    }

    // Convert base64 to buffer
    const base64Data = audio.split(',')[1] || audio;
    const audioBuffer = Buffer.from(base64Data, 'base64');

    // Create FormData for multipart/form-data request
    const formData = new FormData();
    const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
    formData.append('file', audioBlob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', language);

    // Call OpenAI Whisper API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Whisper API error:", errorText);
      return res.status(response.status).json({ 
        error: "Speech-to-text conversion failed",
        details: errorText 
      });
    }

    const data = await response.json();
    
    res.status(200).json({
      text: data.text || "",
      language: data.language || language
    });

  } catch (error: any) {
    console.error("Speech-to-text error:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
}
