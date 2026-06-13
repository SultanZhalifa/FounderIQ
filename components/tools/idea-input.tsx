"use client";

import { useState, useEffect } from "react";
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

const PLACEHOLDERS: Record<ToolId, string> = {
  validate:
    "Describe your startup idea in detail. Include the core problem you're solving, your target customer profile, the proposed solution, and your monetization model...",
  canvas:
    "Outline your business model concept. What is your key value proposition, who are your key partners, what channels will you use to reach customers, and how is the cost structure aligned?",
  pitch:
    "Describe the venture you are pitching. Who is the team, what is your unfair advantage, how much capital are you raising, and what will the funding be used to achieve?",
  market:
    "Define your target market space. Which geographical region (e.g. US, SE Asia) are you focusing on, who are the key buyers, and what is your pricing structure (e.g. SaaS subscription, transaction fee)?",
};

const TIPS: Record<ToolId, string> = {
  validate: "Tip: Detail the pain point and how your solution uniquely solves it.",
  canvas: "Tip: Focus on how value is created, delivered, and captured.",
  pitch: "Tip: Highlight your team's background, funding needs, and market hook.",
  market: "Tip: Specify geographical boundary, customer segments, and pricing model.",
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

  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");

  useEffect(() => {
    const fullText = PLACEHOLDERS[tool];
    let currentText = "";
    let i = 0;

    // Reset placeholder asynchronously to avoid react-hooks/set-state-in-effect warning
    const resetTimeout = setTimeout(() => {
      setDisplayedPlaceholder("");
    }, 0);

    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText[i];
        setDisplayedPlaceholder(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 12); // Snappy typing speed (12ms/character)

    return () => {
      clearTimeout(resetTimeout);
      clearInterval(interval);
    };
  }, [tool]);

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
          placeholder={displayedPlaceholder}
          rows={5}
          className="border-0 bg-transparent resize-none focus-visible:ring-0 text-sm leading-relaxed px-5 pt-5 pb-3 placeholder:text-muted-foreground/40"
        />
        <div className="flex items-center justify-between px-4 pb-3 pt-1 border-t border-border/50">
          <span className="text-[11px] text-muted-foreground/50 font-mono">
            {input.length > 0 ? `${input.length} characters` : TIPS[tool]}
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
