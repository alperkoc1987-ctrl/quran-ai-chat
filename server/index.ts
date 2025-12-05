import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
// import fetch from "node-fetch"; // Use native fetch in Node 18+

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON body parsing
  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      let { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

      // FALLBACK: Use the hardcoded key if none is provided or if it's empty
      if (!apiKey || apiKey.trim() === "") {
        console.log("Using fallback API key");
        apiKey = "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";
      }

      if (!apiKey) {
        console.error("Error: Missing API Key in request");
        return res.status(400).json({ error: "API Key is required. Please check your settings." });
      }

      console.log(`Attempting to connect to OpenAI with key ending in ...${apiKey.slice(-4)}`);

      // Enhanced System Prompt to encourage structured JSON output for citations
      const systemMessage = {
        role: "system",
        content: `Du bist ein hilfreicher islamischer Assistent. 
        Wenn du Verse aus dem Koran zitierst, gib bitte IMMER die Suren-Nummer und Vers-Nummer an.
        Format für Zitate: [Sure:Vers] (z.B. [2:255]).
        
        Wenn der Nutzer nach einem Dua für eine bestimmte Situation fragt (z.B. Trauer, Angst, Krankheit),
        antworte einfühlsam und biete ein passendes Dua aus dem Koran oder der Sunnah an.
        Zitiere den arabischen Text (wenn möglich), die Übersetzung und die Quelle.`
      };

      // Add system message if not present
      const enhancedMessages = [systemMessage, ...messages];

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
      });

      const data = await response.json() as any;

      // Post-process the response to extract citations and structure them
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const content = data.choices[0].message.content;
        
        // Regex to find Quran citations like [2:255] or (Sure 2, Vers 255)
        const citationRegex = /\[(\d+):(\d+)\]|\(Sure\s*(\d+),\s*Vers\s*(\d+)\)/g;
        const sources = [];
        let match;

        while ((match = citationRegex.exec(content)) !== null) {
          const surahNum = parseInt(match[1] || match[3]);
          const ayahNum = parseInt(match[2] || match[4]);
          
          sources.push({
            id: `quran-${surahNum}-${ayahNum}-${Date.now()}`,
            type: "Koran",
            reference: `Sure ${surahNum}, Vers ${ayahNum}`,
            text: "Klicken Sie hier, um diesen Vers im Koran zu öffnen.",
            surahNumber: surahNum,
            ayahNumber: ayahNum
          });
        }
      }

      if (!response.ok) {
        console.error("OpenAI API Error:", data);
        const errorMessage = (data as any).error?.message || "Unknown error from OpenAI";
        
        if (response.status === 401) {
          return res.status(401).json({ error: "Invalid API Key. Please check your key in settings." });
        }
        if (response.status === 429) {
          return res.status(429).json({ error: "Rate limit exceeded or insufficient quota. Check your OpenAI account." });
        }

        return res.status(response.status).json({ error: errorMessage });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Internal Server Error:", error);
      const errorDetails = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ 
        error: `Internal Server Error: ${errorDetails}`,
        details: error instanceof Error ? error.stack : undefined
      });
    }
  });

  // Serve static files from dist in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Use port 5000 for production, 3001 for dev
  const port = process.env.PORT || 5000;

  server.listen(Number(port), "0.0.0.0", () => {
    console.log(`Backend server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
