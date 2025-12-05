import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Custom OpenAI Chat API Route
  app.post("/api/chat", async (req, res) => {
    try {
      let { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

      // FALLBACK: Use Manus Built-in Forge API if no API key is provided
      if (!apiKey || apiKey.trim() === "") {
        console.log("Using Manus Built-in Forge API");
        apiKey = process.env.BUILT_IN_FORGE_API_KEY;
      }

      if (!apiKey) {
        console.error("Error: Missing API Key in request and no fallback available");
        return res.status(400).json({ error: "API Key is required. Please check your settings." });
      }

      console.log(`Attempting to connect to LLM API with key ending in ...${apiKey.slice(-4)}`);

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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Use Manus Forge API URL if using built-in key, otherwise use OpenAI
      const apiUrl = (!req.body.apiKey || req.body.apiKey.trim() === "") 
        ? (process.env.BUILT_IN_FORGE_API_URL || "https://api.openai.com/v1") + "/chat/completions"
        : "https://api.openai.com/v1/chat/completions";

      try {
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

      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        console.error("Fetch error:", fetchError);
        
        if (fetchError.name === 'AbortError') {
          return res.status(504).json({ error: "Timeout: OpenAI did not respond in time." });
        }
        
        throw fetchError; // Re-throw to be caught by outer catch
      }

    } catch (error: any) {
      console.error("Unhandled Server Error:", error);
      return res.status(500).json({ 
        error: `Internal Server Error: ${error.message}`,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  });
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
