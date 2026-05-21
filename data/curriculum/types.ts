import type { LessonModule } from "@/types";

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
  modules: LessonModule[];
};

export type UserProgress = {
  completedModuleIds: string[];
  completedProblemIds: number[];
  xp: number;
  rank: number;
  streak: number;
};