"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SectionLabel } from "@/components/shared";
import type { PitchResult } from "@/types";

type PartialPitchResult = {
  [K in keyof PitchResult]?: PitchResult[K] | undefined;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

interface PitchResultViewProps {
  data: PartialPitchResult | null | undefined;
}

export function PitchResultView({ data: rawData }: PitchResultViewProps) {
  const data = (rawData ?? {}) as PartialPitchResult;
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4"
    >
      {/* Tagline */}
      {data.tagline && (
        <motion.div variants={item}>
          <Card className="text-center p-8 border-foreground/10 bg-foreground/[0.02]">
            <div className="text-[10px] text-muted-foreground tracking-[3px] font-bold mb-3 uppercase">
              YOUR TAGLINE
            </div>
            <div className="text-2xl md:text-3xl font-black tracking-tight text-foreground/90">
              &ldquo;{data.tagline}&rdquo;
            </div>
          </Card>
        </motion.div>
      )}

      {/* Elevator pitch */}
      {data.elevatorPitch && (
        <motion.div variants={item}>
          <Card className="p-5 border-foreground/10 bg-foreground/[0.02]">
            <SectionLabel color="#A3A3A3" icon={boltIcon}>
              30-Second Elevator Pitch
            </SectionLabel>
            <p className="text-sm text-foreground/70 leading-relaxed italic">
              &ldquo;{data.elevatorPitch}&rdquo;
            </p>
          </Card>
        </motion.div>
      )}

      {/* Four pitch sections */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "problem" as const, label: "The Problem", color: "#f87171" },
          { key: "solution" as const, label: "Our Solution", color: "#4ade80" },
          { key: "whyNow" as const, label: "Why Now", color: "#fbbf24" },
          { key: "businessModel" as const, label: "Business Model", color: "#60a5fa" },
        ].map(({ key, label, color }) =>
          data[key] ? (
            <Card key={key} className="p-5">
              <SectionLabel color={color}>{label}</SectionLabel>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{data[key]}</p>
            </Card>
          ) : null
        )}
      </motion.div>

      {/* Vision */}
      {data.visionStatement && (
        <motion.div variants={item}>
          <Card className="p-5 border-[#4ade80]/15 bg-[#4ade80]/[0.02]">
            <SectionLabel color="#4ade80" icon={rocketIcon}>
              5-Year Vision
            </SectionLabel>
            <p className="text-sm text-[#4ade80]/80 leading-relaxed font-medium">
              {data.visionStatement}
            </p>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

const boltIcon = (
  <svg
    className="w-3 h-3"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
