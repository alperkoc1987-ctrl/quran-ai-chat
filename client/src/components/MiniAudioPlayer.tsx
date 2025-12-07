/**
 * MiniAudioPlayer.tsx
 * Persistent mini audio player that stays visible across all pages
 */

import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack, X, Volume2, Repeat } from "lucide-react";
import { useLocation } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MiniAudioPlayer() {
  const { state, pause, resume, stop, nextVerse, previousVerse, setRepeatCount } = useAudioPlayer();
  const [, navigate] = useLocation();

  // Don't show mini player if nothing is playing/loaded
  if (!state.surahNumber) {
    return null;
  }

  const handleTogglePlayPause = async () => {
    if (state.isPlaying) {
      pause();
    } else {
      try {
        await resume();
      } catch (error) {
        console.error("Error resuming playback:", error);
      }
    }
  };

  const handleNavigateToSurah = () => {
    navigate(`/surah/${state.surahNumber}`);
  };

  return (
    <Card className="fixed bottom-16 left-0 right-0 z-50 bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-0 rounded-none shadow-lg">
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Surah Info - Clickable */}
        <button
          onClick={handleNavigateToSurah}
          className="flex items-center gap-2 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
        >
          <Volume2 className="w-4 h-4 flex-shrink-0 animate-pulse" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{state.surahName}</div>
            <div className="text-[10px] opacity-90">
              Vers {state.currentVerseIndex + 1} / {state.totalVerses}
            </div>
          </div>
        </button>

        {/* Repeat Count Selector */}
        <Select
          value={state.repeatCount.toString()}
          onValueChange={(value) => setRepeatCount(parseInt(value))}
        >
          <SelectTrigger className="w-14 h-7 text-xs bg-white/20 border-white/30 text-white">
            <Repeat className="w-3 h-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1x</SelectItem>
            <SelectItem value="2">2x</SelectItem>
            <SelectItem value="3">3x</SelectItem>
            <SelectItem value="5">5x</SelectItem>
          </SelectContent>
        </Select>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={previousVerse}
            disabled={state.currentVerseIndex === 0}
          >
            <SkipBack className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-white hover:bg-white/20"
            onClick={handleTogglePlayPause}
          >
            {state.isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={nextVerse}
            disabled={state.currentVerseIndex >= state.totalVerses - 1}
          >
            <SkipForward className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-white/20"
            onClick={stop}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
