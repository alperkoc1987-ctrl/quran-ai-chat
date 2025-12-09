import { Translation } from "./de";

export const ur: Translation = {
  nav: { home: "ہوم", quran: "قرآن", duas: "دعائیں", dhikr: "اذکار", settings: "ترتیبات" },
  home: {
    title: "قرآن و حدیث AI چیٹ",
    subtitle: "آپ کا اسلامی ساتھی",
    categories: { quran: "قرآن مجید", duas: "دعائیں", prayerTimes: "نماز کے اوقات", qibla: "قبلہ کی سمت", stories: "انبیاء کی کہانیاں", dhikr: "اذکار", progress: "پیش رفت", quiz: "کوئز" },
    ayatOfDay: { title: "آج کی آیت", readVerse: "سورہ پر جائیں", theme: "موضوع", source: "ماخذ" },
    prayerWidget: { title: "اگلی نماز", startsIn: "نماز کا وقت شروع ہوگا:", setup: "نماز کے اوقات ترتیب دینے کے لیے یہاں ٹیپ کریں" },
    aiChat: { title: "AI اسسٹنٹ", subtitle: "قرآن اور حدیث کے بارے میں سوالات پوچھیں", placeholder: "اپنا سوال درج کریں...", send: "بھیجیں", remainingMessages: "آج {{count}} پیغامات باقی ہیں", greeting: "السلام علیکم! میں آپ کی کیسے مدد کر سکتا ہوں؟" },
    continueReading: { title: "پڑھنا جاری رکھیں", continue: "جاری رکھیں", delete: "حذف کریں" }
  },
  prayer: {
    title: "نماز کے اوقات",
    prayers: { fajr: "فجر", dhuhr: "ظہر", asr: "عصر", maghrib: "مغرب", isha: "عشاء" },
    current: "موجودہ", next: "اگلی نماز", startsIn: "شروع ہوگی", location: "مقام", auto: "خودکار", manual: "دستی", edit: "ترمیم", selectLocation: "مقام منتخب کریں", searchCity: "شہر تلاش کریں...", useAutoLocation: "خودکار", useManualLocation: "دستی", adjust: "ایڈجسٹ کریں", adjustTime: "وقت ایڈجسٹ کریں", currentTime: "موجودہ وقت", originalTime: "اصل وقت", reset: "ری سیٹ", save: "محفوظ کریں", cancel: "منسوخ کریں",
    permissions: { denied: "مقام تک رسائی مسترد کر دی گئی", enable: "براہ کرم براؤزر کی ترتیبات میں مقام تک رسائی فعال کریں" }
  },
  quran: {
    title: "قرآن مجید",
    search: "سورتیں تلاش کریں...", verses: "{{count}} آیات", revelation: "نازل ہوئی", makkah: "مکہ", madinah: "مدینہ", play: "چلائیں", pause: "روکیں", favorite: "پسندیدہ", unfavorite: "پسندیدہ سے ہٹائیں",
    tabs: { all: "تمام", favorites: "پسندیدہ" },
    reader: { settings: "ترتیبات", playing: "چل رہا ہے (آیت {{current}}/{{total}})", repeat: "دہرائیں: {{count}}x", selectRepeat: "دہرانا منتخب کریں", bookmark: "بک مارک", copy: "کاپی کریں", share: "شیئر کریں", verseNumber: "آیت {{number}}" }
  },
  duas: {
    title: "دعائیں",
    categories: { morning: "صبح", evening: "شام", prayer: "نماز", forgiveness: "بخشش", health: "صحت", wealth: "دولت", knowledge: "علم", family: "خاندان", travel: "سفر", exams: "امتحانات", anxiety: "پریشانی", children: "بچے", devotion: "عبادت", guidance: "ہدایت" },
    arabic: "عربی", transliteration: "نقل حرفی", translation: "ترجمہ", source: "ماخذ"
  },
  dhikr: {
    title: "اذکار",
    categories: { morning: "صبح کے اذکار", evening: "شام کے اذکار", afterPrayer: "نماز کے بعد", beforeSleep: "سونے سے پہلے", afterWudu: "وضو کے بعد", general: "عام" },
    counter: { title: "ذکر کاؤنٹر", tap: "گننے کے لیے ٹیپ کریں", count: "{{current}} از {{target}}", complete: "ماشاءاللہ! مکمل ہوگیا", reset: "ری سیٹ" },
    arabic: "عربی", transliteration: "نقل حرفی", translation: "ترجمہ", reward: "ثواب"
  },
  quiz: {
    title: "اسلامی علم کوئز", start: "کوئز شروع کریں", question: "سوال {{current}} از {{total}}", checkAnswer: "جواب چیک کریں", nextQuestion: "اگلا سوال", correct: "درست!", incorrect: "افسوس غلط", explanation: "وضاحت",
    results: { title: "کوئز مکمل!", score: "آپ کا سکور", correct: "{{count}} درست", incorrect: "{{count}} غلط", restart: "دوبارہ کھیلیں", home: "ہوم پر واپس جائیں" }
  },
  progress: {
    title: "پیش رفت",
    reading: { title: "پڑھنے کی پیش رفت", totalTime: "کل وقت", todayTime: "آج", versesRead: "آیات پڑھی گئیں", surahs: "سورتیں" },
    quiz: { title: "کوئز کے اعداد و شمار", questionsAnswered: "سوالات کے جوابات دیے", correctAnswers: "درست جوابات", accuracy: "درستگی" },
    dhikr: { title: "ذکر کے اعداد و شمار", totalCount: "کل تعداد", sessionsCompleted: "سیشن مکمل ہوئے" },
    share: "پیش رفت شیئر کریں"
  },
  settings: {
    title: "ترتیبات",
    language: { title: "زبان", subtitle: "ایپ کی زبان منتخب کریں", german: "جرمن", turkish: "ترکی", english: "انگریزی" },
    translation: { title: "قرآن کا ترجمہ", subtitle: "ترجمے کی زبان منتخب کریں" },
    transliteration: { title: "نقل حرفی دکھائیں", subtitle: "عربی اور ترجمے کے درمیان لاطینی نقل" },
    theme: { title: "پڑھنے کی تھیم", subtitle: "اپنی پسندیدہ پڑھنے کی تھیم منتخب کریں", modern: "جدید (منٹ گرین)", classic: "کلاسک (گہرا نیلا)", sepia: "سیپیا (بیج)", dark: "گہرا" },
    reciter: { title: "قاری", subtitle: "اپنا پسندیدہ قرآن قاری منتخب کریں" },
    notifications: { title: "اطلاعات", subtitle: "نماز کے اوقات اور یاد دہانیاں", enable: "اطلاعات فعال کریں", dailyVerse: "روزانہ آیت", readingReminder: "پڑھنے کی یاد دہانی" },
    widgets: { title: "ویجٹس", subtitle: "ہوم اسکرین کو حسب ضرورت بنائیں", prayerTimes: "نماز کے اوقات کا ویجٹ دکھائیں" },
    about: { title: "کے بارے میں", version: "ورژن", developer: "ڈویلپر" }
  },
  qibla: {
    title: "قبلہ کی سمت", subtitle: "مکہ کی طرف نماز کی سمت تلاش کریں", activate: "کمپاس فعال کریں", calibrate: "اپنے آلے کو 8 کی شکل میں حرکت دے کر کیلیبریٹ کریں", aligned: "آپ قبلہ کی طرف ہیں", direction: "قبلہ کی سمت", distance: "مکہ سے فاصلہ",
    permissions: { denied: "کمپاس تک رسائی مسترد کر دی گئی", enable: "براہ کرم کمپاس تک رسائی فعال کریں" }
  },
  stories: { title: "انبیاء کی کہانیاں", readMore: "مزید پڑھیں", readLess: "کم دکھائیں", source: "ماخذ" },
  common: { loading: "لوڈ ہو رہا ہے...", error: "ایک خرابی پیش آگئی", retry: "دوبارہ کوشش کریں", close: "بند کریں", save: "محفوظ کریں", cancel: "منسوخ کریں", delete: "حذف کریں", edit: "ترمیم کریں", back: "واپس", next: "اگلا", previous: "پچھلا", search: "تلاش کریں", filter: "فلٹر کریں", all: "تمام", none: "کوئی نہیں", yes: "ہاں", no: "نہیں", ok: "ٹھیک ہے" },
  time: { hours: "{{count}}گھ", minutes: "{{count}}م", seconds: "{{count}}س", days: "{{count}} دن", weeks: "{{count}} ہفتے", months: "{{count}} مہینے" },
  toast: { verseCopied: "آیت کاپی ہوگئی!", verseShared: "آیت شیئر ہوگئی", bookmarkAdded: "بک مارک شامل ہوگیا", bookmarkRemoved: "بک مارک ہٹا دیا گیا", favoriteAdded: "پسندیدہ میں شامل ہوگیا", favoriteRemoved: "پسندیدہ سے ہٹا دیا گیا", settingsSaved: "ترتیبات محفوظ ہوگئیں", error: "ایک خرابی پیش آگئی", rateLimit: "روزانہ کی حد پوری ہوگئی۔ براہ کرم کل دوبارہ کوشش کریں۔", audioError: "آڈیو چلایا نہیں جا سکا", locationError: "مقام کا تعین نہیں ہو سکا" }
};
