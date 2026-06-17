import { streamObject } from "ai";
import { model } from "@/lib/anthropic";
import { toolSchemas, analyzeRequestSchema } from "@/lib/validations";
import { toolPrompts } from "@/prompts";
import { createRateLimiter, clientKeyFromRequest } from "@/lib/rate-limit";
import type { ToolId } from "@/types";

// 20 analyses per minute per client. In-memory — see lib/rate-limit.ts for the
// serverless caveat.
const limiter = createRateLimiter({ limit: 20, windowMs: 60_000 });

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error:
          "The server is missing an API key. Set ANTHROPIC_API_KEY (or an OpenRouter key) in the environment.",
      },
      { status: 500 }
    );
  }

  const { allowed, retryAfterSec } = limiter.check(clientKeyFromRequest(req));
  if (!allowed) {
    return Response.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429, headers: { "retry-after": String(retryAfterSec) } }
    );
  }

  const body: unknown = await req.json();
  const parsed = analyzeRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400 }
    );
  }

  const { tool, idea } = parsed.data;
  const toolId = tool as ToolId;

  const result = streamObject({
    model,
    schema: toolSchemas[toolId],
    system: toolPrompts[toolId],
    prompt: `Analyze this startup idea:\n\n${idea}`,
  });

  return result.toTextStreamResponse();
}
