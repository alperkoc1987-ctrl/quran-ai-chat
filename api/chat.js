export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    let { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = req.body;

    // FALLBACK: Use the hardcoded key if none is provided or if it's empty
    // This ensures the app works even if the frontend fails to send the key
    if (!apiKey || apiKey.trim() === "") {
      console.log("Using fallback API key");
      apiKey = "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";
    }

    if (!apiKey) {
      console.error("Error: Missing API Key in request and no fallback available");
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
      const errorMessage = data.error?.message || "Unknown error from OpenAI";
      
      // Handle specific error codes for better user feedback
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
}
