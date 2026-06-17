import type {
  AnalysisRecord,
  AnalysisResultData,
  CanvasResult,
  MarketResult,
  PitchResult,
  ToolId,
  ValidateResult,
} from "@/types";

/** Display names for each tool, used in exported documents and filenames. */
export const TOOL_LABELS: Record<ToolId, string> = {
  validate: "Idea Validator",
  canvas: "Business Model Canvas",
  pitch: "Investor Pitch",
  market: "Market Intelligence",
};

/* ------------------------------------------------------------------ */
/*  Markdown serialization                                            */
/* ------------------------------------------------------------------ */

function bullets(items?: string[]): string {
  if (!items || items.length === 0) return "_None provided._";
  return items.map((i) => `- ${i}`).join("\n");
}

function numbered(items?: string[]): string {
  if (!items || items.length === 0) return "_None provided._";
  return items.map((i, idx) => `${idx + 1}. ${i}`).join("\n");
}

function validateMd(r: ValidateResult): string {
  return [
    `**Score:** ${r.score}/100 — **${r.verdict}**`,
    "",
    r.summary,
    "",
    "### Strengths",
    bullets(r.strengths),
    "",
    "### Weaknesses",
    bullets(r.weaknesses),
    "",
    "### Opportunities",
    bullets(r.opportunities),
    "",
    "### Next Steps",
    numbered(r.nextSteps),
  ].join("\n");
}

const CANVAS_SECTIONS: { key: keyof CanvasResult; label: string }[] = [
  { key: "customerSegments", label: "Customer Segments" },
  { key: "valuePropositions", label: "Value Propositions" },
  { key: "channels", label: "Channels" },
  { key: "customerRelationships", label: "Customer Relationships" },
  { key: "revenueStreams", label: "Revenue Streams" },
  { key: "keyResources", label: "Key Resources" },
  { key: "keyActivities", label: "Key Activities" },
  { key: "keyPartnerships", label: "Key Partnerships" },
  { key: "costStructure", label: "Cost Structure" },
];

function canvasMd(r: CanvasResult): string {
  return CANVAS_SECTIONS.map(({ key, label }) => `### ${label}\n${bullets(r[key])}`).join("\n\n");
}

function pitchMd(r: PitchResult): string {
  return [
    `> "${r.tagline}"`,
    "",
    `**Elevator Pitch:** ${r.elevatorPitch}`,
    "",
    "### The Problem",
    r.problem,
    "",
    "### Our Solution",
    r.solution,
    "",
    "### Why Now",
    r.whyNow,
    "",
    "### Business Model",
    r.businessModel,
    "",
    "### Vision",
    r.visionStatement,
  ].join("\n");
}

function marketMd(r: MarketResult): string {
  const competitors =
    r.topCompetitors && r.topCompetitors.length > 0
      ? r.topCompetitors.map((c) => `- **${c.name}** — ${c.weakness}`).join("\n")
      : "_None provided._";
  return [
    `**Market Timing:** ${r.timing}`,
    "",
    "| Segment | Size |",
    "| --- | --- |",
    `| TAM | ${r.tam} |`,
    `| SAM | ${r.sam} |`,
    `| SOM | ${r.som} |`,
    "",
    "### Top Competitors",
    competitors,
    "",
    "### Key Trends",
    bullets(r.keyTrends),
    "",
    "### Target Customer",
    r.targetPersona,
    "",
    "### Entry Strategy",
    r.entryAdvice,
  ].join("\n");
}

/** Serialize a single tool result to a Markdown body (no top-level heading). */
export function resultToMarkdown(tool: ToolId, result: AnalysisResultData): string {
  switch (tool) {
    case "validate":
      return validateMd(result as ValidateResult);
    case "canvas":
      return canvasMd(result as CanvasResult);
    case "pitch":
      return pitchMd(result as PitchResult);
    case "market":
      return marketMd(result as MarketResult);
    default:
      return "";
  }
}

/** Serialize a saved record to a standalone Markdown document. */
export function recordToMarkdown(record: AnalysisRecord): string {
  return [
    `# FounderIQ — ${TOOL_LABELS[record.tool]}`,
    "",
    `> ${record.idea}`,
    "",
    `_Generated ${new Date(record.createdAt).toLocaleString()}_`,
    "",
    resultToMarkdown(record.tool, record.result),
    "",
  ].join("\n");
}

/** Serialize a live (not-yet-saved) analysis to a standalone Markdown document. */
export function analysisToMarkdown(
  tool: ToolId,
  idea: string,
  result: AnalysisResultData,
  createdAt = Date.now()
): string {
  return recordToMarkdown({ id: "", tool, idea, result, createdAt });
}

/** Serialize a multi-tool "Full Report" for one idea to a Markdown document. */
export function reportToMarkdown(
  idea: string,
  sections: { tool: ToolId; result: AnalysisResultData }[]
): string {
  const parts = [
    "# FounderIQ — Full Report",
    "",
    `> ${idea}`,
    "",
    `_Generated ${new Date().toLocaleString()}_`,
    "",
  ];
  for (const section of sections) {
    parts.push(
      "---",
      "",
      `## ${TOOL_LABELS[section.tool]}`,
      "",
      resultToMarkdown(section.tool, section.result),
      ""
    );
  }
  return parts.join("\n");
}

/* ------------------------------------------------------------------ */
/*  Browser helpers (only called from client components)             */
/* ------------------------------------------------------------------ */

/** Make a safe, short filename slug from arbitrary text. */
export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50) || "founderiq"
  );
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadMarkdown(filename: string, text: string): void {
  const name = filename.endsWith(".md") ? filename : `${filename}.md`;
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function printResult(): void {
  window.print();
}
