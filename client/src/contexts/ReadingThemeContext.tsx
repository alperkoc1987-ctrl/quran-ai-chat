/**
 * ReadingThemeContext.tsx
 * Context for managing visual reading themes for Quran pages
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ReadingTheme = "modern" | "classic" | "sepia" | "dark";

interface ThemeConfig {
  id: ReadingTheme;
  name: string;
  description: string;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    arabic: string;
    transliteration: string;
    translation: string;
    accent: string;
    border: string;
    verseNumber: string;
  };
}

export const READING_THEMES: Record<ReadingTheme, ThemeConfig> = {
  modern: {
    id: "modern",
    name: "Modern Hell",
    description: "Klares Weiß mit Türkis-Akzenten",
    colors: {
      background: "bg-white",
      card: "bg-white",
      text: "text-slate-900",
      textSecondary: "text-slate-600",
      arabic: "text-slate-900",
      transliteration: "text-teal-600",
      translation: "text-slate-700",
      accent: "bg-teal-600",
      border: "border-slate-200",
      verseNumber: "text-slate-500",
    },
  },
  classic: {
    id: "classic",
    name: "Klassisch",
    description: "Dunkelblau mit goldenen Akzenten",
    colors: {
      background: "bg-[#0a1929]",
      card: "bg-[#132f4c]",
      text: "text-amber-50",
      textSecondary: "text-amber-100",
      arabic: "text-amber-100",
      transliteration: "text-amber-300",
      translation: "text-amber-50",
      accent: "bg-amber-500",
      border: "border-amber-900/30",
      verseNumber: "text-amber-400",
    },
  },
  sepia: {
    id: "sepia",
    name: "Sepia",
    description: "Warmes Beige wie altes Papier",
    colors: {
      background: "bg-[#f4f1e8]",
      card: "bg-[#faf8f3]",
      text: "text-[#3e2723]",
      textSecondary: "text-[#5d4037]",
      arabic: "text-[#3e2723]",
      transliteration: "text-[#6d4c41]",
      translation: "text-[#4e342e]",
      accent: "bg-[#8d6e63]",
      border: "border-[#d7ccc8]",
      verseNumber: "text-[#795548]",
    },
  },
  dark: {
    id: "dark",
    name: "Dunkel",
    description: "Schwarz mit smaragdgrünen Akzenten",
    colors: {
      background: "bg-black",
      card: "bg-zinc-900",
      text: "text-gray-100",
      textSecondary: "text-gray-300",
      arabic: "text-white",
      transliteration: "text-emerald-400",
      translation: "text-gray-200",
      accent: "bg-emerald-600",
      border: "border-zinc-800",
      verseNumber: "text-emerald-500",
    },
  },
};

interface ReadingThemeContextType {
  theme: ReadingTheme;
  setTheme: (theme: ReadingTheme) => void;
  themeConfig: ThemeConfig;
}

const ReadingThemeContext = createContext<ReadingThemeContextType | undefined>(undefined);

const STORAGE_KEY = "quran-reading-theme";

export function ReadingThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ReadingTheme>(() => {
    // Load from localStorage
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved in READING_THEMES) {
        return saved as ReadingTheme;
      }
    }
    return "modern"; // Default theme
  });

  const setTheme = (newTheme: ReadingTheme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  };

  const themeConfig = READING_THEMES[theme];

  return (
    <ReadingThemeContext.Provider value={{ theme, setTheme, themeConfig }}>
      {children}
    </ReadingThemeContext.Provider>
  );
}

export function useReadingTheme() {
  const context = useContext(ReadingThemeContext);
  if (!context) {
    throw new Error("useReadingTheme must be used within ReadingThemeProvider");
  }
  return context;
}
