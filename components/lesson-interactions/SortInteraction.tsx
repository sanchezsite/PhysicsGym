"use client";

import type { SortItem } from "@/types";

type SortAnswers = Record<string, string>;

export function SortInteraction({
  sortItems,
  sortBuckets,
  sortAnswers,
  setSortAnswers,
}: {
  sortItems: SortItem[];
  sortBuckets: string[];
  sortAnswers: SortAnswers;
  setSortAnswers: (value: SortAnswers) => void;
}) {
  return (
    <div className="space-y-5">
      {sortItems.map((item) => (
        <div
          key={item.label}
          className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-lg font-bold text-white">{item.label}</p>
            <p className="text-sm text-slate-300/60">
              Choose the category that best describes this quantity.
            </p>
          </div>

          <div className="flex gap-2">
            {sortBuckets.map((bucket) => (
              <button
                key={bucket}
                onClick={() =>
                  setSortAnswers({
                    ...sortAnswers,
                    [item.label]: bucket,
                  })
                }
                className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
                  sortAnswers[item.label] === bucket
                    ? "border-cyan-300/70 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-950/20"
                    : "border-white/10 bg-white/[0.04] text-slate-200/75 hover:border-cyan-200/30 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {bucket}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}