"use client";

import { motion } from "framer-motion";

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const VERDICT_CONFIG = {
  exceptional: { color: "#4ade80", label: "Exceptional" },
  promising: { color: "#E5E5E5", label: "Promising" },
  needsWork: { color: "#fbbf24", label: "Needs Work" },
  risky: { color: "#f87171", label: "Risky" },
} as const;

function getVerdictConfig(score: number) {
  if (score >= 80) return VERDICT_CONFIG.exceptional;
  if (score >= 60) return VERDICT_CONFIG.promising;
  if (score >= 40) return VERDICT_CONFIG.needsWork;
  return VERDICT_CONFIG.risky;
}

export function ScoreRing({ score, size = 140, strokeWidth = 8, className }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const config = getVerdictConfig(score);

  return (
    <div className={className} style={{ width: size, height: size, position: "relative" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        {/* Animated progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={config.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-black tabular-nums"
          style={{ color: config.color, lineHeight: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] font-semibold tracking-[2px] text-muted-foreground uppercase mt-1">
          SCORE
        </span>
      </div>
    </div>
  );
}
