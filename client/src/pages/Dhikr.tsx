/**
 * Dhikr.tsx
 * Dhikr page with categories and authentic Adhkar following Ahlul Sunnah
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Sunrise, Sunset, HandHeart, Moon, Droplet, Sparkles, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DhikrCounter } from "@/components/DhikrCounter";
import { ADHKAR, DHIKR_CATEGORIES, getDhikrByCategory, type DhikrCategory, type Dhikr } from "@/data/adhkar";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";

const CATEGORY_ICONS = {
  morning: Sunrise,
  evening: Sunset,
  after_prayer: HandHeart,
  before_sleep: Moon,
  after_wudu: Droplet,
  general: Sparkles,
};

export default function Dhikr() {
  const [, setLocation] = useLocation();
  const { themeConfig } = useReadingTheme();
  const [selectedCategory, setSelectedCategory] = useState<DhikrCategory | null>(null);
  const [selectedDhikr, setSelectedDhikr] = useState<Dhikr | null>(null);
  const [showTapHint, setShowTapHint] = useState(true);

  // Hide tap hint after 5 seconds or on first tap
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTapHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleDhikrClick = (dhikr: Dhikr) => {
    setShowTapHint(false);
    setSelectedDhikr(dhikr);
  };

  // If a specific Dhikr is selected, show the counter
  if (selectedDhikr) {
    return (
      <div className={`min-h-screen ${themeConfig.colors.background} pb-32`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
          <div className="container mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedDhikr(null)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{selectedDhikr.shortName || selectedDhikr.transliteration}</h1>
              <p className="text-teal-100 text-sm">
                {DHIKR_CATEGORIES[selectedDhikr.category].name}
              </p>
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="container mx-auto p-4 pb-32">
          <DhikrCounter
            dhikr={selectedDhikr}
            onComplete={() => {
              // Could add confetti or celebration animation here
            }}
          />
        </div>
      </div>
    );
  }

  // If a category is selected, show Dhikr list
  if (selectedCategory) {
    const adhkar = getDhikrByCategory(selectedCategory);
    const category = DHIKR_CATEGORIES[selectedCategory];

    return (
      <div className={`min-h-screen ${themeConfig.colors.background} pb-32`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
          <div className="container mx-auto flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{category.name}</h1>
              <p className="text-teal-100 text-sm">{category.description}</p>
            </div>
          </div>
        </div>

        {/* Dhikr List */}
        <div className="container mx-auto p-4 space-y-4">
          {adhkar.map((dhikr) => (
            <Card
              key={dhikr.id}
              className={`p-4 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 relative overflow-hidden`}
              onClick={() => handleDhikrClick(dhikr)}
            >
              {/* Pulsing Tap Hint - Improved */}
              {showTapHint && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg z-10 animate-pulse">
                  <div className="text-center p-4">
                    <Hand className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-semibold text-sm">Tippe auf die Karte,</p>
                    <p className="text-cyan-300 text-xs">um den Dhikr-Zähler zu starten</p>
                  </div>
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="text-xl font-semibold mb-2 text-white drop-shadow-lg">
                    {dhikr.title || dhikr.transliteration}
                  </div>
                  <div className="text-sm text-slate-300 line-clamp-2">
                    {dhikr.translation}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                    {dhikr.count}×
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    mal
                  </div>
                </div>
              </div>

              {/* Reward Preview */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                <div className="text-xs font-semibold text-cyan-400 mb-1">
                  Belohnung:
                </div>
                <div className="text-xs text-slate-300 line-clamp-2">
                  {dhikr.reward}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Default view: Show categories
  return (
    <div className={`min-h-screen ${themeConfig.colors.background} pb-20`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Dhikr & Adhkar</h1>
            <p className="text-teal-100 text-sm">Authentische Erinnerungen nach Ahlul Sunnah</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(DHIKR_CATEGORIES).map(([key, category]) => {
            const Icon = CATEGORY_ICONS[key as DhikrCategory];
            const count = getDhikrByCategory(key as DhikrCategory).length;

            return (
              <Card
                key={key}
                className={`p-6 cursor-pointer hover:shadow-lg transition-all hover:scale-105 ${themeConfig.colors.card} border ${themeConfig.colors.border}`}
                onClick={() => setSelectedCategory(key as DhikrCategory)}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-gradient-to-br from-teal-400 to-emerald-500 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${themeConfig.colors.text}`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                      {count} Adhkar
                    </p>
                  </div>
                </div>
                <p className={`text-sm ${themeConfig.colors.textMuted}`}>
                  {category.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className={`mt-6 p-6 ${themeConfig.colors.card} border ${themeConfig.colors.border}`}>
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className={`font-semibold text-lg mb-2 ${themeConfig.colors.text}`}>
                Über diese Adhkar
              </h3>
              <p className={`text-sm ${themeConfig.colors.textSecondary} mb-3`}>
                Alle Adhkar auf dieser Seite stammen aus authentischen Hadiths (Sahih oder Hasan) 
                gemäß der Methodik von Ahlul Sunnah wal Jama'ah.
              </p>
              <p className={`text-xs ${themeConfig.colors.textMuted}`}>
                Quellen: Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud, Jami' at-Tirmidhi, 
                Sunan Ibn Majah - authentifiziert von Gelehrten wie Shaykh Al-Albani (rahimahullah).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
