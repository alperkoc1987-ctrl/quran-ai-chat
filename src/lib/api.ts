/**
 * api.ts
 * Service for communicating with the backend API and Quran APIs.
 */

import { ChatRequest, ChatResponse, Surah, SurahWithAyahs } from "./types";

const QURAN_API_URL = "https://api.alquran.cloud/v1";
const API_BASE_URL = process.env.VITE_API_URL || "https://quran-ai-chat-backend.up.railway.app";

// Get API key from localStorage
function getAPIKey(): string {
  return localStorage.getItem("openai_api_key") || "";
}

export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    const apiKey = getAPIKey();
    
    if (!apiKey) {
      throw new Error("OpenAI API Key nicht gespeichert. Bitte geben Sie Ihren API-Schlüssel ein.");
    }

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userQuery: request.userQuery,
        language: request.language,
        translationEdition: request.translationEdition,
        apiKey: apiKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `API Error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
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
