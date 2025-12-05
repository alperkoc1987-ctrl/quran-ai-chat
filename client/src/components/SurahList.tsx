/**
 * SurahList.tsx
 * Component for displaying a vertical list of all Surahs with selection functionality.
 */

import { useState, useEffect, useRef } from "react";
import { Surah } from "@/lib/types";
import { fetchAllSurahs } from "@/lib/api";
import { Loader2, Play, Pause, Heart } from "lucide-react";
import { getSurahAudioUrls, SurahAudioPlayer } from "@/lib/audio";
import { toast } from "sonner";
import { CircularProgress } from "@/components/CircularProgress";
import { getSurahProgress } from "@/lib/readingProgress";

interface SurahListProps {
  onSelectSurah: (surah: Surah) => void;
  selectedSurahNumber?: number;
}

export function SurahList({ onSelectSurah, selectedSurahNumber }: SurahListProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [playingSurahNumber, setPlayingSurahNumber] = useState<number | null>(null);
  const audioPlayerRef = useRef<SurahAudioPlayer | null>(null);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllSurahs();
        setSurahs(data);
        setError(null);
      } catch (err) {
        setError("Fehler beim Laden der Suren");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSurahs();
  }, []);

  const toggleFavorite = (surahNumber: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(surahNumber)) {
        newFavorites.delete(surahNumber);
      } else {
        newFavorites.add(surahNumber);
      }
      return newFavorites;
    });
  };

  const handlePlayPause = async (surah: Surah, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If this surah is already playing, pause it
    if (playingSurahNumber === surah.number) {
      audioPlayerRef.current?.pause();
      setPlayingSurahNumber(null);
      toast.info("Wiedergabe pausiert");
      return;
    }
    
    // Stop any currently playing audio
    if (audioPlayerRef.current) {
      audioPlayerRef.current.destroy();
    }
    
    // Start playing the new surah
    try {
      const audioUrls = getSurahAudioUrls(surah.number, surah.numberOfAyahs);
      const player = new SurahAudioPlayer(audioUrls);
      
      player.onEnd(() => {
        setPlayingSurahNumber(null);
        toast.success("Wiedergabe beendet");
      });
      
      audioPlayerRef.current = player;
      setPlayingSurahNumber(surah.number);
      await player.play();
      toast.success(`${surah.englishName} wird abgespielt`);
    } catch (error) {
      console.error("Error playing surah:", error);
      toast.error("Fehler beim Abspielen");
      setPlayingSurahNumber(null);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.destroy();
      }
    };
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.number.toString().includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-600 text-sm">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Surah nach Name oder Nummer suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Surahs List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => onSelectSurah(surah)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedSurahNumber === surah.number
                  ? "bg-teal-50 dark:bg-teal-900/30 border-2 border-teal-600 dark:border-teal-500"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left Side: Progress Circle, Play Icon and Text */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Circular Progress */}
                  <div className="flex-shrink-0">
                    <CircularProgress 
                      percentage={(() => {
                        const lastVerse = getSurahProgress(surah.number);
                        if (lastVerse === 0) return 0;
                        return (lastVerse / surah.numberOfAyahs) * 100;
                      })()}
                      size={56}
                      strokeWidth={4}
                    />
                  </div>

                  <div
                    className="flex-shrink-0 text-teal-600 hover:bg-teal-100 p-2 rounded-md cursor-pointer transition-colors"
                    onClick={(e) => handlePlayPause(surah, e)}
                  >
                    {playingSurahNumber === surah.number ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {surah.number}. {surah.englishName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {surah.numberOfAyahs} Verse
                    </p>
                  </div>
                </div>

                {/* Right Side: Arabic Name and Favorite */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-right font-arabic text-lg text-teal-700 dark:text-teal-400 min-w-24">
                    {surah.name}
                  </p>

                  <div
                    className="flex-shrink-0 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                    onClick={(e) => toggleFavorite(surah.number, e)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(surah.number)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
