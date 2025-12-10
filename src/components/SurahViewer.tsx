/**
 * SurahViewer.tsx
 * Component for displaying Surah content with Arabic text and translations.
 */

import { useState, useEffect } from "react";
import { Surah, SurahWithAyahs, Language } from "@/lib/types";
import { fetchSurahWithAyahs } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SurahViewerProps {
  surah: Surah;
  language: Language;
  onClose: () => void;
}

export function SurahViewer({ surah, language, onClose }: SurahViewerProps) {
  const [surahData, setSurahData] = useState<SurahWithAyahs | null>(null);
  const [translationData, setTranslationData] = useState<SurahWithAyahs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const translationEdition = language === Language.German ? "de.bubenheim" : "en.sahih";

  useEffect(() => {
    const loadSurah = async () => {
      try {
        setIsLoading(true);
        const arabic = await fetchSurahWithAyahs(surah.number, "quran-uthmani");
        setSurahData(arabic);

        const translation = await fetchSurahWithAyahs(surah.number, translationEdition);
        setTranslationData(translation);

        setError(null);
      } catch (err) {
        setError("Fehler beim Laden der Sure");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSurah();
  }, [surah.number, translationEdition]);

  if (isLoading) {
    return (
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        </div>
      </Card>
    );
  }

  if (error || !surahData) {
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
          {surahData.ayahs.map((ayah, index) => (
            <div key={index} className="border-b border-slate-200 pb-4 last:border-b-0">
              {/* Arabic Text */}
              <p className="text-right text-lg leading-relaxed text-gray-900 mb-2 font-arabic">
                {ayah.text}
              </p>

              {/* Verse Number */}
              <p className="text-xs text-gray-500 mb-2">
                Vers {ayah.numberInSurah}
              </p>

              {/* Translation */}
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
