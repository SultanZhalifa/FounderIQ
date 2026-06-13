import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function SectionLabel({ children, color, className, icon }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-[10px] font-bold tracking-[1.5px] uppercase mb-3",
        className
      )}
      style={color ? { color } : undefined}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}
