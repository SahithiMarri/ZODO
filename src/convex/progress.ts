import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;
    
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();
    
    return progress || { xp: 0, streak: 0, lastTaskDate: null };
  },
});

export const updateXP = mutation({
  args: { amount: v.number() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();
    
    const today = new Date().toDateString();
    
    if (progress) {
      const newXP = progress.xp + args.amount;
      const lastDate = progress.lastTaskDate ? new Date(progress.lastTaskDate).toDateString() : null;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      let newStreak = progress.streak;
      if (lastDate !== today) {
        if (lastDate === yesterday) {
          newStreak += 1;
        } else if (lastDate !== null) {
          newStreak = 1;
        } else {
          newStreak = 1;
        }
      }
      
      await ctx.db.patch(progress._id, {
        xp: newXP,
        streak: newStreak,
        lastTaskDate: Date.now(),
      });
    } else {
      await ctx.db.insert("progress", {
        userId: user._id,
        xp: args.amount,
        streak: 1,
        lastTaskDate: Date.now(),
      });
    }
  },
});
