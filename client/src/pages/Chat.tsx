import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/MessageBubble";
import { SurahList } from "@/components/SurahList";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, RotateCcw, BookOpen, ChevronUp, ChevronDown, Settings, Mic, MicOff } from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";
import { Surah, Language } from "@/lib/types";

export default function Chat() {
  const [, navigate] = useLocation();
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [language, setLanguage] = useState<Language>(Language.German);
  const [showSurahBrowser, setShowSurahBrowser] = useState(true);
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
    if (!speechSupported) {
      alert('Spracheingabe wird in diesem Browser nicht unterstützt. Bitte nutzen Sie Chrome oder Safari.');
      return;
    }

    // @ts-ignore
    const recognition = window.recognitionInstance;
    if (!recognition) {
      alert('Spracheingabe konnte nicht initialisiert werden. Bitte laden Sie die Seite neu.');
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
    } catch (e: any) {
      console.error('Speech toggle error:', e);
      setIsListening(false);
      
      if (e.message && e.message.includes('already started')) {
        // Recognition is already running, stop it
        try {
          recognition.stop();
        } catch (stopError) {
          console.error('Error stopping recognition:', stopError);
        }
      } else {
        alert('Fehler beim Starten der Spracheingabe. Bitte versuchen Sie es erneut.');
      }
    }
  };

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

  const handleOpenSurah = async (surahNumber: number, ayahNumber?: number) => {
    // Navigate to fullscreen Surah reader
    navigate(`/surah/${surahNumber}`);
  };

  const handleSelectSurah = (surah: Surah) => {
    // Navigate to fullscreen Surah reader
    navigate(`/surah/${surah.number}`);
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
      <header className="bg-white border-b border-slate-200 shadow-sm z-10">
        <div className="container max-w-6xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
                Koran & Hadith KI-Chat
              </h1>
              <p className="text-[10px] md:text-sm text-gray-500 leading-tight">
                Stellen Sie Ihre Fragen und lesen Sie den Koran
              </p>
            </div>
            {/* Mobile Settings Button (visible only on mobile, right aligned) */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700 -mr-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end">
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            
            <div className="flex items-center gap-2">
              {/* Desktop Settings Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(true)}
                className="hidden md:flex text-gray-500 hover:text-gray-700"
              >
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
                className="gap-2 h-8 md:h-9 text-xs md:text-sm"
              >
                <RotateCcw className="w-3 h-3 md:w-4 md:h-4" />
                <span className="inline">Neu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Section - Fixed height to prevent collapse */}
        <div className="flex-1 flex flex-col overflow-hidden border-b border-slate-200 min-h-0">
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

          {/* Input Area - Fixed at bottom */}
          <div className="bg-white border-t border-slate-200 shadow-lg p-4 flex-shrink-0">
            <div className="container max-w-6xl mx-auto">
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
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={toggleListening}
                  disabled={isLoading}
                  className="flex-shrink-0"
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
              <p className="text-xs text-gray-500 mt-2 text-center">
                Diese KI-Antworten dienen nur zu Informationszwecken. Bitte konsultieren Sie einen
                islamischen Gelehrten für wichtige religiöse Fragen.
              </p>
            </div>
          </div>
        </div>

        {/* Surah Browser Section - Responsive height */}
        <div className="flex flex-col bg-white border-t border-slate-200 h-[60vh] md:h-[70vh]">
          <div className="bg-white border-b border-slate-200 px-4 py-2 flex-shrink-0">
            <button
              onClick={() => setShowSurahBrowser(!showSurahBrowser)}
              className="w-full flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm py-2"
            >
              {showSurahBrowser ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Suren ausblenden
                </>
              ) : (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Suren anzeigen
                </>
              )}
            </button>
          </div>
          
          {showSurahBrowser && (
            <div className="flex-1 overflow-auto min-h-0">
              <SurahList
                onSelectSurah={handleSelectSurah}
              />
            </div>
          )}
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
