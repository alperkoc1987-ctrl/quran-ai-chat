export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: "API Key is required" });
    }

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
      return res.status(response.status).json({ error: data.error?.message || "OpenAI API Error" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
