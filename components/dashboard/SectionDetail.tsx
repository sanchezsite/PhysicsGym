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


  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden p-6">
       <div className="flex min-h-0 flex-1 flex-col gap-5">
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
         <section className="min-h-0 flex-1 overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
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