import { useState, useEffect } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchResult {
  number: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
  };
  numberInSurah: number;
}

interface SearchResponse {
  count: number;
  matches: SearchResult[];
}

export default function SearchResults() {
  const [, params] = useRoute("/search/:query");
  const [, navigate] = useLocation();
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const query = params?.query || "";

  useEffect(() => {
    if (!query) {
      navigate("/quran");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get translation language from localStorage
        const translationLang = localStorage.getItem("translationLanguage") || "de";
        
        // Map language codes to edition identifiers
        const editionMap: Record<string, string> = {
          de: "de.bubenheim",
          en: "en.sahih",
          tr: "tr.diyanet",
          ar: "ar.alafasy"
        };

        const edition = editionMap[translationLang] || "de.bubenheim";
        
        // Fetch search results from AlQuran.cloud API
        const response = await fetch(
          `https://api.alquran.cloud/v1/search/${encodeURIComponent(query)}/all/${edition}`
        );

        if (!response.ok) {
          throw new Error("Suche fehlgeschlagen");
        }

        const data = await response.json();

        if (data.code !== 200 || !data.data) {
          throw new Error("Keine Ergebnisse gefunden");
        }

        setResults({
          count: data.data.count,
          matches: data.data.matches || []
        });
      } catch (err: any) {
        console.error("Search error:", err);
        setError(err.message || "Ein Fehler ist aufgetreten");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, navigate]);

  // Group results by surah
  const groupedResults = results?.matches.reduce((acc, match) => {
    const surahNumber = match.surah.number;
    if (!acc[surahNumber]) {
      acc[surahNumber] = {
        surah: match.surah,
        verses: []
      };
    }
    acc[surahNumber].verses.push(match);
    return acc;
  }, {} as Record<number, { surah: SearchResult["surah"]; verses: SearchResult[] }>);

  const uniqueSurahs = groupedResults ? Object.keys(groupedResults).length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 pb-20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/quran")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Suchergebnisse
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Suche nach: "{query}"
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">Suche läuft...</p>
          </div>
        )}

        {error && (
          <Card className="p-6 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button onClick={() => navigate("/quran")}>
              Zurück zur Surah-Liste
            </Button>
          </Card>
        )}

        {!loading && !error && results && (
          <>
            {/* Statistics */}
            <Card className="p-4 mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Gefunden</p>
                  <p className="text-2xl font-bold">{results.count} Verse</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">In</p>
                  <p className="text-2xl font-bold">{uniqueSurahs} Suren</p>
                </div>
              </div>
            </Card>

            {/* Results grouped by Surah */}
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-6">
                {groupedResults && Object.values(groupedResults).map(({ surah, verses }) => (
                  <Card key={surah.number} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3">
                      <h2 className="font-bold text-lg">
                        {surah.number}. {surah.englishName}
                      </h2>
                      <p className="text-sm opacity-90">
                        {surah.englishNameTranslation} • {verses.length} {verses.length === 1 ? "Vers" : "Verse"}
                      </p>
                    </div>

                    <div className="divide-y divide-slate-200 dark:divide-slate-700">
                      {verses.map((verse) => (
                        <Link
                          key={verse.number}
                          href={`/surah/${surah.number}?verse=${verse.numberInSurah}`}
                        >
                          <div className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                  {verse.numberInSurah}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                                  {verse.text}
                                </p>
                              </div>
                              <BookOpen className="w-5 h-5 text-slate-400 shrink-0" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </>
        )}
      </main>
    </div>
  );
}
