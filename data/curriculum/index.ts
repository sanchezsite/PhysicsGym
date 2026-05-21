import { mechanics1 } from "./mechanics1";
import type { LessonModule } from "@/types";
import type { CurriculumSection, ModuleStatus } from "./types";

const upcomingSections: CurriculumSection[] = [
  {
    id: "mechanics-2",
    title: "Mechanics II",
    worldName: "Momentum Highlands",
    description:
      "Extend mechanics into momentum, collisions, rotation, and gravitation.",
    theme: {
      accent: "emerald",
      glow: "green",
      atmosphere: "highlands",
    },
    modules: [],
  },
  {
    id: "waves-acoustics",
    title: "Waves / Acoustics",
    worldName: "Echo Pass",
    description:
      "Explore oscillations, wave behavior, sound, resonance, and interference.",
    theme: {
      accent: "cyan",
      glow: "sky",
      atmosphere: "echo",
    },
    modules: [],
  },
  {
    id: "thermodynamics",
    title: "Thermodynamics",
    worldName: "Thermal Basin",
    description:
      "Connect heat, temperature, energy transfer, entropy, and engines.",
    theme: {
      accent: "orange",
      glow: "amber",
      atmosphere: "basin",
    },
    modules: [],
  },
  {
    id: "electromagnetism-1",
    title: "Electromagnetism I",
    worldName: "Charged Expanse",
    description:
      "Build intuition for charge, electric fields, voltage, and circuits.",
    theme: {
      accent: "violet",
      glow: "purple",
      atmosphere: "charged",
    },
    modules: [],
  },
  {
    id: "electromagnetism-2",
    title: "Electromagnetism II",
    worldName: "Storm Range",
    description:
      "Climb into magnetism, induction, electromagnetic waves, and Maxwell's ideas.",
    theme: {
      accent: "blue",
      glow: "indigo",
      atmosphere: "storm",
    },
    modules: [],
  },
  {
    id: "optics",
    title: "Optics",
    worldName: "Crystal Heights",
    description:
      "See how light forms images, bends, interferes, and reveals structure.",
    theme: {
      accent: "rose",
      glow: "pink",
      atmosphere: "crystal",
    },
    modules: [],
  },
  {
    id: "modern-physics",
    title: "Modern Physics",
    worldName: "The Quantum Veil",
    description:
      "Enter relativity, quantum behavior, atoms, nuclei, and the modern picture.",
    theme: {
      accent: "fuchsia",
      glow: "violet",
      atmosphere: "veil",
    },
    modules: [],
  },
];

export const curriculum: CurriculumSection[] = [
  mechanics1,
  ...upcomingSections,
];

export const lessonModules = curriculum.flatMap((section) => section.modules);

export function getLessonModuleById(moduleId: string | null): LessonModule {
  return (
    lessonModules.find((module) => module.id === moduleId) ?? lessonModules[0]
  );
}

export function getNextLessonModule(
  completedModuleIds: string[]
): LessonModule {
  return (
    lessonModules.find((module) => !completedModuleIds.includes(module.id)) ??
    lessonModules[lessonModules.length - 1]
  );
}

export function getLessonModuleStatus(
  moduleId: string,
  completedModuleIds: string[]
): ModuleStatus {
  if (completedModuleIds.includes(moduleId)) return "completed";

  const nextModule = getNextLessonModule(completedModuleIds);
  if (moduleId === nextModule.id) return "current";

  const moduleIndex = lessonModules.findIndex((module) => module.id === moduleId);
  const nextModuleIndex = lessonModules.findIndex(
    (module) => module.id === nextModule.id
  );

  return moduleIndex < nextModuleIndex ? "available" : "locked";
}

export function getSectionStatus(
  section: CurriculumSection,
  completedModuleIds: string[]
): ModuleStatus {
  if (section.modules.length === 0) return "locked";
  if (section.modules.every((module) => completedModuleIds.includes(module.id))) {
    return "completed";
  }
  if (
    section.modules.some(
      (module) => getLessonModuleStatus(module.id, completedModuleIds) === "current"
    )
  ) {
    return "current";
  }
  if (
    section.modules.some(
      (module) =>
        getLessonModuleStatus(module.id, completedModuleIds) === "available"
    )
  ) {
    return "available";
  }

  return "locked";
}
