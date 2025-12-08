import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Bell, Clock, Volume2, VolumeX, Play, Square } from 'lucide-react';
import { useLocation } from 'wouter';
import {
  getPrayerSettings,
  savePrayerSettings,
  requestNotificationPermission,
  type PrayerSettings,
  type PrayerNotificationSettings,
} from '../lib/notificationService';

const PRAYER_NAMES = {
  fajr: 'Fajr (Morgengebet)',
  dhuhr: 'Dhuhr (Mittagsgebet)',
  asr: 'Asr (Nachmittagsgebet)',
  maghrib: 'Maghrib (Abendgebet)',
  isha: 'Isha (Nachtgebet)',
} as const;

const ADHAN_VOICES = [
  { value: 'mishary', label: 'Mishary Rashid Alafasy' },
  { value: 'abdul-basit', label: 'Abdul Basit Abdus Samad' },
  { value: 'makkah', label: 'Makkah (Masjid al-Haram)' },
] as const;

const REMINDER_OPTIONS = [
  { value: 0, label: 'Keine Erinnerung' },
  { value: 5, label: '5 Minuten vorher' },
  { value: 10, label: '10 Minuten vorher' },
  { value: 15, label: '15 Minuten vorher' },
  { value: 30, label: '30 Minuten vorher' },
] as const;

export default function PrayerSettings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState<PrayerSettings>(getPrayerSettings());
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);
  const [playingAdhan, setPlayingAdhan] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setNotificationPermission('granted');
    }
  };

  const updatePrayerSetting = (
    prayer: keyof PrayerSettings,
    field: keyof PrayerNotificationSettings,
    value: any
  ) => {
    const newSettings = {
      ...settings,
      [prayer]: {
        ...settings[prayer],
        [field]: value,
      },
    };
    setSettings(newSettings);
    savePrayerSettings(newSettings);
  };

  const togglePrayer = (prayer: keyof PrayerSettings) => {
    updatePrayerSetting(prayer, 'enabled', !settings[prayer].enabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/settings')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-slate-300" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Gebetsbenachrichtigungen</h1>
              <p className="text-sm text-slate-400">Adhan-Einstellungen & Erinnerungen</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Notification Permission */}
        {notificationPermission !== 'granted' && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-100 mb-1">
                  Benachrichtigungen aktivieren
                </h3>
                <p className="text-sm text-amber-200/80 mb-3">
                  Erlauben Sie Benachrichtigungen, um Gebetszeit-Erinnerungen zu erhalten.
                </p>
                <button
                  onClick={handleRequestPermission}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                >
                  Benachrichtigungen erlauben
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prayer Settings */}
        <div className="space-y-4">
          {(Object.keys(PRAYER_NAMES) as Array<keyof typeof PRAYER_NAMES>).map((prayer) => {
            const prayerSettings = settings[prayer];
            const isExpanded = expandedPrayer === prayer;

            return (
              <div
                key={prayer}
                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden"
              >
                {/* Prayer Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          prayerSettings.enabled
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{PRAYER_NAMES[prayer]}</h3>
                        <p className="text-sm text-slate-400">
                          {prayerSettings.enabled ? 'Aktiviert' : 'Deaktiviert'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePrayer(prayer)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        prayerSettings.enabled ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                          prayerSettings.enabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {prayerSettings.enabled && (
                    <button
                      onClick={() => setExpandedPrayer(isExpanded ? null : prayer)}
                      className="mt-3 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      {isExpanded ? 'Weniger anzeigen' : 'Einstellungen anpassen'}
                    </button>
                  )}
                </div>

                {/* Expanded Settings */}
                {isExpanded && prayerSettings.enabled && (
                  <div className="px-4 pb-4 space-y-4 border-t border-slate-700 pt-4">
                    {/* Sound Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Benachrichtigungston
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => updatePrayerSetting(prayer, 'soundType', 'adhan')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            prayerSettings.soundType === 'adhan'
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <Volume2 className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium">Adhan</span>
                        </button>
                        <button
                          onClick={() => updatePrayerSetting(prayer, 'soundType', 'phone')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            prayerSettings.soundType === 'phone'
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <Bell className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium">Standard</span>
                        </button>
                        <button
                          onClick={() => updatePrayerSetting(prayer, 'soundType', 'silent')}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            prayerSettings.soundType === 'silent'
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          <VolumeX className="w-5 h-5 mx-auto mb-1" />
                          <span className="text-xs font-medium">Stumm</span>
                        </button>
                      </div>
                    </div>

                    {/* Adhan Voice Selection */}
                    {prayerSettings.soundType === 'adhan' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Muezzin-Stimme
                        </label>
                        <div className="space-y-2">
                          {ADHAN_VOICES.map((voice) => (
                            <div
                              key={voice.value}
                              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer ${
                                prayerSettings.adhanVoice === voice.value
                                  ? 'border-emerald-500 bg-emerald-500/10'
                                  : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                              }`}
                              onClick={() => updatePrayerSetting(prayer, 'adhanVoice', voice.value)}
                            >
                              <span className="text-white font-medium">{voice.label}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (playingAdhan === voice.value) {
                                    audioRef.current?.pause();
                                    setPlayingAdhan(null);
                                  } else {
                                    if (audioRef.current) {
                                      audioRef.current.pause();
                                    }
                                    const audio = new Audio(`/sounds/adhan-${voice.value}.mp3`);
                                    audio.volume = 0.5;
                                    audio.play();
                                    audioRef.current = audio;
                                    setPlayingAdhan(voice.value);
                                    audio.onended = () => setPlayingAdhan(null);
                                  }
                                }}
                                className="p-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                              >
                                {playingAdhan === voice.value ? (
                                  <Square className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Play className="w-4 h-4 text-emerald-400" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reminder Time */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Erinnerung
                      </label>
                      <select
                        value={prayerSettings.reminderMinutes}
                        onChange={(e) =>
                          updatePrayerSetting(prayer, 'reminderMinutes', parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {REMINDER_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Time Adjustment */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Zeitanpassung (±30 Minuten)
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          value={prayerSettings.timeAdjustment}
                          onChange={(e) =>
                            updatePrayerSetting(prayer, 'timeAdjustment', parseInt(e.target.value))
                          }
                          className="flex-1"
                        />
                        <span className="text-white font-mono w-16 text-right">
                          {prayerSettings.timeAdjustment > 0 ? '+' : ''}
                          {prayerSettings.timeAdjustment} min
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Passen Sie die Gebetszeit an Ihre lokalen Berechnungsmethoden an
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p className="text-sm text-blue-200">
            <strong>Hinweis:</strong> Benachrichtigungen funktionieren am besten auf Android und
            Desktop-Browsern. iOS Safari hat eingeschränkte Unterstützung für Web-Benachrichtigungen.
          </p>
        </div>
      </div>
    </div>
  );
}
