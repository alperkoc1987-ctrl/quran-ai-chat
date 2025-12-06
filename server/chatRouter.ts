import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import OpenAI from "openai";

// Use Manus Built-in Forge API (OpenAI-compatible)
const openai = new OpenAI({
  apiKey: process.env.BUILT_IN_FORGE_API_KEY || process.env.OPENAI_API_KEY,
  baseURL: process.env.BUILT_IN_FORGE_API_URL || "https://api.openai.com/v1",
});

export const chatRouter = router({
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string(),
        history: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { message, history = [] } = input;

      const systemPrompt = {
        role: "system" as const,
        content: `Du bist ein hilfreicher islamischer KI-Assistent für Fragen zum Koran und zu Hadithen. 
        
Wichtige Regeln:
- Sprich den Nutzer mit "du" an (informell), nicht mit "Sie"
- Begrüße nur beim ersten Kontakt mit "As-salamu alaikum!"
- Bei Folgefragen KEINE erneute Begrüßung
- Gib präzise, fundierte Antworten basierend auf islamischen Quellen
- Zitiere Koranverse im Format: Sure X:Y (z.B. Sure 2:255)
- Verwende einen freundlichen, respektvollen Ton
- Halte Antworten klar und verständlich`,
      };

      const messages = [systemPrompt, ...history, { role: "user" as const, content: message }];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 3000,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";

      return {
        response,
        usage: completion.usage,
      };
    }),
});
