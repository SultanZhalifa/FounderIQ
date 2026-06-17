"use client";

import { useSyncExternalStore } from "react";
import { useFounderIQStore } from "@/store";

/**
 * Returns `true` once the persisted store has hydrated from localStorage.
 * Uses `useSyncExternalStore` so server and client agree on the initial value
 * (always `false` on the server), avoiding hydration mismatches without
 * calling setState inside an effect.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useFounderIQStore.persist.onFinishHydration(onChange),
    () => useFounderIQStore.persist.hasHydrated(),
    () => false
  );
}
