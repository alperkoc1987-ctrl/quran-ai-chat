import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { de, Translation } from "../i18n/de";
import { tr } from "../i18n/tr";
import { en } from "../i18n/en";
import { ar } from "../i18n/ar";
import { fr } from "../i18n/fr";
import { id as idLang } from "../i18n/id";
import { ur } from "../i18n/ur";

export type Language = "de" | "tr" | "en" | "ar" | "fr" | "id" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translation> = {
  de,
  tr,
  en,
  ar,
  fr,
  id: idLang,
  ur,
};

/**
 * Detects the user's preferred language from browser settings
 * Falls back to German if language is not supported
 */
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "de";

  const browserLang = navigator.language.toLowerCase();

  // Check for exact matches first
  if (browserLang === "de" || browserLang.startsWith("de-")) return "de";
  if (browserLang === "tr" || browserLang.startsWith("tr-")) return "tr";
  if (browserLang === "en" || browserLang.startsWith("en-")) return "en";
  if (browserLang === "ar" || browserLang.startsWith("ar-")) return "ar";
  if (browserLang === "fr" || browserLang.startsWith("fr-")) return "fr";
  if (browserLang === "id" || browserLang.startsWith("id-")) return "id";
  if (browserLang === "ur" || browserLang.startsWith("ur-")) return "ur";

  // Default to German
  return "de";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_language");
      const validLangs: Language[] = ["de", "tr", "en", "ar", "fr", "id", "ur"];
      if (saved && validLangs.includes(saved as Language)) {
        return saved as Language;
      }
    }

    // Otherwise detect from browser
    return detectBrowserLanguage();
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("app_language", language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
