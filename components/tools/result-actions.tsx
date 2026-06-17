"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard, downloadMarkdown, printResult } from "@/lib/export";
import { shareOrCopy } from "@/lib/share";
import { cn } from "@/lib/utils";

interface ResultActionsProps {
  /** Markdown document to copy / download. */
  markdown: string;
  /** Base name (without extension) for the downloaded .md file. */
  filenameBase: string;
  /** Optional absolute URL to share; omit to hide the Share button. */
  shareUrl?: string;
  className?: string;
}

/** Copy / Download / Print / Share toolbar shown under any analysis result. */
export function ResultActions({ markdown, filenameBase, shareUrl, className }: ResultActionsProps) {
  const [status, setStatus] = useState<string | null>(null);

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus((current) => (current === msg ? null : current)), 1800);
  };

  const onCopy = async () => flash((await copyToClipboard(markdown)) ? "Copied" : "Copy failed");

  const onDownload = () => {
    downloadMarkdown(filenameBase, markdown);
    flash("Downloaded");
  };

  const onShare = async () => {
    if (!shareUrl) return;
    const result = await shareOrCopy(shareUrl);
    flash(result === "shared" ? "Shared" : result === "copied" ? "Link copied" : "Share failed");
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 print:hidden", className)}>
      <Button variant="outline" size="sm" onClick={onCopy} aria-label="Copy result as Markdown">
        <CopyIcon />
        Copy
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onDownload}
        aria-label="Download result as Markdown file"
      >
        <DownloadIcon />
        Download
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={printResult}
        aria-label="Print result or save as PDF"
      >
        <PrintIcon />
        Print / PDF
      </Button>
      {shareUrl && (
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          aria-label="Share a link to this idea"
        >
          <ShareIcon />
          Share
        </Button>
      )}
      {status && (
        <span className="text-[11px] text-muted-foreground" role="status" aria-live="polite">
          {status}
        </span>
      )}
    </div>
  );
}

const iconProps = {
  className: "w-3.5 h-3.5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

const CopyIcon = () => (
  <svg {...iconProps}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PrintIcon = () => (
  <svg {...iconProps}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const ShareIcon = () => (
  <svg {...iconProps}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);
