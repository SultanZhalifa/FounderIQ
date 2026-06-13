import { streamObject } from "ai";
import { model } from "@/lib/anthropic";
import { toolSchemas, analyzeRequestSchema } from "@/lib/validations";
import { toolPrompts } from "@/prompts";
import type { ToolId } from "@/types";

export async function POST(req: Request) {
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
