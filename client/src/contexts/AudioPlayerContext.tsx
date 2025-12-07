/**
 * AudioPlayerContext.tsx
 * Global context for managing Quran audio playback across the entire app
 */

import { createContext, useContext, useState, useRef, ReactNode, useEffect } from "react";
import { SurahAudioPlayer, getSurahAudioUrls } from "@/lib/audio";

interface AudioPlayerState {
  isPlaying: boolean;
  surahNumber: number | null;
  surahName: string | null;
  currentVerseIndex: number;
  totalVerses: number;
  repeatCount: number;
}

interface AudioPlayerContextType {
  state: AudioPlayerState;
  playSurah: (surahNumber: number, surahName: string, totalVerses: number, startVerse?: number) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  nextVerse: () => void;
  previousVerse: () => void;
  setRepeatCount: (count: number) => void;
  jumpToVerse: (verseIndex: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    surahNumber: null,
    surahName: null,
    currentVerseIndex: 0,
    totalVerses: 0,
    repeatCount: 1,
  });

  const audioPlayerRef = useRef<SurahAudioPlayer | null>(null);

  // Initialize or reinitialize audio player when surah changes
  const playSurah = async (
    surahNumber: number,
    surahName: string,
    totalVerses: number,
    startVerse: number = 0
  ) => {
    console.log('[AudioPlayerContext] playSurah called:', surahNumber, surahName, totalVerses, startVerse);

    // Stop current playback if any
    if (audioPlayerRef.current) {
      audioPlayerRef.current.destroy();
    }

    // Create audio URLs for all verses
    const audioUrls = getSurahAudioUrls(surahNumber, totalVerses);

    // Create new audio player
    const player = new SurahAudioPlayer(audioUrls);

    // Set repeat count from state
    player.setRepeatCount(state.repeatCount);

    // Set up progress callback
    player.onProgress((current, total) => {
      setState((prev) => ({
        ...prev,
        currentVerseIndex: current,
        totalVerses: total,
      }));
    });

    // Set up end callback
    player.onEnd(() => {
      setState((prev) => ({
        ...prev,
        isPlaying: false,
      }));
      // Update Media Session
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    });

    audioPlayerRef.current = player;

    // Jump to start verse if specified
    if (startVerse > 0) {
      player.jumpTo(startVerse);
    }

    // Update state
    setState({
      isPlaying: true,
      surahNumber,
      surahName,
      currentVerseIndex: startVerse,
      totalVerses,
      repeatCount: state.repeatCount,
    });

    // Start playing
    try {
      await player.play();
      
      // Set up Media Session API for background playback and lock screen controls
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: surahName,
          artist: 'Quran Rezitation',
          album: `Sure ${surahNumber}`,
          artwork: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          ]
        });

        navigator.mediaSession.setActionHandler('play', () => {
          console.log('[Media Session] Play action');
          resume();
        });

        navigator.mediaSession.setActionHandler('pause', () => {
          console.log('[Media Session] Pause action');
          pause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', () => {
          console.log('[Media Session] Previous track action');
          previousVerse();
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
          console.log('[Media Session] Next track action');
          nextVerse();
        });

        navigator.mediaSession.playbackState = 'playing';
      }
    } catch (error) {
      console.error('[AudioPlayerContext] Error playing audio:', error);
      setState((prev) => ({ ...prev, isPlaying: false }));
      throw error;
    }
  };

  const pause = () => {
    console.log('[AudioPlayerContext] pause called');
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
      
      // Update Media Session
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    }
  };

  const resume = async () => {
    console.log('[AudioPlayerContext] resume called');
    if (audioPlayerRef.current) {
      try {
        await audioPlayerRef.current.play();
        setState((prev) => ({ ...prev, isPlaying: true }));
        
        // Update Media Session
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      } catch (error) {
        console.error('[AudioPlayerContext] Error resuming audio:', error);
        throw error;
      }
    }
  };

  const stop = () => {
    console.log('[AudioPlayerContext] stop called');
    if (audioPlayerRef.current) {
      audioPlayerRef.current.stop();
    }
    setState({
      isPlaying: false,
      surahNumber: null,
      surahName: null,
      currentVerseIndex: 0,
      totalVerses: 0,
      repeatCount: state.repeatCount,
    });
    
    // Clear Media Session
    if ('mediaSession' in navigator) {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
    }
  };

  const nextVerse = () => {
    console.log('[AudioPlayerContext] nextVerse called');
    if (audioPlayerRef.current) {
      const currentState = audioPlayerRef.current.getState();
      if (currentState.currentIndex < currentState.total - 1) {
        audioPlayerRef.current.jumpTo(currentState.currentIndex + 1);
        if (state.isPlaying) {
          audioPlayerRef.current.play();
        }
      }
    }
  };

  const previousVerse = () => {
    console.log('[AudioPlayerContext] previousVerse called');
    if (audioPlayerRef.current) {
      const currentState = audioPlayerRef.current.getState();
      if (currentState.currentIndex > 0) {
        audioPlayerRef.current.jumpTo(currentState.currentIndex - 1);
        if (state.isPlaying) {
          audioPlayerRef.current.play();
        }
      }
    }
  };

  const setRepeatCount = (count: number) => {
    console.log('[AudioPlayerContext] setRepeatCount called:', count);
    setState((prev) => ({ ...prev, repeatCount: count }));
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setRepeatCount(count);
    }
  };

  const jumpToVerse = (verseIndex: number) => {
    console.log('[AudioPlayerContext] jumpToVerse called:', verseIndex);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.jumpTo(verseIndex);
      if (state.isPlaying) {
        audioPlayerRef.current.play();
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.destroy();
      }
    };
  }, []);

  const value: AudioPlayerContextType = {
    state,
    playSurah,
    pause,
    resume,
    stop,
    nextVerse,
    previousVerse,
    setRepeatCount,
    jumpToVerse,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
}
