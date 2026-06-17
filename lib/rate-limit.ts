/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * NOTE: state lives in the process, so the limit is enforced per server
 * instance. On multi-instance / serverless deployments, swap the Map for a
 * shared store (e.g. Upstash Redis) to enforce a global limit.
 */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Seconds until the window resets (only meaningful when blocked). */
  retryAfterSec: number;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export function createRateLimiter(opts: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();

  return {
    /** Record a hit for `key`. `now` is injectable for deterministic tests. */
    check(key: string, now: number = Date.now()): RateLimitResult {
      const bucket = buckets.get(key);

      if (!bucket || now >= bucket.resetAt) {
        buckets.set(key, { count: 1, resetAt: now + opts.windowMs });
        return { allowed: true, remaining: opts.limit - 1, retryAfterSec: 0 };
      }

      if (bucket.count >= opts.limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
        };
      }

      bucket.count += 1;
      return { allowed: true, remaining: opts.limit - bucket.count, retryAfterSec: 0 };
    },
    /** Clear all buckets (used in tests). */
    reset() {
      buckets.clear();
    },
  };
}

/** Best-effort client identifier from proxy headers. */
export function clientKeyFromRequest(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "anonymous";
}
