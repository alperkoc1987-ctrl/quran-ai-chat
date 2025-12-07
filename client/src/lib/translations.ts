// Translations for Prayer Notifications and UI

import type { SupportedLanguage } from './languageDetection';

export interface Translations {
  // Prayer names
  prayers: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
  // Notification messages
  notifications: {
    prayerTime: string;
    reminderPrefix: string;
    reminderSuffix: string;
  };
  // Settings
  settings: {
    prayerNotifications: string;
    adhanSettings: string;
    soundType: string;
    adhan: string;
    standard: string;
    silent: string;
    muezzinVoice: string;
    reminder: string;
    timeAdjustment: string;
    enabled: string;
    disabled: string;
    noReminder: string;
    minutesBefore: string;
  };
}

export const translations: Record<SupportedLanguage, Translations> = {
  de: {
    prayers: {
      fajr: 'Fajr (Morgengebet)',
      dhuhr: 'Dhuhr (Mittagsgebet)',
      asr: 'Asr (Nachmittagsgebet)',
      maghrib: 'Maghrib (Abendgebet)',
      isha: 'Isha (Nachtgebet)',
    },
    notifications: {
      prayerTime: 'Es ist Zeit für das Gebet',
      reminderPrefix: 'Gebetszeit in',
      reminderSuffix: 'Minuten',
    },
    settings: {
      prayerNotifications: 'Gebetsbenachrichtigungen',
      adhanSettings: 'Adhan-Einstellungen & Gebetszeiten',
      soundType: 'Benachrichtigungston',
      adhan: 'Adhan',
      standard: 'Standard',
      silent: 'Stumm',
      muezzinVoice: 'Muezzin-Stimme',
      reminder: 'Erinnerung',
      timeAdjustment: 'Zeitanpassung',
      enabled: 'Aktiviert',
      disabled: 'Deaktiviert',
      noReminder: 'Keine Erinnerung',
      minutesBefore: 'Minuten vorher',
    },
  },
  en: {
    prayers: {
      fajr: 'Fajr (Dawn Prayer)',
      dhuhr: 'Dhuhr (Noon Prayer)',
      asr: 'Asr (Afternoon Prayer)',
      maghrib: 'Maghrib (Sunset Prayer)',
      isha: 'Isha (Night Prayer)',
    },
    notifications: {
      prayerTime: 'It is time for prayer',
      reminderPrefix: 'Prayer time in',
      reminderSuffix: 'minutes',
    },
    settings: {
      prayerNotifications: 'Prayer Notifications',
      adhanSettings: 'Adhan Settings & Prayer Times',
      soundType: 'Notification Sound',
      adhan: 'Adhan',
      standard: 'Standard',
      silent: 'Silent',
      muezzinVoice: 'Muezzin Voice',
      reminder: 'Reminder',
      timeAdjustment: 'Time Adjustment',
      enabled: 'Enabled',
      disabled: 'Disabled',
      noReminder: 'No Reminder',
      minutesBefore: 'minutes before',
    },
  },
  ar: {
    prayers: {
      fajr: 'الفجر',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
    },
    notifications: {
      prayerTime: 'حان وقت الصلاة',
      reminderPrefix: 'وقت الصلاة بعد',
      reminderSuffix: 'دقائق',
    },
    settings: {
      prayerNotifications: 'إشعارات الصلاة',
      adhanSettings: 'إعدادات الأذان وأوقات الصلاة',
      soundType: 'نغمة الإشعار',
      adhan: 'أذان',
      standard: 'قياسي',
      silent: 'صامت',
      muezzinVoice: 'صوت المؤذن',
      reminder: 'تذكير',
      timeAdjustment: 'تعديل الوقت',
      enabled: 'مفعّل',
      disabled: 'معطّل',
      noReminder: 'بدون تذكير',
      minutesBefore: 'دقائق قبل',
    },
  },
};

/**
 * Get translations for current language
 */
export function getTranslations(lang: SupportedLanguage): Translations {
  return translations[lang] || translations.de;
}

/**
 * Format reminder message
 */
export function formatReminderMessage(
  prayerName: string,
  minutes: number,
  lang: SupportedLanguage
): string {
  const t = getTranslations(lang);
  return `${t.notifications.reminderPrefix} ${minutes} ${t.notifications.reminderSuffix}`;
}

/**
 * Format prayer time notification
 */
export function formatPrayerNotification(prayerName: string, lang: SupportedLanguage): string {
  const t = getTranslations(lang);
  return t.notifications.prayerTime;
}
