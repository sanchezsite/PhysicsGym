"use client";

import { useState } from "react";
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
  const [selectedUnitId, setSelectedUnitId] = useState(
    section.units[0]?.id ?? ""
  );

  const selectedUnit =
    section.units.find((unit) => unit.id === selectedUnitId) ??
    section.units[0];

  const selectedUnitIndex = section.units.findIndex(
    (unit) => unit.id === selectedUnit?.id
  );

  const selectedUnitUnlocked =
    selectedUnitIndex <= 0 ||
    section.units[selectedUnitIndex - 1]?.modules.every((module) =>
      completedModuleIds.includes(module.id)
    );
  const xp = calculateXp({
    completedLessonProblemCount: completedLessonProblemIds.length,
    completedModuleCount: completedModuleIds.length,
  });

  const rankProgress = getRankProgress(xp);

  const sectionModules = section.units.flatMap((unit) => unit.modules);

  const completedCount = sectionModules.filter((module) =>
    completedModuleIds.includes(module.id)
  ).length;

  const totalModules = sectionModules.length;

  const sectionProgress =
    totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col gap-6">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/25 backdrop-blur-md">
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
                    className="h-full rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/20"
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
                className="mt-5 w-full rounded-2xl bg-yellow-300 px-6 py-4 font-black text-slate-950 shadow-xl shadow-yellow-950/25"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
          <div className="mb-3 flex items-center justify-between px-1">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">
              Units
            </p>

            <div className="text-xs text-slate-300/50">
              {rankProgress.currentRank.name} · {xp} XP
            </div>
          </div>

          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-max gap-3 pr-4">
              {section.units.map((unit, index) => {
                const unitModules = unit.modules;
                const unitCompleted = unitModules.filter((module) =>
                  completedModuleIds.includes(module.id)
                ).length;

                const unitProgress =
                  unitModules.length > 0
                    ? Math.round((unitCompleted / unitModules.length) * 100)
                    : 0;

                const locked = false;

                return (
                  <button
                    key={unit.id}
                    onClick={() => !locked && setSelectedUnitId(unit.id)}
                    className={`min-w-[210px] rounded-2xl border p-4 text-left transition ${
                      selectedUnit?.id === unit.id
                        ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/20"
                        : locked
                          ? "border-white/10 bg-white/[0.025] text-slate-500"
                          : "border-white/10 bg-white/[0.04] text-slate-100 hover:border-cyan-200/30 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl font-black ${
                          selectedUnit?.id === unit.id
                            ? "bg-cyan-300 text-slate-950"
                            : "bg-white/10"
                        }`}
                      >
                        {index + 1}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black">
                          {unit.title}
                        </p>

                        <p className="mt-0.5 truncate text-xs opacity-55">
                          {unit.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-cyan-300"
                        style={{ width: `${unitProgress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {selectedUnit ? (
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/50">
                Selected Unit
              </p>

              <h3 className="mt-2 text-4xl font-black text-white">
                {selectedUnit.title}
              </h3>

              <p className="mt-2 text-slate-300/70">
                {selectedUnit.description}
              </p>
            </div>

            <ModuleGrid
              modules={selectedUnit.modules}
              completedModuleIds={completedModuleIds}
              completedLessonProblemIds={completedLessonProblemIds}
              currentModuleId={currentModuleId}
              unitUnlocked={selectedUnitUnlocked}
              onOpenModule={onOpenModule}
            />
          </section>
        ) : null}
      </div>
    </main>
  );
}