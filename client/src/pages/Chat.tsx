import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, RotateCcw } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PushToTalkButton } from "@/components/PushToTalkButton";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

export default function Chat() {
  const { themeConfig } = useReadingTheme();
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, sendMessage, clearMessages, dailyRemaining, minuteRemaining } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current && messages.length > 1) {
      const scrollElement = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    await sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTranscript = (text: string) => {
    setInputValue(text);
  };

  // Theme-aware background: Modern theme gets darker mint green gradient, others use their theme colors
  const backgroundClass = themeConfig.id === 'modern' 
    ? 'flex flex-col h-screen bg-gradient-to-b from-teal-200 to-emerald-50'
    : `flex flex-col h-screen ${themeConfig.colors.background}`;

  return (
    <div className={backgroundClass}>
      {/* Header */}
      <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm px-4 py-3 flex items-center justify-between`}>
        <div>
          <h1 className={`text-lg font-bold ${themeConfig.colors.text}`}>KI-Chat</h1>
          <p className={`text-xs ${themeConfig.colors.textSecondary}`}>Stellen Sie Fragen zum Koran und Hadith</p>
          <p className={`text-xs ${themeConfig.colors.textSecondary} mt-1`}>
            💬 Noch {dailyRemaining} Nachrichten heute
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => clearMessages()}
          className="text-emerald-600 dark:text-emerald-400"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Neu
        </Button>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-6" ref={scrollRef}>
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex gap-2">
                  <div
                    className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className={`border-t ${themeConfig.colors.border} ${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm p-4`}>
        <div className="max-w-4xl mx-auto flex gap-2 items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Stellen Sie eine Frage..."
            disabled={isLoading}
            className="flex-1"
          />
          <PushToTalkButton
            onTranscript={handleTranscript}
            className="shrink-0"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
