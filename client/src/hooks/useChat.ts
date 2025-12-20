/**
 * useChat.ts
 * Custom React hook for managing chat state and interactions.
 */

import { useState, useCallback } from "react";
import { ChatMessage } from "@/lib/types";
import { sendChatRequest } from "@/lib/api";
import { nanoid } from "nanoid";
import { chatFunctionDefinitions, executeChatFunction } from "@/lib/chatFunctions";
import { useLanguage } from "@/contexts/LanguageContext";

// Multilingual greeting keywords
const GREETING_KEYWORDS_BY_LANG = {
  de: ["hallo", "hi", "hey", "salam", "selam", "guten morgen", "guten tag", "guten abend"],
  en: ["hello", "hi", "hey", "salam", "greetings", "good morning", "good afternoon", "good evening"],
  tr: ["merhaba", "selam", "hey", "günaydın", "iyi akşamlar"],
  ar: ["السلام", "مرحبا", "صباح", "مساء"]
};

// Multilingual greeting responses
const GREETING_RESPONSES = {
  de: [
    "Wa alaikum assalam! Wie kann ich dir heute helfen?",
    "Hallo! Ich bin hier, um deine Fragen zum Islam, Koran und den Hadithen zu beantworten.",
    "Salam! Schön, dass du da bist. Was möchtest du wissen?",
    "Herzlich willkommen! Stell mir gerne eine Frage."
  ],
  en: [
    "Wa alaikum assalam! How can I help you today?",
    "Hello! I'm here to answer your questions about Islam, the Quran, and the Hadith.",
    "Salam! Nice to have you here. What would you like to know?",
    "Welcome! Feel free to ask me a question."
  ],
  tr: [
    "Selamün aleyküm! Bugün sana nasıl yardımcı olabilirim?",
    "Merhaba! İslam, Kuran ve Hadis hakkındaki sorularınızı cevaplamak için buradayım.",
    "Selam! Burada olduğun için sevindim. Ne öğrenmek istersin?",
    "Hoş geldiniz! Bana bir soru sormaktan çekinmeyin."
  ],
  ar: [
    "وعليكم السلام! كيف يمكنني مساعدتك اليوم؟",
    "مرحبا! أنا هنا للإجابة على أسئلتك حول الإسلام والقرآن والحديث.",
    "السلام! يسعدني وجودك هنا. ماذا تود أن تعرف؟",
    "أهلا وسهلا! لا تتردد في طرح سؤال علي."
  ]
};

// Multilingual welcome messages
const WELCOME_MESSAGES = {
  de: "As-salamu alaikum! 🌙 Ich bin dein KI-Assistent für den Koran und die Hadithe. Wie kann ich dir heute helfen?",
  en: "As-salamu alaikum! 🌙 I'm your AI assistant for the Quran and Hadith. How can I help you today?",
  tr: "Selamün aleyküm! 🌙 Kuran ve Hadis için senin yapay zeka asistanıyım. Bugün sana nasıl yardımcı olabilirim?",
  ar: "السلام عليكم! 🌙 أنا مساعدك الذكي للقرآن والحديث. كيف يمكنني مساعدتك اليوم؟"
};

