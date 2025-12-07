import { useState, useEffect } from 'react';
import { StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { getBookmark, updateBookmarkNote, saveBookmark } from '@/lib/bookmarks';

interface VerseNoteDialogProps {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  verseText: string;
  translation: string;
  className?: string;
}

export function VerseNoteDialog({
  surahNumber,
  verseNumber,
  surahName,
  verseText,
  translation,
  className = '',
}: VerseNoteDialogProps) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    const bookmark = getBookmark(surahNumber, verseNumber);
    setNote(bookmark?.note || '');
    setHasNote(!!bookmark?.note);
  }, [surahNumber, verseNumber, open]);

  const handleSave = () => {
    // Ensure bookmark exists before saving note
    const bookmark = getBookmark(surahNumber, verseNumber);
    if (!bookmark) {
      // Create bookmark first
      saveBookmark({
        surahNumber,
        verseNumber,
        surahName,
        verseText,
        translation,
        tags: [],
        note: note.trim() || undefined,
      });
    } else {
      updateBookmarkNote(surahNumber, verseNumber, note);
    }
    setHasNote(!!note.trim());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={className}
          title={hasNote ? "Notiz bearbeiten" : "Notiz hinzufügen"}
        >
          <StickyNote
            className={`w-4 h-4 ${hasNote ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] dark:bg-slate-900 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="dark:text-slate-100">Persönliche Notiz</DialogTitle>
          <DialogDescription className="dark:text-slate-400">
            {surahName} - Vers {verseNumber}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">
              "{translation.substring(0, 100)}{translation.length > 100 ? '...' : ''}"
            </p>
          </div>
          <Textarea
            placeholder="Schreiben Sie hier Ihre persönliche Notiz zu diesem Vers..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[150px] dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="dark:border-slate-700 dark:text-slate-300">
            Abbrechen
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
