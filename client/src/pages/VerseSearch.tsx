import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Search, Loader2, BookOpen, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchResult {
  surahNumber: number;
  surahName: string;
  surahNameArabic: string;
  verseNumber: number;
  arabicText: string;
  germanTranslation: string;
  transliteration?: string;
}

export default function VerseSearch() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Search through all Surahs
      const searchResults: SearchResult[] = [];
      const lowerQuery = searchQuery.toLowerCase();

      // Fetch all Surahs (1-114)
      for (let surahNum = 1; surahNum <= 114; surahNum++) {
        try {
          const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNum}/editions/quran-simple,de.bubenheim`
          );
          const data = await response.json();

          if (data.code === 200 && data.data) {
            const arabicData = data.data[0];
            const germanData = data.data[1];

            // Search through verses
            arabicData.ayahs.forEach((ayah: any, index: number) => {
              const germanVerse = germanData.ayahs[index];
              const germanText = germanVerse.text.toLowerCase();

              if (germanText.includes(lowerQuery)) {
                searchResults.push({
                  surahNumber: surahNum,
                  surahName: arabicData.englishName,
                  surahNameArabic: arabicData.name,
                  verseNumber: ayah.numberInSurah,
                  arabicText: ayah.text,
                  germanTranslation: germanVerse.text,
                });
              }
            });
          }
        } catch (err) {
          console.error(`Error fetching Surah ${surahNum}:`, err);
        }

        // Limit to first 50 results for performance
        if (searchResults.length >= 50) break;
      }

      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="bg-teal-200 dark:bg-teal-900 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Verse durchsuchen</h1>
            <p className="text-sm text-teal-100">Suchen Sie nach Versen im gesamten Koran</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Suchen Sie nach Wörtern oder Themen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Suchen...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Suchen
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Tipp: Geben Sie ein Wort oder einen Satz ein, um relevante Verse zu finden
          </p>
        </div>

        {/* Results */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="w-12 h-12 animate-spin text-teal-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Durchsuche den Koran...</p>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Keine Ergebnisse gefunden
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Versuchen Sie es mit anderen Suchbegriffen
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {results.length} Verse gefunden
            </p>
            {results.map((result, index) => (
              <div
                key={index}
                onClick={() => navigate(`/surah/${result.surahNumber}`)}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                {/* Surah Info */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {result.surahNumber}. {result.surahName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      • Vers {result.verseNumber}
                    </span>
                  </div>
                  <span className="text-sm text-teal-600 dark:text-teal-400 font-arabic">
                    {result.surahNameArabic}
                  </span>
                </div>

                {/* Arabic Text */}
                <p className="text-2xl text-right font-arabic leading-loose mb-3 text-gray-900 dark:text-gray-100">
                  {result.arabicText}
                </p>

                {/* German Translation */}
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {highlightText(result.germanTranslation, searchQuery)}
                </p>
              </div>
            ))}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Durchsuchen Sie den Koran
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Geben Sie ein Wort oder einen Satz ein, um relevante Verse zu finden
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
