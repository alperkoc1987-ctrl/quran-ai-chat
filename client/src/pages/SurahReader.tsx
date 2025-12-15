/**
 * SurahReader.tsx
 * Fullscreen page for reading Quran Surahs with Arabic text, transliteration, and translation.
 */

import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { fetchSurahComplete, fetchAllSurahs } from "@/lib/api";
import { SurahWithAyahs, Surah } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Pause,
  Heart, 
  Copy, 
  Share2, 
  Settings,
  Loader2,
  BookOpen
} from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";
import { useTransliteration } from "@/contexts/TransliterationContext";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";
import { getTranslationEdition } from "@/lib/translationEditions";
import { toast } from "sonner";
import { saveReadingProgress } from "@/lib/readingProgress";
import { recordVerseRead, recordReadingTime } from "@/lib/statistics";
import { BookmarkButton } from "@/components/BookmarkButton";
import { VerseNoteDialog } from "@/components/VerseNoteDialog";

export default function SurahReader() {
  const [, params] = useRoute("/surah/:number");
  const [location, navigate] = useLocation();
  const surahNumber = params?.number ? parseInt(params.number) : null;
  
  // Parse URL parameters for verse highlighting
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const targetVerseNumber = urlParams.get('verse') ? parseInt(urlParams.get('verse')!) : null;
  const shouldHighlight = urlParams.get('highlight') === 'true';
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(null);

  const { showTransliteration } = useTransliteration();
  const { language } = useLanguage();
  const audioPlayer = useAudioPlayer();
  
  // Map UI language to Quran translation edition
  const getEditionForLanguage = (lang: Language): string => {
    const mapping: Record<Language, string> = {
      de: "de.bubenheim",
      en: "en.sahih",
      tr: "tr.diyanet",
      ar: "quran-uthmani", // Arabic only - no translation
    };
    return mapping[lang];
  };
  const { themeConfig } = useReadingTheme();
  const [surahData, setSurahData] = useState<SurahWithAyahs | null>(null);
  const [translationData, setTranslationData] = useState<SurahWithAyahs | null>(null);
  const [transliterationData, setTransliterationData] = useState<SurahWithAyahs | null>(null);
  const [surahInfo, setSurahInfo] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [verseRepeatCount, setVerseRepeatCount] = useState<number>(1); // How many times to repeat each verse
  const [showRepeatDialog, setShowRepeatDialog] = useState(false);
  const [playingVerse, setPlayingVerse] = useState<number | null>(null); // Currently playing verse number
  const [currentRepeat, setCurrentRepeat] = useState<number>(0); // Current repeat iteration
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

        // Fetch complete Surah data with UI language
        const translationEdition = getEditionForLanguage(language);
        const data = await fetchSurahComplete(
          surahNumber,
          translationEdition,
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
  }, [surahNumber, language]);

  // Track reading time with interval timer
  useEffect(() => {
    if (!surahInfo || !surahData) return;

    // Record 10 seconds of reading time every 10 seconds
    const timeTracker = setInterval(() => {
      recordReadingTime(10); // 10 seconds
    }, 10000); // Every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(timeTracker);
  }, [surahInfo, surahData]);

  // Save reading progress when user scrolls through verses
  useEffect(() => {
    if (!surahInfo || !surahData) return;

    const handleScroll = () => {
      // Find the verse currently in view
      const verses = document.querySelectorAll('[data-verse-number]');
      const scrollTop = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const middleOfScreen = scrollTop + windowHeight / 2;

      let currentVerse = 1;
      verses.forEach((verse) => {
        const rect = (verse as HTMLElement).getBoundingClientRect();
        const verseTop = rect.top + scrollTop;
        if (verseTop < middleOfScreen) {
          currentVerse = parseInt((verse as HTMLElement).dataset.verseNumber || '1');
        }
      });

      // Save progress
      saveReadingProgress(surahInfo.number, currentVerse, surahInfo.englishName);
      
      // Record verse read for statistics
      recordVerseRead(surahInfo.number);
    };

    // Add scroll listener to window
    window.addEventListener('scroll', handleScroll);
    // Also save progress when component mounts
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [surahInfo, surahData]);

  // Scroll to verse if URL parameters specify a target verse
  useEffect(() => {
    // Only run when we have data AND we're not loading anymore
    if (isLoading || !surahData || !surahInfo || !targetVerseNumber) {
      return;
    }

    console.log('[SurahReader] Data loaded, attempting verse scroll to:', targetVerseNumber);

    // Wait for DOM to be fully rendered
    const scrollTimer = setTimeout(() => {
      const element = document.getElementById(`verse-${targetVerseNumber}`);
      console.log('[SurahReader] Looking for element:', `verse-${targetVerseNumber}`, 'found:', !!element);
      
      if (element) {
        console.log('[SurahReader] Scrolling to verse:', targetVerseNumber);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        if (shouldHighlight) {
          console.log('[SurahReader] Highlighting verse:', targetVerseNumber);
          setHighlightedVerse(targetVerseNumber);
          setTimeout(() => setHighlightedVerse(null), 3000);
        }
      } else {
        console.error('[SurahReader] Verse element not found:', `verse-${targetVerseNumber}`);
      }
    }, 800); // Longer delay to ensure all verses are rendered

    return () => clearTimeout(scrollTimer);
  }, [isLoading, surahData, surahInfo, targetVerseNumber, shouldHighlight]); // Trigger when data or target changes

  // Auto-scroll to currently playing verse
  useEffect(() => {
    if (!audioPlayer.state.isPlaying || !surahInfo) return;
    if (audioPlayer.state.surahNumber !== surahInfo.number) return;

    const currentVerse = audioPlayer.state.currentVerseIndex + 1;
    const element = document.getElementById(`verse-${currentVerse}`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightedVerse(currentVerse);
      
      // Remove highlight after 2 seconds
      const timeout = setTimeout(() => {
        setHighlightedVerse(null);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [audioPlayer.state.currentVerseIndex, audioPlayer.state.isPlaying, audioPlayer.state.surahNumber, surahInfo]);

   // Toggle play/pause for entire Surah
  const toggleSurahPlayback = async () => {
    if (!surahInfo) {
      toast.error("Surah-Daten nicht geladen");
      return;
    }

    // Check if this surah is already playing
    const isThisSurahPlaying = audioPlayer.state.surahNumber === surahInfo.number && audioPlayer.state.isPlaying;

    if (isThisSurahPlaying) {
      audioPlayer.pause();
      toast.info("Wiedergabe pausiert");
    } else if (audioPlayer.state.surahNumber === surahInfo.number && !audioPlayer.state.isPlaying) {
      // Resume this surah
      try {
        await audioPlayer.resume();
        toast.success("Wiedergabe fortgesetzt");
      } catch (error: any) {
        console.error("Audio playback error:", error);
        handleAudioError(error);
      }
    } else {
      // Start playing this surah from the beginning
      try {
        await audioPlayer.playSurah(surahInfo.number, surahInfo.englishName, surahInfo.numberOfAyahs);
        toast.success("Wiedergabe gestartet", {
          description: "Die Surah wird jetzt vorgelesen."
        });
      } catch (error: any) {
        console.error("Audio playback error:", error);
        handleAudioError(error);
      }
    }
  };

  const handleAudioError = (error: any) => {
    if (error.name === 'NotAllowedError' || error.message?.includes('play')) {
      toast.error("Wiedergabe blockiert", {
        description: "Bitte tippen Sie nochmal auf Play, um die Wiedergabe zu starten. Ihr Browser blockiert automatisches Abspielen.",
        duration: 5000
      });
    } else if (error.message?.includes('timeout') || error.message?.includes('load')) {
      toast.error("Ladefehler", {
        description: "Die Audio-Datei konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
        duration: 5000
      });
    } else if (error.message?.includes('network')) {
      toast.error("Netzwerkfehler", {
        description: "Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.",
        duration: 5000
      });
    } else {
      toast.error("Wiedergabe fehlgeschlagen", {
        description: `Ein Fehler ist aufgetreten: ${error.message || 'Unbekannter Fehler'}. Bitte versuchen Sie es erneut.`,
        duration: 5000
      });
    }
  };

  // Play a specific verse
  const playVerse = async (verseNumber: number) => {
    if (!surahInfo) {
      toast.error("Surah-Daten nicht geladen");
      return;
    }

    try {
      // Start playing this surah from the specified verse
      await audioPlayer.playSurah(surahInfo.number, surahInfo.englishName, surahInfo.numberOfAyahs, verseNumber - 1);
      toast.success(`Vers ${verseNumber} wird abgespielt`);
    } catch (error) {
      console.error("Audio playback error:", error);
      toast.error("Wiedergabe fehlgeschlagen");
    }
  };

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
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Vers kopiert!", {
        description: `${surahInfo?.englishName} - Vers ${verseNumber} wurde in die Zwischenablage kopiert.`
      });
    }).catch(() => {
      toast.error("Fehler beim Kopieren", {
        description: "Der Vers konnte nicht kopiert werden."
      });
    });
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

  // Play single verse with repeat functionality
  const playVerseWithRepeat = async (verseNumber: number) => {
    if (!surahInfo) return;

    // If already playing this verse, stop it
    if (playingVerse === verseNumber) {
      setPlayingVerse(null);
      setCurrentRepeat(0);
      audioPlayer.stop();
      return;
    }

    // Start playing the verse
    setPlayingVerse(verseNumber);
    setCurrentRepeat(1);

    // Play the verse N times
    for (let i = 0; i < verseRepeatCount; i++) {
      if (playingVerse !== verseNumber && i > 0) break; // User stopped playback
      
      setCurrentRepeat(i + 1);
      
      // Play single verse audio
      const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahInfo.number}_${verseNumber}.mp3`;
      
      // Wait for audio to finish before next repeat
      await new Promise<void>((resolve) => {
        const audio = new Audio(audioUrl);
        audio.addEventListener('ended', () => resolve());
        audio.addEventListener('error', () => resolve());
        audio.play();
      });
    }

    // Finished all repeats
    setPlayingVerse(null);
    setCurrentRepeat(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          <p className="text-sm text-slate-600 dark:text-slate-400">Lade Sure...</p>
        </div>
      </div>
    );
  }

  if (error || !surahData || !surahInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || "Fehler beim Laden"}</p>
          <Button onClick={() => navigate("/chat")} variant="outline">
            Zurück
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.colors.background}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/quran")}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                {surahInfo.englishName}
                <span className="text-teal-600 font-arabic text-xl">{surahInfo.name}</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {surahInfo.englishNameTranslation} • {surahInfo.revelationType} • {surahInfo.numberOfAyahs} Verse
              </p>
              {/* Subtle Audio Indicator */}
              {audioPlayer.state.surahNumber === surahInfo?.number && audioPlayer.state.isPlaying && (
                <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Wird abgespielt (Vers {audioPlayer.state.currentVerseIndex + 1}/{surahInfo.numberOfAyahs})
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRepeatDialog(true)}
              className="text-xs text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Wiederholung: {verseRepeatCount}x
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
              className="text-slate-600 hover:text-slate-900"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
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
              <Button
                onClick={toggleSurahPlayback}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                size="sm"
              >
                {(audioPlayer.state.surahNumber === surahInfo?.number && audioPlayer.state.isPlaying) ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Surah abspielen
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="container max-w-4xl mx-auto px-4 pb-32 space-y-6">
        {/* Bismillah */}
        {surahInfo.number !== 1 && surahInfo.number !== 9 && (
          <div className="bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-700">
            <p className="text-center text-3xl font-arabic text-slate-100 mb-3">
              ﷽ بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            {showTransliteration && transliterationData?.ayahs[0] && (
              <p className="text-center text-teal-600 italic text-sm mb-2">
                Bismillaahir Rahmaanir Raheem
              </p>
            )}
            <p className="text-center text-slate-300 text-sm">
              Im Namen Allahs, des Allerbarmers, des Barmherzigen.
            </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <span className="text-xs text-slate-400">1</span>
            </div>
          </div>
        )}

        {/* Verses */}
        {surahData.ayahs.map((ayah, index) => {
          const verseNumber = ayah.numberInSurah;
          const translation = translationData?.ayahs[index];
          const transliteration = transliterationData?.ayahs[index];
          const isCurrentlyPlaying = audioPlayer.state.surahNumber === surahInfo?.number && audioPlayer.state.currentVerseIndex === index;

          return (
            <div
              key={ayah.number}
              id={`verse-${verseNumber}`}
              data-verse-number={verseNumber}
              className={`${themeConfig.colors.card} rounded-lg p-6 shadow-sm border transition-all duration-500 ${
                highlightedVerse === verseNumber 
                  ? "border-teal-500 ring-4 ring-teal-400/50 dark:ring-teal-500/50"
                  : isCurrentlyPlaying 
                    ? `${themeConfig.colors.accent.replace('bg-', 'border-')} ring-2` 
                    : themeConfig.colors.border
              }`}
            >
              {/* Arabic Text */}
              <p className={`text-right text-2xl md:text-3xl font-arabic leading-loose ${themeConfig.colors.arabic} mb-4`}>
                {ayah.text}
              </p>

              {/* Transliteration */}
              {showTransliteration && transliteration && (
                <p className={`${themeConfig.colors.transliteration} italic text-sm mb-3`}>
                  {transliteration.text}
                </p>
              )}

              {/* Translation (based on UI language) */}
              {translation && language !== "ar" && (
                <p className={`${themeConfig.colors.translation} leading-relaxed`}>
                  {translation.text}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <span className={`text-sm font-medium ${themeConfig.colors.verseNumber}`}>{verseNumber}</span>
                <div className="flex items-center gap-2">
                  <BookmarkButton
                    surahNumber={surahInfo.number}
                    verseNumber={verseNumber}
                    surahName={surahInfo.englishName}
                    verseText={ayah.text}
                    translation={translation?.text || ''}
                    className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400"
                  />
                  <VerseNoteDialog
                    surahNumber={surahInfo.number}
                    verseNumber={verseNumber}
                    surahName={surahInfo.englishName}
                    verseText={ayah.text}
                    translation={translation?.text || ''}
                    className="h-8 w-8 text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-600 hover:text-teal-600"
                    onClick={() => copyVerse(verseNumber)}
                    title="Vers kopieren"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-600 hover:text-teal-600"
                    onClick={() => shareVerse(verseNumber)}
                    title="Vers teilen"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${playingVerse === verseNumber ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}
                      onClick={() => playVerseWithRepeat(verseNumber)}
                      title="Vers abspielen"
                    >
                      {playingVerse === verseNumber ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    {playingVerse === verseNumber && (
                      <span className="text-xs text-teal-600 font-medium">
                        {currentRepeat}/{verseRepeatCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Repeat Count Dialog */}
      {showRepeatDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowRepeatDialog(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Wiederholungen pro Vers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Wählen Sie, wie oft jeder Vers wiederholt werden soll
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 5, 7, 10].map((count) => (
                <Button
                  key={count}
                  variant={verseRepeatCount === count ? "default" : "outline"}
                  className={verseRepeatCount === count ? "bg-teal-600 hover:bg-teal-700" : ""}
                  onClick={() => {
                    setVerseRepeatCount(count);
                    setShowRepeatDialog(false);
                    toast.success(`Wiederholung auf ${count}x gesetzt`);
                  }}
                >
                  {count}x
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
