"use client";

import type { LessonModule } from "@/types";
import { ProblemDots } from "@/components/world-map/ProblemDots";

export function ModuleCard({
  module,
  number,
  complete,
  unlocked,
  current,
  completedProblemCount,
  onOpen,
}: {
  module: LessonModule;
  number: number;
  complete: boolean;
  unlocked: boolean;
  current: boolean;
  onOpen: () => void;
}) {
  const totalProblems = module.problems.length;
  const completedProblems = complete ? totalProblems : completedProblemCount;

  return (
    <button
      disabled={!unlocked}
      onClick={onOpen}
      className={`w-full rounded-3xl border p-5 text-left transition ${
        complete
          ? "border-yellow-300/55 bg-yellow-400/10 text-yellow-50 shadow-xl shadow-yellow-950/20"
          : current
            ? "border-yellow-300 bg-yellow-400/15 text-yellow-50 shadow-2xl shadow-yellow-500/15"
            : unlocked
              ? "border-yellow-300/25 bg-black/25 text-yellow-100 hover:border-yellow-300/55 hover:bg-yellow-400/10"
              : "cursor-not-allowed border-yellow-100/10 bg-black/20 text-yellow-100/30"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300/60">
            Module {number}
          </p>

          <h3 className="mt-2 text-lg font-black leading-tight">
            {module.title}
          </h3>

          <p className="mt-2 text-sm leading-6 opacity-70">
            {module.description}
          </p>
        </div>

        <span className="text-2xl">
          {complete ? "✓" : unlocked ? "▶" : "🔒"}
        </span>
      </div>

      <ProblemDots
        total={totalProblems}
        completed={completedProblems}
        locked={!unlocked}
      />
    </button>
  );
}