"use client";

import type { CurriculumSection, ModuleStatus } from "@/data/curriculum/types";
import { getLessonModuleStatus } from "@/data/curriculum/index";
import { ModuleNode } from "./ModuleNode";

const sectionStyles: Record<ModuleStatus, string> = {
  completed: "border-yellow-200/50 bg-yellow-300/10",
  current: "border-yellow-300/60 bg-yellow-300/10 shadow-[0_0_44px_rgba(250,204,21,0.16)]",
  available: "border-yellow-100/30 bg-slate-950/45",
  locked: "border-white/10 bg-slate-950/35 opacity-60",
};

export function SectionColumn({
  section,
  status,
  completedModuleIds,
  onOpenModule,
}: {
  section: CurriculumSection;
  status: ModuleStatus;
  completedModuleIds: string[];
  onOpenModule: (moduleId: string) => void;
}) {
  return (
    <section
      className={`flex min-h-[590px] w-[320px] shrink-0 flex-col rounded-[1.75rem] border p-5 backdrop-blur-md transition ${sectionStyles[status]}`}
    >
      <div className="min-h-44">
        <p className="text-xs font-bold uppercase text-yellow-200/60">
          {section.title}
        </p>

        <h2 className="mt-3 text-3xl font-black leading-none text-yellow-50">
          {section.worldName}
        </h2>

        <p className="mt-4 text-sm leading-6 text-yellow-50/60">
          {section.description}
        </p>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col items-center gap-7">
        <span className="absolute bottom-14 top-14 w-px bg-gradient-to-b from-transparent via-yellow-100/20 to-transparent" />

        {section.modules.length > 0 ? (
          section.modules.map((module, index) => (
            <ModuleNode
              key={module.id}
              module={module}
              index={index}
              status={getLessonModuleStatus(module.id, completedModuleIds)}
              onOpen={onOpenModule}
            />
          ))
        ) : (
          <div className="relative z-10 mt-16 flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-black/35 p-5 text-center text-sm font-bold uppercase text-white/30">
            Locked Region
          </div>
        )}
      </div>
    </section>
  );
}
