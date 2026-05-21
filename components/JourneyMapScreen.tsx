"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { curriculum } from "@/data/curriculum/index";
import { Metric } from "@/components/Metric";
import {
  curriculumSections,
  curriculumUnits,
} from "@/data/curriculum";
import type {
  CurriculumUnit,
  LearningPath,
  Problem,
} from "@/types";

export function JourneyMapScreen({
  activeUnitId,
  completedProblemIds,
  completedLessonModuleIds,
  startUnit,
  startRecommendedProblem,
  startLesson,
  openLessonModule,
  recommendedPath,
  firstRecommendedProblem,
  lastSavedAt,
}: {
  activeUnitId: string;
  completedProblemIds: number[];
  completedLessonModuleIds: string[];
  startUnit: (unit: CurriculumUnit) => void;
  startRecommendedProblem: () => void;
  startLesson: () => void;
  openLessonModule: (moduleId: string) => void;
  recommendedPath: LearningPath;
  firstRecommendedProblem: Problem;
  lastSavedAt: string | null;
}) {
  const currentUnitIndex = Math.max(
    0,
    curriculumUnits.findIndex((unit) => unit.id === activeUnitId)
  );

  const mechanicsSection = curriculum[0];

  const sectionModules = mechanicsSection.modules.map((module, index) => ({
    number: index + 1,
    title: module.title,
    id: module.id,
    complete: completedLessonModuleIds.includes(module.id),
    unlocked:
      index === 0 ||
      completedLessonModuleIds.includes(
        mechanicsSection.modules[index - 1]?.id
      ),
  }));

  const statusOf = (index: number, unit: CurriculumUnit) => {
    if (unit.problemIds.every((id) => completedProblemIds.includes(id))) {
      return "completed";
    }

    if (index === currentUnitIndex) return "current";
    if (index < currentUnitIndex) return "available";

    if (index === currentUnitIndex + 1 && completedProblemIds.length > 0) {
      return "available";
    }

    return "locked";
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center py-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-300/70">
            Learning journey
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-yellow-100 md:text-6xl">
            Move left to right through physics.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-yellow-100/70">
            Each node is a unit. Complete problems to unlock the next stretch of
            the map.
          </p>

          {lastSavedAt ? (
            <p className="mt-3 text-sm text-yellow-100/45">
              Last saved: {new Date(lastSavedAt).toLocaleString()}
            </p>
          ) : null}
        </div>

        <Card className="rounded-[2rem] border-yellow-300/45 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/70">
            Vector unit
          </p>

          <h2 className="mt-3 text-2xl font-black text-yellow-100">
            Vectors: The Language of Physics
          </h2>

          <p className="mt-3 leading-7 text-yellow-100/65">
            Build the geometric instincts behind motion, force, and direction.
          </p>

          <div className="mt-5 space-y-3">
            {sectionModules.map((module) => (
              <button
                key={module.id}
                disabled={!module.unlocked}
                onClick={() => {
                  if (module.unlocked) openLessonModule(module.id);
                }}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  module.complete
                    ? "border-yellow-300/50 bg-yellow-400/10 text-yellow-100"
                    : module.unlocked
                      ? "border-yellow-300/35 bg-black/20 text-yellow-100 hover:border-yellow-300/60"
                      : "border-yellow-100/15 bg-black/10 text-yellow-100/35"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300/60">
                      Module {module.number}
                    </p>

                    <p className="mt-1 font-bold">{module.title}</p>
                  </div>

                  <span className="text-xl">
                    {module.complete ? "✓" : module.unlocked ? "▶" : "🔒"}
                  </span>
                </div>
              </button>
            ))}

            <Button onClick={startLesson} className="w-full">
              Continue learning →
            </Button>
          </div>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-[2rem] border border-yellow-300/35 bg-black/20 p-6 shadow-2xl shadow-black/30">
        <div className="flex min-w-[1100px] items-start gap-10 pb-3">
          {curriculumSections.map((section) => (
            <div key={section.id} className="min-w-[330px]">
              <div className="mb-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300/70">
                  Section
                </p>

                <h2 className="mt-2 text-3xl font-black text-yellow-100">
                  {section.title}
                </h2>

                <p className="mt-2 leading-7 text-yellow-100/60">
                  {section.description}
                </p>
              </div>

              <div className="flex items-center gap-5">
                {section.units.map((unit) => {
                  const index = curriculumUnits.findIndex(
                    (item) => item.id === unit.id
                  );

                  const status = statusOf(index, unit);
                  const locked = status === "locked";

                  return (
                    <div key={unit.id}>
                      <motion.button
                        whileHover={
                          locked ? undefined : { y: -8, scale: 1.04 }
                        }
                        whileTap={locked ? undefined : { scale: 0.98 }}
                        onClick={() => {
                          if (!locked) startUnit(unit);
                        }}
                        className={`flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 p-4 text-center transition ${
                          status === "completed"
                            ? "border-yellow-300 bg-yellow-400 text-red-950"
                            : status === "current"
                              ? "border-yellow-300 bg-yellow-400/20 text-yellow-100"
                              : locked
                                ? "cursor-not-allowed border-yellow-100/15 bg-black/25 text-yellow-100/30"
                                : "border-yellow-300/45 bg-red-950/60 text-yellow-100 hover:border-yellow-300 hover:bg-yellow-400/10"
                        }`}
                      >
                        <span className="text-2xl font-black">
                          {status === "completed" ? "✓" : locked ? "🔒" : index + 1}
                        </span>

                        <span className="mt-2 text-sm font-black leading-tight">
                          {unit.title}
                        </span>
                      </motion.button>

                      <div className="mt-4 w-40">
                        <p
                          className={`text-sm font-bold ${
                            locked ? "text-yellow-100/30" : "text-yellow-100"
                          }`}
                        >
                          {unit.title}
                        </p>

                        <p
                          className={`mt-1 text-xs leading-5 ${
                            locked ? "text-yellow-100/25" : "text-yellow-100/55"
                          }`}
                        >
                          {unit.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Metric
          title="Completed"
          value={String(completedProblemIds.length)}
          caption="problem completions saved"
        />

        <Metric
          title="Current unit"
          value={curriculumUnits[currentUnitIndex]?.title ?? "Vectors"}
          caption="your next training node"
        />

        <Metric
          title="Map status"
          value="V1"
          caption="hardcoded curriculum prototype"
        />
      </div>
    </div>
  );
}