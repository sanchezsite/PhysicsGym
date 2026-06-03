import type { LessonModule } from "@/types";

export type CurriculumUnit = {
  id: string;
  title: string;
  description: string;
  modules: LessonModule[];
};

export type CurriculumSection = {
  id: string;
  title: string;
  worldName: string;
  description: string;
  theme: {
    accent: string;
    glow: string;
    atmosphere: string;
  };
  units: CurriculumUnit[];
};