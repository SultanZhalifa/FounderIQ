"use client";

import { useCallback } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { toolSchemas } from "@/lib/validations";
import { useFounderIQStore } from "@/store";
import type { ToolId } from "@/types";

/**
 * Custom hook wrapping useObject for streaming structured AI analysis.
 * Handles submission, loading state, and history management.
 */
export function useAnalyze<T extends ToolId>(tool: T) {
  const schema = toolSchemas[tool];
  const addToHistory = useFounderIQStore((s) => s.addToHistory);

  const { object, submit, isLoading, error, stop } = useObject({
    api: "/api/analyze",
    schema,
  });

  const analyze = useCallback(
    (idea: string) => {
      if (!idea.trim() || isLoading) return;

      addToHistory({ idea: idea.trim(), tool });

      submit({ tool, idea: idea.trim() });
    },
    [tool, isLoading, submit, addToHistory]
  );

  return {
    /** The partially-streamed result object (DeepPartial). */
    result: object,
    /** Whether the stream is currently active. */
    isLoading,
    /** Any error that occurred during streaming. */
    error,
    /** Submit an idea for analysis. */
    analyze,
    /** Stop the current stream. */
    stop,
  };
}
