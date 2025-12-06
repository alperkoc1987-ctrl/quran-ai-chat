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
 * Optimized for long Surahs with lazy loading and memory management
 */
export class SurahAudioPlayer {
  private audioUrls: string[] = [];
  private currentAudio: HTMLAudioElement | null = null;
  private currentIndex = 0;
  private isPlaying = false;
  private onProgressCallback?: (current: number, total: number) => void;
  private onEndCallback?: () => void;
  private loadTimeout = 10000; // 10 seconds timeout for loading

  constructor(audioUrls: string[]) {
    console.log('[SurahAudioPlayer] Created with', audioUrls.length, 'verses');
    this.audioUrls = audioUrls;
  }

  /**
   * Play the audio from the current index
   */
  async play() {
    console.log('[SurahAudioPlayer] play() called, currentIndex:', this.currentIndex, 'total:', this.audioUrls.length);
    
    if (this.currentIndex >= this.audioUrls.length) {
      console.log('[SurahAudioPlayer] Resetting to start');
      this.currentIndex = 0;
    }

    this.isPlaying = true;
    await this.playCurrentAudio();
  }

  /**
   * Load audio with timeout
   */
  private loadAudioWithTimeout(url: string): Promise<HTMLAudioElement> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      let timeoutId: NodeJS.Timeout;
      let loaded = false;

      const cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('error', onError);
      };

      const onCanPlay = () => {
        if (loaded) return;
        loaded = true;
        cleanup();
        console.log('[SurahAudioPlayer] Audio loaded successfully:', url);
        resolve(audio);
      };

      const onError = (e: any) => {
        if (loaded) return;
        loaded = true;
        cleanup();
        console.error('[SurahAudioPlayer] Audio load error:', e, 'URL:', url);
        reject(new Error(`Failed to load audio: ${url}`));
      };

      // Set timeout
      timeoutId = setTimeout(() => {
        if (loaded) return;
        loaded = true;
        cleanup();
        console.error('[SurahAudioPlayer] Audio load timeout:', url);
        reject(new Error(`Audio load timeout: ${url}`));
      }, this.loadTimeout);

      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
      audio.addEventListener('error', onError, { once: true });
      
      audio.src = url;
      audio.load();
    });
  }

  /**
   * Play the current audio element (lazy loading)
   */
  private async playCurrentAudio() {
    if (!this.isPlaying || this.currentIndex >= this.audioUrls.length) {
      console.log('[SurahAudioPlayer] Playback stopped or ended');
      this.isPlaying = false;
      this.cleanup();
      this.onEndCallback?.();
      return;
    }

    const audioUrl = this.audioUrls[this.currentIndex];
    console.log('[SurahAudioPlayer] Loading audio:', audioUrl, 'index:', this.currentIndex);

    try {
      // Clean up previous audio
      this.cleanup();

      // Lazy load current audio
      this.currentAudio = await this.loadAudioWithTimeout(audioUrl);
      
      // Set up event listeners
      this.currentAudio.onended = () => {
        console.log('[SurahAudioPlayer] Audio ended, moving to next');
        this.currentIndex++;
        this.onProgressCallback?.(this.currentIndex, this.audioUrls.length);
        this.playCurrentAudio();
      };

      this.currentAudio.onerror = (e) => {
        console.error('[SurahAudioPlayer] Audio playback error:', e, 'URL:', audioUrl);
        this.isPlaying = false;
        this.cleanup();
        this.onEndCallback?.();
      };

      // Play audio
      console.log('[SurahAudioPlayer] Playing audio');
      await this.currentAudio.play();
      console.log('[SurahAudioPlayer] Audio playing successfully');
      this.onProgressCallback?.(this.currentIndex, this.audioUrls.length);
      
    } catch (error: any) {
      console.error('[SurahAudioPlayer] Error in playCurrentAudio:', error);
      console.error('[SurahAudioPlayer] Error name:', error.name);
      console.error('[SurahAudioPlayer] Error message:', error.message);
      console.error('[SurahAudioPlayer] Audio URL:', audioUrl);
      
      this.isPlaying = false;
      this.cleanup();
      this.onEndCallback?.();
      throw error; // Re-throw to let caller handle it
    }
  }

  /**
   * Clean up current audio element
   */
  private cleanup() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = '';
      this.currentAudio.onended = null;
      this.currentAudio.onerror = null;
      this.currentAudio = null;
    }
  }

  /**
   * Pause the audio
   */
  pause() {
    console.log('[SurahAudioPlayer] Pausing');
    this.isPlaying = false;
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  /**
   * Stop the audio and reset to the beginning
   */
  stop() {
    console.log('[SurahAudioPlayer] Stopping');
    this.pause();
    this.currentIndex = 0;
    this.cleanup();
  }

  /**
   * Jump to a specific verse
   * @param index - Verse index (0-based)
   */
  jumpTo(index: number) {
    console.log('[SurahAudioPlayer] Jumping to index:', index);
    this.stop();
    this.currentIndex = Math.max(0, Math.min(index, this.audioUrls.length - 1));
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
      total: this.audioUrls.length,
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    console.log('[SurahAudioPlayer] Destroying');
    this.stop();
    this.audioUrls = [];
  }
}
