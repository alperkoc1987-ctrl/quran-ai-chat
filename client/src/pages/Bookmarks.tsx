import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Bookmark, StickyNote, Trash2, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  getAllBookmarks,
  removeBookmark,
  VerseBookmark,
} from '@/lib/bookmarks';

export default function Bookmarks() {
  const [, navigate] = useLocation();
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>([]);
  const [surahBookmarks, setSurahBookmarks] = useState<any[]>([]);

  const loadData = () => {
    // Load verse bookmarks
    const allBookmarks = getAllBookmarks();
    setBookmarks(Object.values(allBookmarks).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
    
    // Load surah bookmarks from localStorage
    const stored = localStorage.getItem('surahBookmarks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSurahBookmarks(Object.values(parsed));
      } catch (e) {
        console.error('Failed to load surah bookmarks:', e);
        setSurahBookmarks([]);
      }
    } else {
      setSurahBookmarks([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemoveBookmark = (surahNumber: number, verseNumber: number) => {
    removeBookmark(surahNumber, verseNumber);
    loadData();
    toast.success('Lesezeichen entfernt');
  };

  const handleRemoveSurahBookmark = (surahNumber: number) => {
    const stored = localStorage.getItem('surahBookmarks');
    if (stored) {
      try {
        const bookmarks = JSON.parse(stored);
        delete bookmarks[surahNumber];
        localStorage.setItem('surahBookmarks', JSON.stringify(bookmarks));
        loadData();
        toast.success('Surah-Lesezeichen entfernt');
      } catch (e) {
        console.error('Failed to remove surah bookmark:', e);
        toast.error('Fehler beim Entfernen');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-slate-600 dark:text-slate-400"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Meine Lesezeichen
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {bookmarks.length} Verse + {surahBookmarks.length} Suren
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-6">
        {bookmarks.length === 0 && surahBookmarks.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Keine Lesezeichen
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Markieren Sie Verse oder Suren, um sie hier zu sehen
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Surah Bookmarks */}
            {surahBookmarks.map((surahBookmark) => (
              <div
                key={`surah-${surahBookmark.surahNumber}`}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                          {surahBookmark.surahNumber}. {surahBookmark.surahName}
                        </h3>
                        <Badge variant="secondary" className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">
                          Surah
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {surahBookmark.verseCount} Verse
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/surah/${surahBookmark.surahNumber}`)}
                      className="text-teal-600 dark:text-teal-400"
                      title="Zur Surah"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSurahBookmark(surahBookmark.surahNumber)}
                      className="text-red-500 dark:text-red-400"
                      title="Entfernen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-right text-xl font-arabic text-slate-800 dark:text-slate-100">
                  {surahBookmark.surahNameArabic}
                </p>
              </div>
            ))}

            {/* Verse Bookmarks */}
            {bookmarks.map((bookmark) => (
              <div
                key={`${bookmark.surahNumber}-${bookmark.verseNumber}`}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                          Sure {bookmark.surahNumber}, Vers {bookmark.verseNumber}
                        </h3>
                        <Badge variant="secondary" className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">
                          Vers
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {bookmark.surahName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate(`/surah/${bookmark.surahNumber}?verse=${bookmark.verseNumber}&highlight=true`)}
                      className="text-teal-600 dark:text-teal-400"
                      title="Zum Vers"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveBookmark(bookmark.surahNumber, bookmark.verseNumber)}
                      className="text-red-500 dark:text-red-400"
                      title="Entfernen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-right text-xl font-arabic text-slate-800 dark:text-slate-100">
                    {bookmark.verseText}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    {bookmark.translation}
                  </p>
                  {bookmark.note && (
                    <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-2">
                        <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <p className="text-sm text-amber-900 dark:text-amber-200">
                          {bookmark.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
