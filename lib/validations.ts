import { z } from "zod/v4";

/* ------------------------------------------------------------------ */
/*  Zod Schemas -- used by streamObject and for client-side guards    */
/* ------------------------------------------------------------------ */

export const validateResultSchema = z.object({
  score: z.number().min(0).max(100),
  verdict: z.enum(["Exceptional", "Promising", "Needs Work", "Risky"]),
  summary: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  opportunities: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

export const canvasResultSchema = z.object({
  customerSegments: z.array(z.string()),
  valuePropositions: z.array(z.string()),
  channels: z.array(z.string()),
  customerRelationships: z.array(z.string()),
  revenueStreams: z.array(z.string()),
  keyResources: z.array(z.string()),
  keyActivities: z.array(z.string()),
  keyPartnerships: z.array(z.string()),
  costStructure: z.array(z.string()),
});

export const pitchResultSchema = z.object({
  tagline: z.string(),
  elevatorPitch: z.string(),
  problem: z.string(),
  solution: z.string(),
  whyNow: z.string(),
  businessModel: z.string(),
  visionStatement: z.string(),
});

export const marketCompetitorSchema = z.object({
  name: z.string(),
  weakness: z.string(),
});

export const marketResultSchema = z.object({
  timing: z.enum(["Perfect", "Good", "Early", "Late"]),
  tam: z.string(),
  sam: z.string(),
  som: z.string(),
  topCompetitors: z.array(marketCompetitorSchema),
  keyTrends: z.array(z.string()),
  targetPersona: z.string(),
  entryAdvice: z.string(),
});

export const analyzeRequestSchema = z.object({
  tool: z.enum(["validate", "canvas", "pitch", "market"]),
  idea: z.string().min(10, "Idea must be at least 10 characters"),
});

/** Map tool IDs to their Zod schemas. */
export const toolSchemas = {
  validate: validateResultSchema,
  canvas: canvasResultSchema,
  pitch: pitchResultSchema,
  market: marketResultSchema,
} as const;
