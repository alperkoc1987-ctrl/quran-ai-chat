import { Card } from "@/components/ui/card";
import { getDuasByCategory, getCategoryById } from "@shared/duasData.ts";
import { Link, useParams } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function DuaDetail() {
  const params = useParams();
  const categoryId = params.categoryId as string;
  
  const category = getCategoryById(categoryId);
  const duas = getDuasByCategory(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Kategorie nicht gefunden</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/duas">
              <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">{category.name}</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">{category.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-4">
        {duas.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">Keine Duas in dieser Kategorie gefunden.</p>
          </Card>
        ) : (
          duas.map((dua) => (
            <Card key={dua.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 space-y-4">
                {/* Title */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{dua.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{dua.source}</p>
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-2xl text-right leading-loose text-slate-900 dark:text-white font-arabic" dir="rtl">
                    {dua.arabic}
                  </p>
                </div>

                {/* Transliteration */}
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Transliteration:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    {dua.transliteration}
                  </p>
                </div>

                {/* Translation */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Übersetzung:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {dua.translation}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </main>
    </div>
  );
}
