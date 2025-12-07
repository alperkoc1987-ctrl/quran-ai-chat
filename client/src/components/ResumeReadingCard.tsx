/**
 * ResumeReadingCard.tsx
 * Card component to display and resume last reading position
 */

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";
import { useLocation } from "wouter";
import { getReadingProgress, clearReadingProgress, ReadingProgress } from "@/lib/readingProgress";

export function ResumeReadingCard() {
  const [progress, setProgress] = useState<ReadingProgress | null>(null);
  const [, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedProgress = getReadingProgress();
    setProgress(savedProgress);
  }, []);

  const handleResume = () => {
    if (progress) {
      navigate(`/surah/${progress.surahNumber}`);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleClear = () => {
    clearReadingProgress();
    setProgress(null);
    setIsVisible(false);
  };

  if (!progress || !isVisible) {
    return null;
  }

  const timeSince = Math.floor((Date.now() - progress.timestamp) / 1000 / 60); // minutes
  let timeText = "";
  if (timeSince < 1) {
    timeText = "Gerade eben";
  } else if (timeSince < 60) {
    timeText = `Vor ${timeSince} Minute${timeSince > 1 ? "n" : ""}`;
  } else if (timeSince < 1440) {
    const hours = Math.floor(timeSince / 60);
    timeText = `Vor ${hours} Stunde${hours > 1 ? "n" : ""}`;
  } else {
    const days = Math.floor(timeSince / 1440);
    timeText = `Vor ${days} Tag${days > 1 ? "en" : ""}`;
  }

  return (
    <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-none shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
      
      <div className="relative p-4">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Lesen fortsetzen</h3>
            <p className="text-teal-50 text-sm mb-1">
              {progress.surahName} - Vers {progress.verseNumber}
            </p>
            <p className="text-teal-100 text-xs mb-3">{timeText}</p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleResume}
                size="sm"
                className="bg-white text-teal-700 hover:bg-teal-50 font-semibold"
              >
                Fortsetzen
              </Button>
              <Button
                onClick={handleClear}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                Löschen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
