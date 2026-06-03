import type { CurriculumSection } from "./types";
import { vectorModule1 } from "@/data/vectorModule1";
import { vectorModule2 } from "@/data/vectorModule2";
import { vectorModule3 } from "@/data/vectorModule3";
import { vectorModule4 } from "@/data/vectorModule4";
import { vectorModule5 } from "@/data/vectorModule5";
import { vectorModule6 } from "../vectorModule6";
import { vectorModule7 } from "@/data/vectorModule7";
import { vectorModule8 } from "@/data/vectorModule8";

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
  units: [
    {
      id: "mechanics-1-vectors",
      title: "Vectors",
      description: "Learn the geometry of physical quantities.",
      modules: [
        vectorModule1,
        vectorModule2,
        vectorModule3,
        vectorModule4,
        vectorModule5,
        vectorModule6,
        vectorModule7,
        vectorModule8,
      ],
    },
    {
      id: "mechanics-1-motion-1d",
      title: "Motion in 1D",
      description: "Position, velocity, acceleration, and motion graphs.",
      modules: [],
    },
    {
      id: "mechanics-1-motion-2d-3d",
      title: "Motion in 2D & 3D",
      description: "Projectiles, relative motion, and curved paths.",
      modules: [],
    },
    {
      id: "mechanics-1-newtons-laws",
      title: "Newton’s Laws",
      description: "Forces, free-body diagrams, and system reasoning.",
      modules: [],
    },
    {
      id: "mechanics-1-work-energy",
      title: "Work and Kinetic Energy",
      description: "Energy transfer, work, and speed changes.",
      modules: [],
    },
    {
      id: "mechanics-1-potential-energy",
      title: "Potential Energy and Conservation",
      description: "Stored energy, conservative forces, and energy conservation.",
      modules: [],
    },
  ],
};