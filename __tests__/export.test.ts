import { describe, it, expect } from "vitest";
import {
  resultToMarkdown,
  analysisToMarkdown,
  reportToMarkdown,
  slugify,
  TOOL_LABELS,
} from "@/lib/export";
import type { ValidateResult, CanvasResult, PitchResult, MarketResult } from "@/types";

const validate: ValidateResult = {
  score: 82,
  verdict: "Promising",
  summary: "Strong idea with a clear wedge.",
  strengths: ["Clear ICP", "Real, urgent pain"],
  weaknesses: ["Crowded category"],
  opportunities: ["Adjacent expansion"],
  nextSteps: ["Interview 20 users", "Ship an MVP"],
};

const canvas: CanvasResult = {
  customerSegments: ["SMB retailers"],
  valuePropositions: ["Save 5 hours a week"],
  channels: ["SEO", "Partnerships"],
  customerRelationships: ["Self-serve"],
  revenueStreams: ["Monthly subscription"],
  keyResources: ["Engineering team"],
  keyActivities: ["Product development"],
  keyPartnerships: ["Payment providers"],
  costStructure: ["Cloud hosting"],
};

const pitch: PitchResult = {
  tagline: "Stripe for invoices",
  elevatorPitch: "Hook. What we do. Why it matters.",
  problem: "Invoicing is painful.",
  solution: "We automate it.",
  whyNow: "APIs made it possible.",
  businessModel: "2% per transaction.",
  visionStatement: "Every SMB paid on time.",
};

const market: MarketResult = {
  timing: "Good",
  tam: "$10B -- global invoicing",
  sam: "$2B -- US SMB",
  som: "$50M -- year 1-3",
  topCompetitors: [{ name: "Acme", weakness: "Slow onboarding" }],
  keyTrends: ["Embedded finance growth"],
  targetPersona: "Owner-operators at small retailers.",
  entryAdvice: "Start with Shopify merchants.",
};

describe("resultToMarkdown", () => {
  it("renders validate score, verdict, and sections", () => {
    const md = resultToMarkdown("validate", validate);
    expect(md).toContain("82/100");
    expect(md).toContain("Promising");
    expect(md).toContain("### Strengths");
    expect(md).toContain("- Clear ICP");
    expect(md).toContain("1. Interview 20 users");
  });

  it("renders all nine canvas sections", () => {
    const md = resultToMarkdown("canvas", canvas);
    expect(md).toContain("### Customer Segments");
    expect(md).toContain("### Cost Structure");
    expect(md).toContain("- Monthly subscription");
  });

  it("renders pitch tagline and sections", () => {
    const md = resultToMarkdown("pitch", pitch);
    expect(md).toContain('"Stripe for invoices"');
    expect(md).toContain("### The Problem");
    expect(md).toContain("### Vision");
  });

  it("renders the market size table and competitors", () => {
    const md = resultToMarkdown("market", market);
    expect(md).toContain("| TAM | $10B -- global invoicing |");
    expect(md).toContain("**Acme** — Slow onboarding");
  });
});

describe("analysisToMarkdown", () => {
  it("includes the heading, idea, and body", () => {
    const md = analysisToMarkdown("validate", "My idea about X", validate, 0);
    expect(md).toContain(`# FounderIQ — ${TOOL_LABELS.validate}`);
    expect(md).toContain("> My idea about X");
    expect(md).toContain("82/100");
  });
});

describe("reportToMarkdown", () => {
  it("includes a section per tool", () => {
    const md = reportToMarkdown("My idea", [
      { tool: "validate", result: validate },
      { tool: "market", result: market },
    ]);
    expect(md).toContain("# FounderIQ — Full Report");
    expect(md).toContain(`## ${TOOL_LABELS.validate}`);
    expect(md).toContain(`## ${TOOL_LABELS.market}`);
  });
});

describe("slugify", () => {
  it("lowercases and dashes", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("falls back for empty results", () => {
    expect(slugify("!!!")).toBe("founderiq");
  });

  it("caps the length", () => {
    expect(slugify("a".repeat(100)).length).toBeLessThanOrEqual(50);
  });
});
