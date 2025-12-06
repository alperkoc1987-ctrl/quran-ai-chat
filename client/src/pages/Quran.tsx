import { useState } from "react";
import { useLocation } from "wouter";
import { SurahList } from "@/components/SurahList";
import { Surah } from "@/lib/types";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Quran() {
  const [, navigate] = useLocation();

  const handleSelectSurah = (surah: Surah) => {
    navigate(`/surah/${surah.number}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-emerald-100 dark:border-slate-700 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-emerald-600 dark:text-emerald-400"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-2 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Der Koran
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lesen Sie den heiligen Koran
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Surah List */}
      <div className="flex-1 overflow-y-auto">
        <SurahList onSelectSurah={handleSelectSurah} />
      </div>
    </div>
  );
}
