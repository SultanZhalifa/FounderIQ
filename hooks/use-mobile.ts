"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Returns true if viewport width is below the given breakpoint.
 * Defaults to 768px (mobile breakpoint).
 */
export function useMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  const checkBreakpoint = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches);
    }
  }, [breakpoint]);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const onChange = () => {
      checkBreakpoint();
    };

    // Set initial state via callback scheduled after effect
    onChange();

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint, checkBreakpoint]);

  return isMobile;
}
