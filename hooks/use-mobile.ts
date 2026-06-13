"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns true if viewport width is below the given breakpoint.
 * Uses useSyncExternalStore for proper SSR hydration safety.
 */
export function useMobile(breakpoint: number = 768): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches,
    () => false // SSR snapshot: always false (desktop) on server
  );
}
