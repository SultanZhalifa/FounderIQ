import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

const apiKey = process.env.ANTHROPIC_API_KEY ?? "";
const isOpenRouter = apiKey.startsWith("sk-or-");

/**
 * Configure the model dynamically based on key prefix.
 * If OpenRouter key is provided, use OpenRouter endpoint with Claude 3.5 Sonnet.
 * Otherwise, use the native Anthropic endpoint.
 */
export const model = isOpenRouter
  ? createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
      headers: {
        "HTTP-Referer": "https://founderiq.vercel.app",
        "X-Title": "FounderIQ",
      },
    })("anthropic/claude-3.5-sonnet")
  : createAnthropic({
      apiKey,
    })("claude-sonnet-4-6");
