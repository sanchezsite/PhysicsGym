import type { LessonModule } from "@/types";
import { curriculum } from "./index";

export function getAllModules(): LessonModule[] {
  return curriculum.flatMap((section) => section.modules);
}

export function getModuleById(moduleId: string | null): LessonModule {
  const modules = getAllModules();

  if (!moduleId) return modules[0];

  return modules.find((module) => module.id === moduleId) ?? modules[0];
}

export function getNextIncompleteModule(
  completedModuleIds: string[]
): LessonModule {
  const modules = getAllModules();

  return (
    modules.find((module) => !completedModuleIds.includes(module.id)) ??
    modules[modules.length - 1]
  );
}