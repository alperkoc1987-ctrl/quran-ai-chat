/**
 * readingProgress.ts
 * Utility functions for managing Quran reading progress in localStorage
 */

export interface ReadingProgress {
  surahNumber: number;
  verseNumber: number;
  surahName: string;
  timestamp: number;
}

const STORAGE_KEY = "quran_reading_progress";

/**
 * Save reading progress to localStorage
 */
export function saveReadingProgress(
  surahNumber: number,
  verseNumber: number,
  surahName: string
): void {
  if (typeof window === "undefined") return;

  const progress: ReadingProgress = {
    surahNumber,
    verseNumber,
    surahName,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save reading progress:", error);
  }
}

/**
 * Get saved reading progress from localStorage
 */
export function getReadingProgress(): ReadingProgress | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const progress: ReadingProgress = JSON.parse(stored);
    return progress;
  } catch (error) {
    console.error("Failed to load reading progress:", error);
    return null;
  }
}

/**
 * Clear reading progress from localStorage
 */
export function clearReadingProgress(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear reading progress:", error);
  }
}

/**
 * Check if there is saved reading progress
 */
export function hasReadingProgress(): boolean {
  return getReadingProgress() !== null;
}

/**
 * Get reading progress for a specific Surah
 * Returns the last read verse number, or 0 if not read
 */
export function getSurahProgress(surahNumber: number): number {
  const progress = getReadingProgress();
  if (!progress || progress.surahNumber !== surahNumber) {
    return 0;
  }
  return progress.verseNumber;
}
