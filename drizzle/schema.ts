import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Surah bookmarks table for storing user's favorited surahs
 */
export const surahBookmarks = mysqlTable("surah_bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  surahNumber: int("surahNumber").notNull(),
  surahName: varchar("surahName", { length: 255 }).notNull(),
  surahNameArabic: varchar("surahNameArabic", { length: 255 }).notNull(),
  verseCount: int("verseCount").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SurahBookmark = typeof surahBookmarks.$inferSelect;
export type InsertSurahBookmark = typeof surahBookmarks.$inferInsert;

/**
 * Chat rate limits table for tracking message usage
 * Tracks both daily limits (10 messages/day) and per-minute limits (5 messages/minute)
 */
export const chatRateLimits = mysqlTable("chat_rate_limits", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  /** Total messages sent today */
  dailyCount: int("dailyCount").default(0).notNull(),
  /** Timestamp when daily counter was last reset */
  dailyResetAt: timestamp("dailyResetAt").defaultNow().notNull(),
  /** Messages sent in current minute */
  minuteCount: int("minuteCount").default(0).notNull(),
  /** Timestamp when minute counter was last reset */
  minuteResetAt: timestamp("minuteResetAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChatRateLimit = typeof chatRateLimits.$inferSelect;
export type InsertChatRateLimit = typeof chatRateLimits.$inferInsert;

// TODO: Add your tables here