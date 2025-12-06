/**
 * useChat.ts
 * Custom React hook for managing chat state and interactions.
 */

import { useState, useCallback } from "react";
import { ChatMessage } from "@/lib/types";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

// Simple local responses for greetings to ensure the bot always answers "Hi"
const GREETING_KEYWORDS = ["hallo", "hi", "hey", "salam", "selam", "guten morgen", "guten tag", "guten abend"];
const GREETING_RESPONSES = [
  "Wa alaikum assalam! Wie kann ich Ihnen heute helfen?",
  "Hallo! Ich bin hier, um Ihre Fragen zum Islam, Koran und den Hadithen zu beantworten.",
  "Salam! Schön, dass Sie da sind. Was möchten Sie wissen?",
  "Herzlich willkommen! Stellen Sie mir gerne eine Frage."
];

export function useChat() {
  const trpcClient = trpc.useUtils();
  const chatMutation = trpc.chat.sendMessage.useMutation();
  
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

      // Check for local greeting handling FIRST (works even without API key)
      const lowerInput = userInput.toLowerCase().trim();
      const isGreeting = GREETING_KEYWORDS.some(keyword => lowerInput === keyword || lowerInput.startsWith(keyword + " "));
      
      if (isGreeting && lowerInput.length < 20) {
        // Simulate a short delay for natural feel
        setTimeout(() => {
          const randomResponse = GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)];
          const aiMessage: ChatMessage = {
            id: nanoid(),
            text: randomResponse,
            isUser: false,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          setIsLoading(false);
        }, 600);
        return; // Exit early, no API call needed
      }

      try {
        // Get conversation history for context
        const history = messages
          .filter(m => !m.isUser || m.text !== userInput) // Exclude the current message
          .map(m => ({
            role: m.isUser ? "user" as const : "assistant" as const,
            content: m.text,
          }));

        // Send to backend via TRPC
        const response = await chatMutation.mutateAsync({
          message: userInput,
          history,
        });

        // Add AI response
        const aiMessage: ChatMessage = {
          id: nanoid(),
          text: response.response,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        let errorMessage = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.";
        let displayMessage = "Entschuldigung, es gab ein technisches Problem.";

        if (err instanceof Error) {
          if (err.message === "MISSING_API_KEY") {
            errorMessage = "Bitte geben Sie Ihren OpenAI API Key in den Einstellungen ein.";
            displayMessage = "Um komplexe Fragen zu beantworten, benötige ich Ihren OpenAI API Key. Bitte klicken Sie oben rechts auf das Zahnrad-Symbol (Einstellungen).";
          } else if (err.message.includes("401")) {
            errorMessage = "Der API Key ist ungültig.";
            displayMessage = "Der eingegebene API Key scheint ungültig zu sein. Bitte prüfen Sie ihn in den Einstellungen.";
          } else if (err.message.includes("429")) {
            errorMessage = "Guthaben aufgebraucht oder Limit erreicht.";
            displayMessage = "Ihr OpenAI-Guthaben ist aufgebraucht oder das Limit wurde erreicht. Bitte prüfen Sie Ihren Account.";
          } else {
            errorMessage = err.message;
            // Display the full error message from the backend to help with debugging
            displayMessage = `Entschuldigung, ich konnte Ihre Anfrage nicht verarbeiten. \n\nFehlerdetails: ${errorMessage}`;
          }
        }

        setError(errorMessage);

        // Add error message to chat
        const errorChatMessage: ChatMessage = {
          id: nanoid(),
          text: displayMessage,
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
