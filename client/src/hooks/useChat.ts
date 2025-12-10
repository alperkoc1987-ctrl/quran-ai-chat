/**
 * useChat.ts
 * Custom React hook for managing chat state and interactions.
 */

import { useState, useCallback } from "react";
import { ChatMessage } from "@/lib/types";
import { sendChatRequest } from "@/lib/api";
import { nanoid } from "nanoid";
import { chatFunctionDefinitions, executeChatFunction } from "@/lib/chatFunctions";

// Simple local responses for greetings to ensure the bot always answers "Hi"
const GREETING_KEYWORDS = ["hallo", "hi", "hey", "salam", "selam", "guten morgen", "guten tag", "guten abend"];
const GREETING_RESPONSES = [
  "Wa alaikum assalam! Wie kann ich dir heute helfen?",
  "Hallo! Ich bin hier, um deine Fragen zum Islam, Koran und den Hadithen zu beantworten.",
  "Salam! Schön, dass du da bist. Was möchtest du wissen?",
  "Herzlich willkommen! Stell mir gerne eine Frage."
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      text: "As-salamu alaikum! 🌙 Ich bin dein KI-Assistent für den Koran und die Hadithe. Wie kann ich dir heute helfen?",
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
            !msg.text.startsWith("As-salamu alaikum!") // Skip initial greeting
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

        // Send to backend with full conversation history and function definitions
        const response = await sendChatRequest({
          apiKey: apiKey || undefined,
          messages: conversationHistory,
          language: "de",
          translationEdition: "de.bubenheim",
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
            language: "de",
            translationEdition: "de.bubenheim",
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
        let errorMessage = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
        let displayMessage = "Entschuldigung, es gab ein technisches Problem.";

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
            // Show friendly error message
            displayMessage = `Entschuldigung, der KI-Chat ist momentan nicht verfügbar. Bitte versuche es später erneut.`;
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
    [isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: nanoid(),
        text: "As-salamu alaikum! 🌙 Ich bin dein KI-Assistent für den Koran und die Hadithe. Wie kann ich dir heute helfen?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

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
