"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { api } from "./_generated/api";
import { validateInquiry } from "./utils/validation";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const submitInquiry = action({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    topic: v.string(),
    message: v.string(),
    hp_fax: v.optional(v.string()), // Honeypot
    ip: v.string(),
  },
  handler: async (ctx, args) => {
    // Honeypot Protection: If hp_fax is filled, it's a bot.
    // Return success silently so they don't know they failed.
    if (args.hp_fax && args.hp_fax.length > 0) {
      console.log("Bot detected (Honeypot):", args.hp_fax);
      return { success: true };
    }

    // Validation
    const validationErrors = validateInquiry({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone || "",
      topic: args.topic,
      message: args.message
    });

    if (validationErrors) {
      const errorMessage = Object.values(validationErrors).join(" ");
      throw new Error(`Text validation failed: ${errorMessage}`);
    }

    // Rate Limiting (by IP)
    const rateLimit = await ctx.runMutation(api.rateLimit.check, {
      identifier: args.ip
    });

    if (!rateLimit.allowed) {
      throw new Error(`Πολλές προσπάθειες. Παρακαλώ δοκιμάστε ξανά σε ${rateLimit.retryAfter} λεπτά.`);
    }

    // 1. Generate Analysis with Gemini Flash
    let analysis = {
      summary: undefined as string | undefined,
      scamRisk: undefined as number | undefined,
      urgency: undefined as number | undefined,
      profitability: undefined as number | undefined,
    };

    try {
      if (process.env.GEMINI_API_KEY) {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        const prompt = `
          Ανάλυσε το παρακάτω μήνυμα που στάλθηκε στη φόρμα επικοινωνίας δικηγορικού γραφείου.
          
          Μήνυμα: "${args.message}"
          Θέμα: "${args.topic}"
          
          Επίστρεψε ΜΟΝΟ ένα JSON object (χωρίς markdown code blocks) με τα εξής πεδία:
          1. "summary": Μία σύντομη περιληπτική πρόταση στα ελληνικά (max 30 λέξεις).
          2. "scamRisk": Ακέραιος 1-5 (1=Καθαρό, 5=Σίγουρη Απάτη/Spam).
          3. "urgency": Ακέραιος 1-5 (1=Χαλαρό, 5=Άμεση Ανάγκη/Προθεσμία).
          4. "profitability": Ακέραιος 1-5 (1=Χαμηλό ενδιαφέρον, 5=Σοβαρή υπόθεση).
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Clean markdown if present (```json ... ```)
        const jsonStr = text.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        const data = JSON.parse(jsonStr);

        analysis = {
          summary: data.summary,
          scamRisk: data.scamRisk,
          urgency: data.urgency,
          profitability: data.profitability
        };
      }
    } catch (err) {
      console.error("Gemini Error:", err);
    }

    // 2. Save to Database
    await ctx.runMutation(api.inquiries.send, {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      topic: args.topic,
      message: args.message,
      summary: analysis.summary,
      scamRisk: analysis.scamRisk,
      urgency: analysis.urgency,
      profitability: analysis.profitability,
    });

    return { success: true };
  },
});