import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Simulate the Vercel function at /api/chat
app.post('/api/chat', async (req, res) => {
  console.log("Received request at /api/chat");
  const { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

  if (!apiKey) {
    console.log("Error: Missing API Key");
    return res.status(400).json({ error: "API Key is required" });
  }

  console.log(`Forwarding request to OpenAI with key: ${apiKey.substring(0, 3)}...`);

  try {
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
    console.log("OpenAI Response Status:", response.status);

    if (!response.ok) {
      console.log("OpenAI Error:", data);
      return res.status(response.status).json({ error: data.error?.message || "OpenAI API Error" });
    }

    console.log("Success! Sending data back to client.");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Local simulation server running at http://localhost:${port}`);
});
