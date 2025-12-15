/**
 * SurahViewer.tsx
 * Component for displaying Surah content with Arabic text, transliteration, and translations.
 */

import { useState, useEffect } from "react";
import { Surah, SurahWithAyahs } from "@/lib/types";
import { fetchSurahWithAyahs } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useTransliteration } from "@/contexts/TransliterationContext";

interface SurahViewerProps {
  surah: Surah;
  onClose: () => void;
}

// Language to Quran edition mapping
const EDITION_MAPPING: Record<Language, string> = {
  de: "de.bubenheim",
  en: "en.sahih",
  tr: "tr.diyanet",
  ar: "quran-uthmani", // Arabic only mode - no translation
};

export function SurahViewer({ surah, onClose }: SurahViewerProps) {
  const { language } = useLanguage();
  const { showTransliteration } = useTransliteration();
  
  const [arabicData, setArabicData] = useState<SurahWithAyahs | null>(null);
  const [transliterationData, setTransliterationData] = useState<SurahWithAyahs | null>(null);
  const [translationData, setTranslationData] = useState<SurahWithAyahs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSurah = async () => {
      try {
        setIsLoading(true);
        
        // Always fetch Arabic text
        const arabic = await fetchSurahWithAyahs(surah.number, "quran-uthmani");
        setArabicData(arabic);

        // Always fetch transliteration
        const transliteration = await fetchSurahWithAyahs(surah.number, "en.transliteration");
        setTransliterationData(transliteration);

        // Fetch translation based on UI language (except for Arabic-only mode)
        if (language !== "ar") {
          const translationEdition = EDITION_MAPPING[language];
          const translation = await fetchSurahWithAyahs(surah.number, translationEdition);
          setTranslationData(translation);
        } else {
          setTranslationData(null);
        }

        setError(null);
      } catch (err) {
        setError("Fehler beim Laden der Sure");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSurah();
  }, [surah.number, language]);

  if (isLoading) {
    return (
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        </div>
      </Card>
    );
  }

  if (error || !arabicData) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <div className="text-center text-red-600">{error || "Fehler beim Laden"}</div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-white border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{surah.englishName}</h2>
          <p className="text-sm text-gray-500">
            {surah.englishNameTranslation} • {surah.numberOfAyahs} Verse
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-slate-50">
        <div className="space-y-6 pr-4">
          {arabicData.ayahs.map((ayah, index) => (
            <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
              {/* Verse Number */}
              <p className="text-xs text-gray-500 mb-2">
                Vers {ayah.numberInSurah}
              </p>

              {/* 1. Arabic Text - ALWAYS VISIBLE */}
              <p className="text-right text-2xl leading-relaxed text-gray-900 mb-3 font-arabic" dir="rtl">
                {ayah.text}
              </p>

              {/* 2. Transliteration - VISIBLE if enabled (default ON) */}
              {showTransliteration && transliterationData && transliterationData.ayahs[index] && (
                <p className="text-sm text-gray-600 italic leading-relaxed mb-2">
                  {transliterationData.ayahs[index].text}
                </p>
              )}

              {/* 3. Translation - VISIBLE except in Arabic-only mode */}
              {translationData && translationData.ayahs[index] && (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {translationData.ayahs[index].text}
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
