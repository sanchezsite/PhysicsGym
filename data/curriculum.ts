import type { CurriculumSection } from "@/types";

export const learningPathSequences = {
  beginner: [1, 4, 3, 2],
  college: [3, 2, 4, 6],
  university: [3, 5, 2, 6],
  advanced: [5, 3, 2, 6],
  quantum: [6, 4, 2, 5],
} as const;

export const curriculumSections: CurriculumSection[] = [
  {
    id: "mechanics-1",
    title: "Mechanics I",
    description: "The foundation of motion, forces, work, and energy.",
    units: [
      {
        id: "units-and-vectors",
        title: "Units and Vectors",
        subtitle: "Dimensions, components, and physical meaning.",
        section: "Mechanics I",
        problemIds: [4, 1],
      },
      {
        id: "motion-1d",
        title: "Motion in 1D",
        subtitle: "Position, velocity, and acceleration along one line.",
        section: "Mechanics I",
        problemIds: [1, 4],
      },
      {
        id: "motion-2d-3d",
        title: "Motion in 2/3D",
        subtitle: "Components, vectors, and trajectories.",
        section: "Mechanics I",
        problemIds: [4, 2],
      },
      {
        id: "newtons-laws",
        title: "Newton’s Laws",
        subtitle: "Forces, acceleration, and system choice.",
        section: "Mechanics I",
        problemIds: [1, 3],
      },
      {
        id: "work-kinetic-energy",
        title: "Work and Kinetic Energy",
        subtitle: "Forces acting through distance.",
        section: "Mechanics I",
        problemIds: [2, 5],
      },
      {
        id: "potential-energy-conservation",
        title: "Potential Energy and Energy Conservation",
        subtitle: "Energy stored, transformed, and conserved.",
        section: "Mechanics I",
        problemIds: [2, 5],
      },
    ],
  },
  {
    id: "mechanics-2",
    title: "Mechanics II",
    description: "Momentum, rotation, gravitation, and deeper mechanics.",
    units: [],
  },
  {
    id: "waves-acoustics",
    title: "Waves / Acoustics",
    description: "Oscillations, waves, sound, and resonance.",
    units: [],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    description: "Heat, temperature, energy transfer, and entropy.",
    units: [],
  },
  {
    id: "electromagnetism",
    title: "Electromagnetism",
    description: "Electric fields, circuits, magnetism, and Maxwell’s ideas.",
    units: [],
  },
  {
    id: "optics",
    title: "Optics",
    description: "Light, lenses, interference, and imaging.",
    units: [],
  },
  {
    id: "modern-physics",
    title: "Modern Physics",
    description: "Relativity, quantum ideas, atoms, nuclei, and particles.",
    units: [],
  },
];

export const curriculumUnits = curriculumSections.flatMap((section) => section.units);