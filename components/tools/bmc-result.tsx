"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/shared";
import type { CanvasResult } from "@/types";

type PartialCanvasResult = {
  [K in keyof CanvasResult]?: CanvasResult[K] | undefined;
};

interface BMCCell {
  key: keyof CanvasResult;
  label: string;
  colClass: string;
  rowClass: string;
  highlight?: boolean;
}

const BMC_CELLS: BMCCell[] = [
  {
    key: "keyPartnerships",
    label: "Key Partners",
    colClass: "col-span-1 md:col-start-1 md:col-end-2",
    rowClass: "md:row-start-1 md:row-end-3",
  },
  {
    key: "keyActivities",
    label: "Key Activities",
    colClass: "col-span-1 md:col-start-2 md:col-end-3",
    rowClass: "md:row-start-1 md:row-end-2",
  },
  {
    key: "valuePropositions",
    label: "Value Propositions",
    colClass: "col-span-1 md:col-start-3 md:col-end-4",
    rowClass: "md:row-start-1 md:row-end-3",
    highlight: true,
  },
  {
    key: "customerRelationships",
    label: "Customer Relations",
    colClass: "col-span-1 md:col-start-4 md:col-end-5",
    rowClass: "md:row-start-1 md:row-end-2",
  },
  {
    key: "customerSegments",
    label: "Customer Segments",
    colClass: "col-span-1 md:col-start-5 md:col-end-6",
    rowClass: "md:row-start-1 md:row-end-3",
  },
  {
    key: "keyResources",
    label: "Key Resources",
    colClass: "col-span-1 md:col-start-2 md:col-end-3",
    rowClass: "md:row-start-2 md:row-end-3",
  },
  {
    key: "channels",
    label: "Channels",
    colClass: "col-span-1 md:col-start-4 md:col-end-5",
    rowClass: "md:row-start-2 md:row-end-3",
  },
  {
    key: "costStructure",
    label: "Cost Structure",
    colClass: "col-span-1 md:col-span-2 md:col-start-1 md:col-end-3",
    rowClass: "md:row-start-3 md:row-end-4",
  },
  {
    key: "revenueStreams",
    label: "Revenue Streams",
    colClass: "col-span-1 md:col-span-3 md:col-start-3 md:col-end-6",
    rowClass: "md:row-start-3 md:row-end-4",
  },
];

interface BMCResultViewProps {
  data: PartialCanvasResult | null | undefined;
}

export function BMCResultView({ data: rawData }: BMCResultViewProps) {
  const data = (rawData ?? {}) as PartialCanvasResult;
  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-px min-w-[600px] md:min-w-0 rounded-xl overflow-hidden border border-border"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {BMC_CELLS.map((cell, idx) => (
          <motion.div
            key={cell.key}
            className={`${cell.colClass} ${cell.rowClass} bg-card p-4 min-h-[120px] border-r border-b border-border/50 last:border-r-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
          >
            <SectionLabel
              color={cell.highlight ? "#8b8bf5" : "#6b6b76"}
              className="!text-[9px] !tracking-[1.5px] !mb-2"
            >
              {cell.label}
            </SectionLabel>
            <ul className="space-y-1">
              {data[cell.key]?.map((item, i) => (
                <li
                  key={i}
                  className={`text-[11px] leading-relaxed ${
                    cell.highlight ? "text-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  <span className="text-muted-foreground/30 mr-1">--</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
