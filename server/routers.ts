import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { chatRouter } from "./chatRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getDb } from "./db";
import { surahBookmarks } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  chat: chatRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  surahBookmarks: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      return await db.select().from(surahBookmarks).where(eq(surahBookmarks.userId, ctx.user.id));
    }),
    add: protectedProcedure
      .input(z.object({
        surahNumber: z.number(),
        surahName: z.string(),
        surahNameArabic: z.string(),
        verseCount: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.insert(surahBookmarks).values({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true };
      }),
    remove: protectedProcedure
      .input(z.object({ surahNumber: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");
        await db.delete(surahBookmarks).where(
          and(
            eq(surahBookmarks.userId, ctx.user.id),
            eq(surahBookmarks.surahNumber, input.surahNumber)
          )
        );
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
