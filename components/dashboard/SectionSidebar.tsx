"use client";

import type { CurriculumSection } from "@/data/curriculum/types";

export function SectionSidebar({
  sections,
  selectedSectionId,
  setSelectedSectionId,
  completedModuleIds,
}: {
  sections: CurriculumSection[];
  selectedSectionId: string;
  setSelectedSectionId: (sectionId: string) => void;
  completedModuleIds: string[];
}) {
  return (
    <aside className="w-80 shrink-0 border-r border-yellow-100/10 bg-black/35 p-4 backdrop-blur-md">
      <div className="mb-5 rounded-3xl border border-yellow-300/25 bg-red-950/50 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-yellow-300/70">
          Physics Gym
        </p>
        <h1 className="mt-2 text-2xl font-black text-yellow-100">
          Journey Atlas
        </h1>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const active = selectedSectionId === section.id;
          const completedCount = section.modules.filter((module) =>
            completedModuleIds.includes(module.id)
          ).length;

          return (
            <button
              key={section.id}
              onClick={() => setSelectedSectionId(section.id)}
              className={`w-full rounded-2xl border p-3 text-left transition ${
                active
                  ? "border-yellow-300 bg-yellow-400/10"
                  : "border-yellow-100/10 bg-black/20 opacity-60 hover:opacity-100"
              }`}
            >
              <p className="text-sm font-black text-yellow-100">
                {section.worldName}
              </p>

              <p className="mt-1 text-xs text-yellow-100/45">
                {section.title}
              </p>

              <p className="mt-2 text-xs text-yellow-300/50">
                {completedCount}/{section.modules.length} modules
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}