"use client";

import { useCallback } from "react";
import { useAnalyze } from "./use-analyze";
import type { ToolId } from "@/types";

/**
 * Runs all four tools on a single idea in parallel for the "Full Report" view.
 * Reuses {@link useAnalyze} per tool, so each result is streamed, saved to
 * History, and exportable just like the standalone pages.
 */
export function useReport() {
  const validate = useAnalyze("validate");
  const canvas = useAnalyze("canvas");
  const pitch = useAnalyze("pitch");
  const market = useAnalyze("market");

  const tools: Record<ToolId, ReturnType<typeof useAnalyze>> = {
    validate,
    canvas,
    pitch,
    market,
  };

  const runAll = useCallback(
    (idea: string) => {
      validate.analyze(idea);
      canvas.analyze(idea);
      pitch.analyze(idea);
      market.analyze(idea);
    },
    [validate, canvas, pitch, market]
  );

  const isLoading = validate.isLoading || canvas.isLoading || pitch.isLoading || market.isLoading;

  const analyzedIdea =
    validate.analyzedIdea || canvas.analyzedIdea || pitch.analyzedIdea || market.analyzedIdea;

  return { tools, runAll, isLoading, analyzedIdea };
}
