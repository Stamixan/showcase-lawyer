import { mutation } from "./_generated/server";
import { v } from "convex/values";

const LIMIT = 3; // 3 requests
const WINDOW = 60 * 60 * 1000; // 1 hour

export const check = mutation({
    args: { identifier: v.string() },
    handler: async (ctx, args) => {
        const now = Date.now();
        const record = await ctx.db
            .query("rate_limits")
            .withIndex("by_identifier", (q) => q.eq("identifier", args.identifier))
            .first();

        if (!record) {
            // First time
            await ctx.db.insert("rate_limits", {
                identifier: args.identifier,
                count: 1,
                lastReset: now,
            });
            return { allowed: true };
        }

        // Check if window expired
        if (now > record.lastReset + WINDOW) {
            // Reset
            await ctx.db.patch(record._id, {
                count: 1,
                lastReset: now,
            });
            return { allowed: true };
        }

        // Check limit
        if (record.count >= LIMIT) {
            return { allowed: false, retryAfter: Math.ceil((record.lastReset + WINDOW - now) / 1000 / 60) };
        }

        // Increment
        await ctx.db.patch(record._id, {
            count: record.count + 1,
        });

        return { allowed: true };
    },
});
