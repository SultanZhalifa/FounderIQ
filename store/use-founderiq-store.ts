"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ToolId, HistoryEntry } from "@/types";

const MAX_HISTORY = 10;

interface FounderIQState {
  /** Current input text per tool. */
  inputs: Record<ToolId, string>;
  /** Analysis history (most recent first). */
  history: HistoryEntry[];
  /** Set the input text for a specific tool. */
  setInput: (tool: ToolId, value: string) => void;
  /** Add a completed analysis to history. */
  addToHistory: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
  /** Load an idea from history into the specified tool's input. */
  loadFromHistory: (entry: HistoryEntry) => void;
  /** Clear all history. */
  clearHistory: () => void;
}

export const useFounderIQStore = create<FounderIQState>()(
  persist(
    (set) => ({
      inputs: {
        validate: "",
        canvas: "",
        pitch: "",
        market: "",
      },
      history: [],

      setInput: (tool, value) =>
        set((state) => ({
          inputs: { ...state.inputs, [tool]: value },
        })),

      addToHistory: (entry) =>
        set((state) => {
          const newEntry: HistoryEntry = {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: Date.now(),
          };
          const filtered = state.history.filter(
            (h) => !(h.idea === entry.idea && h.tool === entry.tool)
          );
          return {
            history: [newEntry, ...filtered].slice(0, MAX_HISTORY),
          };
        }),

      loadFromHistory: (entry) =>
        set((state) => ({
          inputs: { ...state.inputs, [entry.tool]: entry.idea },
        })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "founderiq-store",
      partialize: (state) => ({
        inputs: state.inputs,
        history: state.history,
      }),
    }
  )
);
