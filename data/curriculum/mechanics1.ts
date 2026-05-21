import type { CurriculumSection } from "./types";
import { vectorModule1 } from "@/data/vectorModule1";
import { vectorModule2 } from "@/data/vectorModule2";
import { vectorModule3 } from "@/data/vectorModule3";
import { vectorModule4 } from "@/data/vectorModule4";

export const mechanics1: CurriculumSection = {
  id: "mechanics-1",
  title: "Mechanics I",
  worldName: "The First Ridge",
  description:
    "Build the geometric intuition behind motion, vectors, and force.",
  theme: {
    accent: "yellow",
    glow: "amber",
    atmosphere: "ridge",
  },
  modules: [
    vectorModule1,
    vectorModule2,
    vectorModule3,
    vectorModule4,
  ],
};