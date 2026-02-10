import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const inquiryId = await ctx.db.insert("inquiries", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      topic: args.topic,
      message: args.message,
      summary: args.summary,
      scamRisk: args.scamRisk,
      urgency: args.urgency,
      profitability: args.profitability,
      isRead: false,
    });
    return inquiryId;
  },
});

export const list = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    let lockout = await ctx.db.query("admin_lockout").first();

    if (!lockout) {
      const id = await ctx.db.insert("admin_lockout", { failures: 0, lastAttempt: 0 });
      lockout = await ctx.db.get(id);
    }

    if (lockout && lockout.failures > 0) {
      // Penalty calculation (in minutes)
      const penalties = [0, 1, 5, 15, 60];
      const penaltyIndex = Math.min(lockout.failures, penalties.length - 1);
      const waitMinutes = penalties[penaltyIndex];
      const waitMillis = waitMinutes * 60 * 1000;

      if (now < lockout.lastAttempt + waitMillis) {
        const remainingSecs = Math.ceil((lockout.lastAttempt + waitMillis - now) / 1000);
        throw new Error(`Πολλές προσπάθειες. Δοκιμάστε ξανά σε ${Math.ceil(remainingSecs / 60)} λεπτά.`);
      }
    }

    if (args.password !== process.env.ADMIN_PASSWORD) {
      await ctx.db.patch(lockout!._id, {
        failures: lockout!.failures + 1,
        lastAttempt: now
      });
      throw new Error("Unauthorized");
    }

    // Success! Reset failures
    await ctx.db.patch(lockout!._id, { failures: 0, lastAttempt: now });
    return await ctx.db.query("inquiries").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    isRead: v.boolean(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    if (args.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, { isRead: args.isRead });
  },
});

export const deleteInquiry = mutation({
  args: {
    id: v.id("inquiries"),
    password: v.string()
  },
  handler: async (ctx, args) => {
    if (args.password !== process.env.ADMIN_PASSWORD) {
      throw new Error("Unauthorized");
    }

    const inquiry = await ctx.db.get(args.id);
    if (!inquiry) return;

    await ctx.db.insert("archived_inquiries", {
      firstName: inquiry.firstName,
      lastName: inquiry.lastName,
      email: inquiry.email,
      phone: inquiry.phone,
      topic: inquiry.topic,
      message: inquiry.message,
      summary: inquiry.summary,
      scamRisk: inquiry.scamRisk,
      urgency: inquiry.urgency,
      profitability: inquiry.profitability,
      originalCreationTime: inquiry._creationTime,
      archivedAt: Date.now(),
    });

    await ctx.db.delete(args.id);
  },
});
