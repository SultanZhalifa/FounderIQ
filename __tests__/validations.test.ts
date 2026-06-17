import { describe, it, expect } from "vitest";
import { analyzeRequestSchema, validateResultSchema, toolSchemas } from "@/lib/validations";

describe("analyzeRequestSchema", () => {
  it("accepts a valid request", () => {
    const result = analyzeRequestSchema.safeParse({
      tool: "validate",
      idea: "A sufficiently long startup idea description.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown tool", () => {
    const result = analyzeRequestSchema.safeParse({
      tool: "nope",
      idea: "A sufficiently long startup idea description.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects ideas shorter than 10 characters", () => {
    const result = analyzeRequestSchema.safeParse({ tool: "validate", idea: "short" });
    expect(result.success).toBe(false);
  });
});

describe("validateResultSchema", () => {
  const base = {
    score: 50,
    verdict: "Promising" as const,
    summary: "s",
    strengths: [],
    weaknesses: [],
    opportunities: [],
    nextSteps: [],
  };

  it("accepts a well-formed result", () => {
    expect(validateResultSchema.safeParse(base).success).toBe(true);
  });

  it("rejects an out-of-range score", () => {
    expect(validateResultSchema.safeParse({ ...base, score: 200 }).success).toBe(false);
  });

  it("rejects an invalid verdict", () => {
    expect(validateResultSchema.safeParse({ ...base, verdict: "Amazing" }).success).toBe(false);
  });
});

describe("toolSchemas", () => {
  it("has a schema for every tool", () => {
    expect(Object.keys(toolSchemas).sort()).toEqual(["canvas", "market", "pitch", "validate"]);
  });
});
