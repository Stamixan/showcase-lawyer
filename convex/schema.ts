import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inquiries: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    topic: v.string(),
    message: v.string(),
    summary: v.optional(v.string()),
    isRead: v.optional(v.boolean()),
    // AI Analysis
    scamRisk: v.optional(v.number()), // 1-5 (5 = High likelihood of scam)
    urgency: v.optional(v.number()), // 1-5 (5 = Extremely urgent)
    profitability: v.optional(v.number()), // 1-5 (5 = High potential value)
  }),
  archived_inquiries: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    topic: v.string(),
    message: v.string(),
    summary: v.optional(v.string()),
    scamRisk: v.optional(v.number()),
    urgency: v.optional(v.number()),
    profitability: v.optional(v.number()),
    originalCreationTime: v.number(),
    archivedAt: v.number(),
  }),
  admin_lockout: defineTable({
    failures: v.number(),
    lastAttempt: v.number(),
  }),
  rate_limits: defineTable({
    identifier: v.string(), // Could be email, phone, or client fingerprint
    count: v.number(),
    lastReset: v.number(),
  }).index("by_identifier", ["identifier"]),
  site_settings: defineTable({
    // Store generic settings as a JSON object or specific fields?
    // Specific fields are better for type safety in Convex, but a JSON blob is more flexible.
    // Given the TypeScript interface "ThemeConfig", let's map it.
    type: v.string(), // e.g. "theme" - allows multiple setting types in one table if needed, or just singleton.
    config: v.object({
      colors: v.object({
        primary: v.string(),
        secondary: v.string(),
        accent: v.string(),
        text: v.string(),
        heading: v.string(),
        background: v.string(),
      }),
      fonts: v.object({
        heading: v.string(),
        body: v.string(),
      }),
      borderRadius: v.string(),
    })
  }),
});
