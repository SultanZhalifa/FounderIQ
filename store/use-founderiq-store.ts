"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ToolId, AnalysisRecord, AnalysisResultData } from "@/types";

const MAX_RECORDS = 50;

const EMPTY_INPUTS: Record<ToolId, string> = {
  validate: "",
  canvas: "",
  pitch: "",
  market: "",
};

interface FounderIQState {
  /** Current input text per tool. */
  inputs: Record<ToolId, string>;
  /** Saved analyses with their full results (most recent first). */
  records: AnalysisRecord[];
  /** Sidebar collapsed state. */
  sidebarCollapsed: boolean;
  /** Toggle sidebar collapsed state. */
  toggleSidebar: () => void;
  /** Mobile sidebar drawer state. */
  mobileSidebarOpen: boolean;
  /** Toggle mobile sidebar state. */
  toggleMobileSidebar: () => void;
  /** Set mobile sidebar state. */
  setMobileSidebarOpen: (open: boolean) => void;
  /** Set the input text for a specific tool. */
  setInput: (tool: ToolId, value: string) => void;
  /** Persist a completed analysis and return its generated id. */
  saveRecord: (entry: { tool: ToolId; idea: string; result: AnalysisResultData }) => string;
  /** Look up a saved analysis by id. */
  getRecord: (id: string) => AnalysisRecord | undefined;
  /** Remove a single saved analysis. */
  removeRecord: (id: string) => void;
  /** Clear all saved analyses. */
  clearRecords: () => void;
}

export const useFounderIQStore = create<FounderIQState>()(
  persist(
    (set, get) => ({
      inputs: { ...EMPTY_INPUTS },
      records: [],
      sidebarCollapsed: false,
      mobileSidebarOpen: false,

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      toggleMobileSidebar: () => set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen })),

      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),

      setInput: (tool, value) =>
        set((state) => ({
          inputs: { ...state.inputs, [tool]: value },
        })),

      saveRecord: (entry) => {
        const id = crypto.randomUUID();
        set((state) => {
          const record: AnalysisRecord = { ...entry, id, createdAt: Date.now() };
          // Replace any prior analysis for the same idea + tool, newest first.
          const deduped = state.records.filter(
            (r) => !(r.idea === entry.idea && r.tool === entry.tool)
          );
          return { records: [record, ...deduped].slice(0, MAX_RECORDS) };
        });
        return id;
      },

      getRecord: (id) => get().records.find((r) => r.id === id),

      removeRecord: (id) => set((state) => ({ records: state.records.filter((r) => r.id !== id) })),

      clearRecords: () => set({ records: [] }),
    }),
    {
      name: "founderiq-store",
      version: 2,
      partialize: (state) => ({
        inputs: state.inputs,
        records: state.records,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
      // v1 stored a `history` array of ideas without results — drop it on upgrade.
      migrate: (persisted, version) => {
        const prev = (persisted ?? {}) as Partial<FounderIQState> & {
          history?: unknown;
          inputs?: Record<ToolId, string>;
          sidebarCollapsed?: boolean;
        };
        if (version < 2) {
          return {
            inputs: prev.inputs ?? { ...EMPTY_INPUTS },
            records: [],
            sidebarCollapsed: prev.sidebarCollapsed ?? false,
          } as unknown as FounderIQState;
        }
        return persisted as FounderIQState;
      },
    }
  )
);
