/* ------------------------------------------------------------------ */
/*  FounderIQ -- Core type definitions                                */
/* ------------------------------------------------------------------ */

/** The four analysis tools available in the platform. */
export type ToolId = "validate" | "canvas" | "pitch" | "market";

/** Metadata for each tool (used in navigation and UI). */
export interface ToolMeta {
  id: ToolId;
  name: string;
  tagline: string;
  href: string;
}

/* ------------------------------------------------------------------ */
/*  AI Response Shapes                                                */
/* ------------------------------------------------------------------ */

export interface ValidateResult {
  score: number;
  verdict: "Exceptional" | "Promising" | "Needs Work" | "Risky";
  summary: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  nextSteps: string[];
}

export interface CanvasResult {
  customerSegments: string[];
  valuePropositions: string[];
  channels: string[];
  customerRelationships: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartnerships: string[];
  costStructure: string[];
}

export interface PitchResult {
  tagline: string;
  elevatorPitch: string;
  problem: string;
  solution: string;
  whyNow: string;
  businessModel: string;
  visionStatement: string;
}

export interface MarketCompetitor {
  name: string;
  weakness: string;
}

export interface MarketResult {
  timing: "Perfect" | "Good" | "Early" | "Late";
  tam: string;
  sam: string;
  som: string;
  topCompetitors: MarketCompetitor[];
  keyTrends: string[];
  targetPersona: string;
  entryAdvice: string;
}

/** Discriminated union of all analysis results. */
export type AnalysisResult =
  | { tool: "validate"; data: ValidateResult }
  | { tool: "canvas"; data: CanvasResult }
  | { tool: "pitch"; data: PitchResult }
  | { tool: "market"; data: MarketResult };

/** A single entry in the analysis history. */
export interface HistoryEntry {
  id: string;
  idea: string;
  tool: ToolId;
  timestamp: number;
}

/* ------------------------------------------------------------------ */
/*  API Request/Response                                              */
/* ------------------------------------------------------------------ */

export interface AnalyzeRequest {
  tool: ToolId;
  idea: string;
}
