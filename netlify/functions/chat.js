exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { apiKey, messages, model = "gpt-3.5-turbo", temperature = 0.7, max_tokens = 500 } = body;

    if (!apiKey) {
      console.error("Error: Missing API Key in request");
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "API Key is required. Please check your settings." }),
      };
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
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Invalid API Key. Please check your key in settings." }),
        };
      }
      if (response.status === 429) {
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ error: "Rate limit exceeded or insufficient quota. Check your OpenAI account." }),
        };
      }

      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: errorMessage }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Internal Server Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error. Please try again later." }),
    };
  }
};
