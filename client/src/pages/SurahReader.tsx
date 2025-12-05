/**
 * SurahReader.tsx
 * Fullscreen page for reading Quran Surahs with Arabic text, transliteration, and translation.
 */

import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { fetchSurahComplete, fetchAllSurahs } from "@/lib/api";
import { SurahWithAyahs, Surah } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Heart, 
  Copy, 
  Share2, 
  Settings,
  Loader2,
  BookOpen
} from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";
import { useTransliteration } from "@/contexts/TransliterationContext";

export default function SurahReader() {
  const [, params] = useRoute("/surah/:number");
  const [, navigate] = useLocation();
  const surahNumber = params?.number ? parseInt(params.number) : null;

  const { showTransliteration } = useTransliteration();
  const [surahData, setSurahData] = useState<SurahWithAyahs | null>(null);
  const [translationData, setTranslationData] = useState<SurahWithAyahs | null>(null);
  const [transliterationData, setTransliterationData] = useState<SurahWithAyahs | null>(null);
  const [surahInfo, setSurahInfo] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load Surah data
  useEffect(() => {
    if (!surahNumber) {
      setError("Ungültige Surah-Nummer");
      setIsLoading(false);
      return;
    }

    const loadSurah = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all surahs to get metadata
        const allSurahs = await fetchAllSurahs();
        const surah = allSurahs.find((s) => s.number === surahNumber);
        if (!surah) {
          throw new Error("Surah nicht gefunden");
        }
        setSurahInfo(surah);

        // Fetch complete Surah data
        const data = await fetchSurahComplete(
          surahNumber,
          "de.bubenheim",
          true // Always fetch transliteration, show/hide based on user preference
        );

        setSurahData(data.arabic);
        setTranslationData(data.translation);
        setTransliterationData(data.transliteration || null);
        setError(null);
      } catch (err) {
        setError("Fehler beim Laden der Sure");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSurah();
  }, [surahNumber]);

  const toggleFavorite = (verseNumber: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(verseNumber)) {
        newFavorites.delete(verseNumber);
      } else {
        newFavorites.add(verseNumber);
      }
      return newFavorites;
    });
  };

  const copyVerse = (verseNumber: number) => {
    if (!surahData || !translationData) return;
    
    const arabicText = surahData.ayahs[verseNumber - 1]?.text || "";
    const translationText = translationData.ayahs[verseNumber - 1]?.text || "";
    const translitText = transliterationData?.ayahs[verseNumber - 1]?.text || "";
    
    let textToCopy = `${surahInfo?.englishName} (${surahInfo?.name}) - Vers ${verseNumber}\n\n`;
    textToCopy += `${arabicText}\n\n`;
    if (showTransliteration && translitText) {
      textToCopy += `${translitText}\n\n`;
    }
    textToCopy += `${translationText}`;
    
    navigator.clipboard.writeText(textToCopy);
    // Could add a toast notification here
  };

  const shareVerse = (verseNumber: number) => {
    if (!surahData || !translationData) return;
    
    const arabicText = surahData.ayahs[verseNumber - 1]?.text || "";
    const translationText = translationData.ayahs[verseNumber - 1]?.text || "";
    
    const shareText = `${surahInfo?.englishName} - Vers ${verseNumber}\n\n${arabicText}\n\n${translationText}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${surahInfo?.englishName} - Vers ${verseNumber}`,
        text: shareText,
      });
    } else {
      copyVerse(verseNumber);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-sm text-slate-600">Lade Sure...</p>
        </div>
      </div>
    );
  }

  if (error || !surahData || !surahInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-red-600 mb-4">{error || "Fehler beim Laden"}</p>
          <Button onClick={() => navigate("/chat")} variant="outline">
            Zurück
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/chat")}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {surahInfo.englishName}
                <span className="text-teal-600 font-arabic text-xl">{surahInfo.name}</span>
              </h1>
              <p className="text-xs text-slate-500">
                {surahInfo.englishNameTranslation} • {surahInfo.revelationType} • {surahInfo.numberOfAyahs} Verse
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="text-slate-600 hover:text-slate-900"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Bismillah Header Card */}
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">{surahInfo.englishName}</h2>
              <p className="text-teal-50 text-sm">{surahInfo.englishNameTranslation}</p>
              <p className="text-teal-100 text-xs mt-1">
                {surahInfo.revelationType === "Meccan" ? "Mekkanisch" : "Medinensisch"} • {surahInfo.numberOfAyahs} Verse
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-arabic mb-2">{surahInfo.name}</p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Play className="w-4 h-4 mr-2" />
                Surah abspielen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="container max-w-4xl mx-auto px-4 pb-8">
        <div className="space-y-6">
          {surahData.ayahs.map((ayah, index) => {
            const verseNumber = ayah.numberInSurah;
            const isFavorite = favorites.has(verseNumber);

            return (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
              >
                {/* Bismillah for first verse (except Surah 1 and 9) */}
                {index === 0 && surahNumber !== 1 && surahNumber !== 9 && (
                  <p className="text-center text-2xl font-arabic text-teal-600 mb-6">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                  </p>
                )}

                {/* Arabic Text */}
                <p className="text-right text-2xl leading-loose text-slate-900 mb-4 font-arabic">
                  {ayah.text}
                </p>

                {/* Transliteration (if enabled) */}
                {showTransliteration && transliterationData && transliterationData.ayahs[index] && (
                  <p className="text-left text-base text-teal-600 mb-3 italic leading-relaxed">
                    {transliterationData.ayahs[index].text}
                  </p>
                )}

                {/* Translation */}
                {translationData && translationData.ayahs[index] && (
                  <p className="text-left text-base text-slate-700 mb-4 leading-relaxed">
                    {translationData.ayahs[index].text}
                  </p>
                )}

                {/* Verse Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="text-sm font-semibold text-slate-900 bg-slate-100 px-3 py-1 rounded-full">
                    {verseNumber}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                      title="Vers abspielen"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(verseNumber)}
                      className={isFavorite ? "text-red-500 hover:text-red-600" : "text-slate-400 hover:text-slate-600"}
                      title="Zu Favoriten hinzufügen"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyVerse(verseNumber)}
                      className="text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                      title="Vers kopieren"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => shareVerse(verseNumber)}
                      className="text-slate-600 hover:text-slate-700 hover:bg-slate-100"
                      title="Vers teilen"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
