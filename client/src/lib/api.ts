/**
 * api.ts
 * Service for communicating with the backend and Quran APIs.
 */

import { ChatRequest, ChatResponse, Surah, SurahWithAyahs, SourceType } from "./types";

// Determine API URL based on environment
// On Vercel, we use /api/chat directly
const API_BASE_URL = "/api";
const QURAN_API_URL = "https://api.alquran.cloud/v1";

export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Get API key from localStorage if available (for client-side usage)
    let apiKey = localStorage.getItem("openai_api_key");
    
    // Sanitize API key: remove whitespace and quotes if user accidentally pasted them
    if (apiKey) {
      apiKey = apiKey.trim().replace(/['"]/g, "");
    }
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
        apiKey, // Pass sanitized API key
        messages: [
          { 
            role: "system", 
            content: `You are a helpful, knowledgeable, and empathetic Islamic assistant. 
            
            Your main goal is to help users with questions about the Quran, Hadith, and Islamic teachings.
            
            IMPORTANT GUIDELINES:
            1. GREETINGS & SMALL TALK: 
               - If the user says "Hi", "Hallo", "Salam", "Wie geht's" or similar, respond naturally and warmly. 
               - Do NOT say you cannot process the request. 
               - Example: "Wa alaikum assalam! Mir geht es gut, danke der Nachfrage. Wie kann ich Ihnen heute helfen?" or "Hallo! Ich bin hier, um Ihre Fragen zum Islam zu beantworten."

            2. PROACTIVE DUAS:
               - If the user mentions a problem, difficulty, or specific situation (e.g., "I am sad", "I have an exam", "someone is sick"), PROACTIVELY suggest a relevant Dua.
               - Say: "Hier ist eine Dua aus dem Koran/Sunnah für diese Situation:" followed by the Dua in Arabic (if possible) and its translation.
               - Example: "Möge Allah es Ihnen erleichtern. Hier ist eine Dua für schwierige Zeiten: ..."

            3. KNOWLEDGE & SOURCES: 
               - When answering religious questions, cite sources (Quran Surah/Verse or Hadith) whenever possible.
               - Use clear formatting for verses.

            4. LANGUAGE: 
               - Always answer in the same language as the user (mostly German).
               - Keep the tone respectful, gentle, and supportive.` 
          },
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
      const content = data.choices[0].message.content;
      
      // Parse sources from content on client side as well
      const citationRegex = /\[(\d+):(\d+)\]|\(Sure\s*(\d+),\s*Vers\s*(\d+)\)/g;
      const sources = [];
      let match;

      while ((match = citationRegex.exec(content)) !== null) {
        const surahNum = parseInt(match[1] || match[3]);
        const ayahNum = parseInt(match[2] || match[4]);
        
        sources.push({
          id: `quran-${surahNum}-${ayahNum}-${Date.now()}-${Math.random()}`,
          type: SourceType.Quran,
          reference: `Sure ${surahNum}, Vers ${ayahNum}`,
          text: "Klicken Sie hier, um diesen Vers im Koran zu öffnen.",
          surahNumber: surahNum,
          ayahNumber: ayahNum
        });
      }

      return {
        generatedAnswer: content,
        sources: sources
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
