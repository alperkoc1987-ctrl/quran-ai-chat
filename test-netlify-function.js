const { handler } = require('./netlify/functions/chat.js');

async function testFunction() {
  console.log("Starting local test of Netlify function...");

  // Mock event object mimicking a Netlify function call
  const mockEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
      apiKey: "sk-dummy-key-for-testing-connectivity", // Dummy key to test connectivity, not auth
      messages: [{ role: "user", content: "Hello" }]
    })
  };

  const mockContext = {};

  try {
    const response = await handler(mockEvent, mockContext);
    
    console.log("Function execution completed.");
    console.log("Status Code:", response.statusCode);
    
    const body = JSON.parse(response.body);
    
    if (response.statusCode === 200) {
      console.log("SUCCESS: Function returned 200 OK.");
      console.log("Response data:", body);
    } else if (response.statusCode === 401) {
      console.log("SUCCESS: Function connected to OpenAI but rejected invalid key (Expected behavior).");
      console.log("Error message:", body.error);
    } else {
      console.log("WARNING: Function returned unexpected status code.");
      console.log("Response:", body);
    }

  } catch (error) {
    console.error("FAILURE: Function threw an error during execution.");
    console.error(error);
  }
}

testFunction();
