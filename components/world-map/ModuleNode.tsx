"use client";

import { motion } from "framer-motion";
import type { LessonModule } from "@/types";
import type { ModuleStatus } from "@/data/curriculum/types";
import { ProblemDots } from "./ProblemDots";

const nodeStyles: Record<ModuleStatus, string> = {
  completed:
    "border-yellow-200 bg-yellow-300 text-slate-950 shadow-[0_0_28px_rgba(250,204,21,0.42)]",
  current:
    "border-yellow-300 bg-yellow-400/20 text-yellow-50 shadow-[0_0_34px_rgba(250,204,21,0.32)]",
  available:
    "border-yellow-200/45 bg-slate-950/70 text-yellow-50 hover:border-yellow-200 hover:bg-yellow-300/10",
  locked:
    "cursor-not-allowed border-white/10 bg-slate-950/45 text-white/30",
};

const statusLabels: Record<ModuleStatus, string> = {
  completed: "Completed",
  current: "Current",
  available: "Available",
  locked: "Locked",
};

export function ModuleNode({
  module,
  index,
  status,
  onOpen,
}: {
  module: LessonModule;
  index: number;
  status: ModuleStatus;
  onOpen: (moduleId: string) => void;
}) {
  const locked = status === "locked";

  return (
    <motion.button
      whileHover={locked ? undefined : { y: -8, scale: 1.03 }}
      whileTap={locked ? undefined : { scale: 0.98 }}
      onClick={() => {
        if (!locked) onOpen(module.id);
      }}
      disabled={locked}
      className={`group relative flex min-h-44 w-44 flex-col items-center justify-center rounded-full border-2 p-5 text-center transition ${nodeStyles[status]}`}
    >
      {status === "current" ? (
        <span className="absolute inset-[-10px] rounded-full border border-yellow-300/35" />
      ) : null}

      <span className="text-xs font-bold uppercase text-inherit opacity-65">
        Module {index + 1}
      </span>

      <span className="mt-2 text-base font-black leading-tight">
        {module.title}
      </span>

      <ProblemDots count={module.problems.length} status={status} />

      <span className="mt-3 text-xs font-semibold uppercase text-inherit opacity-55">
        {statusLabels[status]}
      </span>
    </motion.button>
  );
}
