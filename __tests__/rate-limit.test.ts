import { describe, it, expect } from "vitest";
import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit then blocks", () => {
    const rl = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(rl.check("ip", 0).allowed).toBe(true);
    expect(rl.check("ip", 0).allowed).toBe(true);
    expect(rl.check("ip", 0).allowed).toBe(true);

    const blocked = rl.check("ip", 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("resets after the window elapses", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.check("ip", 0).allowed).toBe(true);
    expect(rl.check("ip", 500).allowed).toBe(false);
    expect(rl.check("ip", 1000).allowed).toBe(true);
  });

  it("tracks keys independently", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(rl.check("a", 0).allowed).toBe(true);
    expect(rl.check("b", 0).allowed).toBe(true);
    expect(rl.check("a", 0).allowed).toBe(false);
  });

  it("decrements remaining within a window", () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.check("a", 0).remaining).toBe(1);
    expect(rl.check("a", 0).remaining).toBe(0);
  });

  it("reset() clears all buckets", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 1000 });
    rl.check("a", 0);
    rl.reset();
    expect(rl.check("a", 0).allowed).toBe(true);
  });
});
