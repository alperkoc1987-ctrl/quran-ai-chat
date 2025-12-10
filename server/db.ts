import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, chatRateLimits, InsertChatRateLimit } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Rate Limiting Functions
 * Implements 10 messages per day and 5 messages per minute limits
 */

interface RateLimitResult {
  allowed: boolean;
  dailyRemaining: number;
  minuteRemaining: number;
  resetTime?: Date;
  reason?: string;
}

const DAILY_LIMIT = 10;
const MINUTE_LIMIT = 5;

/**
 * Check if user can send a message and update counters
 * @param userId User ID (use IP address or session ID for anonymous users)
 * @returns Rate limit result with remaining counts
 */
export async function checkAndIncrementRateLimit(userId: string): Promise<RateLimitResult> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot check rate limit: database not available");
    // Allow message if database is unavailable (graceful degradation)
    return {
      allowed: true,
      dailyRemaining: DAILY_LIMIT,
      minuteRemaining: MINUTE_LIMIT,
    };
  }

  try {
    const now = new Date();
    const userIdInt = parseInt(userId) || 0;

    // Get or create rate limit record
    const records = await db
      .select()
      .from(chatRateLimits)
      .where(eq(chatRateLimits.userId, userIdInt))
      .limit(1);

    let record = records.length > 0 ? records[0] : null;

    // Create new record if doesn't exist
    if (!record) {
      const newRecord: InsertChatRateLimit = {
        userId: userIdInt,
        dailyCount: 0,
        dailyResetAt: now,
        minuteCount: 0,
        minuteResetAt: now,
      };
      await db.insert(chatRateLimits).values(newRecord);
      
      // Fetch the newly created record
      const newRecords = await db
        .select()
        .from(chatRateLimits)
        .where(eq(chatRateLimits.userId, userIdInt))
        .limit(1);
      record = newRecords[0];
    }

    // Check if daily counter needs reset (24 hours)
    const dailyResetTime = new Date(record.dailyResetAt);
    const hoursSinceDaily = (now.getTime() - dailyResetTime.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceDaily >= 24) {
      // Reset daily counter
      await db
        .update(chatRateLimits)
        .set({
          dailyCount: 0,
          dailyResetAt: now,
        })
        .where(eq(chatRateLimits.userId, userIdInt));
      record.dailyCount = 0;
      record.dailyResetAt = now;
    }

    // Check if minute counter needs reset (60 seconds)
    const minuteResetTime = new Date(record.minuteResetAt);
    const secondsSinceMinute = (now.getTime() - minuteResetTime.getTime()) / 1000;
    
    if (secondsSinceMinute >= 60) {
      // Reset minute counter
      await db
        .update(chatRateLimits)
        .set({
          minuteCount: 0,
          minuteResetAt: now,
        })
        .where(eq(chatRateLimits.userId, userIdInt));
      record.minuteCount = 0;
      record.minuteResetAt = now;
    }

    // Check daily limit
    if (record.dailyCount >= DAILY_LIMIT) {
      const nextReset = new Date(dailyResetTime.getTime() + 24 * 60 * 60 * 1000);
      return {
        allowed: false,
        dailyRemaining: 0,
        minuteRemaining: MINUTE_LIMIT - record.minuteCount,
        resetTime: nextReset,
        reason: `Tageslimit erreicht (${DAILY_LIMIT} Nachrichten/Tag). Nächstes Reset: ${nextReset.toLocaleTimeString('de-DE')}`,
      };
    }

    // Check minute limit
    if (record.minuteCount >= MINUTE_LIMIT) {
      const nextReset = new Date(minuteResetTime.getTime() + 60 * 1000);
      return {
        allowed: false,
        dailyRemaining: DAILY_LIMIT - record.dailyCount,
        minuteRemaining: 0,
        resetTime: nextReset,
        reason: `Zu viele Nachrichten. Bitte warte ${Math.ceil((nextReset.getTime() - now.getTime()) / 1000)} Sekunden.`,
      };
    }

    // Increment both counters
    await db
      .update(chatRateLimits)
      .set({
        dailyCount: record.dailyCount + 1,
        minuteCount: record.minuteCount + 1,
      })
      .where(eq(chatRateLimits.userId, userIdInt));

    return {
      allowed: true,
      dailyRemaining: DAILY_LIMIT - record.dailyCount - 1,
      minuteRemaining: MINUTE_LIMIT - record.minuteCount - 1,
    };
  } catch (error) {
    console.error("[Database] Failed to check rate limit:", error);
    // Allow message on error (graceful degradation)
    return {
      allowed: true,
      dailyRemaining: DAILY_LIMIT,
      minuteRemaining: MINUTE_LIMIT,
    };
  }
}

/**
 * Get current rate limit status without incrementing
 * @param userId User ID
 * @returns Current rate limit status
 */
export async function getRateLimitStatus(userId: string): Promise<RateLimitResult> {
  const db = await getDb();
  if (!db) {
    return {
      allowed: true,
      dailyRemaining: DAILY_LIMIT,
      minuteRemaining: MINUTE_LIMIT,
    };
  }

  try {
    const now = new Date();
    const userIdInt = parseInt(userId) || 0;

    const records = await db
      .select()
      .from(chatRateLimits)
      .where(eq(chatRateLimits.userId, userIdInt))
      .limit(1);

    if (records.length === 0) {
      return {
        allowed: true,
        dailyRemaining: DAILY_LIMIT,
        minuteRemaining: MINUTE_LIMIT,
      };
    }

    const record = records[0];
    const dailyResetTime = new Date(record.dailyResetAt);
    const minuteResetTime = new Date(record.minuteResetAt);
    
    const hoursSinceDaily = (now.getTime() - dailyResetTime.getTime()) / (1000 * 60 * 60);
    const secondsSinceMinute = (now.getTime() - minuteResetTime.getTime()) / 1000;

    const dailyCount = hoursSinceDaily >= 24 ? 0 : record.dailyCount;
    const minuteCount = secondsSinceMinute >= 60 ? 0 : record.minuteCount;

    return {
      allowed: dailyCount < DAILY_LIMIT && minuteCount < MINUTE_LIMIT,
      dailyRemaining: DAILY_LIMIT - dailyCount,
      minuteRemaining: MINUTE_LIMIT - minuteCount,
    };
  } catch (error) {
    console.error("[Database] Failed to get rate limit status:", error);
    return {
      allowed: true,
      dailyRemaining: DAILY_LIMIT,
      minuteRemaining: MINUTE_LIMIT,
    };
  }
}
