"use client";

import { Button } from "@/components/Button";
import { Metric } from "@/components/Metric";
import {
  curriculum,
  getNextLessonModule,
  getSectionStatus,
  lessonModules,
} from "@/data/curriculum/index";
import { SectionColumn } from "./SectionColumn";

export function WorldMapScreen({
  completedProblemIds,
  completedLessonModuleIds,
  startLesson,
  openLessonModule,
  lastSavedAt,
}: {
  completedProblemIds: number[];
  completedLessonModuleIds: string[];
  startLesson: () => void;
  openLessonModule: (moduleId: string) => void;
  lastSavedAt: string | null;
}) {
  const nextModule = getNextLessonModule(completedLessonModuleIds);
  const completedModuleCount = lessonModules.filter((module) =>
    completedLessonModuleIds.includes(module.id)
  ).length;
  const nextModuleIndex = lessonModules.findIndex(
    (module) => module.id === nextModule.id
  );
  const currentSection =
    curriculum.find((section) =>
      section.modules.some((module) => module.id === nextModule.id)
    ) ?? curriculum[0];

  return (
    <div className="flex w-full flex-1 flex-col py-6">
      <div className="mx-auto mb-8 grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase text-yellow-300/70">
            World map
          </p>

          <h1 className="mt-4 max-w-3xl text-5xl font-black leading-none text-yellow-100 md:text-6xl">
            Cross the physics landscape one idea at a time.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-yellow-100/70">
            Lessons unlock from left to right. Completed modules stay bright so
            you can replay them whenever the intuition needs another rep.
          </p>

          {lastSavedAt ? (
            <p className="mt-3 text-sm text-yellow-100/45">
              Last saved: {new Date(lastSavedAt).toLocaleString()}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button onClick={startLesson} className="h-14 px-7">
            {completedModuleCount > 0
              ? `Continue to Module ${nextModuleIndex + 1} ->`
              : "Start recommended path ->"}
          </Button>
        </div>
      </div>

      <div className="relative -mx-6 flex-1 overflow-hidden border-y border-yellow-100/10 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.12),transparent_26%),radial-gradient(circle_at_72%_18%,rgba(56,189,248,0.11),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))] px-6 py-8">
        <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(254,240,138,0.55)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-yellow-100/25 to-transparent" />

        <div className="relative overflow-x-auto pb-5">
          <div className="flex min-w-max gap-6">
            {curriculum.map((section) => (
              <SectionColumn
                key={section.id}
                section={section}
                status={getSectionStatus(section, completedLessonModuleIds)}
                completedModuleIds={completedLessonModuleIds}
                onOpenModule={openLessonModule}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 grid w-full max-w-6xl gap-4 md:grid-cols-3">
        <Metric
          title="Modules"
          value={`${completedModuleCount}/${lessonModules.length}`}
          caption="lesson modules completed"
        />

        <Metric
          title="Problems"
          value={String(completedProblemIds.length)}
          caption="practice completions saved"
        />

        <Metric
          title="Current world"
          value={currentSection.worldName}
          caption={nextModule.title}
        />
      </div>
    </div>
  );
}
