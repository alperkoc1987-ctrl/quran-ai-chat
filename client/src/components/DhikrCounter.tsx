/**
 * DhikrCounter.tsx
 * Interactive Dhikr counter with vibration feedback and progress tracking
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Check } from "lucide-react";
import { Dhikr } from "@/data/adhkar";
import { toast } from "sonner";

interface DhikrCounterProps {
  dhikr: Dhikr;
  onComplete?: () => void;
}

export function DhikrCounter({ dhikr, onComplete }: DhikrCounterProps) {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = (count / dhikr.count) * 100;

  // Vibrate on tap (if supported)
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // 50ms vibration
    }
  };

  const handleTap = () => {
    if (count < dhikr.count) {
      setCount(count + 1);
      vibrate();

      // Check if completed
      if (count + 1 === dhikr.count) {
        setIsCompleted(true);
        toast.success("Dhikr abgeschlossen! 🎉", {
          description: `${dhikr.count}x ${dhikr.transliteration}`,
        });
        
        // Save to statistics
        saveDhikrToStats(dhikr.id, dhikr.count);
        
        if (onComplete) {
          onComplete();
        }
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setIsCompleted(false);
  };

  return (
    <Card className="p-6">
      {/* Dhikr Text */}
      <div className="text-center mb-6 max-h-[50vh] overflow-y-auto">
        <div className="text-2xl md:text-3xl font-arabic mb-3 leading-loose text-white">
          {dhikr.arabic}
        </div>
        <div className="text-base md:text-lg text-teal-600 dark:text-teal-400 mb-2 italic">
          {dhikr.transliteration}
        </div>
        <div className="text-sm text-slate-300 dark:text-slate-400">
          {dhikr.translation}
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-teal-600 dark:text-teal-400 mb-2">
          {count}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          von {dhikr.count}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-4">
          <div
            className="bg-gradient-to-r from-teal-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tap Button */}
      <div className="flex gap-3">
        <Button
          onClick={handleTap}
          disabled={isCompleted}
          className={`flex-1 h-20 text-lg font-semibold ${
            isCompleted
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700"
          }`}
        >
          {isCompleted ? (
            <>
              <Check className="w-6 h-6 mr-2" />
              Abgeschlossen
            </>
          ) : (
            "Tap zum Zählen"
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          size="icon"
          className="h-20 w-20"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>
      </div>

      {/* Hadith & Reward */}
      <div className="mt-6 space-y-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <div className="text-xs font-semibold text-green-800 dark:text-green-400 mb-1">
            Belohnung (Fadl)
          </div>
          <div className="text-sm text-green-900 dark:text-green-300">
            {dhikr.reward}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-semibold text-blue-800 dark:text-blue-400 mb-1">
            Hadith
          </div>
          <div className="text-sm text-blue-900 dark:text-blue-300 mb-2">
            {dhikr.hadith}
          </div>
          <div className="text-xs text-blue-700 dark:text-blue-400 font-medium">
            Quelle: {dhikr.source}
          </div>
        </div>
      </div>
    </Card>
  );
}

// Save Dhikr completion to statistics
function saveDhikrToStats(dhikrId: string, count: number) {
  if (typeof window === "undefined") return;

  const today = new Date().toISOString().split("T")[0];
  const statsKey = "dhikr-stats";
  
  const stats = JSON.parse(localStorage.getItem(statsKey) || "{}");
  
  if (!stats[today]) {
    stats[today] = {};
  }
  
  if (!stats[today][dhikrId]) {
    stats[today][dhikrId] = 0;
  }
  
  stats[today][dhikrId] += count;
  
  localStorage.setItem(statsKey, JSON.stringify(stats));
}
