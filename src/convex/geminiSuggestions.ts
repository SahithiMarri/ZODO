"use node";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

export const generatePersonalizedSuggestions = internalAction({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY not found in environment variables");
      return [];
    }

    // Fetch user data
    const tasks = await ctx.runQuery(internal.tasks.listInternal, {});
    const journalEntries = await ctx.runQuery(internal.journal.listInternal, {});

    // Prepare context for Gemini
    const incompleteTasks = tasks.filter((t: any) => !t.completed);
    const completedTasks = tasks.filter((t: any) => t.completed);
    const recentJournals = journalEntries.slice(0, 5);

    const prompt = `You are a friendly AI assistant helping kids (ages 8-14) with productivity and well-being. Based on the following information about a child's activities, provide 3-5 personalized, encouraging suggestions.

**Their Tasks:**
- Total tasks: ${tasks.length}
- Completed: ${completedTasks.length}
- To do: ${incompleteTasks.length}
${incompleteTasks.length > 0 ? `\nIncomplete tasks:\n${incompleteTasks.map((t: any) => `- ${t.title} (due: ${t.deadline})`).join('\n')}` : ''}

**Recent Journal Entries:**
${recentJournals.length > 0 ? recentJournals.map((j: any) => `- "${j.content.substring(0, 100)}..."`).join('\n') : 'No journal entries yet.'}

**Instructions:**
1. Provide 3-5 specific, actionable suggestions
2. Keep language simple, positive, and encouraging for kids
3. Each suggestion should have:
   - A short catchy title (3-5 words)
   - A helpful tip (1-2 sentences)
   - An appropriate emoji
4. Consider their task completion rate, upcoming deadlines, and emotional state from journals
5. Format as JSON array with objects containing: title, text, icon

Example format:
[
  {"title": "Take a Break", "text": "You've been working hard! Try a 5-minute stretch break.", "icon": "🧘"},
  {"title": "Start Small", "text": "Pick your easiest task first to build momentum!", "icon": "🎯"}
]

Return ONLY the JSON array, no other text.`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash-exp",
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Extract JSON from response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.error("No JSON found in Gemini response");
        return [];
      }

      const suggestions = JSON.parse(jsonMatch[0]);
      
      // Add unique IDs to suggestions
      return suggestions.map((s: any, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        title: s.title,
        text: s.text,
        icon: s.icon,
      }));
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      return [];
    }
  },
});
