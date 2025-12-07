/**
 * Vercel Serverless Function for OpenAI Chat API
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let { apiKey, messages, model = "gpt-4o-mini", temperature = 0.7, max_tokens = 3000, functions, function_call } = req.body;

    // FALLBACK: Use environment variable API keys if no API key is provided in request
    if (!apiKey || apiKey.trim() === "") {
      console.log("No API key in request, checking environment variables...");
      console.log("OPENAI_API_KEY available:", !!process.env.OPENAI_API_KEY);
      console.log("BUILT_IN_FORGE_API_KEY available:", !!process.env.BUILT_IN_FORGE_API_KEY);
      
      // First try user's OpenAI API key
      if (process.env.OPENAI_API_KEY) {
        console.log("Using OPENAI_API_KEY from environment");
        apiKey = process.env.OPENAI_API_KEY;
      }
      // Fallback to Manus Built-in Forge API
      else if (process.env.BUILT_IN_FORGE_API_KEY) {
        console.log("Using Manus Built-in Forge API");
        apiKey = process.env.BUILT_IN_FORGE_API_KEY;
      }
      else {
        console.error("No environment variables found! Available env keys:", Object.keys(process.env).filter(k => k.includes('API') || k.includes('KEY')));
      }
    }

    if (!apiKey) {
      console.error("Error: Missing API Key in request and no fallback available");
      return res.status(400).json({ error: "API Key is required. Please check your settings." });
    }

    console.log(`Attempting to connect to LLM API with key ending in ...${apiKey.slice(-4)}`);

    // Enhanced System Prompt to encourage structured JSON output for citations
    const systemMessage = {
      role: "system",
      content: `Du bist ein freundlicher islamischer Begleiter, der dem Nutzer auf Augenhöhe begegnet. 
      Sprich den Nutzer immer mit "du" an (informell, nie "Sie").
      
      WICHTIG ZUR BEGRÜSSUNG:
      - Begrüße den Nutzer NICHT mit "As-salamu alaikum" oder "Salamu Aleykum"
      - Der Nutzer hat bereits eine Begrüßung beim App-Start erhalten
      - Antworte direkt auf die Frage ohne Begrüßung
      - Sei freundlich, aber komm sofort zur Sache
      
      WICHTIG: Halte deine Antworten kurz und prägnant (2-4 Sätze). Vermeide lange Texte.
      Gib nur die wichtigsten Informationen. Sei knackig und auf den Punkt.
      
      Wenn du Verse aus dem Koran zitierst, gib IMMER die Suren-Nummer und Vers-Nummer an.
      Format für Zitate: [Sure:Vers] (z.B. [2:255]).
      
      Wenn der Nutzer nach einem Dua fragt, antworte kurz und einfühlsam.
      Zitiere den arabischen Text (wenn möglich), die Übersetzung und die Quelle.
      
      Sei natürlich, warm und unterstützend in deiner Kommunikation.`
    };

    // Add system message if not present
    const enhancedMessages = [systemMessage, ...messages];

    // Determine API URL based on which key is being used
    let apiUrl;
    if (apiKey === process.env.BUILT_IN_FORGE_API_KEY) {
      apiUrl = "https://forge.manus.ai/v1/chat/completions";
    } else {
      // Always use real OpenAI API for OPENAI_API_KEY
      apiUrl = "https://api.openai.com/v1/chat/completions";
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: enhancedMessages,
        temperature,
        max_tokens,
        ...(functions && { functions }),
        ...(function_call && { function_call }),
      }),
    });

    console.log("OpenAI Response Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error Body:", errorText);
      
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch (e) {
        errorJson = { error: { message: errorText } };
      }

      return res.status(response.status).json({ 
        error: `OpenAI Error (${response.status}): ${errorJson.error?.message || "Unknown error"}` 
      });
    }

    const data = await response.json();
    console.log("OpenAI Response received successfully.");

    return res.status(200).json(data);

  } catch (error: any) {
    console.error("Unhandled Server Error:", error);
    return res.status(500).json({ 
      error: `Internal Server Error: ${error.message}`,
    });
  }
}
