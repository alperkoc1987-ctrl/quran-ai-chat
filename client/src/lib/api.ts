/**
 * api.ts
 * Service for communicating with the FastAPI backend.
 */

import { ChatRequest, ChatResponse } from "./types";

const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:8000";

export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send chat request:", error);
    throw error;
  }
}
