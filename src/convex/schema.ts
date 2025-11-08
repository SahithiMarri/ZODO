import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),

    tasks: defineTable({
      userId: v.id("users"),
      title: v.string(),
      deadline: v.string(),
      completed: v.boolean(),
    }).index("by_user", ["userId"]),

    animals: defineTable({
      userId: v.id("users"),
      animalId: v.number(),
      name: v.string(),
      icon: v.string(),
      unlockedAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_user_and_animal", ["userId", "animalId"]),

    journal: defineTable({
      userId: v.id("users"),
      content: v.string(),
    }).index("by_user", ["userId"]),

    progress: defineTable({
      userId: v.id("users"),
      xp: v.number(),
      streak: v.number(),
      lastTaskDate: v.optional(v.number()),
    }).index("by_user", ["userId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;