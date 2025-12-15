import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, HandHeart, Clock, Compass, MessageSquare, Send, Mic, MicOff, Loader2, ChevronUp, ChevronDown, Scroll, Settings as SettingsIcon, Bookmark, BarChart, Brain, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/MessageBubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResumeReadingCard } from "@/components/ResumeReadingCard";
import { AyatOfTheDay } from "@/components/AyatOfTheDay";
import { PrayerTimesWidget } from "@/components/PrayerTimesWidget";
import { useWidgetPreferences } from "@/components/WidgetSettings";
import { PushToTalkButton } from "@/components/PushToTalkButton";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewHome() {
  const { themeConfig } = useReadingTheme();
  const { t } = useLanguage();
  const widgetPrefs = useWidgetPreferences();
  const [chatExpanded, setChatExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const { messages, isLoading, sendMessage } = useChat();
  const [, navigate] = useLocation();
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

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Spracheingabe nicht unterstützt. Bitte nutzen Sie Chrome oder Safari.');
      return;
    }

    // @ts-ignore
    const recognition = window.recognitionInstanceHome;
    if (!recognition) {
      alert('Spracheingabe konnte nicht initialisiert werden.');
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } catch (e: any) {
      console.error('Speech error:', e);
      setIsListening(false);
      
      if (e.message && e.message.includes('already started')) {
        try {
          recognition.stop();
        } catch (stopError) {
          // Ignore
        }
      }
    }
  };

  // Speech Recognition Setup
  useEffect(() => {
    const hasWebkitSpeech = 'webkitSpeechRecognition' in window;
    const hasStandardSpeech = 'SpeechRecognition' in window;
    
    if (!hasWebkitSpeech && !hasStandardSpeech) {
      console.log('Speech recognition not supported');
      setSpeechSupported(false);
      return;
    }

    // @ts-ignore
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
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + (prev ? " " : "") + transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          alert('Bitte erlauben Sie den Zugriff auf das Mikrofon.');
        } else if (event.error === 'no-speech') {
          alert('Keine Sprache erkannt.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      // @ts-ignore
      window.recognitionInstanceHome = recognition;
      setSpeechSupported(true);

      return () => {
        try {
          recognition.abort();
        } catch (e) {
          // Ignore
        }
      };
    } catch (error) {
      console.error('Failed to init speech:', error);
      setSpeechSupported(false);
    }
  }, []);

  const categories = [
    {
      id: "quran",
      title: t("theQuranTitle"),
      description: t("theQuranDesc"),
      icon: BookOpen,
      link: "/quran",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "duas",
      title: t("duasTitle"),
      description: t("duasDesc"),
      icon: HandHeart,
      link: "/duas",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "prayer-times",
      title: t("prayerTimesTitle"),
      description: t("prayerTimesDesc"),
      icon: Clock,
      link: "/prayer-times",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      id: "qibla",
      title: t("qiblaTitle"),
      description: t("qiblaDesc"),
      icon: Compass,
      link: "/qibla",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "stories",
      title: t("storiesTitle"),
      description: t("storiesDesc"),
      icon: Scroll,
      link: "/stories",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      id: "quiz",
      title: t("quizTitle"),
      description: t("quizDesc"),
      icon: Brain,
      link: "/quiz",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "statistics",
      title: t("progressTitle"),
      description: t("progressDesc"),
      icon: BarChart,
      link: "/statistics",
      gradient: "from-blue-500 to-cyan-600"
    },

    {
      id: "bookmarks",
      title: t("bookmarksTitle"),
      description: t("bookmarksDesc"),
      icon: Bookmark,
      link: "/bookmarks",
      gradient: "from-teal-500 to-emerald-600"
    },
    {
      id: "dhikr",
      title: t("dhikrTitle"),
      description: t("dhikrDesc"),
      icon: Sparkles,
      link: "/dhikr",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      id: "settings",
      title: t("settingsTitle"),
      description: t("settingsDesc"),
      icon: SettingsIcon,
      link: "/settings",
      gradient: "from-slate-500 to-slate-700"
    }
  ];

  // Theme-aware background: Modern theme gets mint green gradient (dark top to light bottom), others use their theme colors
  const backgroundClass = themeConfig.id === 'modern' 
    ? 'min-h-screen bg-gradient-to-b from-teal-200 to-emerald-50'
    : `min-h-screen ${themeConfig.colors.background}`;

  return (
    <div className={backgroundClass}>
      {/* Header */}
      <header className={`${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${themeConfig.colors.text}`}>{t("appTitle")}</h1>
                <p className={`text-xs ${themeConfig.colors.textSecondary}`}>{t("appSubtitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Resume Reading Card */}
      {widgetPrefs.showResumeReading && (
        <div className="container mx-auto px-4 pt-4">
          <ResumeReadingCard />
        </div>
      )}

      {/* Prayer Times Widget */}
      {widgetPrefs.showPrayerTimes && (
        <div className="container mx-auto px-4 mt-4">
          <PrayerTimesWidget />
        </div>
      )}

      {/* KI-Assistent Section */}
      <div className="container mx-auto px-4 mt-4">
        <Card className={`overflow-hidden border-0 bg-transparent shadow-none rounded-3xl`}>
          <button
            onClick={() => setChatExpanded(!chatExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all rounded-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-sm">KI-Assistent</h3>
                <p className="text-xs opacity-90">Stellen Sie Fragen zum Koran und Hadith</p>
              </div>
            </div>
            {chatExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {chatExpanded && (
            <div className={themeConfig.id === 'modern' ? 'bg-gradient-to-b from-teal-200 to-emerald-50' : themeConfig.colors.card}>
              {/* Messages */}
              <ScrollArea className="h-96 px-4 py-4" ref={scrollRef}>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl px-4 py-2">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className={`border-t ${themeConfig.colors.border} p-4`}>
                <p className={`text-xs ${themeConfig.colors.textMuted} mb-2`}>
                  Fragen Sie nach Versen, Duas oder islamischen Themen
                </p>
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Stellen Sie eine Frage..."
                    disabled={isLoading}
                    className="flex-1 text-white placeholder:text-slate-400"
                  />
                  <PushToTalkButton
                    onTranscript={(text) => setInputValue(text)}
                    className="shrink-0"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                    className="shrink-0 bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Main Content - Category Cards */}
      <main className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} href={category.link}>
                <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border ${themeConfig.id === 'modern' ? 'border-emerald-200 bg-emerald-50/80 hover:bg-emerald-50' : `${themeConfig.colors.border} ${themeConfig.colors.card} ${themeConfig.colors.cardHover}`} rounded-3xl`}>
                  <div className="p-4 flex flex-col items-center text-center gap-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-sm font-bold ${themeConfig.colors.text} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-600 transition-all`}>
                      {category.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Ayat des Tages */}
        {widgetPrefs.showAyatOfTheDay && (
          <div className="mt-8">
            <AyatOfTheDay />
          </div>
        )}

        {/* Quick Info Section */}
        <div className="mt-8 text-center">
            <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
            Diese KI-Antworten dienen nur zu Informationszwecken. Bitte konsultieren Sie einen islamischen Gelehrten für wichtige religiöse Fragen.
          </p>
        </div>
      </main>
    </div>
  );
}
