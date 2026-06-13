"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/shared";
import type { MarketResult } from "@/types";

type PartialMarketResult = {
  [K in keyof MarketResult]?: MarketResult[K] extends Array<infer U>
    ? Array<Partial<U>> | undefined
    : MarketResult[K] | undefined;
};

const TIMING_COLORS: Record<string, string> = {
  Perfect: "#4ade80",
  Good: "#8b8bf5",
  Early: "#fbbf24",
  Late: "#f87171",
};

const TAM_SAM_SOM = [
  { key: "tam" as const, label: "TAM", color: "#8b8bf5", width: "100%" },
  { key: "sam" as const, label: "SAM", color: "#60a5fa", width: "55%" },
  { key: "som" as const, label: "SOM", color: "#4ade80", width: "20%" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface MarketResultViewProps {
  data: PartialMarketResult | null | undefined;
}

export function MarketResultView({ data: rawData }: MarketResultViewProps) {
  const data = (rawData ?? {}) as PartialMarketResult;
  const timingColor = data.timing ? (TIMING_COLORS[data.timing] ?? "#6b6b76") : "#6b6b76";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4"
    >
      {/* Timing + Market size */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4">
        {/* Timing badge */}
        <Card className="flex flex-col items-center justify-center gap-2 p-6">
          <span className="text-[9px] text-muted-foreground tracking-[2px] font-bold uppercase">
            MARKET TIMING
          </span>
          {data.timing ? (
            <>
              <span className="text-xl font-extrabold" style={{ color: timingColor }}>
                {data.timing}
              </span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: timingColor }} />
            </>
          ) : (
            <div className="w-12 h-6 rounded bg-border animate-pulse" />
          )}
        </Card>

        {/* TAM/SAM/SOM */}
        <Card className="p-5">
          <SectionLabel color="#60a5fa" icon={chartIcon}>
            Market Size
          </SectionLabel>
          {TAM_SAM_SOM.map(({ key, label, color, width }) => (
            <div key={key} className="mb-3 last:mb-0">
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] font-bold" style={{ color }}>
                  {label}
                </span>
                <span className="text-[11px] text-muted-foreground">{data[key] ?? "..."}</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
                />
              </div>
            </div>
          ))}
        </Card>
      </motion.div>

      {/* Bottom grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Competitors */}
        {data.topCompetitors && data.topCompetitors.length > 0 && (
          <Card className="p-5">
            <SectionLabel color="#f87171" icon={trophyIcon}>
              Competitors
            </SectionLabel>
            <div className="space-y-2">
              {data.topCompetitors.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-surface border border-border">
                  <div className="text-xs font-semibold text-foreground mb-0.5">
                    {c.name ?? "..."}
                  </div>
                  <div className="text-[11px] text-muted-foreground flex items-start gap-1">
                    <svg
                      className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#f87171]/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    {c.weakness ?? "..."}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Trends */}
        {data.keyTrends && data.keyTrends.length > 0 && (
          <Card className="p-5">
            <SectionLabel color="#fbbf24" icon={trendIcon}>
              Key Trends
            </SectionLabel>
            <div className="space-y-2">
              {data.keyTrends.map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"
                >
                  <svg
                    className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#fbbf24]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Persona */}
        {data.targetPersona && (
          <Card className="p-5">
            <SectionLabel color="#8b8bf5" icon={userIcon}>
              Target Customer
            </SectionLabel>
            <p className="text-xs text-muted-foreground leading-relaxed">{data.targetPersona}</p>
          </Card>
        )}

        {/* GTM */}
        {data.entryAdvice && (
          <Card className="p-5 border-[#4ade80]/15 bg-[#4ade80]/[0.02]">
            <SectionLabel color="#4ade80" icon={rocketIcon}>
              Entry Strategy
            </SectionLabel>
            <p className="text-xs text-[#4ade80]/70 leading-relaxed">{data.entryAdvice}</p>
          </Card>
        )}
      </motion.div>
    </motion.div>
  );
}

/* SVG helpers */
const chartIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const trophyIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const trendIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const userIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const rocketIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);
