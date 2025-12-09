import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type TranslationLanguage = "de" | "en" | "tr" | "ar" | "fr" | "id" | "ur";

interface TranslationLanguageContextType {
  language: TranslationLanguage;
  setLanguage: (language: TranslationLanguage) => void;
}

const TranslationLanguageContext = createContext<TranslationLanguageContextType | undefined>(undefined);

function detectBrowserLanguage(): TranslationLanguage {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language.toLowerCase();
  
  // German-speaking countries
  if (browserLang.startsWith("de")) {
    return "de";
  }
  
  // Turkish
  if (browserLang.startsWith("tr")) {
    return "tr";
  }
  
  // Arabic
  if (browserLang.startsWith("ar")) {
    return "ar";
  }
  
  // English (default fallback)
  return "en";
}

export function TranslationLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<TranslationLanguage>(() => {
    // Try to load from localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("translationLanguage") as TranslationLanguage;
      if (saved && ["de", "en", "tr", "ar", "fr", "id", "ur"].includes(saved)) {
        return saved;
      }
    }
    
    // Otherwise detect from browser
    return detectBrowserLanguage();
  });

  const setLanguage = (newLanguage: TranslationLanguage) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("translationLanguage", newLanguage);
    }
  };

  return (
    <TranslationLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationLanguageContext.Provider>
  );
}

export function useTranslationLanguage() {
  const context = useContext(TranslationLanguageContext);
  if (context === undefined) {
    throw new Error("useTranslationLanguage must be used within a TranslationLanguageProvider");
  }
  return context;
}
