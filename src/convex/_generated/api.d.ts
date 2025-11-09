/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as animals from "../animals.js";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as auth from "../auth.js";
import type * as geminiSuggestions from "../geminiSuggestions.js";
import type * as http from "../http.js";
import type * as journal from "../journal.js";
import type * as progress from "../progress.js";
import type * as suggestions from "../suggestions.js";
import type * as tasks from "../tasks.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  animals: typeof animals;
  "auth/emailOtp": typeof auth_emailOtp;
  auth: typeof auth;
  geminiSuggestions: typeof geminiSuggestions;
  http: typeof http;
  journal: typeof journal;
  progress: typeof progress;
  suggestions: typeof suggestions;
  tasks: typeof tasks;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
