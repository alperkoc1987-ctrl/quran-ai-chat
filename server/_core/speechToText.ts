/**
 * speechToText.ts
 * API endpoint for speech-to-text conversion using OpenAI Whisper
 */

import { Express } from "express";

export function setupSpeechToTextRoute(app: Express) {
  app.post("/api/speech-to-text", async (req, res) => {
    try {
      const { audio, language = "de" } = req.body;

      if (!audio) {
        return res.status(400).json({ error: "Audio data is required" });
      }

      // Get API key from environment
      let apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey && process.env.BUILT_IN_FORGE_API_KEY) {
        apiKey = process.env.BUILT_IN_FORGE_API_KEY;
      }

      if (!apiKey) {
        console.error("Error: No API key available for speech-to-text");
        return res.status(500).json({ error: "API key not configured" });
      }

      // Convert base64 to buffer
      const base64Data = audio.replace(/^data:audio\/\w+;base64,/, "");
      const audioBuffer = Buffer.from(base64Data, "base64");

      // Create form data
      const FormData = (await import("form-data")).default;
      const formData = new FormData();
      formData.append("file", audioBuffer, {
        filename: "audio.webm",
        contentType: "audio/webm",
      });
      formData.append("model", "whisper-1");
      formData.append("language", language);

      // Determine API URL
      let apiUrl;
      if (apiKey === process.env.BUILT_IN_FORGE_API_KEY) {
        apiUrl = "https://forge.manus.ai/v1/audio/transcriptions";
      } else if (process.env.OPENAI_BASE_URL) {
        apiUrl = process.env.OPENAI_BASE_URL + "/audio/transcriptions";
      } else {
        apiUrl = "https://api.openai.com/v1/audio/transcriptions";
      }

      console.log(`Speech-to-text request to ${apiUrl}`);

      // Call OpenAI Whisper API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          ...formData.getHeaders(),
        },
        body: formData as any,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Speech-to-text API error:", errorText);
        return res.status(response.status).json({ 
          error: "Speech-to-text conversion failed",
          details: errorText
        });
      }

      const result = await response.json();
      console.log("Speech-to-text result:", result);

      res.json({ text: result.text });
    } catch (error) {
      console.error("Speech-to-text error:", error);
      res.status(500).json({ 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
}
