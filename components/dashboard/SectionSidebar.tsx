"use client";

import type { CurriculumSection } from "@/data/curriculum/types";

function getSectionVisual(sectionId: string) {
  const visuals: Record<string, { icon: string; glow: string }> = {
    "mechanics-1": { icon: "⛰️", glow: "shadow-yellow-400/15" },
    "mechanics-2": { icon: "🧭", glow: "shadow-orange-400/15" },
    "waves-acoustics": { icon: "〰️", glow: "shadow-cyan-400/15" },
    thermodynamics: { icon: "🔥", glow: "shadow-red-400/15" },
    "electromagnetism-1": { icon: "⚡", glow: "shadow-blue-400/15" },
    "electromagnetism-2": { icon: "🌩️", glow: "shadow-violet-400/15" },
    optics: { icon: "💎", glow: "shadow-fuchsia-400/15" },
    "modern-physics": { icon: "✦", glow: "shadow-indigo-400/15" },
  };

  return visuals[sectionId] ?? { icon: "✦", glow: "shadow-cyan-400/15" };
}

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
  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? sections[0];

  const selectedSectionModules =
    selectedSection?.units.flatMap((unit) => unit.modules) ?? [];

  const selectedCompletedCount = selectedSectionModules.filter((module) =>
    completedModuleIds.includes(module.id)
  ).length;

  const selectedTotalCount = selectedSectionModules.length;

  const selectedProgress =
    selectedTotalCount > 0
      ? Math.round((selectedCompletedCount / selectedTotalCount) * 100)
      : 0;

  const selectedVisual = getSectionVisual(selectedSection?.id ?? "");

  return (
    <aside className="w-80 shrink-0 p-4 text-white">
      <div
        className={`mb-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur-md ${selectedVisual.glow}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/35 bg-cyan-300/15 text-xl">
            {selectedVisual.icon}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/65">
              {selectedSection?.title ?? "Physics Gym"}
            </p>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-white">
              {selectedSection?.worldName ?? "Journey Atlas"}
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-300/70">
              {selectedSection?.description ?? "Navigate the physics landscape."}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/45">
            <span>Progress</span>
            <span>{selectedProgress}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/20 transition-all"
              style={{ width: `${selectedProgress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-cyan-100/45">
            {selectedCompletedCount}/{selectedTotalCount} modules complete
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {sections.map((section) => {
          const active = selectedSectionId === section.id;
          const sectionModules = section.units.flatMap((unit) => unit.modules);

          const completedCount = sectionModules.filter((module) =>
            completedModuleIds.includes(module.id)
          ).length;

          const totalCount = sectionModules.length;
          const progress =
            totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const visual = getSectionVisual(section.id);

          return (
            <button
              key={section.id}
              onClick={() => setSelectedSectionId(section.id)}
              className={`group w-full rounded-2xl border p-3 text-left transition ${
                active
                  ? `border-cyan-300/50 bg-cyan-300/10 text-cyan-50 shadow-xl ${visual.glow}`
                  : "border-white/10 bg-white/[0.04] text-slate-300/75 hover:border-cyan-200/25 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg ${
                    active
                      ? "border-cyan-200/50 bg-cyan-300 text-slate-950"
                      : "border-white/10 bg-white/[0.05]"
                  }`}
                >
                  {visual.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">
                    {section.worldName}
                  </p>

                  <p className="mt-0.5 truncate text-xs opacity-55">
                    {section.title}
                  </p>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-cyan-300 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="mt-1.5 text-xs text-cyan-100/45">
                    {completedCount}/{totalCount} modules
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}