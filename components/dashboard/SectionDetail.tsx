"use client";

import type { CurriculumSection } from "@/data/curriculum/types";
import { ModuleGrid } from "@/components/dashboard/ModuleGrid";
import { calculateXp, getRankProgress } from "@/lib/progression";

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
  completedLessonProblemIds: string[];
  currentModuleId: string;
  startLesson: () => void;
  onOpenModule: (moduleId: string) => void;
}) {
  const completedCount = section.modules.filter((module) =>
    completedModuleIds.includes(module.id)
  ).length;

  const totalModules = section.modules.length;
  const sectionProgress =
    totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  const xp = calculateXp({
    completedLessonProblemCount: completedLessonProblemIds.length,
    completedModuleCount: completedModuleIds.length,
  });

const rankProgress = getRankProgress(xp);
  return (
    <main className="flex-1 overflow-y-auto p-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/25 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200/65">
                {section.title}
              </p>

              <h2 className="mt-3 text-5xl font-black tracking-tight text-white md:text-6xl">
                {section.worldName}
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300/75">
                {section.description}
              </p>

              <div className="mt-6 max-w-xl">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/50">
                  <span>Section progress</span>
                  <span>{sectionProgress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/20 transition-all"
                    style={{ width: `${sectionProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full rounded-3xl border border-cyan-200/15 bg-slate-950/35 p-5 shadow-xl shadow-black/20 lg:w-80">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">
                Next lesson
              </p>

              <p className="mt-3 text-2xl font-black text-white">
                Continue your route
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300/65">
                Jump into the next unlocked lesson and keep building momentum.
              </p>

              <button
                onClick={startLesson}
                className="mt-5 w-full rounded-2xl bg-yellow-300 px-6 py-4 font-black text-slate-950 shadow-xl shadow-yellow-950/25 transition hover:scale-[1.02]"
              >
                Continue →
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">
              Modules
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {completedCount}/{totalModules}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">
              Lesson problems
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {completedLessonProblemIds.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">
              Rank
            </p>

            <p className="mt-3 text-3xl font-black text-white">
              {rankProgress.currentRank.name}
            </p>

            <p className="mt-2 text-sm text-slate-300/60">
              {xp} XP
            </p>

            {rankProgress.nextRank ? (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-cyan-100/45">
                  <span>Next: {rankProgress.nextRank.name}</span>
                  <span>{rankProgress.progressPercent}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-300"
                    style={{ width: `${rankProgress.progressPercent}%` }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </section>

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