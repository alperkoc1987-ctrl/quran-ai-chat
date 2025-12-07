import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks';

interface BookmarkButtonProps {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  verseText: string;
  translation: string;
  className?: string;
}

export function BookmarkButton({
  surahNumber,
  verseNumber,
  surahName,
  verseText,
  translation,
  className = '',
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(surahNumber, verseNumber));
  }, [surahNumber, verseNumber]);

  const handleToggle = () => {
    const newState = toggleBookmark(surahNumber, verseNumber, surahName, verseText, translation);
    setBookmarked(newState);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={className}
      title={bookmarked ? "Lesezeichen entfernen" : "Lesezeichen hinzufügen"}
    >
      <Heart
        className={`w-4 h-4 ${bookmarked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
      />
    </Button>
  );
}
