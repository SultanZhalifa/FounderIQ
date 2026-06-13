import { createAnthropic } from "@ai-sdk/anthropic";

/**
 * Anthropic client configured with the server-side API key.
 * Only use this in server-side code (API routes, Server Actions).
 */
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

/** The Claude model instance used for all analysis. */
export const model = anthropic("claude-sonnet-4-6");

export { anthropic };
