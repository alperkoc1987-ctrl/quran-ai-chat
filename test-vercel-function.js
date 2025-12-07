// Test script to verify Vercel function logic locally
import fetch from 'node-fetch';

async function testFunction() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("Please set OPENAI_API_KEY environment variable to test.");
    return;
  }

  console.log("Testing OpenAI API connection...");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say 'Hello from Vercel Function Test' if you can hear me." }
        ],
        temperature: 0.7,
        max_tokens: 50,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data.error?.message || "Unknown error");
    } else {
      console.log("Success! Response:", data.choices[0].message.content);
    }
  } catch (error) {
    console.error("Network Error:", error);
  }
}

testFunction();
