/**
 * api.ts
 * Service for communicating with the backend and Quran APIs.
 */

import { ChatRequest, ChatResponse, Surah, SurahWithAyahs, SourceType } from "./types";

// Determine API URL based on environment
// On Vercel, we use /api/chat directly
const API_BASE_URL = "/api";
const QURAN_API_URL = "https://api.alquran.cloud/v1";

const SYSTEM_PROMPT = `You are a helpful, knowledgeable, and empathetic Islamic assistant. 

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
   - CRITICAL: You MUST ALWAYS include BOTH Surah AND Verse numbers in your citations.
   - ALWAYS use this EXACT format: "Sure X, Vers Y" (e.g., "Sure 2, Vers 255" or "Sure 18, Vers 10")
   - NEVER write just "Sure 2" - ALWAYS include the specific verse number!
   - This format is required for automatic verse linking to work correctly.
   - Example: Instead of "Sure Al-Baqara", write "Sure 2, Vers 255"

4. LANGUAGE: 
   - Always answer in the same language as the user (mostly German).
   - Keep the tone respectful, gentle, and supportive.`;

export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Prepare messages array
    let messages;
    if (request.messages && request.messages.length > 0) {
      // Use messages from useChat, but ensure system prompt is first
      const hasSystemPrompt = request.messages.some(m => m.role === 'system');
      if (!hasSystemPrompt) {
        messages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...request.messages
        ];
      } else {
        messages = request.messages;
      }
    } else {
      // Fallback to userQuery for backwards compatibility
      messages = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: (request.userQuery || "").trim() }
      ];
    }
    
    console.log('[DEBUG] Sending chat request with messages:', messages);
    
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        messages,
        ...(request.functions && { functions: request.functions }),
        ...(request.function_call && { function_call: request.function_call }),
      }),
    });
    
    console.log('[DEBUG] Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // If detailed error info is available, use it
      if (errorData.error && errorData.details) {
        throw new Error(`${errorData.error}\nDetails: ${errorData.details}`);
      }
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('[DEBUG] Response data:', data);
    
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
        generatedAnswer: content || "",
        sources: sources,
        ...(data.choices[0].message.function_call && { function_call: data.choices[0].message.function_call }),
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
    return data.data;
  } catch (error) {
    console.error("Failed to fetch Surahs:", error);
    throw error;
  }
}

export async function fetchSurahWithAyahs(surahNumber: number, edition: string = "quran-simple-enhanced"): Promise<SurahWithAyahs> {
  try {
    const response = await fetch(`${QURAN_API_URL}/surah/${surahNumber}/${edition}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Surah: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch Surah with Ayahs:", error);
    throw error;
  }
}

export async function fetchSurahComplete(surahNumber: number, translationEdition: string = "de.bubenheim", includeTransliteration: boolean = false): Promise<any> {
  try {
    // Fetch Arabic, translation, and optionally transliteration
    const fetchPromises = [
      fetch(`${QURAN_API_URL}/surah/${surahNumber}/quran-simple-enhanced`),
      fetch(`${QURAN_API_URL}/surah/${surahNumber}/${translationEdition}`)
    ];
    
    if (includeTransliteration) {
      fetchPromises.push(fetch(`${QURAN_API_URL}/surah/${surahNumber}/en.transliteration`));
    }
    
    const responses = await Promise.all(fetchPromises);
    
    if (!responses[0].ok || !responses[1].ok) {
      throw new Error(`Failed to fetch Surah`);
    }
    
    const arabicData = await responses[0].json();
    const translationData = await responses[1].json();
    const transliterationData = includeTransliteration && responses[2]?.ok ? await responses[2].json() : null;
    
    return {
      arabic: arabicData.data,
      translation: translationData.data,
      transliteration: transliterationData?.data || null
    };
  } catch (error) {
    console.error("Failed to fetch complete Surah:", error);
    throw error;
  }
}
