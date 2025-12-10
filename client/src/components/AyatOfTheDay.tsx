import { Card } from "@/components/ui/card";
import { BookOpen, ExternalLink } from "lucide-react";
import { getTodaysAyat } from "@/data/ayatOfTheDay";
import { useLocation } from "wouter";

export function AyatOfTheDay() {
  const ayat = getTodaysAyat();
  const [, navigate] = useLocation();

  const handleNavigateToSurah = () => {
    navigate(`/surah/${ayat.surahNumber}`);
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Ayat des Tages</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{ayat.theme}</p>
          </div>
        </div>

        {/* Arabic Text */}
        <div className="mb-4 p-4 bg-white/60 dark:bg-slate-900/40 rounded-lg">
          <p className="text-2xl text-right leading-loose font-arabic text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Amiri, serif' }}>
            {ayat.arabicText}
          </p>
        </div>

        {/* German Translation */}
        <div className="mb-4">
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed italic">
            "{ayat.germanTranslation}"
          </p>
        </div>

        {/* Reference */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Sure {ayat.surahName} ({ayat.surahNumber}:{ayat.verseNumber})
          </div>
          <button
            onClick={handleNavigateToSurah}
            className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <span>Zur Surah</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
