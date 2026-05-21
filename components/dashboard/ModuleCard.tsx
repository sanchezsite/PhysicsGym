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
  completedProblemCount: number;
  onOpen: () => void;
}) {
  const totalProblems = module.problems.length;
  const completedProblems = complete ? totalProblems : completedProblemCount;

  return (
    <button
      disabled={!unlocked}
      onClick={onOpen}
      className={`group w-full rounded-3xl border p-5 text-left transition ${
        complete
          ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/15"
          : current
             ? "border-cyan-200/60 bg-cyan-200/10 text-cyan-50 shadow-2xl shadow-cyan-400/20 ring-2 ring-cyan-300/35 hover:shadow-cyan-300/35 hover:scale-[1.015]"
            : unlocked
              ? "border-white/10 bg-white/[0.05] text-slate-100 hover:border-cyan-200/30 hover:bg-white/[0.08]"
              : "cursor-not-allowed border-white/10 bg-white/[0.025] text-slate-500"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-black uppercase tracking-[0.18em] ${
              complete
                ? "text-cyan-100/55"
                : current
                  ? "text-yellow-100/65"
                  : unlocked
                    ? "text-cyan-100/45"
                    : "text-slate-500"
            }`}
          >
            Module {number}
          </p>

          <h3 className="mt-2 text-lg font-black leading-tight">
            {module.title}
          </h3>

          <p className="mt-2 text-sm leading-6 opacity-65">
            {module.description}
          </p>
        </div>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg font-black ${
            complete
              ? "bg-cyan-300 text-slate-950"
              : current
                ? "bg-cyan-300 text-slate-950 shadow-[0_0_25px_rgba(103,232,249,0.55)] animate-pulse scale-110"
                : unlocked
                  ? "bg-white/10 text-slate-200"
                  : "bg-white/[0.04] text-slate-500"
          }`}
        >
          {complete ? "✓" : unlocked ? "▶" : "🔒"}
        </span>
      </div>

      <div className="mt-5">
        <ProblemDots
          total={totalProblems}
          completed={completedProblems}
          locked={!unlocked}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] opacity-50">
        <span>
          {completedProblems}/{totalProblems} problems
        </span>

        <span>
          {complete ? "Complete" : current ? "Current" : unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    </button>
  );
}