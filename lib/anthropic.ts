import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const apiKey = process.env.ANTHROPIC_API_KEY ?? "";
const isOpenRouter = apiKey.startsWith("sk-or-");

/**
 * Configure the model dynamically based on key prefix.
 * If OpenRouter key is provided, use the dedicated OpenRouter provider.
 * Otherwise, use the native Anthropic endpoint.
 */
export const model = isOpenRouter
  ? createOpenRouter({
      apiKey,
      headers: {
        "HTTP-Referer": "https://founderiq.vercel.app",
        "X-Title": "FounderIQ",
      },
    })("google/gemma-2-9b-it:free")
  : createAnthropic({
      apiKey,
    })("claude-sonnet-4-6");
