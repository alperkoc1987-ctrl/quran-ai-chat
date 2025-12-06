import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Bookmark, StickyNote, Trash2, Plus, FolderPlus, Folder, BookOpen } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  getAllBookmarks,
  getAllCollections,
  removeBookmark,
  updateBookmarkNote,
  createCollection,
  deleteCollection,
  addBookmarkToCollection,
  removeBookmarkFromCollection,
  getCollectionBookmarks,
  VerseBookmark,
  BookmarkCollection,
} from '@/lib/bookmarks';
import { toast } from 'sonner';

export default function Bookmarks() {
  const [, navigate] = useLocation();
  const [bookmarks, setBookmarks] = useState<VerseBookmark[]>([]);
  const [collections, setCollections] = useState<BookmarkCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [showNewCollection, setShowNewCollection] = useState(false);

  // Load Surah bookmarks from database
  const { data: surahBookmarksData } = trpc.surahBookmarks.list.useQuery();
  const removeSurahBookmark = trpc.surahBookmarks.remove.useMutation();

  const loadData = () => {
    const allBookmarks = getAllBookmarks();
    setBookmarks(Object.values(allBookmarks).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
    
    const allCollections = getAllCollections();
    setCollections(Object.values(allCollections).sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemoveBookmark = (surahNumber: number, verseNumber: number) => {
    removeBookmark(surahNumber, verseNumber);
    loadData();
    toast.success('Lesezeichen entfernt');
  };

  const handleSaveNote = (surahNumber: number, verseNumber: number) => {
    updateBookmarkNote(surahNumber, verseNumber, noteText);
    setEditingNote(null);
    setNoteText('');
    loadData();
    toast.success('Notiz gespeichert');
  };

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }
    createCollection(newCollectionName, newCollectionDesc);
    setNewCollectionName('');
    setNewCollectionDesc('');
    setShowNewCollection(false);
    loadData();
    toast.success('Sammlung erstellt');
  };

  const handleDeleteCollection = (id: string) => {
    deleteCollection(id);
    if (selectedCollection === id) {
      setSelectedCollection(null);
    }
    loadData();
    toast.success('Sammlung gelöscht');
  };

  const displayedBookmarks = selectedCollection
    ? getCollectionBookmarks(selectedCollection)
    : bookmarks;

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
                  {displayedBookmarks.length} Verse + {surahBookmarksData?.length || 0} Suren
                </p>
              </div>
            </div>
            
            <Dialog open={showNewCollection} onOpenChange={setShowNewCollection}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
                  <FolderPlus className="w-4 h-4" />
                  Neue Sammlung
                </Button>
              </DialogTrigger>
              <DialogContent className="dark:bg-slate-900 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="dark:text-slate-100">Neue Sammlung erstellen</DialogTitle>
                  <DialogDescription className="dark:text-slate-400">
                    Organisieren Sie Ihre Lesezeichen in Sammlungen
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    placeholder="Sammlungsname"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    className="dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                  />
                  <Textarea
                    placeholder="Beschreibung (optional)"
                    value={newCollectionDesc}
                    onChange={(e) => setNewCollectionDesc(e.target.value)}
                    className="dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowNewCollection(false)} className="dark:border-slate-700">
                    Abbrechen
                  </Button>
                  <Button onClick={handleCreateCollection} className="bg-teal-600 hover:bg-teal-700">
                    Erstellen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Collections Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Sammlungen</h2>
              
              <button
                onClick={() => setSelectedCollection(null)}
                className={`w-full text-left px-3 py-2 rounded-lg mb-2 flex items-center gap-2 ${
                  selectedCollection === null
                    ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Alle Lesezeichen</span>
              </button>

              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className={`group px-3 py-2 rounded-lg mb-2 flex items-center justify-between ${
                    selectedCollection === collection.id
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <button
                    onClick={() => setSelectedCollection(collection.id)}
                    className="flex items-center gap-2 flex-1"
                  >
                    <Folder className="w-4 h-4" />
                    <span className="text-sm">{collection.name}</span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCollection(collection.id)}
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks List */}
          <div className="lg:col-span-3">
            {displayedBookmarks.length === 0 && (!surahBookmarksData || surahBookmarksData.length === 0) ? (
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
                {surahBookmarksData?.map((surahBookmark) => (
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
                          onClick={async () => {
                            await removeSurahBookmark.mutateAsync({ surahNumber: surahBookmark.surahNumber });
                            toast.success('Surah-Lesezeichen entfernt');
                          }}
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
                {displayedBookmarks.map((bookmark) => (
                  <div
                    key={`${bookmark.surahNumber}:${bookmark.verseNumber}`}
                    className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                            {bookmark.surahName} - Vers {bookmark.verseNumber}
                          </h3>
                          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                            Vers
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(bookmark.updatedAt).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/surah/${bookmark.surahNumber}?verse=${bookmark.verseNumber}&highlight=true`)}
                          className="text-teal-600 dark:text-teal-400"
                          title="Zur Surah"
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

                    <p className="text-right text-xl font-arabic leading-loose text-slate-800 dark:text-slate-100 mb-3">
                      {bookmark.verseText}
                    </p>

                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {bookmark.translation}
                    </p>

                    {bookmark.note && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-3">
                        <div className="flex items-start gap-2">
                          <StickyNote className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                          <p className="text-sm text-amber-900 dark:text-amber-200 flex-1">
                            {bookmark.note}
                          </p>
                        </div>
                      </div>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 dark:border-slate-700"
                          onClick={() => {
                            setEditingNote(`${bookmark.surahNumber}:${bookmark.verseNumber}`);
                            setNoteText(bookmark.note || '');
                          }}
                        >
                          <StickyNote className="w-3 h-3" />
                          {bookmark.note ? 'Notiz bearbeiten' : 'Notiz hinzufügen'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="dark:bg-slate-900 dark:border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="dark:text-slate-100">Notiz bearbeiten</DialogTitle>
                        </DialogHeader>
                        <Textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className="min-h-[150px] dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
                          placeholder="Ihre persönliche Notiz..."
                        />
                        <DialogFooter>
                          <Button
                            onClick={() => handleSaveNote(bookmark.surahNumber, bookmark.verseNumber)}
                            className="bg-teal-600 hover:bg-teal-700"
                          >
                            Speichern
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
