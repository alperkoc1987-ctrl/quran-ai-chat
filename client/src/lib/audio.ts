/**
 * audio.ts
 * Utility functions for Quran audio recitation using everyayah.com API
 */

// Popular reciters with their everyayah.com identifiers
// Verified working URLs from everyayah.com
export const RECITERS = {
  mishary: {
    id: "Alafasy_64kbps",
    name: "Mishary Rashid Alafasy",
    description: "Einer der beliebtesten Rezitatoren weltweit",
  },
  abdulbasit: {
    id: "Abdul_Basit_Murattal_64kbps",
    name: "Abdul Basit Abdus Samad",
    description: "Klassischer ägyptischer Rezitator",
  },
  husary: {
    id: "Husary_64kbps",
    name: "Mahmoud Khalil Al-Husary",
    description: "Bekannt für seine klare Aussprache",
  },
  sudais: {
    id: "Abdul_Basit_Murattal_64kbps",
    name: "Abdurrahman As-Sudais",
    description: "Imam der Großen Moschee in Mekka",
  },
} as const;

export type ReciterKey = keyof typeof RECITERS;

/**
 * Get the audio URL for a specific verse
 * @param surahNumber - Surah number (1-114)
 * @param ayahNumber - Ayah number
 * @param reciter - Reciter key (default: mishary)
 * @returns Audio URL
 */
export function getVerseAudioUrl(
  surahNumber: number,
  ayahNumber: number,
  reciter?: ReciterKey
): string {
  // Get reciter from localStorage if not provided
  if (!reciter && typeof window !== "undefined") {
    const saved = localStorage.getItem("selectedReciter") as ReciterKey;
    reciter = (saved && RECITERS[saved]) ? saved : "mishary";
  } else if (!reciter) {
    reciter = "mishary";
  }
  const reciterInfo = RECITERS[reciter];
  
  // Format: surah number (3 digits) + ayah number (3 digits)
  const surahPadded = String(surahNumber).padStart(3, "0");
  const ayahPadded = String(ayahNumber).padStart(3, "0");
  
  return `https://everyayah.com/data/${reciterInfo.id}/${surahPadded}${ayahPadded}.mp3`;
}

/**
 * Get all audio URLs for a complete Surah
 * @param surahNumber - Surah number (1-114)
 * @param totalAyahs - Total number of ayahs in the surah
 * @param reciter - Reciter key (default: mishary)
 * @returns Array of audio URLs
 */
export function getSurahAudioUrls(
  surahNumber: number,
  totalAyahs: number,
  reciter?: ReciterKey
): string[] {
  // Get reciter from localStorage if not provided
  if (!reciter && typeof window !== "undefined") {
    const saved = localStorage.getItem("selectedReciter") as ReciterKey;
    reciter = (saved && RECITERS[saved]) ? saved : "mishary";
  } else if (!reciter) {
    reciter = "mishary";
  }
  const urls: string[] = [];
  
  for (let ayahNumber = 1; ayahNumber <= totalAyahs; ayahNumber++) {
    urls.push(getVerseAudioUrl(surahNumber, ayahNumber, reciter));
  }
  
  return urls;
}

/**
 * Preload an audio file
 * @param url - Audio URL
 * @returns Promise that resolves when audio is loaded
 */
export function preloadAudio(url: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.addEventListener("canplaythrough", () => resolve(audio), { once: true });
    audio.addEventListener("error", reject, { once: true });
    audio.load();
  });
}

/**
 * Audio player class for sequential playback of multiple verses
 */
export class SurahAudioPlayer {
  private audioElements: HTMLAudioElement[] = [];
  private currentIndex = 0;
  private isPlaying = false;
  private onProgressCallback?: (current: number, total: number) => void;
  private onEndCallback?: () => void;

  constructor(audioUrls: string[]) {
    this.audioElements = audioUrls.map(url => new Audio(url));
  }

  /**
   * Play the audio from the current index
   */
  async play() {
    console.log('[SurahAudioPlayer] play() called, currentIndex:', this.currentIndex, 'total:', this.audioElements.length);
    
    if (this.currentIndex >= this.audioElements.length) {
      console.log('[SurahAudioPlayer] Resetting to start');
      this.currentIndex = 0;
    }

    this.isPlaying = true;
    await this.playCurrentAudio();
  }

  /**
   * Play the current audio element
   */
  private async playCurrentAudio() {
    if (!this.isPlaying || this.currentIndex >= this.audioElements.length) {
      console.log('[SurahAudioPlayer] Playback stopped or ended');
      this.isPlaying = false;
      this.onEndCallback?.();
      return;
    }

    const audio = this.audioElements[this.currentIndex];
    const audioUrl = audio.src;
    console.log('[SurahAudioPlayer] Playing audio:', audioUrl, 'index:', this.currentIndex);
    
    // Set up event listeners
    audio.onended = () => {
      console.log('[SurahAudioPlayer] Audio ended, moving to next');
      this.currentIndex++;
      this.onProgressCallback?.(this.currentIndex, this.audioElements.length);
      this.playCurrentAudio();
    };

    audio.onerror = (e) => {
      console.error('[SurahAudioPlayer] Audio error event:', e, 'URL:', audioUrl);
    };

    try {
      console.log('[SurahAudioPlayer] Calling audio.play()');
      const playPromise = audio.play();
      console.log('[SurahAudioPlayer] Play promise:', playPromise);
      await playPromise;
      console.log('[SurahAudioPlayer] Audio playing successfully');
      this.onProgressCallback?.(this.currentIndex, this.audioElements.length);
    } catch (error: any) {
      console.error('[SurahAudioPlayer] Error playing audio:', error);
      console.error('[SurahAudioPlayer] Error name:', error.name);
      console.error('[SurahAudioPlayer] Error message:', error.message);
      console.error('[SurahAudioPlayer] Audio URL:', audioUrl);
      console.error('[SurahAudioPlayer] Audio readyState:', audio.readyState);
      console.error('[SurahAudioPlayer] Audio networkState:', audio.networkState);
      this.isPlaying = false;
      this.onEndCallback?.();
      throw error; // Re-throw to let caller handle it
    }
  }

  /**
   * Pause the audio
   */
  pause() {
    this.isPlaying = false;
    const currentAudio = this.audioElements[this.currentIndex];
    if (currentAudio) {
      currentAudio.pause();
    }
  }

  /**
   * Stop the audio and reset to the beginning
   */
  stop() {
    this.pause();
    this.currentIndex = 0;
    this.audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  /**
   * Jump to a specific verse
   * @param index - Verse index (0-based)
   */
  jumpTo(index: number) {
    this.stop();
    this.currentIndex = Math.max(0, Math.min(index, this.audioElements.length - 1));
  }

  /**
   * Set progress callback
   * @param callback - Callback function (current, total)
   */
  onProgress(callback: (current: number, total: number) => void) {
    this.onProgressCallback = callback;
  }

  /**
   * Set end callback
   * @param callback - Callback function
   */
  onEnd(callback: () => void) {
    this.onEndCallback = callback;
  }

  /**
   * Get current playback state
   */
  getState() {
    return {
      isPlaying: this.isPlaying,
      currentIndex: this.currentIndex,
      total: this.audioElements.length,
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    this.stop();
    this.audioElements = [];
  }
}
