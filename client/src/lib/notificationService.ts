// Prayer Time Notification Service
import { getCurrentLanguage } from './languageDetection';
import { formatReminderMessage, formatPrayerNotification, getTranslations } from './translations';

export interface PrayerNotificationSettings {
  enabled: boolean;
  soundType: 'adhan' | 'phone' | 'silent';
  adhanVoice?: 'mishary' | 'abdul-basit' | 'makkah';
  reminderMinutes: number; // 0, 5, 10, 15, 30
  timeAdjustment: number; // -30 to +30 minutes
}

export interface PrayerSettings {
  fajr: PrayerNotificationSettings;
  dhuhr: PrayerNotificationSettings;
  asr: PrayerNotificationSettings;
  maghrib: PrayerNotificationSettings;
  isha: PrayerNotificationSettings;
}

const DEFAULT_PRAYER_SETTINGS: PrayerNotificationSettings = {
  enabled: true,
  soundType: 'adhan',
  adhanVoice: 'mishary',
  reminderMinutes: 10,
  timeAdjustment: 0,
};

export const DEFAULT_SETTINGS: PrayerSettings = {
  fajr: { ...DEFAULT_PRAYER_SETTINGS },
  dhuhr: { ...DEFAULT_PRAYER_SETTINGS },
  asr: { ...DEFAULT_PRAYER_SETTINGS },
  maghrib: { ...DEFAULT_PRAYER_SETTINGS },
  isha: { ...DEFAULT_PRAYER_SETTINGS },
};

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Get prayer settings from localStorage
export function getPrayerSettings(): PrayerSettings {
  const stored = localStorage.getItem('prayerSettings');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse prayer settings:', e);
    }
  }
  return DEFAULT_SETTINGS;
}

// Save prayer settings to localStorage
export function savePrayerSettings(settings: PrayerSettings): void {
  localStorage.setItem('prayerSettings', JSON.stringify(settings));
}

// Schedule notification for a specific prayer time
export function scheduleNotification(
  prayerName: string,
  prayerTime: Date,
  settings: PrayerNotificationSettings
): void {
  if (!settings.enabled) return;

  const now = new Date();
  const notificationTime = new Date(prayerTime);
  
  // Apply time adjustment
  notificationTime.setMinutes(notificationTime.getMinutes() + settings.timeAdjustment);
  
  // Schedule reminder notification
  if (settings.reminderMinutes > 0) {
    const reminderTime = new Date(notificationTime);
    reminderTime.setMinutes(reminderTime.getMinutes() - settings.reminderMinutes);
    
    if (reminderTime > now) {
      const timeUntilReminder = reminderTime.getTime() - now.getTime();
      setTimeout(() => {
        const lang = getCurrentLanguage();
        const message = formatReminderMessage(prayerName, settings.reminderMinutes, lang);
        showNotification(
          `${prayerName} ${getTranslations(lang).settings.reminder}`,
          message,
          'reminder'
        );
      }, timeUntilReminder);
    }
  }
  
  // Schedule main notification
  if (notificationTime > now) {
    const timeUntilPrayer = notificationTime.getTime() - now.getTime();
    setTimeout(() => {
      const lang = getCurrentLanguage();
      const message = formatPrayerNotification(prayerName, lang);
      showNotification(
        `${prayerName}`,
        message,
        'prayer',
        settings
      );
    }, timeUntilPrayer);
  }
}

// Show notification
async function showNotification(
  title: string,
  body: string,
  type: 'prayer' | 'reminder',
  settings?: PrayerNotificationSettings
): Promise<void> {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return;

  const notification = new Notification(title, {
    body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: type,
    requireInteraction: type === 'prayer',
    silent: settings?.soundType === 'silent',
  });

  // Play sound if not silent
  if (settings && settings.soundType !== 'silent') {
    playNotificationSound(settings);
  }

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}

// Play notification sound
function playNotificationSound(settings: PrayerNotificationSettings): void {
  let audioSrc = '';
  
  if (settings.soundType === 'adhan' && settings.adhanVoice) {
    audioSrc = `/sounds/adhan-${settings.adhanVoice}.mp3`;
  } else if (settings.soundType === 'phone') {
    // Use browser's default notification sound (no audio file needed)
    return;
  }
  
  if (audioSrc) {
    const audio = new Audio(audioSrc);
    audio.volume = 0.7;
    audio.play().catch(err => {
      console.error('Failed to play notification sound:', err);
    });
  }
}

// Schedule all daily prayers
export function scheduleAllPrayers(prayerTimes: any, settings: PrayerSettings): void {
  const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
  
  prayers.forEach(prayer => {
    if (prayerTimes[prayer]) {
      const prayerTime = new Date(prayerTimes[prayer]);
      scheduleNotification(
        prayer.charAt(0).toUpperCase() + prayer.slice(1),
        prayerTime,
        settings[prayer]
      );
    }
  });
}

// Check and reschedule notifications daily
export function initializePrayerNotifications(): void {
  // Request permission on init
  requestNotificationPermission();
  
  // Check every minute if we need to reschedule
  setInterval(() => {
    const now = new Date();
    // Reschedule at midnight
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      // This would need to fetch new prayer times and reschedule
      console.log('Rescheduling prayers for new day');
    }
  }, 60000); // Check every minute
}
