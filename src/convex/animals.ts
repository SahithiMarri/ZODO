import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    
    return await ctx.db
      .query("animals")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const unlock = mutation({
  args: {
    animalId: v.number(),
    name: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    
    const existing = await ctx.db
      .query("animals")
      .withIndex("by_user_and_animal", (q) => 
        q.eq("userId", user._id).eq("animalId", args.animalId)
      )
      .first();
    
    if (existing) {
      return existing._id;
    }
    
    return await ctx.db.insert("animals", {
      userId: user._id,
      animalId: args.animalId,
      name: args.name,
      icon: args.icon,
      unlockedAt: Date.now(),
    });
  },
});
