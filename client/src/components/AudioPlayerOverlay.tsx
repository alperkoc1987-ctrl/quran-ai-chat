/**
 * AudioPlayerOverlay.tsx
 * Halftransparent overlay showing current playing Surah info
 */

import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import { Music, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AudioPlayerOverlay() {
  const { state, stop } = useAudioPlayer();

  if (!state.isPlaying || !state.surahName) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-teal-500/30 rounded-2xl shadow-2xl px-6 py-4 min-w-[280px]">
          <div className="flex items-center gap-4">
            {/* Music Icon */}
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Music className="w-6 h-6 text-white" />
            </div>

            {/* Surah Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {state.surahName}
              </p>
              <p className="text-teal-400 text-xs">
                Vers {state.currentVerseIndex + 1} / {state.totalVerses}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={stop}
              className="w-8 h-8 rounded-full hover:bg-slate-800/50 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-slate-400 hover:text-white" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 transition-all duration-300"
              style={{
                width: `${((state.currentVerseIndex + 1) / state.totalVerses) * 100}%`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
