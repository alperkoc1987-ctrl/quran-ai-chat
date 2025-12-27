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
    transliteration: "Transliteration",
    translationLanguage: "Übersetzungssprache",
    german: "Deutsch",
    english: "English",
    turkish: "Türçe",
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
    
    // Settings Page
    darkModeDesc: "Aktiviere den dunklen Modus für bessere Lesbarkeit bei Nacht",
    transliterationDesc: "Zeige lateinische Umschrift unter arabischem Text",
    translationLanguageDesc: "Wähle die Sprache für Koran-Übersetzungen",
    arabicOnlyDesc: "Nur Arabisch",
    readingTheme: "Lese-Ansicht",
    readingThemeDesc: "Wähle ein Theme für eine angenehme Leseerfahrung",
    reciterSelection: "Rezitator auswählen",
    reciterSelectionDesc: "Wähle deinen bevorzugten Koran-Rezitator",
    notificationPermissionDenied: "Benachrichtigungen wurden abgelehnt. Bitte aktivieren Sie sie in den Browser-Einstellungen.",
    notifications: "Benachrichtigungen",
    notificationsDesc: "Erhalte Erinnerungen für Gebetszeiten und tägliche Verse",
    prayerNotifications: "Gebetsbenachrichtigungen",
    prayerNotificationsDesc: "Benachrichtigungen für Gebetszeiten",
    about: "Über",
    aboutDesc: "App-Informationen und Version",
    privacy: "Datenschutz",
    privacyDesc: "Datenschutzrichtlinien",
    
    // Quran Page
    allSurahs: "Alle",
    favoriteSurahs: "Favoriten",
    searchPlaceholder: "Surah oder Wort suchen (Enter drücken)...",
    bookmarkAdded: "Lesezeichen hinzugefügt",
    bookmarkRemoved: "Lesezeichen entfernt",
    invalidSurahNumber: "Ungültige Surah-Nummer",
    surahNotFound: "Surah nicht gefunden",
    errorLoadingSurah: "Fehler beim Laden der Sure",
    errorLoadingSurahs: "Fehler beim Laden der Suren",
    loadError: "Ladefehler",
    loadErrorDesc: "Die Audio-Datei konnte nicht geladen werden. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    networkError: "Netzwerkfehler",
    networkErrorDesc: "Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.",
    
    // Duas Page
    duasDescription: "Bittgebete für jede Lebenslage",
    categoryNotFound: "Kategorie nicht gefunden",
    noDuasFound: "Keine Duas in dieser Kategorie gefunden",
    
    // Prayer Times Page
    prayerTimesPageTitle: "Gebetszeiten",
    prayerTimesPageSubtitle: "Ihre lokalen Gebetszeiten",
    prayerTimesLoading: "Gebetszeiten werden geladen...",
    allowLocationAccess: "Erlauben Sie den Standortzugriff, um Ihre lokalen Gebetszeiten zu sehen",
    enableLocation: "Standort aktivieren",
    requestLocationAgain: "Standort erneut anfordern",
    selectCity: "Stadt auswaehlen",
    searchCityDescription: "Suchen Sie nach Ihrer Stadt oder verwenden Sie automatische Standorterkennung",
    autoLocationDetection: "Automatische Standorterkennung",
    changeLocation: "Aendern",
    automatic: "Automatisch",
    manual: "Manuell",
    prayerTimesWidgetText: "Tippen Sie hier, um Gebetszeiten einzurichten",
    nextPrayer: "Naechstes Gebet",
    
    // Quiz Page
    quizPageLoading: "Quiz wird geladen...",
    quizPageTitle: "Islamisches Quiz",
    quizPageSubtitle: "Teste dein Wissen",
    quizPageQuestion: "Frage",
    quizPagePoints: "Punkte",
    quizPageSubmitAnswer: "Antwort bestaetigen",
    quizPageNextQuestion: "Naechste Frage",
    quizPageFinish: "Quiz beenden",
    quizPageExplanation: "Erklaerung:",
    quizPageCompleted: "Quiz Abgeschlossen!",
    quizPageYourResult: "Dein Ergebnis",
    quizPageExcellent: "Ausgezeichnet!",
    quizPageWellDone: "Gut gemacht!",
    quizPagePassed: "Du hast das Quiz erfolgreich bestanden!",
    quizPageContinuePractice: "Uebe weiter, um dein Wissen zu vertiefen!",
    quizPageCorrectAnswers: "Richtige Antworten",
    quizPageSuccessRate: "Erfolgsquote",
    quizPageRestartQuiz: "Neues Quiz starten",
    quizPageBackHome: "Zur Startseite",
    
    // Dhikr Page
    dhikrAndAdhkar: "Dhikr & Adhkar",
    authenticReminders: "Authentische Erinnerungen nach Ahlul Sunnah",
    tapCard: "Tippe auf die Karte,",
    toStartCounter: "um den Dhikr-Zähler zu starten",
    times: "mal",
    reward: "Belohnung:",
    adhkarCount: "Adhkar",
    morningAdhkar: "Morgen-Adhkar",
    morningAdhkarDesc: "Erinnerungen für den Morgen nach dem Fajr-Gebet",
    morningDhikr: "Morgen-Dhikr",
    morningDhikrDesc: "Authentische Erinnerungen für den Morgen",
    eveningAdhkar: "Abend-Adhkar",
    eveningAdhkarDesc: "Erinnerungen für den Abend vor dem Maghrib-Gebet",
    eveningDhikr: "Abend-Dhikr",
    eveningDhikrDesc: "Authentische Erinnerungen für den Abend",
    afterPrayer: "Nach dem Gebet",
    afterPrayerDesc: "Dhikr nach den fünf täglichen Gebeten",
    beforeSleep: "Vor dem Schlafen",
    beforeSleepDesc: "Schutz-Duas und Erinnerungen vor dem Schlafengehen",
    afterWudu: "Nach Wudu",
    afterWuduDesc: "Dhikr nach der rituellen Waschung",
    generalDhikr: "Allgemeine Dhikr",
    generalDhikrDesc: "Erinnerungen für jede Zeit und Gelegenheit",
    
    // Dhikr Counter
    dhikrCompleted: "Dhikr abgeschlossen! 🎉",
    of: "von",
    completed: "Abgeschlossen",
    tapToCount: "Tap zum Zählen",
    rewardFadl: "Belohnung (Fadl)",
    hadithLabel: "Hadith",
    source: "Quelle:",
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
    transliteration: "Transliteration",
    translationLanguage: "Translation Language",
    german: "Deutsch",
    english: "English",
    turkish: "Türçe",
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
    
    // Settings Page
    darkModeDesc: "Enable dark mode for better readability at night",
    transliterationDesc: "Show Latin transliteration under Arabic text",
    translationLanguageDesc: "Choose the language for Quran translations",
    arabicOnlyDesc: "Arabic Only",
    readingTheme: "Reading View",
    readingThemeDesc: "Choose a theme for a pleasant reading experience",
    reciterSelection: "Select Reciter",
    reciterSelectionDesc: "Choose your preferred Quran reciter",
    notificationPermissionDenied: "Notifications were denied. Please enable them in browser settings.",
    notifications: "Notifications",
    notificationsDesc: "Receive reminders for prayer times and daily verses",
    prayerNotifications: "Prayer Notifications",
    prayerNotificationsDesc: "Notifications for prayer times",
    about: "About",
    aboutDesc: "App information and version",
    privacy: "Privacy",
    privacyDesc: "Privacy policy",
    
    // Quran Page
    allSurahs: "All",
    favoriteSurahs: "Favorites",
    searchPlaceholder: "Search Surah or word (press Enter)...",
    bookmarkAdded: "Bookmark added",
    bookmarkRemoved: "Bookmark removed",
    invalidSurahNumber: "Invalid Surah number",
    surahNotFound: "Surah not found",
    errorLoadingSurah: "Error loading Surah",
    errorLoadingSurahs: "Error loading Surahs",
    loadError: "Load Error",
    loadErrorDesc: "The audio file could not be loaded. Please check your internet connection and try again.",
    networkError: "Network Error",
    networkErrorDesc: "No internet connection. Please check your connection.",
    
    // Duas Page
    duasDescription: "Supplications for every situation",
    categoryNotFound: "Category not found",
    noDuasFound: "No duas found in this category",
    
    // Prayer Times Page
    prayerTimesPageTitle: "Prayer Times",
    prayerTimesPageSubtitle: "Your local prayer times",
    prayerTimesLoading: "Loading prayer times...",
    allowLocationAccess: "Allow location access to see your local prayer times",
    enableLocation: "Enable Location",
    requestLocationAgain: "Request Location Again",
    selectCity: "Select City",
    searchCityDescription: "Search for your city or use automatic location detection",
    autoLocationDetection: "Automatic Location Detection",
    changeLocation: "Change",
    automatic: "Automatic",
    manual: "Manual",
    prayerTimesWidgetText: "Tap here to set up prayer times",
    nextPrayer: "Next Prayer",
    
    // Quiz Page
    quizPageLoading: "Loading quiz...",
    quizPageTitle: "Islamic Quiz",
    quizPageSubtitle: "Test your knowledge",
    quizPageQuestion: "Question",
    quizPagePoints: "Points",
    quizPageSubmitAnswer: "Submit Answer",
    quizPageNextQuestion: "Next Question",
    quizPageFinish: "Finish Quiz",
    quizPageExplanation: "Explanation:",
    quizPageCompleted: "Quiz Completed!",
    quizPageYourResult: "Your Result",
    quizPageExcellent: "Excellent!",
    quizPageWellDone: "Well Done!",
    quizPagePassed: "You have successfully completed the quiz!",
    quizPageContinuePractice: "Keep practicing to deepen your knowledge!",
    quizPageCorrectAnswers: "Correct Answers",
    quizPageSuccessRate: "Success Rate",
    quizPageRestartQuiz: "Start New Quiz",
    quizPageBackHome: "Back to Home",
    
    // Dhikr Page
    dhikrAndAdhkar: "Dhikr & Adhkar",
    authenticReminders: "Authentic Reminders according to Ahlul Sunnah",
    tapCard: "Tap on the card,",
    toStartCounter: "to start the Dhikr counter",
    times: "times",
    reward: "Reward:",
    adhkarCount: "Adhkar",
    morningAdhkar: "Morning Adhkar",
    morningAdhkarDesc: "Reminders for the morning after Fajr prayer",
    morningDhikr: "Morning Dhikr",
    morningDhikrDesc: "Authentic reminders for the morning",
    eveningAdhkar: "Evening Adhkar",
    eveningAdhkarDesc: "Reminders for the evening before Maghrib prayer",
    eveningDhikr: "Evening Dhikr",
    eveningDhikrDesc: "Authentic reminders for the evening",
    afterPrayer: "After Prayer",
    afterPrayerDesc: "Dhikr after the five daily prayers",
    beforeSleep: "Before Sleep",
    beforeSleepDesc: "Protective Duas and reminders before sleeping",
    afterWudu: "After Wudu",
    afterWuduDesc: "Dhikr after ritual ablution",
    generalDhikr: "General Dhikr",
    generalDhikrDesc: "Reminders for any time and occasion",
    
    // Dhikr Counter
    dhikrCompleted: "Dhikr completed! 🎉",
    of: "of",
    completed: "Completed",
    tapToCount: "Tap to Count",
    rewardFadl: "Reward (Fadl)",
    hadithLabel: "Hadith",
    source: "Source:",
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
    transliteration: "Transkripsiyon",
    translationLanguage: "Çeviri Dili",
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
    
    // Settings Page
    darkModeDesc: "Gece daha iyi okunabilirlik için karanlık modu etkinleştirin",
    transliterationDesc: "Arapça metnin altında Latin harfleriyle yazılışını göster",
    translationLanguageDesc: "Kuran çevirileri için dil seçin",
    arabicOnlyDesc: "Sadece Arapça",
    readingTheme: "Okuma Görünümü",
    readingThemeDesc: "Keyifli bir okuma deneyimi için bir tema seçin",
    reciterSelection: "Okuyucu Seçin",
    reciterSelectionDesc: "Tercih ettiğiniz Kuran okuyucusunu seçin",
    notificationPermissionDenied: "Bildirimler reddedildi. Lütfen tarayıcı ayarlarından etkinleştirin.",
    notifications: "Bildirimler",
    notificationsDesc: "Namaz vakitleri ve günlük ayetler için hatırlatmalar alın",
    prayerNotifications: "Namaz Bildirimleri",
    prayerNotificationsDesc: "Namaz vakitleri için bildirimler",
    about: "Hakkında",
    aboutDesc: "Uygulama bilgileri ve sürüm",
    privacy: "Gizlilik",
    privacyDesc: "Gizlilik politikası",
    
    // Quran Page
    allSurahs: "Tümü",
    favoriteSurahs: "Favoriler",
    searchPlaceholder: "Sure veya kelime arayın (Enter'a basın)...",
    bookmarkAdded: "Yer imi eklendi",
    bookmarkRemoved: "Yer imi kaldırıldı",
    invalidSurahNumber: "Geçersiz Sure numarası",
    surahNotFound: "Sure bulunamadı",
    errorLoadingSurah: "Sure yüklenirken hata",
    errorLoadingSurahs: "Sureler yüklenirken hata",
    loadError: "Yükleme Hatası",
    loadErrorDesc: "Ses dosyası yüklenemedi. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.",
    networkError: "Ağ Hatası",
    networkErrorDesc: "Internet bağlantısı yok. Lütfen bağlantınızı kontrol edin.",
    
    // Duas Page
    duasDescription: "Her durum için dualar",
    categoryNotFound: "Kategori bulunamadı",
    noDuasFound: "Bu kategoride dua bulunamadı",
    
    // Prayer Times Page
    prayerTimesPageTitle: "Namaz Vakitleri",
    prayerTimesPageSubtitle: "Yerel namaz vakitleriniz",
    prayerTimesLoading: "Namaz vakitleri yukleniyor...",
    allowLocationAccess: "Yerel namaz vakitlerinizi gormek icin konum erisimini izin verin",
    enableLocation: "Konumu Etkinlestir",
    requestLocationAgain: "Konumu Tekrar Isteyin",
    selectCity: "Sehir Secin",
    searchCityDescription: "Sehrinizi arayın veya otomatik konum tespitini kullanin",
    autoLocationDetection: "Otomatik Konum Tespiti",
    changeLocation: "Degistir",
    automatic: "Otomatik",
    manual: "Manuel",
    prayerTimesWidgetText: "Namaz vakitlerini ayarlamak icin buraya dokunun",
    nextPrayer: "Sonraki Namaz",
    
    // Quiz Page
    quizPageLoading: "Quiz yukleniyor...",
    quizPageTitle: "Islami Quiz",
    quizPageSubtitle: "Bilginizi test edin",
    quizPageQuestion: "Soru",
    quizPagePoints: "Puanlar",
    quizPageSubmitAnswer: "Cevabi Gonder",
    quizPageNextQuestion: "Sonraki Soru",
    quizPageFinish: "Quizi Bitir",
    quizPageExplanation: "Aciklama:",
    quizPageCompleted: "Quiz Tamamlandi!",
    quizPageYourResult: "Sonucu",
    quizPageExcellent: "Harika!",
    quizPageWellDone: "Iyi Yaptin!",
    quizPagePassed: "Quizi basariyla tamamladiniz!",
    quizPageContinuePractice: "Bilginizi derinlestirmek icin pratik yapmaya devam edin!",
    quizPageCorrectAnswers: "Dogru Cevaplar",
    quizPageSuccessRate: "Basari Orani",
    quizPageRestartQuiz: "Yeni Quiz Baslat",
    quizPageBackHome: "Ana Sayfaya Don",
    
    // Dhikr Page
    dhikrAndAdhkar: "Zikirler & Dualar",
    authenticReminders: "Ehl-i Sünnet'e göre otantik zikirler",
    tapCard: "Karta dokunun,",
    toStartCounter: "zikir sayacını başlatmak için",
    times: "kez",
    reward: "Ödül:",
     adhkarCount: "Adhkar",
    morningAdhkar: "Sabah Zikirleri",
    morningAdhkarDesc: "Sabah namazından sonra zikirler",
    morningDhikr: "Sabah Zikirleri",
    morningDhikrDesc: "Sabah için sahih zikirler",
    eveningAdhkar: "Akşam Zikirleri",
    eveningAdhkarDesc: "Akşam namazından önce zikirler",
    eveningDhikr: "Akşam Zikirleri",
    eveningDhikrDesc: "Akşam için sahih zikirler",
    afterPrayer: "Namaz Sonrası",
    afterPrayerDesc: "Beş vakit namazdan sonra zikirler",
    beforeSleep: "Uyumadan Önce",
    beforeSleepDesc: "Uyumadan önce koruyucu dualar ve zikirler",
    afterWudu: "Abdest Sonrası",
    afterWuduDesc: "Abdest aldıktan sonra zikirler",
    generalDhikr: "Genel Zikirler",
    generalDhikrDesc: "Her zaman ve fırsat için zikirler",
    
    // Dhikr Counter
    dhikrCompleted: "Zikir tamamlandı! 🎉",
    of: "/ ",
    completed: "Tamamlandı",
    tapToCount: "Saymak için Dokun",
    rewardFadl: "Ödül (Fadl)",
    hadithLabel: "Hadis",
    source: "Kaynak:",
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
    transliteration: "النسخ الصوتي",
    translationLanguage: "لغة الترجمة",
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
    
    // Settings Page
    darkModeDesc: "تفعيل الوضع الداكن لقراءة أفضل في الليل",
    transliterationDesc: "عرض النسخ اللاتيني تحت النص العربي",
    translationLanguageDesc: "اختر اللغة لترجمات القرآن",
    arabicOnlyDesc: "العربية فقط",
    readingTheme: "عرض القراءة",
    readingThemeDesc: "اختر سمة لتجربة قراءة ممتعة",
    reciterSelection: "اختر القارئ",
    reciterSelectionDesc: "اختر قارئ القرآن المفضل لديك",
    notificationPermissionDenied: "تم رفض الإشعارات. يرجى تفعيلها من إعدادات المتصفح.",
    notifications: "الإشعارات",
    notificationsDesc: "احصل على تذكيرات لأوقات الصلاة والآيات اليومية",
    prayerNotifications: "إشعارات الصلاة",
    prayerNotificationsDesc: "إشعارات لأوقات الصلاة",
    about: "حول",
    aboutDesc: "معلومات التطبيق والإصدار",
    privacy: "الخصوصية",
    privacyDesc: "سياسة الخصوصية",
    
    // Quran Page
    allSurahs: "الكل",
    favoriteSurahs: "المفضلة",
    searchPlaceholder: "ابحث عن سورة أو كلمة (اضغط Enter)...",
    bookmarkAdded: "تمت إضافة علامة مرجعية",
    bookmarkRemoved: "تم إزالة العلامة المرجعية",
    invalidSurahNumber: "رقم السورة غير صحيح",
    surahNotFound: "لم يتم العثور على السورة",
    errorLoadingSurah: "خطأ في تحميل السورة",
    errorLoadingSurahs: "خطأ في تحميل السور",
    loadError: "خطأ في التحميل",
    loadErrorDesc: "تعذر تحميل ملف الصوت. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.",
    networkError: "خطأ في الشبكة",
    networkErrorDesc: "لا يوجد اتصال بالإنترنت. يرجى التحقق من الاتصال.",
    
    // Duas Page
    duasDescription: "أدعية لكل حالة",
    categoryNotFound: "الفئة غير موجودة",
    noDuasFound: "لا توجد أدعية في هذه الفئة",
    
    // Prayer Times Page
    prayerTimesPageTitle: "أوقات الصلاة",
    prayerTimesPageSubtitle: "أوقات الصلاة المحلية",
    prayerTimesLoading: "جاري تحميل أوقات الصلاة...",
    allowLocationAccess: "السماح بالوصول إلى الموقع لرؤية أوقات الصلاة المحلية",
    enableLocation: "تفعيل الموقع",
    requestLocationAgain: "طلب الموقع مرة أخرى",
    selectCity: "اختر المدينة",
    searchCityDescription: "ابحث عن مدينتك أو استخدم الكشف التلقائي عن الموقع",
    autoLocationDetection: "الكشف التلقائي عن الموقع",
    changeLocation: "تغيير",
    automatic: "تلقائي",
    manual: "يدوي",
    prayerTimesWidgetText: "انقر هنا لإعداد أوقات الصلاة",
    nextPrayer: "الصلاة القادمة",
    
    // Quiz Page
    quizPageLoading: "جاري تحميل الاختبار...",
    quizPageTitle: "الاختبار الإسلامي",
    quizPageSubtitle: "اختبر معلوماتك",
    quizPageQuestion: "السؤال",
    quizPagePoints: "النقاط",
    quizPageSubmitAnswer: "التأكيد على الإجابة",
    quizPageNextQuestion: "السؤال التالي",
    quizPageFinish: "إنهاء الاختبار",
    quizPageExplanation: "الشرح:",
    quizPageCompleted: "اكتمل الاختبار!",
    quizPageYourResult: "نتيجتك",
    quizPageExcellent: "رائع!",
    quizPageWellDone: "برافو!",
    quizPagePassed: "لقد نجحت بنجاح في الاختبار!",
    quizPageContinuePractice: "استمر في الممارسة لتعميق معلوماتك!",
    quizPageCorrectAnswers: "الإجابات الصحيحة",
    quizPageSuccessRate: "نسبة النجاح",
    quizPageRestartQuiz: "بدء اختبار جديد",
    quizPageBackHome: "العودة إلى البيت",
    
    // Dhikr Page
    dhikrAndAdhkar: "الأذكار",
    authenticReminders: "أذكار أصيلة على منهج أهل السنة",
    tapCard: "اضغط على البطاقة،",
    toStartCounter: "لبدء عداد الذكر",
    times: "مرة",
    reward: "الأجر:",
    adhkarCount: "Adhkar",
    morningAdhkar: "أذكار الصباح",
    morningAdhkarDesc: "أذكار الصباح بعد صلاة الفجر",
    morningDhikr: "أذكار الصباح",
    morningDhikrDesc: "أذكار صحيحة للصباح",
    eveningAdhkar: "أذكار المساء",
    eveningAdhkarDesc: "أذكار المساء قبل صلاة المغرب",
    eveningDhikr: "أذكار المساء",
    eveningDhikrDesc: "أذكار صحيحة للمساء",
    afterPrayer: "بعد الصلاة",
    afterPrayerDesc: "أذكار بعد الصلوات الخمس",
    beforeSleep: "قبل النوم",
    beforeSleepDesc: "أدعية وأذكار الحماية قبل النوم",
    afterWudu: "بعد الوضوء",
    afterWuduDesc: "أذكار بعد الوضوء",
    generalDhikr: "أذكار عامة",
    generalDhikrDesc: "أذكار لكل وقت ومناسبة",
    
    // Dhikr Counter
    dhikrCompleted: "تم إكمال الذكر! 🎉",
    of: "من",
    completed: "مكتمل",
    tapToCount: "اضغط للعد",
    rewardFadl: "الأجر (الفضل)",
    hadithLabel: "الحديث",
    source: "المصدر:",
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
