/**
 * SurahList.tsx
 * Component for displaying a list of all Surahs with selection functionality.
 */

import { useState, useEffect } from "react";
import { Surah } from "@/lib/types";
import { fetchAllSurahs } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, BookOpen } from "lucide-react";

interface SurahListProps {
  onSelectSurah: (surah: Surah) => void;
  selectedSurahNumber?: number;
}

export function SurahList({ onSelectSurah, selectedSurahNumber }: SurahListProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-600 text-sm">{error}</div>;
  }

  return (
    <ScrollArea className="w-full h-32">
      <div className="flex gap-2 p-3">
        {surahs.map((surah) => (
          <Button
            key={surah.number}
            onClick={() => onSelectSurah(surah)}
            variant={selectedSurahNumber === surah.number ? "default" : "outline"}
            className="flex-shrink-0 whitespace-nowrap text-xs md:text-sm"
          >
            <BookOpen className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">{surah.englishName}</span>
            <span className="sm:hidden">{surah.number}</span>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
