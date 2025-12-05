import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/MessageBubble";
import { SurahList } from "@/components/SurahList";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, RotateCcw, BookOpen, Settings, Mic, MicOff, MessageSquare, X } from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";
import { Surah, Language } from "@/lib/types";

export default function Chat() {
  const [, navigate] = useLocation();
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>(Language.German);

  const [showChatArea, setShowChatArea] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Speech Recognition Setup
  useEffect(() => {
    // Check if speech recognition is supported
    const hasWebkitSpeech = 'webkitSpeechRecognition' in window;
    const hasStandardSpeech = 'SpeechRecognition' in window;
    
    if (!hasWebkitSpeech && !hasStandardSpeech) {
      console.log('Speech recognition not supported in this browser');
      setSpeechSupported(false);
      return;
    }

    // @ts-ignore - SpeechRecognition types are not standard yet
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'de-DE';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        console.log('Speech result received');
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          alert('Bitte erlauben Sie den Zugriff auf das Mikrofon in Ihren Browser-Einstellungen.');
        } else if (event.error === 'no-speech') {
          alert('Keine Sprache erkannt. Bitte versuchen Sie es erneut.');
        } else if (event.error === 'network') {
          alert('Netzwerkfehler. Bitte überprüfen Sie Ihre Internetverbindung.');
        }
      };

      recognition.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      // @ts-ignore
      window.recognitionInstance = recognition;
      setSpeechSupported(true);
      console.log('Speech recognition initialized successfully');

      return () => {
        try {
          recognition.abort();
        } catch (e) {
          console.error('Error aborting recognition:', e);
        }
      };
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      setSpeechSupported(false);
    }
  }, []);

  const toggleListening = () => {
    // @ts-ignore
    const recognition = window.recognitionInstance;
    
    if (!recognition) {
      console.error('Speech recognition not initialized');
      return;
    }

    try {
      if (isListening) {
        console.log('Stopping speech recognition');
        recognition.stop();
      } else {
        console.log('Starting speech recognition');
        recognition.start();
      }
    } catch (error) {
      console.error('Error toggling speech recognition:', error);
      setIsListening(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectSurah = (surah: Surah) => {
    navigate(`/surah/${surah.number}`);
  };

  const handleOpenSurah = (surahNumber: number) => {
    navigate(`/surah/${surahNumber}`);
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0">
        <div className="container max-w-6xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-teal-600 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">
                  Koran & Hadith KI-Chat
                </h1>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                  Stellen Sie Ihre Fragen und lesen Sie den Koran
                </p>
              </div>
            </div>

          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            
            <div className="flex items-center gap-2">
              {/* Desktop Settings Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                className="hidden md:flex text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="gap-2 h-8 md:h-9 text-xs md:text-sm dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                <span className="inline">Neu</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Floating Chat Button - Only show when chat is hidden */}
        {!showChatArea && (
          <button
            onClick={() => setShowChatArea(true)}
            className="fixed bottom-6 right-6 z-50 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Frage zum Tafsir stellen</span>
          </button>
        )}

        {/* Chat Section - Only show when expanded */}
        {showChatArea && (
          <div className="flex-1 flex flex-col overflow-hidden border-b border-slate-200 dark:border-slate-700 min-h-0 bg-white dark:bg-slate-900">
          {/* Messages Area */}
          <ScrollArea className="flex-1 min-h-0" ref={scrollRef}>
            <div className="container max-w-6xl mx-auto px-4 py-6 space-y-4">
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message} 
                  onOpenSurah={handleOpenSurah}
                />
              ))}

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-lg rounded-bl-none px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-red-800 dark:text-red-200 text-sm">
                  <p className="font-semibold">Fehler</p>
                  <p>{error}</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area - Fixed at bottom */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg p-4 flex-shrink-0">
            <div className="container max-w-6xl mx-auto">
              <div className="flex gap-2 relative">
                {/* Close Chat Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChatArea(false)}
                  className="absolute -top-12 right-0 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Chat schließen"
                >
                  <X className="w-5 h-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Stellen Sie eine Frage zum Koran oder den Hadithen..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                />
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleListening}
                  disabled={isLoading}
                  className="flex-shrink-0 dark:border-slate-700"
                  title={isListening ? "Aufnahme stoppen" : "Spracheingabe starten"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="gap-2 bg-teal-600 hover:bg-teal-700"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Senden</span>
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                Diese KI-Antworten dienen nur zu Informationszwecken. Bitte konsultieren Sie einen
                islamischen Gelehrten für wichtige religiöse Fragen.
              </p>
            </div>
          </div>
          </div>
        )}

        {/* Surah Browser Section - Fullscreen */}
        <div className="flex flex-col bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <SurahList
              onSelectSurah={handleSelectSurah}
            />
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
