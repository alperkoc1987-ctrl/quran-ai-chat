/**
 * Settings.tsx
 * Settings page with dark mode, transliteration, and reciter selection
 */

import { ArrowLeft, Moon, Sun, Languages, Music, Bell, Compass, Info, Shield, Palette } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useTransliteration } from "@/contexts/TransliterationContext";
import { useTranslationLanguage, type TranslationLanguage } from "@/contexts/TranslationLanguageContext";
import { ReadingThemeSelector } from "@/components/ReadingThemeSelector";
import { useReadingTheme } from "@/contexts/ReadingThemeContext";
import { useState, useEffect } from "react";
import { RECITERS, ReciterKey } from "@/lib/audio";
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermission,
  areNotificationsAvailable,
  initializeNotifications,
  type NotificationSettings,
} from "@/lib/notifications";

export default function Settings() {
  const { themeConfig } = useReadingTheme();
  const [, setLocation] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { showTransliteration, setShowTransliteration } = useTransliteration();
  const { language: translationLanguage, setLanguage: setTranslationLanguage } = useTranslationLanguage();
  
  // Reciter selection state
  const [selectedReciter, setSelectedReciter] = useState<ReciterKey>("mishary");
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(getNotificationSettings());
  const [notificationsAvailable, setNotificationsAvailable] = useState(areNotificationsAvailable());

  // Load saved reciter from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedReciter") as ReciterKey;
      if (saved && RECITERS[saved]) {
        setSelectedReciter(saved);
      }
    }
  }, []);

  // Save reciter to localStorage
  const handleReciterChange = (reciter: ReciterKey) => {
    setSelectedReciter(reciter);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedReciter", reciter);
    }
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled && !notificationsAvailable) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        alert("Benachrichtigungen wurden abgelehnt. Bitte aktivieren Sie sie in den Browser-Einstellungen.");
        return;
      }
      setNotificationsAvailable(true);
    }

    const newSettings = { ...notificationSettings, enabled };
    setNotificationSettings(newSettings);
    saveNotificationSettings(newSettings);

    if (enabled) {
      initializeNotifications();
    }
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: any) => {
    const newSettings = { ...notificationSettings, [key]: value };
    setNotificationSettings(newSettings);
    saveNotificationSettings(newSettings);

    if (notificationSettings.enabled) {
      initializeNotifications();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => setLocation("/")}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-300" />
          </button>
          <h1 className="text-2xl font-bold text-white">
            Einstellungen
          </h1>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Dark Mode Setting */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {theme === "dark" ? (
                <Moon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              ) : (
                <Sun className="w-6 h-6 text-teal-600" />
              )}
              <div>
                <h2 className={`text-lg font-semibold ${themeConfig.colors.text}`}>
                  Dunkler Modus
                </h2>
                <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                  Aktiviere den dunklen Modus für bessere Lesbarkeit bei Nacht
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                theme === "dark" ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  theme === "dark" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Transliteration Setting */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Languages className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <div>
                <h2 className={`text-lg font-semibold ${themeConfig.colors.text}`}>
                  Transliteration
                </h2>
                <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                  Zeige lateinische Umschrift unter arabischem Text
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTransliteration(!showTransliteration)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                showTransliteration ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  showTransliteration ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Translation Language Setting */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Languages className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Übersetzungssprache
              </h2>
              <p className="text-sm text-slate-300">
                Wähle die Sprache für Koran-Übersetzungen
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => setTranslationLanguage("de")}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationLanguage === "de"
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <div className="text-2xl mb-2">🇩🇪</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">Deutsch</div>
            </button>

            <button
              onClick={() => setTranslationLanguage("en")}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationLanguage === "en"
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <div className="text-2xl mb-2">🇬🇧</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">English</div>
            </button>

            <button
              onClick={() => setTranslationLanguage("tr")}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationLanguage === "tr"
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <div className="text-2xl mb-2">🇹🇷</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">Türkçe</div>
            </button>

            <button
              onClick={() => setTranslationLanguage("ar")}
              className={`p-4 rounded-lg border-2 transition-all ${
                translationLanguage === "ar"
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                  : "border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-700"
              }`}
            >
              <div className="text-2xl mb-2">🇸🇦</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">عربي</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Nur Arabisch</div>
            </button>
          </div>
        </div>

        {/* Reading Theme Selection */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Palette className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Lese-Ansicht
              </h2>
              <p className="text-sm text-slate-300">
                Wähle ein Theme für eine angenehme Leseerfahrung
              </p>
            </div>
          </div>
          <ReadingThemeSelector />
        </div>

        {/* Reciter Selection */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Music className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Rezitator auswählen
              </h2>
              <p className="text-sm text-slate-300">
                Wähle deinen bevorzugten Koran-Rezitator
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {(Object.keys(RECITERS) as ReciterKey[]).map((key) => {
              const reciter = RECITERS[key];
              return (
                <button
                  key={key}
                  onClick={() => handleReciterChange(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedReciter === key
                      ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20 dark:border-teal-400"
                      : "border-gray-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-500"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {reciter.name}
                      </h3>
                      <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                        {reciter.description}
                      </p>
                    </div>
                    {selectedReciter === key && (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Bell className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Benachrichtigungen
              </h2>
              <p className="text-sm text-slate-300">
                Erhalte Erinnerungen für Gebetszeiten und tägliche Verse
              </p>
            </div>
          </div>

          {/* Master Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg mb-4">
            <span className="font-medium text-gray-900 dark:text-gray-100">Benachrichtigungen aktivieren</span>
            <button
              onClick={() => handleNotificationToggle(!notificationSettings.enabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                notificationSettings.enabled ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  notificationSettings.enabled ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Prayer Settings Link */}
          <button
            onClick={() => setLocation("/prayer-settings")}
            className="w-full p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-gray-100">Gebetsbenachrichtigungen</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Adhan-Einstellungen & Gebetszeiten</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Individual Notification Settings */}
          {notificationSettings.enabled && (
            <div className="space-y-3">
              {/* Daily Verse */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-slate-600">
                <span className="text-sm text-gray-700 dark:text-gray-300">Täglicher Vers (8:00 Uhr)</span>
                <button
                  onClick={() =>
                    handleNotificationSettingChange("dailyVerseEnabled", !notificationSettings.dailyVerseEnabled)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.dailyVerseEnabled ? "bg-teal-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.dailyVerseEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Reading Reminder */}
              <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-600 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Leseerinnerung</span>
                  <button
                    onClick={() =>
                      handleNotificationSettingChange(
                        "readingReminderEnabled",
                        !notificationSettings.readingReminderEnabled
                      )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notificationSettings.readingReminderEnabled ? "bg-teal-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notificationSettings.readingReminderEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                {notificationSettings.readingReminderEnabled && (
                  <input
                    type="time"
                    value={notificationSettings.readingReminderTime}
                    onChange={(e) => handleNotificationSettingChange("readingReminderTime", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 text-sm"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Qibla Section */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <button
            onClick={() => setLocation("/qibla")}
            className="w-full flex items-center justify-between group hover:bg-teal-50 dark:hover:bg-slate-700 p-4 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-4">
              <Compass className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              <div className="text-left">
                <h2 className={`text-lg font-semibold ${themeConfig.colors.text}`}>
                  Qibla
                </h2>
                <p className={`text-sm ${themeConfig.colors.textSecondary}`}>
                  Gebetsrichtung finden
                </p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* About Section */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Info className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Über uns
              </h2>
              <p className="text-sm text-slate-300">
                Informationen über die App
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Koran & Hadith KI-Chat</strong> ist Ihr islamischer Begleiter für das Studium des Heiligen Korans und der Hadithe.
            </p>
            <p>
              Die App bietet KI-gestützte Antworten auf Ihre Fragen, Gebetszeiten, Qibla-Richtung, Duas und vieles mehr.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 pt-2">
              Version 1.5 • Entwickelt mit ❤️
            </p>
          </div>
        </div>

        {/* Privacy Section */}
        <div className={`${themeConfig.colors.card} rounded-xl shadow-lg p-6 border ${themeConfig.colors.border}`}>
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-lg font-semibold text-white">
                Datenschutz
              </h2>
              <p className="text-sm text-slate-300">
                Ihre Privatsphäre ist uns wichtig
              </p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              <strong>Datenspeicherung:</strong> Alle Ihre Einstellungen und Lesezeichen werden lokal auf Ihrem Gerät gespeichert.
            </p>
            <p>
              <strong>KI-Chat:</strong> Ihre Fragen werden an OpenAI gesendet, um Antworten zu generieren. Keine persönlichen Daten werden gespeichert.
            </p>
            <p>
              <strong>Standort:</strong> Standortdaten werden nur für Gebetszeiten und Qibla-Richtung verwendet und nicht gespeichert.
            </p>
            <p>
              <strong>Benachrichtigungen:</strong> Sie können Benachrichtigungen jederzeit in den Einstellungen deaktivieren.
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-teal-50 dark:bg-slate-800 rounded-xl p-6 border border-teal-200 dark:border-slate-700">
          <p className="text-sm text-teal-800 dark:text-teal-300 leading-relaxed">
            <strong>Hinweis:</strong> Deine Einstellungen werden automatisch gespeichert und
            bleiben auch nach dem Schließen der App erhalten.
          </p>
        </div>
      </div>
    </div>
  );
}
