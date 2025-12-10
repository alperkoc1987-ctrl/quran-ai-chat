/**
 * statistics.ts
 * Utility functions for tracking reading statistics
 */

export interface ReadingSession {
  date: string; // YYYY-MM-DD format
  versesRead: number;
  timeSpent: number; // in seconds
  surahs: number[]; // Surah numbers read in this session
}

export interface ReadingStatistics {
  totalVersesRead: number;
  totalTimeSpent: number; // in seconds
  currentStreak: number; // consecutive days
  longestStreak: number;
  sessions: ReadingSession[];
  lastReadDate: string; // YYYY-MM-DD format
}

const STORAGE_KEY = "quran_reading_statistics";

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

/**
 * Get statistics from localStorage
 */
export function getStatistics(): ReadingStatistics {
  if (typeof window === "undefined") {
    return getDefaultStatistics();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultStatistics();
    }

    const stats: ReadingStatistics = JSON.parse(stored);
    return stats;
  } catch (error) {
    console.error("Failed to load statistics:", error);
    return getDefaultStatistics();
  }
}

/**
 * Get default statistics object
 */
function getDefaultStatistics(): ReadingStatistics {
  return {
    totalVersesRead: 0,
    totalTimeSpent: 0,
    currentStreak: 0,
    longestStreak: 0,
    sessions: [],
    lastReadDate: "",
  };
}

/**
 * Save statistics to localStorage
 */
function saveStatistics(stats: ReadingStatistics): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to save statistics:", error);
  }
}

/**
 * Record a verse read
 */
export function recordVerseRead(surahNumber: number): void {
  const stats = getStatistics();
  const today = getTodayDate();

  // Find or create today's session
  let todaySession = stats.sessions.find((s) => s.date === today);
  
  if (!todaySession) {
    todaySession = {
      date: today,
      versesRead: 0,
      timeSpent: 0,
      surahs: [],
    };
    stats.sessions.push(todaySession);
  }

  // Update session
  todaySession.versesRead += 1;
  if (!todaySession.surahs.includes(surahNumber)) {
    todaySession.surahs.push(surahNumber);
  }

  // Update totals
  stats.totalVersesRead += 1;
  stats.lastReadDate = today;

  // Update streak
  updateStreak(stats);

  saveStatistics(stats);
}

/**
 * Record reading time
 */
export function recordReadingTime(seconds: number): void {
  const stats = getStatistics();
  const today = getTodayDate();

  // Find or create today's session
  let todaySession = stats.sessions.find((s) => s.date === today);
  
  if (!todaySession) {
    todaySession = {
      date: today,
      versesRead: 0,
      timeSpent: 0,
      surahs: [],
    };
    stats.sessions.push(todaySession);
  }

  // Update time
  todaySession.timeSpent += seconds;
  stats.totalTimeSpent += seconds;

  saveStatistics(stats);
}

/**
 * Update streak calculation
 */
function updateStreak(stats: ReadingStatistics): void {
  if (stats.sessions.length === 0) {
    stats.currentStreak = 0;
    return;
  }

  // Sort sessions by date (newest first)
  const sortedSessions = [...stats.sessions].sort((a, b) => 
    b.date.localeCompare(a.date)
  );

  let streak = 0;
  const today = getTodayDate();
  let currentDate = new Date(today);

  for (const session of sortedSessions) {
    const sessionDate = session.date;
    const expectedDate = currentDate.toISOString().split("T")[0];

    if (sessionDate === expectedDate) {
      streak++;
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  stats.currentStreak = streak;
  
  // Update longest streak if current is higher
  if (streak > stats.longestStreak) {
    stats.longestStreak = streak;
  }
}

/**
 * Get verses read today
 */
export function getVersesReadToday(): number {
  const stats = getStatistics();
  const today = getTodayDate();
  const todaySession = stats.sessions.find((s) => s.date === today);
  return todaySession?.versesRead || 0;
}

/**
 * Get time spent today (in seconds)
 */
export function getTimeSpentToday(): number {
  const stats = getStatistics();
  const today = getTodayDate();
  const todaySession = stats.sessions.find((s) => s.date === today);
  return todaySession?.timeSpent || 0;
}

/**
 * Get sessions for the last N days
 */
export function getRecentSessions(days: number): ReadingSession[] {
  const stats = getStatistics();
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - days + 1);

  return stats.sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startDate && sessionDate <= today;
  }).sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Get total progress percentage across all Surahs
 * Assumes 6236 total verses in the Quran
 */
export function getTotalProgressPercentage(): number {
  const TOTAL_VERSES_IN_QURAN = 6236;
  const stats = getStatistics();
  return Math.min(100, (stats.totalVersesRead / TOTAL_VERSES_IN_QURAN) * 100);
}

/**
 * Format time in seconds to human-readable string
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${secs}s`;
}
