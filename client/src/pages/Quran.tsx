import { useState } from "react";
import { useLocation } from "wouter";
import { SurahList } from "@/components/SurahList";
import { Surah } from "@/lib/types";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Quran() {
  const { themeConfig } = useReadingTheme();
  const { t } = useLanguage();
  const [, navigate] = useLocation();

  const handleSelectSurah = (surah: Surah) => {
    navigate(`/surah/${surah.number}`);
  };

  return (
    <div className={`flex flex-col h-screen ${themeConfig.colors.background}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 ${themeConfig.colors.backgroundSecondary}/80 backdrop-blur-sm border-b ${themeConfig.colors.border} sticky top-0 z-10`}>
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
              <h1 className={`text-lg font-semibold ${themeConfig.colors.text}`}>
                {t.quran.title}
              </h1>
              <p className={`text-xs ${themeConfig.colors.textSecondary}`}>
                {t.home.categories.quran}
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
