"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing, SectionLabel } from "@/components/shared";
import type { ValidateResult } from "@/types";

/** Accept deeply partial objects from useObject streaming. */
type PartialValidateResult = {
  [K in keyof ValidateResult]?: ValidateResult[K] | undefined;
};

const VERDICT_COLORS: Record<string, string> = {
  Exceptional: "#4ade80",
  Promising: "#E5E5E5",
  "Needs Work": "#fbbf24",
  Risky: "#f87171",
};

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

interface ValidateResultViewProps {
  data: PartialValidateResult | null | undefined;
}

export function ValidateResultView({ data: rawData }: ValidateResultViewProps) {
  const data = (rawData ?? {}) as PartialValidateResult;
  const verdictColor = data.verdict ? (VERDICT_COLORS[data.verdict] ?? "#737373") : "#737373";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4"
    >
      {/* Score ring */}
      <motion.div variants={item}>
        <Card className="flex flex-col items-center gap-4 p-6">
          {data.score !== undefined ? (
            <ScoreRing score={data.score} />
          ) : (
            <div className="w-[140px] h-[140px] rounded-full border border-border animate-pulse" />
          )}
          {data.verdict && (
            <Badge
              className="text-xs font-semibold px-3 py-1 border"
              style={{
                color: verdictColor,
                backgroundColor: `${verdictColor}15`,
                borderColor: `${verdictColor}30`,
              }}
            >
              {data.verdict}
            </Badge>
          )}
        </Card>
      </motion.div>

      {/* Details */}
      <div className="flex flex-col gap-3">
        {/* Summary */}
        {data.summary && (
          <motion.div variants={item}>
            <Card className="p-5">
              <SectionLabel color="#A3A3A3">AI Analysis</SectionLabel>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{data.summary}</p>
            </Card>
          </motion.div>
        )}

        {/* Four quadrants */}
        <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "strengths" as const, label: "Strengths", color: "#4ade80", icon: checkIcon },
            { key: "weaknesses" as const, label: "Weaknesses", color: "#f87171", icon: alertIcon },
            {
              key: "opportunities" as const,
              label: "Opportunities",
              color: "#fbbf24",
              icon: arrowIcon,
            },
            { key: "nextSteps" as const, label: "Next Steps", color: "#60a5fa", icon: null },
          ].map(({ key, label, color, icon }) => (
            <Card key={key} className="p-5">
              <SectionLabel color={color} icon={icon}>
                {label}
              </SectionLabel>
              <ul className="space-y-1.5">
                {data[key]?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed"
                  >
                    {key === "nextSteps" ? (
                      <span
                        className="flex-shrink-0 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center mt-0.5"
                        style={{
                          color,
                          backgroundColor: `${color}15`,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        {i + 1}
                      </span>
                    ) : (
                      <span
                        className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    )}
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* SVG icon helpers */
const checkIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const alertIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const arrowIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);
