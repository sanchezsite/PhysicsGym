"use client";

export function ProblemDots({
  total,
  completed,
  locked,
}: {
  total: number;
  completed: number;
  locked?: boolean;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isComplete = index < completed;

        return (
          <div
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition ${
              locked
                ? "bg-yellow-100/10"
                : isComplete
                  ? "bg-yellow-300 shadow-md shadow-yellow-300/40"
                  : "bg-yellow-100/25"
            }`}
          />
        );
      })}
    </div>
  );
}