"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 gap-4 opacity-40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 0.4 }}
    >
      {icon && <div className="text-muted-foreground">{icon}</div>}
      <div className="text-center max-w-[280px]">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground/70">{description}</p>
      </div>
    </motion.div>
  );
}
