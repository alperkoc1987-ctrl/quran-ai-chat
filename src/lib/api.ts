/**
 * api.ts
 * Service for communicating with OpenAI API and Quran APIs.
 */

import { ChatRequest, ChatResponse, Surah, SurahWithAyahs } from "./types";

const QURAN_API_URL = "https://api.alquran.cloud/v1";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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

    // Create a prompt for OpenAI
    const systemPrompt = `Sie sind ein hilfreicher KI-Assistent, der Fragen zum Koran und den Hadithen beantwortet. 
Beantworten Sie Fragen auf ${request.language === "de" ? "Deutsch" : "Englisch"}.
Seien Sie respektvoll und informativ.`;

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: request.userQuery,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const generatedAnswer = data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";

    return {
      generatedAnswer,
      sources: [
        {
          type: "quran" as const,
          reference: "OpenAI GPT-3.5",
          text: generatedAnswer,
        },
      ],
    };
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
