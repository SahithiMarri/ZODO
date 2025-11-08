import { query, action } from "./_generated/server";
import { getCurrentUser } from "./users";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const getPersonalized = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    // Return rule-based suggestions as immediate response
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const journalEntries = await ctx.db
      .query("journal")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(5);

    const suggestions: Array<{ id: string; title: string; text: string; icon: string }> = [];

    // Analyze tasks
    const incompleteTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);
    const totalTasks = tasks.length;

    if (incompleteTasks.length > 5) {
      suggestions.push({
        id: "many-tasks",
        title: "Break It Down",
        text: `You have ${incompleteTasks.length} tasks! Try focusing on just 2-3 today to avoid feeling overwhelmed.`,
        icon: "🎯",
      });
    }

    if (completedTasks.length > 0 && incompleteTasks.length === 0) {
      suggestions.push({
        id: "all-done",
        title: "Amazing Work!",
        text: "You've completed all your tasks! Time to celebrate or add new goals to keep growing!",
        icon: "🎉",
      });
    }

    if (totalTasks > 0) {
      const completionRate = (completedTasks.length / totalTasks) * 100;
      if (completionRate >= 80) {
        suggestions.push({
          id: "high-achiever",
          title: "You're a Star!",
          text: `${Math.round(completionRate)}% completion rate! Keep up this amazing momentum!`,
          icon: "⭐",
        });
      } else if (completionRate < 30 && totalTasks > 3) {
        suggestions.push({
          id: "need-boost",
          title: "Fresh Start",
          text: "Feeling stuck? Try starting with the easiest task first to build momentum!",
          icon: "🚀",
        });
      }
    }

    // Analyze journal entries
    if (journalEntries.length === 0) {
      suggestions.push({
        id: "start-journaling",
        title: "Try Journaling",
        text: "Writing down your thoughts can help you feel calmer and more focused!",
        icon: "📔",
      });
    } else if (journalEntries.length >= 3) {
      suggestions.push({
        id: "journal-streak",
        title: "Journaling Hero",
        text: `You've written ${journalEntries.length} journal entries! Reflecting on your feelings is super important!`,
        icon: "💜",
      });
    }

    // Check for recent journal content patterns
    const recentContent = journalEntries.map((e) => e.content.toLowerCase()).join(" ");
    
    if (recentContent.includes("tired") || recentContent.includes("sleepy")) {
      suggestions.push({
        id: "rest-reminder",
        title: "Rest is Important",
        text: "Your journal mentions feeling tired. Make sure you're getting enough sleep!",
        icon: "😴",
      });
    }

    if (recentContent.includes("happy") || recentContent.includes("excited") || recentContent.includes("great")) {
      suggestions.push({
        id: "positive-vibes",
        title: "Positive Energy!",
        text: "Your journal shows you're feeling great! Keep doing what makes you happy!",
        icon: "😊",
      });
    }

    if (recentContent.includes("stressed") || recentContent.includes("worried") || recentContent.includes("anxious")) {
      suggestions.push({
        id: "meditation-reminder",
        title: "Take a Breath",
        text: "Feeling stressed? Try a quick meditation session in the Self Care section!",
        icon: "🧘",
      });
    }

    // Task deadline analysis
    const today = new Date().toISOString().split("T")[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const urgentTasks = incompleteTasks.filter(
      (t) => t.deadline === today || t.deadline === tomorrow
    );

    if (urgentTasks.length > 0) {
      suggestions.push({
        id: "urgent-tasks",
        title: "Deadline Alert!",
        text: `You have ${urgentTasks.length} task${urgentTasks.length > 1 ? "s" : ""} due soon. Tackle them first!`,
        icon: "⏰",
      });
    }

    return suggestions;
  },
});

export const generateAI = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args): Promise<Array<{ id: string; title: string; text: string; icon: string }>> => {
    return await ctx.runAction(internal.geminiSuggestions.generatePersonalizedSuggestions, {
      userId: args.userId,
    });
  },
});