"use client";

import type { CurriculumSection } from "@/data/curriculum/types";
import { ModuleNode } from "@/components/world-map/ModuleNode";

export function SectionColumn({
  section,
  sectionNumber,
  completedModuleIds,
  currentModuleId,
  onOpenModule,
}: {
  section: CurriculumSection;
  sectionNumber: number;
  completedModuleIds: string[];
  currentModuleId: string;
  onOpenModule: (moduleId: string) => void;
}) {
  const sectionHasModules = section.modules.length > 0;

  return (
    <section
      className={`min-w-[360px] rounded-[2rem] border p-6 transition ${
        sectionHasModules
          ? "border-yellow-300/35 bg-red-950/45 shadow-2xl shadow-black/25"
          : "border-yellow-100/10 bg-black/20 opacity-45"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300/55">
        Section {sectionNumber}
      </p>

      <h2 className="mt-3 text-3xl font-black text-yellow-100">
        {section.worldName}
      </h2>

      <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-yellow-100/45">
        {section.title}
      </p>

      <p className="mt-4 min-h-20 text-sm leading-6 text-yellow-100/60">
        {section.description}
      </p>

      <div className="mt-6 space-y-4">
        {sectionHasModules ? (
          section.modules.map((module, index) => {
            const previousModule = section.modules[index - 1];
            const complete = completedModuleIds.includes(module.id);
            const unlocked =
              index === 0 ||
              completedModuleIds.includes(previousModule?.id ?? "");
            const current = module.id === currentModuleId;

            return (
              <ModuleNode
                key={module.id}
                module={module}
                number={index + 1}
                complete={complete}
                unlocked={unlocked}
                current={current}
                onOpen={() => {
                  if (unlocked) onOpenModule(module.id);
                }}
              />
            );
          })
        ) : (
          <div className="rounded-3xl border border-yellow-100/10 bg-black/25 p-5 text-yellow-100/40">
            Future territory
          </div>
        )}
      </div>
    </section>
  );
}