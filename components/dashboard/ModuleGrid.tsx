"use client";

import type { LessonModule } from "@/types";
import { ModuleCard } from "@/components/dashboard/ModuleCard";

function isModuleUnlocked({
  modules,
  moduleIndex,
  completedModuleIds,
}: {
  modules: LessonModule[];
  moduleIndex: number;
  completedModuleIds: string[];
}) {
  if (moduleIndex === 0) return true;

  const previousModule = modules[moduleIndex - 1];

  return completedModuleIds.includes(previousModule?.id ?? "");
}

export function ModuleGrid({
  modules,
  completedModuleIds,
  completedLessonProblemIds,
  currentModuleId,
  onOpenModule,
  unitUnlocked,
}: {
  modules: LessonModule[];
  completedModuleIds: string[];
  completedLessonProblemIds: string[];
  currentModuleId: string;
  onOpenModule: (moduleId: string) => void;
  unitUnlocked: boolean;
}) {
  if (modules.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-slate-400">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/40">
          Future territory
        </p>

        <p className="mt-3 text-lg">
          Modules for this unit have not been built yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module, index) => {
        const complete = completedModuleIds.includes(module.id);
        const unlocked =
          unitUnlocked &&
          isModuleUnlocked({
            modules,
            moduleIndex: index,
            completedModuleIds,
          });
        const current = module.id === currentModuleId;

        const completedProblemCount = module.problems.filter((problem) =>
          completedLessonProblemIds.includes(problem.id)
        ).length;

        return (
          <ModuleCard
            key={module.id}
            module={module}
            number={index + 1}
            complete={complete}
            unlocked={unlocked}
            current={current}
            completedProblemCount={completedProblemCount}
            onOpen={() => {
              if (unlocked) onOpenModule(module.id);
            }}
          />
        );
      })}
    </div>
  );
}