/**
 * MessageBubble.tsx
 * Component for displaying individual chat messages with source citations.
 */

import { ChatMessage, SourceType, SourceReference } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Quote, X, Volume2, StopCircle, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

interface MessageBubbleProps {
  message: ChatMessage;
  onOpenSurah?: (surahNumber: number, ayahNumber?: number) => void;
}

function SurahNavigationButton({ surahNumber, ayahNumber, onNavigate }: { surahNumber: number; ayahNumber?: number; onNavigate: () => void }) {
  const [, setLocation] = useLocation();
  
  const handleNavigate = () => {
    onNavigate();
    setLocation(`/surah/${surahNumber}${ayahNumber ? `?verse=${ayahNumber}&highlight=true` : ''}`);
  };
  
  return (
    <Button 
      className="w-full gap-2 bg-teal-600 hover:bg-teal-700"
      onClick={handleNavigate}
    >
      <ExternalLink className="w-4 h-4" />
      Im Koran öffnen
    </Button>
  );
}

export function MessageBubble({ message, onOpenSurah }: MessageBubbleProps) {
  const { themeConfig } = useReadingTheme();
  const isUser = message.isUser;
  const [selectedSource, setSelectedSource] = useState<SourceReference | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingTTS, setIsLoadingTTS] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [, setLocation] = useLocation();

  // Handle speech synthesis with OpenAI TTS
  const handleSpeak = async () => {
    if (isSpeaking && audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsSpeaking(false);
      setAudioElement(null);
    } else {
      try {
        setIsLoadingTTS(true);
        setIsSpeaking(true);
        
        // Call backend TTS API
        const response = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message.text }),
        });

        if (!response.ok) {
          throw new Error("TTS generation failed");
        }

        // Create audio from response
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsSpeaking(false);
          setAudioElement(null);
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          setAudioElement(null);
          URL.revokeObjectURL(audioUrl);
        };

        setAudioElement(audio);
        await audio.play();
        setIsLoadingTTS(false);
      } catch (error) {
        console.error("TTS error:", error);
        setIsSpeaking(false);
        setIsLoadingTTS(false);
        setAudioElement(null);
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audioElement]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg`}>
        {/* Main message bubble */}
        <div
          className={`rounded-lg px-4 py-3 relative group ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : `${themeConfig.colors.card} ${themeConfig.colors.text} rounded-bl-none border ${themeConfig.colors.border}`
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
          
          {/* TTS Button (only for AI messages) */}
          {!isUser && (
            <div className="absolute -right-10 top-0 opacity-0 group-hover:opacity-100 transition-opacity md:block hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSpeak}
                disabled={isLoadingTTS}
                className="h-8 w-8 text-gray-500 hover:text-teal-600 disabled:opacity-50"
                title={isLoadingTTS ? "Wird geladen..." : isSpeaking ? "Vorlesen stoppen" : "Vorlesen"}
              >
                {isLoadingTTS ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isSpeaking ? (
                  <StopCircle className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </Button>
            </div>
          )}
          
          {/* Mobile TTS Button (always visible on mobile inside bubble) */}
          {!isUser && (
            <div className="md:hidden mt-2 flex justify-end border-t border-gray-200 pt-2">
               <button
                onClick={handleSpeak}
                disabled={isLoadingTTS}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingTTS ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" /> Lädt...
                  </>
                ) : isSpeaking ? (
                  <>
                    <StopCircle className="w-3 h-3" /> Stopp
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3" /> Vorlesen
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Sources display (only for AI responses) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className={`flex items-center gap-2 text-xs font-semibold ${themeConfig.colors.textSecondary}`}>
              <BookOpen className="w-4 h-4" />
              Quellen
            </div>

            {message.sources.map((source) => {
              const handleSourceClick = () => {
                console.log('[MessageBubble] Source clicked:', source);
                if (source.type === SourceType.Quran && source.surahNumber) {
                  const url = `/surah/${source.surahNumber}${source.ayahNumber ? `?verse=${source.ayahNumber}&highlight=true` : ''}`;
                  console.log('[MessageBubble] Navigating to:', url);
                  console.log('[MessageBubble] ayahNumber:', source.ayahNumber);
                  setLocation(url);
                  // Force scroll to top after navigation
                  setTimeout(() => window.scrollTo(0, 0), 100);
                } else {
                  setSelectedSource(source);
                }
              };
              
              return (
              <Card
                key={source.id}
                onClick={handleSourceClick}
                className={`p-3 ${themeConfig.colors.card} ${themeConfig.colors.border} hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer`}
              >
                <div className="flex items-start gap-2">
                  <Quote className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          source.type === SourceType.Quran
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {source.type}
                      </Badge>
                    </div>
                    <p className={`text-xs font-medium ${themeConfig.colors.text} mb-1`}>
                      {source.reference}
                    </p>
                    <p className={`text-xs ${themeConfig.colors.textSecondary} italic line-clamp-2`}>
                      "{source.text}"
                    </p>
                  </div>
                </div>
              </Card>
              );
            })}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`text-xs mt-1 ${
            isUser ? "text-blue-200 text-right" : themeConfig.colors.textSecondary
          }`}
        >
          {message.timestamp.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {/* Source Detail Modal */}
      {selectedSource !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
          <div className={`${themeConfig.colors.card} rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className={`${themeConfig.colors.backgroundSecondary} border-b ${themeConfig.colors.border} px-6 py-4 flex items-center justify-between`}>
              <div>
                <Badge
                  className={`text-xs mb-2 ${
                    selectedSource?.type === SourceType.Quran
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedSource?.type}
                </Badge>
                <h3 className={`text-lg font-semibold ${themeConfig.colors.text}`}>
                  {selectedSource?.reference}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSource(null)}
                className={`${themeConfig.colors.textSecondary} hover:${themeConfig.colors.text}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <p className={`${themeConfig.colors.text} leading-relaxed text-base mb-6`}>
                {selectedSource?.text}
              </p>
              
              {selectedSource?.type === SourceType.Quran && selectedSource.surahNumber && (
                <SurahNavigationButton 
                  surahNumber={selectedSource.surahNumber}
                  ayahNumber={selectedSource.ayahNumber}
                  onNavigate={() => setSelectedSource(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
