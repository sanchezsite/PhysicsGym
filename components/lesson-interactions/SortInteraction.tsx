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
          className="grid gap-3 rounded-2xl border border-yellow-300/20 bg-black/20 p-4 md:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="text-lg font-bold text-yellow-100">{item.label}</p>
            <p className="text-sm text-yellow-100/50">
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
                    ? "border-yellow-300 bg-yellow-400 text-red-950"
                    : "border-yellow-300/25 bg-black/25 text-yellow-100/70 hover:border-yellow-300/60"
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