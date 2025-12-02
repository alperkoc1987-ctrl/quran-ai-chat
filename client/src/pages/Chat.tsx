/**
 * Chat.tsx
 * Main chat interface page for the Quran & Hadith AI Chat application.
 */

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/MessageBubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, RotateCcw, BookOpen } from "lucide-react";

export default function Chat() {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Koran & Hadith KI-Chat
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                Stellen Sie Ihre Fragen und erhalten Sie Antworten mit Quellenangaben
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={clearMessages}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Neu</span>
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="container max-w-4xl mx-auto px-4 py-6 space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-900 rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Antwort wird generiert...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
              <p className="font-semibold">Fehler</p>
              <p>{error}</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 shadow-lg">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Stellen Sie eine Frage zum Koran oder den Hadithen..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Senden</span>
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-gray-500 mt-3 text-center">
            Diese KI-Antworten dienen nur zu Informationszwecken. Bitte konsultieren Sie einen
            islamischen Gelehrten für wichtige religiöse Fragen.
          </p>
        </div>
      </div>
    </div>
  );
}
