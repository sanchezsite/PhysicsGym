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
    <div className="flex h-full w-full overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.12),transparent_28%),linear-gradient(180deg,#450a0a,#020617)]">
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
  );
}