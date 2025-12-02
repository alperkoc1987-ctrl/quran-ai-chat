/**
 * SurahList.tsx
 * Component for displaying a vertical list of all Surahs with selection functionality.
 */

import { useState, useEffect } from "react";
import { Surah } from "@/lib/types";
import { fetchAllSurahs } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, Play, Heart } from "lucide-react";

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
    <div className="flex flex-col h-full bg-slate-50">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Surah nach Name oder Nummer suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
      <ScrollArea className="flex-1 w-full">
        <div className="space-y-2 p-4">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => onSelectSurah(surah)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                selectedSurahNumber === surah.number
                  ? "bg-teal-50 border-2 border-teal-600"
                  : "bg-white border border-slate-200 hover:border-teal-300"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Left Side: Play Button and Text */}
                <div className="flex items-center gap-4 flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0 text-teal-600 hover:bg-teal-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Play functionality can be added later
                    }}
                  >
                    <Play className="w-5 h-5 fill-current" />
                  </Button>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {surah.number}. {surah.englishName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {surah.numberOfAyahs} Verse
                    </p>
                  </div>
                </div>

                {/* Right Side: Arabic Name and Favorite */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-right font-arabic text-lg text-teal-700 min-w-24">
                    {surah.name}
                  </p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={(e) => toggleFavorite(surah.number, e)}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(surah.number)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
