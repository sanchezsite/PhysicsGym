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
  return (
    <aside className="w-80 shrink-0 p-4 text-white">
      <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/65">
          Physics Gym
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
          Journey Atlas
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-300/70">
          Navigate the physics landscape by section.
        </p>
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