export function useChat() {
  const { language } = useLanguage();
  const lang = language === 'de' || language === 'en' || language === 'tr' || language === 'ar' ? language : 'en';
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      text: WELCOME_MESSAGES[lang as keyof typeof WELCOME_MESSAGES],
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dailyRemaining, setDailyRemaining] = useState<number>(10);
  const [minuteRemaining, setMinuteRemaining] = useState<number>(5);

  const sendMessage = useCallback(
    async (userInput: string) => {
      if (!userInput.trim() || isLoading) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: nanoid(),
        text: userInput,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Check for API key
        const apiKey = localStorage.getItem("openai_api_key");
        // Note: We allow proceeding without an API key because the backend has a fallback key.
        // The backend will handle the missing key logic if the fallback also fails.

        // Build conversation history for context
        // Convert ChatMessage[] to OpenAI message format
        const conversationHistory = messages
          .filter(msg => 
            !msg.isError && // Skip error messages (marked with isError flag)
            msg.text && // Filter out null/undefined/empty text
            msg.text.trim() && // Filter out whitespace-only messages
            !msg.text.startsWith("As-salamu alaikum!") && // Skip initial greeting
            !msg.text.startsWith("Selamün aleyküm!") && // Skip Turkish greeting
            !msg.text.startsWith("السلام عليكم") // Skip Arabic greeting
          )
          .map(msg => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text
          }));

        // Add current user message
        conversationHistory.push({
          role: "user",
          content: userInput
        });

        // Determine translation edition based on language
        let translationEdition = "de.bubenheim";
        if (lang === 'en') translationEdition = "en.sahih";
        else if (lang === 'tr') translationEdition = "tr.diyanet";
        else if (lang === 'ar') translationEdition = "ar.quran-simple";

        // Send to backend with full conversation history and function definitions
        const response = await sendChatRequest({
          apiKey: apiKey || undefined,
          messages: conversationHistory,
          language: lang,
          translationEdition: translationEdition,
          functions: chatFunctionDefinitions,
          function_call: "auto",
        });

        // Check if AI wants to call a function
        if (response.function_call) {
          const functionName = response.function_call.name;
          const functionArgs = JSON.parse(response.function_call.arguments || "{}");
          
          // Execute the function
          const functionResult = executeChatFunction(functionName, functionArgs);
          
          // Add function result to conversation
          conversationHistory.push({
            role: "function",
            name: functionName,
            content: JSON.stringify(functionResult),
          } as any);
          
          // Get final response from AI with function result
          const finalResponse = await sendChatRequest({
            messages: conversationHistory,
            language: lang,
            translationEdition: translationEdition,
            functions: chatFunctionDefinitions,
          });
          
          // Add final AI response
          const aiMessage: ChatMessage = {
            id: nanoid(),
            text: finalResponse.generatedAnswer,
            isUser: false,
            sources: finalResponse.sources,
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, aiMessage]);
        
        // Update rate limit info from response if available
        if (response.dailyRemaining !== undefined) {
          setDailyRemaining(response.dailyRemaining);
        }
        if (response.minuteRemaining !== undefined) {
          setMinuteRemaining(response.minuteRemaining);
        }
          return;
        }

        // Add AI response
        const aiMessage: ChatMessage = {
          id: nanoid(),
          text: response.generatedAnswer,
          isUser: false,
          sources: response.sources,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        
        // Update rate limit info from response if available
        if (response.dailyRemaining !== undefined) {
          setDailyRemaining(response.dailyRemaining);
        }
        if (response.minuteRemaining !== undefined) {
          setMinuteRemaining(response.minuteRemaining);
        }
      } catch (err: any) {
        // Multilingual error messages
        const errorMessages = {
          de: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
          en: "An error occurred. Please try again later.",
          tr: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
          ar: "حدث خطأ. يرجى المحاولة لاحقًا."
        };

        const displayMessages = {
          de: "Entschuldigung, es gab ein technisches Problem.",
          en: "Sorry, there was a technical problem.",
          tr: "Üzgünüm, teknik bir sorun oluştu.",
          ar: "عذراً، حدثت مشكلة تقنية."
        };

        let errorMessage = errorMessages[lang as keyof typeof errorMessages] || errorMessages.en;
        let displayMessage = displayMessages[lang as keyof typeof displayMessages] || displayMessages.en;

        if (err instanceof Error) {
          errorMessage = err.message;
          
          // Check if it's a rate limit error (429)
          if (err.message.includes('429') || err.message.includes('Tageslimit') || err.message.includes('Zu viele Nachrichten')) {
            displayMessage = `⏱️ ${errorMessage}`;
            
            // Update rate limit counters if available in error
            if ((err as any).dailyRemaining !== undefined) {
              setDailyRemaining((err as any).dailyRemaining);
            }
            if ((err as any).minuteRemaining !== undefined) {
              setMinuteRemaining((err as any).minuteRemaining);
            }
          } else {
            // Show friendly error message based on language
            const fallbackMessages = {
              de: "Entschuldigung, der KI-Chat ist momentan nicht verfügbar. Bitte versuche es später erneut.",
              en: "Sorry, the AI chat is currently unavailable. Please try again later.",
              tr: "Üzgünüm, yapay zeka sohbeti şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.",
              ar: "عذراً، دردشة الذكاء الاصطناعي غير متاحة حالياً. يرجى المحاولة لاحقًا."
            };
            displayMessage = fallbackMessages[lang as keyof typeof fallbackMessages] || fallbackMessages.en;
            console.error('[Chat Error]', errorMessage); // Log for debugging
          }
        }

        setError(errorMessage);

        // Add error message to chat (but mark it so it's not sent to AI)
        const errorChatMessage: ChatMessage = {
          id: nanoid(),
          text: displayMessage,
          isUser: false,
          timestamp: new Date(),
          isError: true, // Mark as error message
        };

        setMessages((prev) => [...prev, errorChatMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, lang]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: nanoid(),
        text: WELCOME_MESSAGES[lang as keyof typeof WELCOME_MESSAGES],
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, [lang]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    dailyRemaining,
    minuteRemaining,
  };
}
