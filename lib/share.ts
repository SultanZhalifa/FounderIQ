import type { ToolId } from "@/types";

/**
 * Build a shareable path for an idea. Since analyses live only in the visitor's
 * browser, a shared link re-generates the result by pre-filling the tool input
 * (and optionally auto-running it).
 */
export function buildSharePath(tool: ToolId, idea: string, autoRun = false): string {
  const params = new URLSearchParams({ idea });
  if (autoRun) params.set("run", "1");
  return `/${tool}?${params.toString()}`;
}

export function buildShareUrl(tool: ToolId, idea: string, autoRun = false): string {
  const path = buildSharePath(tool, idea, autoRun);
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

/** Use the native share sheet when available, otherwise copy to clipboard. */
export async function shareOrCopy(
  url: string,
  title = "FounderIQ analysis"
): Promise<"shared" | "copied" | "failed"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title, url });
      return "shared";
    } catch {
      // User cancelled or share is unavailable — fall through to copy.
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}
