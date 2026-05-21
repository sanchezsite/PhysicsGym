"use client";

import type { CurriculumSection } from "@/data/curriculum/types";
import { curriculum } from "@/data/curriculum/index";
import { ModuleCard } from "@/components/dashboard/ModuleCard";

function getSectionIndex(sectionId: string) {
  return curriculum.findIndex((section) => section.id === sectionId);
}

function isSectionUnlocked(
  section: CurriculumSection,
  completedModuleIds: string[]
) {
  const sectionIndex = getSectionIndex(section.id);

  if (sectionIndex <= 0) return true;

  const previousSection = curriculum[sectionIndex - 1];

  if (!previousSection) return false;

  if (previousSection.modules.length === 0) return false;

  return previousSection.modules.every((module) =>
    completedModuleIds.includes(module.id)
  );
}

function isModuleUnlocked({
  section,
  moduleIndex,
  completedModuleIds,
}: {
  section: CurriculumSection;
  moduleIndex: number;
  completedModuleIds: string[];
}) {
  const sectionUnlocked = isSectionUnlocked(section, completedModuleIds);

  if (!sectionUnlocked) return false;

  if (moduleIndex === 0) return true;

  const previousModule = section.modules[moduleIndex - 1];

  return completedModuleIds.includes(previousModule?.id ?? "");
}

export function ModuleGrid({
  section,
  completedModuleIds,
  completedLessonProblemIds,
  currentModuleId,
  onOpenModule,
}: {
  section: CurriculumSection;
  completedModuleIds: string[];
  currentModuleId: string;
  onOpenModule: (moduleId: string) => void;
}) {
  if (section.modules.length === 0) {
    return (
      <div className="rounded-[2rem] border border-yellow-100/10 bg-black/20 p-8 text-yellow-100/45">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/50">
          Future territory
        </p>
        <p className="mt-3 text-lg">
          Modules for this section have not been built yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {section.modules.map((module, index) => {
        const complete = completedModuleIds.includes(module.id);
        const unlocked = isModuleUnlocked({
          section,
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