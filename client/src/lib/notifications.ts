/**
 * notifications.ts
 * Utility functions for managing push notifications and reminders
 */

export interface NotificationSettings {
  enabled: boolean;
  prayerTimesEnabled: boolean;
  dailyVerseEnabled: boolean;
  readingReminderEnabled: boolean;
  readingReminderTime: string; // HH:MM format
}

const STORAGE_KEY = "quran_notification_settings";
const PERMISSION_REQUESTED_KEY = "quran_notification_permission_requested";

/**
 * Get notification settings from localStorage
 */
export function getNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") {
    return getDefaultSettings();
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return getDefaultSettings();
    }

    const settings: NotificationSettings = JSON.parse(stored);
    return settings;
  } catch (error) {
    console.error("Failed to load notification settings:", error);
    return getDefaultSettings();
  }
}

/**
 * Get default notification settings
 */
function getDefaultSettings(): NotificationSettings {
  return {
    enabled: false,
    prayerTimesEnabled: false,
    dailyVerseEnabled: false,
    readingReminderEnabled: false,
    readingReminderTime: "20:00", // 8 PM default
  };
}

/**
 * Save notification settings to localStorage
 */
export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save notification settings:", error);
  }
}

/**
 * Check if notification permission has been requested before
 */
export function hasRequestedPermission(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(PERMISSION_REQUESTED_KEY) === "true";
}

/**
 * Mark that notification permission has been requested
 */
export function markPermissionRequested(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PERMISSION_REQUESTED_KEY, "true");
}

/**
 * Request notification permission from the browser
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    console.log("Notifications not supported");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  if (Notification.permission === "denied") {
    console.log("Notification permission denied");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    markPermissionRequested();
    return permission === "granted";
  } catch (error) {
    console.error("Failed to request notification permission:", error);
    return false;
  }
}

/**
 * Check if notifications are supported and permitted
 */
export function areNotificationsAvailable(): boolean {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }

  return Notification.permission === "granted";
}

/**
 * Show a notification
 */
export function showNotification(title: string, options?: NotificationOptions): void {
  if (!areNotificationsAvailable()) {
    console.log("Notifications not available");
    return;
  }

  try {
    new Notification(title, {
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      ...options,
    });
  } catch (error) {
    console.error("Failed to show notification:", error);
  }
}

/**
 * Schedule daily verse notification
 */
export function scheduleDailyVerseNotification(): void {
  const settings = getNotificationSettings();
  
  if (!settings.enabled || !settings.dailyVerseEnabled) {
    return;
  }

  // Schedule for tomorrow at 8 AM
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(8, 0, 0, 0);

  const timeUntilNotification = tomorrow.getTime() - now.getTime();

  setTimeout(() => {
    showNotification("Täglicher Vers", {
      body: "Lesen Sie heute einen Vers aus dem Koran",
      tag: "daily-verse",
    });
    // Reschedule for next day
    scheduleDailyVerseNotification();
  }, timeUntilNotification);
}

/**
 * Schedule reading reminder notification
 */
export function scheduleReadingReminder(): void {
  const settings = getNotificationSettings();
  
  if (!settings.enabled || !settings.readingReminderEnabled) {
    return;
  }

  const [hours, minutes] = settings.readingReminderTime.split(":").map(Number);
  
  const now = new Date();
  const reminderTime = new Date(now);
  reminderTime.setHours(hours, minutes, 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (reminderTime <= now) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  const timeUntilReminder = reminderTime.getTime() - now.getTime();

  setTimeout(() => {
    showNotification("Lesezeit", {
      body: "Zeit für Ihre tägliche Koran-Lesung",
      tag: "reading-reminder",
    });
    // Reschedule for next day
    scheduleReadingReminder();
  }, timeUntilReminder);
}

/**
 * Initialize notifications based on settings
 */
export function initializeNotifications(): void {
  const settings = getNotificationSettings();
  
  if (!settings.enabled) {
    return;
  }

  if (settings.dailyVerseEnabled) {
    scheduleDailyVerseNotification();
  }

  if (settings.readingReminderEnabled) {
    scheduleReadingReminder();
  }
}

/**
 * Get daily verse from the Quran
 * Returns a random verse for now - can be enhanced to return verse of the day
 */
export async function getDailyVerse(): Promise<{ arabic: string; translation: string; reference: string }> {
  // For now, return a placeholder
  // In a real implementation, this would fetch from an API or local database
  return {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "Im Namen Allahs, des Allerbarmers, des Barmherzigen",
    reference: "Al-Faatiha 1:1",
  };
}
