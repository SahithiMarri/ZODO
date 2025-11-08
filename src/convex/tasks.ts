import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];
    
    return await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    deadline: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    
    return await ctx.db.insert("tasks", {
      userId: user._id,
      title: args.title,
      deadline: args.deadline,
      completed: false,
    });
  },
});

export const complete = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    
    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== user._id) {
      throw new Error("Task not found");
    }
    
    await ctx.db.patch(args.id, { completed: true });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");
    
    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== user._id) {
      throw new Error("Task not found");
    }
    
    await ctx.db.delete(args.id);
  },
});
