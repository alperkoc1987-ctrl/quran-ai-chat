/**
 * useChat.ts
 * Custom React hook for managing chat state and interactions.
 */

import { useState, useCallback } from "react";
import { ChatMessage, SourceType } from "@/lib/types";
import { sendChatRequest } from "@/lib/api";
import { nanoid } from "nanoid";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      text: "Assalamu alaikum! Ich bin Ihr KI-Assistent für den Koran und die Hadithe. Wie kann ich Ihnen heute helfen?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        // Send to backend
        const response = await sendChatRequest({
          userQuery: userInput,
          language: "de",
          translationEdition: "de.bubenheim",
        });

        // Add AI response
        const aiMessage: ChatMessage = {
          id: nanoid(),
          text: response.generatedAnswer,
          isUser: false,
          sources: response.sources,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";

        setError(errorMessage);

        // Add error message
        const errorChatMessage: ChatMessage = {
          id: nanoid(),
          text: `Entschuldigung, es gab ein Problem: ${errorMessage}`,
          isUser: false,
          timestamp: new Date(),
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
        text: "Assalamu alaikum! Ich bin Ihr KI-Assistent für den Koran und die Hadithe. Wie kann ich Ihnen heute helfen?",
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
  };
}
