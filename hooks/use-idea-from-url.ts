"use client";

import { useEffect, useRef } from "react";
import { useFounderIQStore } from "@/store";
import type { ToolId } from "@/types";

/**
 * On first mount, hydrate a tool's input from a shared `?idea=` link and
 * optionally auto-run it (`?run=1`). Reads `window.location` directly (client
 * only) so callers don't need a Suspense boundary around `useSearchParams`.
 * Clears the params afterward so a refresh doesn't re-trigger.
 */
export function useIdeaFromUrl(tool: ToolId, analyze: (idea: string) => void) {
  const setInput = useFounderIQStore((s) => s.setInput);
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params = new URLSearchParams(window.location.search);
    const idea = params.get("idea");
    if (!idea) return;

    setInput(tool, idea);
    const shouldRun = params.get("run") === "1";

    const url = new URL(window.location.href);
    url.searchParams.delete("idea");
    url.searchParams.delete("run");
    window.history.replaceState({}, "", url.pathname + url.search);

    if (shouldRun) analyze(idea);
  }, [tool, analyze, setInput]);
}
