"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFounderIQStore } from "@/store";
import type { ToolId } from "@/types";

const SAMPLES: Record<ToolId, string> = {
  validate:
    "AI platform that helps small businesses manage their finances through WhatsApp. Uses OCR to scan receipts, auto-categorize expenses, and generate monthly profit-loss reports automatically.",
  canvas:
    "Marketplace connecting local farmers directly with restaurants and hotels, eliminating middlemen so farmers get 40% higher margins and buyers get fresher products at competitive prices.",
  pitch:
    "EdTech platform that gamifies financial literacy for Gen-Z, using micro-investments starting from $1 and social competitions between friends to build saving habits early.",
  market:
    "B2B SaaS for logistics companies to optimize last-mile delivery routes using real-time traffic data, AI weather prediction, and capacitated vehicle routing algorithms.",
};

interface IdeaInputProps {
  tool: ToolId;
  onAnalyze: (idea: string) => void;
  isLoading: boolean;
  toolName: string;
  toolTagline: string;
  toolIcon: React.ReactNode;
}

export function IdeaInput({
  tool,
  onAnalyze,
  isLoading,
  toolName,
  toolTagline,
  toolIcon,
}: IdeaInputProps) {
  const input = useFounderIQStore((s) => s.inputs[tool]);
  const setInput = useFounderIQStore((s) => s.setInput);

  const handleSubmit = () => {
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  const loadSample = () => {
    setInput(tool, SAMPLES[tool]);
  };

  return (
    <div className="mb-6">
      {/* Tool header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">{toolIcon}</div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">{toolName}</h1>
            <p className="text-xs text-muted-foreground">{toolTagline}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={loadSample} disabled={isLoading}>
          <svg
            className="w-3.5 h-3.5 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Try sample
        </Button>
      </div>

      {/* Input area */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Textarea
          value={input}
          onChange={(e) => setInput(tool, e.target.value)}
          placeholder="Describe your startup idea in detail. Include the problem you're solving, your target market, and your proposed solution..."
          rows={5}
          className="border-0 bg-transparent resize-none focus-visible:ring-0 text-sm leading-relaxed px-5 pt-5 pb-3 placeholder:text-muted-foreground/40"
        />
        <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/50">
          <span className="text-[11px] text-muted-foreground/50 font-mono">
            {input.length > 0
              ? `${input.length} characters`
              : "Tip: be specific about your target market and solution"}
          </span>
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            size="sm"
            className="bg-foreground hover:bg-foreground/90 text-background disabled:opacity-30"
          >
            {isLoading ? (
              <>
                <svg
                  className="w-3.5 h-3.5 mr-1 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Analyze
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
