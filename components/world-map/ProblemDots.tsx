import type { ModuleStatus } from "@/data/curriculum/types";

const dotStyles: Record<ModuleStatus, string> = {
  completed: "bg-yellow-200 shadow-[0_0_12px_rgba(254,240,138,0.75)]",
  current: "bg-yellow-300 shadow-[0_0_14px_rgba(250,204,21,0.8)]",
  available: "bg-yellow-100/55",
  locked: "bg-white/10",
};

export function ProblemDots({
  count,
  status,
}: {
  count: number;
  status: ModuleStatus;
}) {
  if (count === 0) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`}
        />
      ))}
    </div>
  );
}
