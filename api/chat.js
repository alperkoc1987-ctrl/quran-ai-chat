export default async function handler(req, res) {
  console.log("API Request received:", req.method);

  // Set CORS headers to allow requests from any origin (for debugging)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Parse body if it's not already parsed (Vercel usually parses it, but just in case)
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    
    let { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = body;

    console.log("Request body parsed. Messages count:", messages?.length);

    // FALLBACK KEY LOGIC
    if (!apiKey || apiKey.trim() === "") {
      console.log("No API key provided by client. Using fallback.");
      // Hardcoded fallback key for demo purposes
      apiKey = "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";
    }

    if (!apiKey) {
      console.error("CRITICAL: No API Key available.");
      return res.status(400).json({ error: "Configuration Error: No API Key found." });
    }

    console.log(`Using API Key ending in ...${apiKey.slice(-4)}`);

    const systemMessage = {
      role: "system",
      content: `Du bist ein hilfreicher islamischer Assistent. 
      Wenn du Verse aus dem Koran zitierst, gib bitte IMMER die Suren-Nummer und Vers-Nummer an.
      Format für Zitate: [Sure:Vers] (z.B. [2:255]).
      
      Wenn der Nutzer nach einem Dua für eine bestimmte Situation fragt (z.B. Trauer, Angst, Krankheit),
      antworte einfühlsam und biete ein passendes Dua aus dem Koran oder der Sunnah an.
      Zitiere den arabischen Text (wenn möglich), die Übersetzung und die Quelle.`
    };

    const enhancedMessages = [systemMessage, ...(messages || [])];

    console.log("Sending request to OpenAI...");

    // Use native fetch with a timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
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
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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

    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error("Fetch error:", fetchError);
      
      if (fetchError.name === 'AbortError') {
        return res.status(504).json({ error: "Timeout: OpenAI did not respond in time." });
      }
      
      throw fetchError; // Re-throw to be caught by outer catch
    }

  } catch (error) {
    console.error("Unhandled Server Error:", error);
    return res.status(500).json({ 
      error: `Internal Server Error: ${error.message}`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
