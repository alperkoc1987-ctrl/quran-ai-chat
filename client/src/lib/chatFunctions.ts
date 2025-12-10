/**
 * chatFunctions.ts
 * Helper functions for AI chat to access app context (prayer times, statistics, etc.)
 */

import { getStatistics, getTotalProgressPercentage } from "./statistics";
import { getDhikrStatistics } from "./dhikrStats";

/**
 * Get current prayer times from localStorage
 */
export function getPrayerTimes() {
  if (typeof window === "undefined") return null;
  
  const savedTimes = localStorage.getItem("prayerTimes");
  if (!savedTimes) return null;
  
  try {
    const times = JSON.parse(savedTimes);
    return times;
  } catch (error) {
    console.error("Error parsing prayer times:", error);
    return null;
  }
}

/**
 * Calculate time until next prayer
 */
export function getTimeUntilNextPrayer() {
  const times = getPrayerTimes();
  if (!times || !times.timings) {
    return {
      error: "Gebetszeiten sind nicht konfiguriert. Bitte gehe zu Einstellungen > Gebetszeiten.",
    };
  }

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  // Prayer names in order
  const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  
  // Convert prayer times to minutes
  const prayerMinutes: { [key: string]: number } = {};
  for (const prayer of prayerOrder) {
    const timeStr = times.timings[prayer];
    if (timeStr) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      prayerMinutes[prayer] = hours * 60 + minutes;
    }
  }

  // Find next prayer
  let nextPrayer: string | null = null;
  let nextPrayerTime: number | null = null;

  for (const prayer of prayerOrder) {
    const prayerTime = prayerMinutes[prayer];
    if (prayerTime > currentTime) {
      nextPrayer = prayer;
      nextPrayerTime = prayerTime;
      break;
    }
  }

  // If no prayer found today, next prayer is Fajr tomorrow
  if (!nextPrayer) {
    nextPrayer = "Fajr";
    nextPrayerTime = prayerMinutes["Fajr"] + 24 * 60; // Add 24 hours
  }

  const minutesUntil = nextPrayerTime! - currentTime;
  const hours = Math.floor(minutesUntil / 60);
  const minutes = minutesUntil % 60;

  // Format next prayer time
  const nextTimeStr = times.timings[nextPrayer === "Fajr" && minutesUntil > 24 * 60 ? "Fajr" : nextPrayer];

  return {
    nextPrayer,
    nextPrayerTime: nextTimeStr,
    hoursUntil: hours,
    minutesUntil: minutes,
    totalMinutes: minutesUntil,
  };
}

/**
 * Get all prayer times for today
 */
export function getTodayPrayerTimes() {
  const times = getPrayerTimes();
  if (!times || !times.timings) {
    return {
      error: "Gebetszeiten sind nicht konfiguriert. Bitte gehe zu Einstellungen > Gebetszeiten.",
    };
  }

  return {
    Fajr: times.timings.Fajr,
    Dhuhr: times.timings.Dhuhr,
    Asr: times.timings.Asr,
    Maghrib: times.timings.Maghrib,
    Isha: times.timings.Isha,
    date: times.date?.readable || new Date().toLocaleDateString("de-DE"),
  };
}

/**
 * Get specific prayer time
 */
export function getSpecificPrayerTime(prayerName: string) {
  const times = getPrayerTimes();
  if (!times || !times.timings) {
    return {
      error: "Gebetszeiten sind nicht konfiguriert. Bitte gehe zu Einstellungen > Gebetszeiten.",
    };
  }

  // Normalize prayer name
  const normalizedName = prayerName.charAt(0).toUpperCase() + prayerName.slice(1).toLowerCase();
  
  const prayerTime = times.timings[normalizedName];
  if (!prayerTime) {
    return {
      error: `Gebetszeit für ${prayerName} nicht gefunden.`,
    };
  }

  return {
    prayer: normalizedName,
    time: prayerTime,
    date: times.date?.readable || new Date().toLocaleDateString("de-DE"),
  };
}

/**
 * Get user's reading progress and statistics
 */
export function getReadingProgress() {
  const stats = getStatistics();
  const totalProgress = getTotalProgressPercentage();

  return {
    totalVersesRead: stats.totalVersesRead,
    totalTimeSpent: stats.totalTimeSpent,
    totalProgressPercentage: totalProgress,
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
  };
}

/**
 * Get quiz statistics
 */
export function getQuizStats() {
  if (typeof window === "undefined") return null;
  
  const savedStats = localStorage.getItem("quizStats");
  if (!savedStats) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      successRate: 0,
    };
  }

  try {
    const stats = JSON.parse(savedStats);
    const successRate = stats.totalQuestions > 0 
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
      : 0;

    return {
      totalQuestions: stats.totalQuestions,
      correctAnswers: stats.correctAnswers,
      successRate,
    };
  } catch (error) {
    console.error("Error parsing quiz stats:", error);
    return null;
  }
}

/**
 * Get Dhikr statistics
 */
export function getDhikrStats() {
  const stats = getDhikrStatistics();
  if (!stats) {
    return {
      totalDhikrs: 0,
      todayDhikrs: 0,
      currentStreak: 0,
    };
  }

  return {
    totalDhikrs: stats.totalDhikrCount,
    todayDhikrs: stats.todayDhikrCount,
    currentStreak: stats.currentStreak,
    completedToday: stats.completedDhikrToday,
  };
}

/**
 * Function definitions for OpenAI function calling
 */
export const chatFunctionDefinitions = [
  {
    name: "get_prayer_times",
    description: "Gibt die Gebetszeiten für heute zurück (Fajr, Dhuhr, Asr, Maghrib, Isha)",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_time_until_next_prayer",
    description: "Berechnet die Zeit bis zum nächsten Gebet und gibt das nächste Gebet mit Uhrzeit zurück",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_specific_prayer_time",
    description: "Gibt die Uhrzeit für ein bestimmtes Gebet zurück (z.B. Fajr, Dhuhr, Asr, Maghrib, Isha)",
    parameters: {
      type: "object",
      properties: {
        prayer_name: {
          type: "string",
          description: "Name des Gebets (Fajr, Dhuhr, Asr, Maghrib, oder Isha)",
          enum: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
        },
      },
      required: ["prayer_name"],
    },
  },
  {
    name: "get_reading_progress",
    description: "Gibt den Lesefortschritt des Nutzers zurück (gelesene Verse, Zeit, Fortschritt in %)",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_quiz_stats",
    description: "Gibt die Quiz-Statistiken des Nutzers zurück (beantwortete Fragen, richtige Antworten, Erfolgsquote)",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "get_dhikr_stats",
    description: "Gibt die Dhikr-Statistiken des Nutzers zurück (Anzahl der Dhikrs, heutige Dhikrs, Streak)",
    parameters: {
      type: "object",
      properties: {},
      required: [],
    },
  },
];

/**
 * Execute a function call from the AI
 */
export function executeChatFunction(functionName: string, args: any) {
  switch (functionName) {
    case "get_prayer_times":
      return getTodayPrayerTimes();
    
    case "get_time_until_next_prayer":
      return getTimeUntilNextPrayer();
    
    case "get_specific_prayer_time":
      return getSpecificPrayerTime(args.prayer_name);
    
    case "get_reading_progress":
      return getReadingProgress();
    
    case "get_quiz_stats":
      return getQuizStats();
    
    case "get_dhikr_stats":
      return getDhikrStats();
    
    default:
      return { error: `Unknown function: ${functionName}` };
  }
}
