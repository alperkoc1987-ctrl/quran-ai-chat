/**
 * api.ts
 * Service for communicating with the backend and Quran APIs.
 */

import { ChatRequest, ChatResponse, Surah, SurahWithAyahs } from "./types";

// Use relative path for API calls to leverage Netlify redirects
const API_BASE_URL = "/api";
const QURAN_API_URL = "https://api.alquran.cloud/v1";

export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Get API key from localStorage if available (for client-side usage)
    const apiKey = localStorage.getItem("openai_api_key");
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
        apiKey, // Pass API key if needed by the function
        messages: [
          { role: "system", content: "You are a helpful Islamic assistant." },
          { role: "user", content: request.userQuery }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform OpenAI response format to our app's expected format if needed
    if (data.choices && data.choices[0]) {
      return {
        generatedAnswer: data.choices[0].message.content,
        sources: [] // Sources would need to be parsed or handled differently with direct OpenAI calls
      };
    }
    
    return data;
  } catch (error) {
    console.error("Failed to send chat request:", error);
    throw error;
  }
}

export async function fetchAllSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${QURAN_API_URL}/surah`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Surahs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch Surahs:", error);
    throw error;
  }
}

export async function fetchSurahWithAyahs(
  surahNumber: number,
  edition: string = "quran-uthmani"
): Promise<SurahWithAyahs> {
  try {
    const response = await fetch(`${QURAN_API_URL}/surah/${surahNumber}/${edition}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Surah ${surahNumber}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Failed to fetch Surah ${surahNumber}:`, error);
    throw error;
  }
}

export async function fetchSurahWithTranslation(
  surahNumber: number,
  translationEdition: string = "de.bubenheim"
): Promise<{ arabic: SurahWithAyahs; translation: SurahWithAyahs }> {
  try {
    const arabicResponse = await fetchSurahWithAyahs(surahNumber, "quran-uthmani");
    const translationResponse = await fetchSurahWithAyahs(surahNumber, translationEdition);
    return {
      arabic: arabicResponse,
      translation: translationResponse,
    };
  } catch (error) {
    console.error(`Failed to fetch Surah with translation:`, error);
    throw error;
  }
}
