"use client";

import { useState } from "react";
import { curriculum } from "@/data/curriculum/index";
import { getNextIncompleteModule } from "@/data/curriculum/helpers";
import { SectionSidebar } from "@/components/dashboard/SectionSidebar";
import { SectionDetail } from "@/components/dashboard/SectionDetail";

export function WorldMapScreen({
  completedProblemIds,
  completedLessonModuleIds,
  completedLessonProblemIds,
  startLesson,
  openLessonModule,
}: {
  completedProblemIds: number[];
  completedLessonModuleIds: string[];
  completedLessonProblemIds: string[];
  startLesson: () => void;
  openLessonModule: (moduleId: string) => void;
}) {
  const nextModule = getNextIncompleteModule(completedLessonModuleIds);

  const [selectedSectionId, setSelectedSectionId] = useState(
    curriculum[0]?.id ?? ""
  );

  const selectedSection =
    curriculum.find((section) => section.id === selectedSectionId) ??
    curriculum[0];

  return (
  <div className="relative flex min-h-screen w-full overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_14%,rgba(56,189,248,0.22),transparent_26%),radial-gradient(circle_at_22%_8%,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(180deg,#1e3a8a,#0f172a_58%,#020617)]" />

    <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(254,240,138,0.55)_1px,transparent_1px)] [background-size:42px_42px]" />

    <div className="relative z-10 flex min-h-screen w-full">
      <SectionSidebar
        sections={curriculum}
        selectedSectionId={selectedSectionId}
        setSelectedSectionId={setSelectedSectionId}
        completedModuleIds={completedLessonModuleIds}
      />

      <SectionDetail
        section={selectedSection}
        completedModuleIds={completedLessonModuleIds}
        completedProblemIds={completedProblemIds}
        completedLessonProblemIds={completedLessonProblemIds}
        currentModuleId={nextModule.id}
        startLesson={startLesson}
        onOpenModule={openLessonModule}
      />
    </div>
  </div>
);
}