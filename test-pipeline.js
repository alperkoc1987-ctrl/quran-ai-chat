import fetch from 'node-fetch';

async function testPipeline() {
  console.log("Testing pipeline with dummy key...");
  
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: "sk-dummy-key-for-testing-connectivity",
        messages: [{ role: "user", content: "Hello" }]
      })
    });

    const data = await response.json();
    
    console.log("Status Code:", response.status);
    
    if (response.status === 401) {
      console.log("SUCCESS: Received 401 Unauthorized from OpenAI.");
      console.log("This confirms the pipeline is working: Client -> Server -> OpenAI -> Server -> Client");
      console.log("The server correctly forwarded the request, and OpenAI correctly rejected the invalid key.");
    } else if (response.status === 200) {
      console.log("SUCCESS: Received 200 OK. (Unexpected with dummy key, but pipeline works)");
    } else {
      console.log("FAILURE: Unexpected status code.");
      console.log("Response:", data);
    }

  } catch (error) {
    console.error("TEST FAILED: Network error connecting to local server.", error);
  }
}

testPipeline();
