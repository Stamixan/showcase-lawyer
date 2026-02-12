import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
    args: {
        email: v.string(),
        source: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(args.email)) {
            throw new Error("Invalid email address");
        }

        const existing = await ctx.db
            .query("newsletter_subscribers")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existing) {
            if (existing.status === "unsubscribed") {
                await ctx.db.patch(existing._id, {
                    status: "active",
                    subscribedAt: Date.now(),
                    source: args.source
                });
                return { success: true, message: "Welcome back!" };
            }
            return { success: true, message: "Already subscribed!" };
        }

        await ctx.db.insert("newsletter_subscribers", {
            email: args.email,
            subscribedAt: Date.now(),
            status: "active",
            source: args.source
        });

        return { success: true, message: "Successfully subscribed!" };
    },
});
