/**
 * dhikrStats.ts
 * Dhikr statistics tracking and retrieval
 */

import { ADHKAR, type Dhikr } from "@/data/adhkar";

// Helper function to get Dhikr by ID
function getDhikrById(id: string): Dhikr | undefined {
  return ADHKAR.find(dhikr => dhikr.id === id);
}

export interface DhikrStats {
  totalDhikrCount: number; // Total Dhikr repetitions across all time
  todayDhikrCount: number; // Dhikr count for today
  currentStreak: number; // Days in a row with Dhikr
  longestStreak: number; // Longest streak ever
  completedDhikrToday: number; // Number of different Dhikr completed today
  favoriteCategory: string; // Most used category
}

export interface DhikrDayStats {
  date: string;
  dhikrCounts: Record<string, number>; // dhikrId -> count
  totalCount: number;
}

// Get all Dhikr stats from localStorage
function getAllDhikrData(): Record<string, Record<string, number>> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem("dhikr-stats");
  return data ? JSON.parse(data) : {};
}

// Get Dhikr count for today
export function getTodayDhikrCount(): number {
  const today = new Date().toISOString().split("T")[0];
  const allData = getAllDhikrData();
  const todayData = allData[today] || {};
  
  return Object.values(todayData).reduce((sum, count) => sum + count, 0);
}

// Get total Dhikr count across all time
export function getTotalDhikrCount(): number {
  const allData = getAllDhikrData();
  let total = 0;
  
  for (const dayData of Object.values(allData)) {
    total += Object.values(dayData).reduce((sum, count) => sum + count, 0);
  }
  
  return total;
}

// Get current streak (consecutive days with Dhikr)
export function getCurrentDhikrStreak(): number {
  const allData = getAllDhikrData();
  const dates = Object.keys(allData).sort().reverse();
  
  if (dates.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < dates.length; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const checkDateStr = checkDate.toISOString().split("T")[0];
    
    if (dates.includes(checkDateStr)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

// Get longest streak ever
export function getLongestDhikrStreak(): number {
  const allData = getAllDhikrData();
  const dates = Object.keys(allData).sort();
  
  if (dates.length === 0) return 0;
  
  let longestStreak = 1;
  let currentStreak = 1;
  
  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }
  
  return longestStreak;
}

// Get number of completed Dhikr today
export function getCompletedDhikrToday(): number {
  const today = new Date().toISOString().split("T")[0];
  const allData = getAllDhikrData();
  const todayData = allData[today] || {};
  
  return Object.keys(todayData).length;
}

// Get favorite category (most used)
export function getFavoriteCategory(): string {
  const allData = getAllDhikrData();
  const categoryCounts: Record<string, number> = {};
  
  for (const dayData of Object.values(allData)) {
    for (const [dhikrId, count] of Object.entries(dayData)) {
      const dhikr = getDhikrById(dhikrId);
      if (dhikr) {
        categoryCounts[dhikr.category] = (categoryCounts[dhikr.category] || 0) + count;
      }
    }
  }
  
  const entries = Object.entries(categoryCounts);
  if (entries.length === 0) return "Noch keine Daten";
  
  const [category] = entries.reduce((max, entry) => 
    entry[1] > max[1] ? entry : max
  );
  
  const categoryNames: Record<string, string> = {
    morning: "Morgen",
    evening: "Abend",
    after_prayer: "Nach Gebet",
    before_sleep: "Vor Schlafen",
    after_wudu: "Nach Wudu",
    general: "Allgemein",
  };
  
  return categoryNames[category] || category;
}

// Get all Dhikr statistics
export function getDhikrStatistics(): DhikrStats {
  return {
    totalDhikrCount: getTotalDhikrCount(),
    todayDhikrCount: getTodayDhikrCount(),
    currentStreak: getCurrentDhikrStreak(),
    longestStreak: getLongestDhikrStreak(),
    completedDhikrToday: getCompletedDhikrToday(),
    favoriteCategory: getFavoriteCategory(),
  };
}

// Get Dhikr stats for last N days
export function getRecentDhikrSessions(days: number = 7): DhikrDayStats[] {
  const allData = getAllDhikrData();
  const sessions: DhikrDayStats[] = [];
  
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dhikrCounts = allData[dateStr] || {};
    const totalCount = Object.values(dhikrCounts).reduce((sum, count) => sum + count, 0);
    
    sessions.push({
      date: dateStr,
      dhikrCounts,
      totalCount,
    });
  }
  
  return sessions;
}

// Get Dhikr count for a specific Dhikr ID
export function getDhikrCountById(dhikrId: string): number {
  const allData = getAllDhikrData();
  let total = 0;
  
  for (const dayData of Object.values(allData)) {
    total += dayData[dhikrId] || 0;
  }
  
  return total;
}
