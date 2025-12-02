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
