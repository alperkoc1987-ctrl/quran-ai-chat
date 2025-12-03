import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable JSON body parsing
  app.use(express.json());

  // API Route for Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

      if (!apiKey) {
        console.error("Error: Missing API Key in request");
        return res.status(400).json({ error: "API Key is required. Please check your settings." });
      }

      console.log(`Attempting to connect to OpenAI with key ending in ...${apiKey.slice(-4)}`);

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens,
        }),
      });

      const data = await response.json();

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
      return res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Use port 3001 for backend to avoid conflict with Vite (3000)
  const port = 3001;

  server.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
