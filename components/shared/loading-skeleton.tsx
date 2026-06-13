import { Skeleton } from "@/components/ui/skeleton";

export function ValidateSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-card">
        <Skeleton className="w-[130px] h-[130px] rounded-full" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="p-5 rounded-xl border border-border bg-card">
          <Skeleton className="w-24 h-3 mb-3" />
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-card">
              <Skeleton className="w-20 h-3 mb-3" />
              <div className="space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-5/6 h-3" />
                <Skeleton className="w-4/6 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CanvasSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-1 rounded-xl overflow-hidden">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="p-4 min-h-[110px] bg-card border border-border"
          style={{
            gridColumn: [0, 4].includes(i)
              ? "span 1"
              : i === 2
                ? "span 1"
                : i >= 7
                  ? "span 2"
                  : undefined,
          }}
        >
          <Skeleton className="w-16 h-2.5 mb-3" />
          <div className="space-y-2">
            <Skeleton className="w-full h-2.5" />
            <Skeleton className="w-4/5 h-2.5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PitchSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center p-8 rounded-xl border border-border bg-card">
        <Skeleton className="w-24 h-2.5 mx-auto mb-4" />
        <Skeleton className="w-64 h-7 mx-auto" />
      </div>
      <div className="p-5 rounded-xl border border-border bg-card">
        <Skeleton className="w-32 h-2.5 mb-3" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-5/6 h-4 mb-2" />
        <Skeleton className="w-3/4 h-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-border bg-card">
            <Skeleton className="w-20 h-2.5 mb-3" />
            <Skeleton className="w-full h-3 mb-2" />
            <Skeleton className="w-4/5 h-3" />
          </div>
        ))}
      </div>
      <div className="p-5 rounded-xl border border-border bg-card">
        <Skeleton className="w-28 h-2.5 mb-3" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}

export function MarketSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4">
        <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-border bg-card">
          <Skeleton className="w-20 h-2.5" />
          <Skeleton className="w-16 h-7" />
        </div>
        <div className="p-5 rounded-xl border border-border bg-card">
          <Skeleton className="w-20 h-2.5 mb-4" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between mb-1.5">
                <Skeleton className="w-8 h-2.5" />
                <Skeleton className="w-24 h-2.5" />
              </div>
              <Skeleton className="w-full h-1.5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-5 rounded-xl border border-border bg-card">
            <Skeleton className="w-24 h-2.5 mb-3" />
            <div className="space-y-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-4/5 h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
