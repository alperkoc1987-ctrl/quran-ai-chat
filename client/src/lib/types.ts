/**
 * types.ts
 * TypeScript interfaces for Quran and Hadith data structures.
 * These mirror the Swift data models from the iOS app.
 */

export enum SourceType {
  Quran = "Koran",
  Hadith = "Hadith",
}

export interface SurahReference {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
}

export interface Ayah {
  id: string;
  number: number;
  text: string;
  surah: SurahReference;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
}

export interface Hadith {
  id: string;
  book: string;
  chapter: string;
  hadithNumber: number;
  textArabic: string;
  textEnglish: string;
  grade?: string;
}

export interface SourceReference {
  id: string;
  type: SourceType;
  reference: string;
  text: string;
  surahNumber?: number;
  ayahNumber?: number;
}

export interface ChatRequest {
  userQuery: string;
  language: string;
  translationEdition: string;
}

export interface ChatResponse {
  generatedAnswer: string;
  sources: SourceReference[];
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  sources?: SourceReference[];
  timestamp: Date;
}

export enum Language {
  German = "de",
  English = "en",
}

export interface Surah {
  number: number;
  name: string; // Arabic name
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface AyahDetail {
  number: number;
  text: string; // Arabic text
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface SurahWithAyahs {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: AyahDetail[];
}
