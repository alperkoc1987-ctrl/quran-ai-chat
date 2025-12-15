import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Supported languages
export type Language = "de" | "en" | "tr" | "ar";

// Translation dictionaries
const translations = {
  de: {
    // Navigation
    home: "Startseite",
    quran: "Koran",
    duas: "Bittgebete",
    dhikr: "Dhikr",
    settings: "Einstellungen",
    prayerTimes: "Gebetszeiten",
    qibla: "Qibla-Richtung",
    stories: "Geschichten",
    quiz: "Quiz",
    statistics: "Statistiken",
    bookmarks: "Lesezeichen",
    
    // Common
    search: "Suchen",
    loading: "Lädt...",
    error: "Fehler",
    save: "Speichern",
    cancel: "Abbrechen",
    back: "Zurück",
    continue: "Fortsetzen",
    delete: "Löschen",
    
    // Home
    appTitle: "Koran & Hadith KI-Chat",
    appSubtitle: "Ihr islamischer Begleiter",
    aiAssistant: "KI-Assistent",
    aiAssistantDesc: "Stellen Sie Fragen zum Koran und Hadith",
    continueReading: "Lesen fortsetzen",
    theQuran: "Der Koran",
    prayerTimesShort: "Gebetszeiten",
    qiblaDirection: "Qibla-Richtung",
    islamicStories: "Geschichten",
    progress: "Fortschritt",
    
    // Settings
    darkMode: "Dunkler Modus",
    darkModeDesc: "Aktiviere den dunklen Modus für bessere Lesbarkeit bei Nacht",
    transliteration: "Transliteration",
    transliterationDesc: "Zeige lateinische Umschrift unter arabischem Text",
    translationLanguage: "Übersetzungssprache",
    translationLanguageDesc: "Wähle die Sprache für Koran-Übersetzungen",
    german: "Deutsch",
    english: "English",
    turkish: "Türkçe",
    arabic: "عربي",
    arabicOnly: "Nur Arabisch",
    
    // Categories
    theQuranTitle: "Der Koran",
    theQuranDesc: "Lesen Sie den heiligen Koran",
    duasTitle: "Duas",
    duasDesc: "Bittgebete für jede Lebenslage",
    prayerTimesTitle: "Gebetszeiten",
    prayerTimesDesc: "Finden Sie Ihre lokalen Gebetszeiten",
    qiblaTitle: "Qibla-Richtung",
    qiblaDesc: "Finden Sie die Richtung nach Mekka",
    storiesTitle: "Geschichten",
    storiesDesc: "Prophetengeschichten aus dem Koran",
    quizTitle: "Quiz",
    quizDesc: "Teste dein islamisches Wissen",
    progressTitle: "Fortschritt",
    progressDesc: "Fortschritt & Lesezeiten",
    bookmarksTitle: "Lesezeichen",
    bookmarksDesc: "Gespeicherte Verse & Notizen",
    dhikrTitle: "Dhikr & Adhkar",
    dhikrDesc: "Erinnerungen mit Zähler",
    settingsTitle: "Einstellungen",
    settingsDesc: "Dark Mode, Rezitator & mehr",
  },
  en: {
    // Navigation
    home: "Home",
    quran: "Quran",
    duas: "Duas",
    dhikr: "Dhikr",
    settings: "Settings",
    prayerTimes: "Prayer Times",
    qibla: "Qibla Direction",
    stories: "Stories",
    quiz: "Quiz",
    statistics: "Statistics",
    bookmarks: "Bookmarks",
    
    // Common
    search: "Search",
    loading: "Loading...",
    error: "Error",
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    continue: "Continue",
    delete: "Delete",
    
    // Home
    appTitle: "Quran & Hadith AI Chat",
    appSubtitle: "Your Islamic Companion",
    aiAssistant: "AI Assistant",
    aiAssistantDesc: "Ask questions about Quran and Hadith",
    continueReading: "Continue Reading",
    theQuran: "The Quran",
    prayerTimesShort: "Prayer Times",
    qiblaDirection: "Qibla Direction",
    islamicStories: "Stories",
    progress: "Progress",
    
    // Settings
    darkMode: "Dark Mode",
    darkModeDesc: "Enable dark mode for better readability at night",
    transliteration: "Transliteration",
    transliterationDesc: "Show Latin transliteration under Arabic text",
    translationLanguage: "Translation Language",
    translationLanguageDesc: "Choose the language for Quran translations",
    german: "Deutsch",
    english: "English",
    turkish: "Türkçe",
    arabic: "عربي",
    arabicOnly: "Arabic Only",
    
    // Categories
    theQuranTitle: "The Quran",
    theQuranDesc: "Read the Holy Quran",
    duasTitle: "Duas",
    duasDesc: "Prayers for every situation",
    prayerTimesTitle: "Prayer Times",
    prayerTimesDesc: "Find your local prayer times",
    qiblaTitle: "Qibla Direction",
    qiblaDesc: "Find the direction to Mecca",
    storiesTitle: "Stories",
    storiesDesc: "Prophet stories from the Quran",
    quizTitle: "Quiz",
    quizDesc: "Test your Islamic knowledge",
    progressTitle: "Progress",
    progressDesc: "Progress & Reading Times",
    bookmarksTitle: "Bookmarks",
    bookmarksDesc: "Saved verses & notes",
    dhikrTitle: "Dhikr & Adhkar",
    dhikrDesc: "Reminders with counter",
    settingsTitle: "Settings",
    settingsDesc: "Dark Mode, Reciter & more",
  },
  tr: {
    // Navigation
    home: "Ana Sayfa",
    quran: "Kuran",
    duas: "Dualar",
    dhikr: "Zikirler",
    settings: "Ayarlar",
    prayerTimes: "Namaz Vakitleri",
    qibla: "Kıble Yönü",
    stories: "Hikayeler",
    quiz: "Sınav",
    statistics: "İstatistikler",
    bookmarks: "Yer İmleri",
    
    // Common
    search: "Ara",
    loading: "Yükleniyor...",
    error: "Hata",
    save: "Kaydet",
    cancel: "İptal",
    back: "Geri",
    continue: "Devam Et",
    delete: "Sil",
    
    // Home
    appTitle: "Kuran & Hadis Yapay Zeka Sohbeti",
    appSubtitle: "İslami Arkadaşınız",
    aiAssistant: "Yapay Zeka Asistanı",
    aiAssistantDesc: "Kuran ve Hadis hakkında sorular sorun",
    continueReading: "Okumaya Devam Et",
    theQuran: "Kuran",
    prayerTimesShort: "Namaz Vakitleri",
    qiblaDirection: "Kıble Yönü",
    islamicStories: "Hikayeler",
    progress: "İlerleme",
    
    // Settings
    darkMode: "Karanlık Mod",
    darkModeDesc: "Gece daha iyi okunabilirlik için karanlık modu etkinleştirin",
    transliteration: "Transkripsiyon",
    transliterationDesc: "Arapça metnin altında Latin harfleriyle yazılışını göster",
    translationLanguage: "Çeviri Dili",
    translationLanguageDesc: "Kuran çevirileri için dil seçin",
    german: "Almanca",
    english: "İngilizce",
    turkish: "Türkçe",
    arabic: "Arapça",
    arabicOnly: "Sadece Arapça",
    
    // Categories
    theQuranTitle: "Kuran",
    theQuranDesc: "Kutsal Kuran'ı okuyun",
    duasTitle: "Dualar",
    duasDesc: "Her durum için dualar",
    prayerTimesTitle: "Namaz Vakitleri",
    prayerTimesDesc: "Yerel namaz vakitlerinizi bulun",
    qiblaTitle: "Kıble Yönü",
    qiblaDesc: "Mekke yönünü bulun",
    storiesTitle: "Hikayeler",
    storiesDesc: "Kuran'dan peygamber hikayeleri",
    quizTitle: "Sınav",
    quizDesc: "İslami bilginizi test edin",
    progressTitle: "İlerleme",
    progressDesc: "İlerleme & Okuma Süreleri",
    bookmarksTitle: "Yer İmleri",
    bookmarksDesc: "Kaydedilen ayetler & notlar",
    dhikrTitle: "Zikirler & Dualar",
    dhikrDesc: "Sayaç ile hatırlatmalar",
    settingsTitle: "Ayarlar",
    settingsDesc: "Karanlık Mod, Okuyucu & daha fazlası",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    quran: "القرآن",
    duas: "الأدعية",
    dhikr: "الأذكار",
    settings: "الإعدادات",
    
    // Common
    search: "بحث",
    loading: "جاري التحميل...",
    error: "خطأ",
    save: "حفظ",
    cancel: "إلغاء",
    back: "رجوع",
    continue: "متابعة",
    delete: "حذف",
    
    // Home
    appTitle: "محادثة القرآن والحديث بالذكاء الاصطناعي",
    appSubtitle: "رفيقك الإسلامي",
    aiAssistant: "المساعد الذكي",
    aiAssistantDesc: "اطرح أسئلة حول القرآن والحديث",
    continueReading: "متابعة القراءة",
    theQuran: "القرآن",
    prayerTimesShort: "أوقات الصلاة",
    qiblaDirection: "اتجاه القبلة",
    islamicStories: "قصص",
    progress: "التقدم",
    prayerTimes: "أوقات الصلاة",
    qibla: "اتجاه القبلة",
    stories: "قصص",
    quiz: "اختبار",
    statistics: "إحصائيات",
    bookmarks: "علامات مرجعية",
    
    // Settings
    darkMode: "الوضع الداكن",
    darkModeDesc: "تفعيل الوضع الداكن لقراءة أفضل في الليل",
    transliteration: "النسخ الصوتي",
    transliterationDesc: "عرض النسخ اللاتيني تحت النص العربي",
    translationLanguage: "لغة الترجمة",
    translationLanguageDesc: "اختر اللغة لترجمات القرآن",
    german: "الألمانية",
    english: "الإنجليزية",
    turkish: "التركية",
    arabic: "العربية",
    arabicOnly: "العربية فقط",
    
    // Categories
    theQuranTitle: "القرآن",
    theQuranDesc: "اقرأ القرآن الكريم",
    duasTitle: "الأدعية",
    duasDesc: "أدعية لكل موقف",
    prayerTimesTitle: "أوقات الصلاة",
    prayerTimesDesc: "ابحث عن أوقات الصلاة المحلية",
    qiblaTitle: "اتجاه القبلة",
    qiblaDesc: "ابحث عن اتجاه مكة",
    storiesTitle: "قصص",
    storiesDesc: "قصص الأنبياء من القرآن",
    quizTitle: "اختبار",
    quizDesc: "اختبر معرفتك الإسلامية",
    progressTitle: "التقدم",
    progressDesc: "التقدم & أوقات القراءة",
    bookmarksTitle: "علامات مرجعية",
    bookmarksDesc: "آيات & ملاحظات محفوظة",
    dhikrTitle: "الأذكار",
    dhikrDesc: "تذكيرات مع عداد",
    settingsTitle: "الإعدادات",
    settingsDesc: "الوضع الداكن، القارئ & المزيد",
  },
};

type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Detect browser language
function detectLanguage(): Language {
  if (typeof window === "undefined") return "en";
  
  // Check localStorage first
  const stored = localStorage.getItem("lang");
  if (stored && isValidLanguage(stored)) {
    return stored as Language;
  }
  
  // Detect from browser
  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  const langCode = browserLang.toLowerCase().split("-")[0];
  
  // Map to supported languages
  if (langCode === "de") return "de";
  if (langCode === "tr") return "tr";
  if (langCode === "ar") return "ar";
  return "en"; // Default fallback
}

function isValidLanguage(lang: string): lang is Language {
  return ["de", "en", "tr", "ar"].includes(lang);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectLanguage);

  useEffect(() => {
    // Set HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    // Save to localStorage
    localStorage.setItem("lang", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    if (isValidLanguage(lang)) {
      setLanguageState(lang);
    }
  };

  // Translation function with fallback
  const t = (key: string): string => {
    const dict = translations[language];
    if (dict && key in dict) {
      return dict[key as TranslationKey];
    }
    
    // Fallback to English
    const enDict = translations.en;
    if (enDict && key in enDict) {
      return enDict[key as TranslationKey];
    }
    
    // Return key if not found
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
