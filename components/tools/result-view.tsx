"use client";

import { ValidateResultView } from "./validate-result";
import { BMCResultView } from "./bmc-result";
import { PitchResultView } from "./pitch-result";
import { MarketResultView } from "./market-result";
import type {
  AnalysisResultData,
  CanvasResult,
  MarketResult,
  PitchResult,
  ToolId,
  ValidateResult,
} from "@/types";

interface ResultViewProps {
  tool: ToolId;
  result: AnalysisResultData;
}

/** Render the correct result view for a given tool (used by History + Full Report). */
export function ResultView({ tool, result }: ResultViewProps) {
  switch (tool) {
    case "validate":
      return <ValidateResultView data={result as ValidateResult} />;
    case "canvas":
      return <BMCResultView data={result as CanvasResult} />;
    case "pitch":
      return <PitchResultView data={result as PitchResult} />;
    case "market":
      return <MarketResultView data={result as MarketResult} />;
    default:
      return null;
  }
}
