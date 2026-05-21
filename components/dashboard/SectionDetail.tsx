"use client";

import type { CurriculumSection } from "@/data/curriculum/types";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";

export function SectionDetail({
  section,
  completedModuleIds,
  completedProblemIds,
  completedLessonProblemIds,
  currentModuleId,
  startLesson,
  onOpenModule,
}: {
  section: CurriculumSection;
  completedModuleIds: string[];
  completedProblemIds: number[];
  currentModuleId: string;
  startLesson: () => void;
  onOpenModule: (moduleId: string) => void;
}) {
  const completedCount = section.modules.filter((module) =>
    completedModuleIds.includes(module.id)
  ).length;

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/70">
              {section.title}
            </p>

            <h2 className="mt-3 text-5xl font-black text-yellow-100">
              {section.worldName}
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-yellow-100/65">
              {section.description}
            </p>
          </div>

          <button
            onClick={startLesson}
            className="rounded-2xl bg-yellow-400 px-6 py-4 font-black text-red-950 shadow-xl shadow-yellow-950/25 transition hover:scale-[1.02]"
          >
            Continue →
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-yellow-300/20 bg-black/25 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300/60">
              Modules
            </p>
            <p className="mt-3 text-3xl font-black text-yellow-100">
              {completedCount}/{section.modules.length}
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-300/20 bg-black/25 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300/60">
              Problems
            </p>
            <p className="mt-3 text-3xl font-black text-yellow-100">
              {completedProblemIds.length}
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-300/20 bg-black/25 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300/60">
              Rank
            </p>
            <p className="mt-3 text-3xl font-black text-yellow-100">
              Initiate
            </p>
          </div>
        </div>

        <ModuleGrid
          section={section}
          completedModuleIds={completedModuleIds}
          completedLessonProblemIds={completedLessonProblemIds}
          currentModuleId={currentModuleId}
          onOpenModule={onOpenModule}
        />
      </div>
    </main>
  );
}