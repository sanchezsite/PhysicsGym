"use client";

export function MultipleChoice({
  choices,
  selected,
  setSelected,
}: {
  choices: string[];
  selected: string | null;
  setSelected: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => setSelected(choice)}
          className={`w-full rounded-2xl border p-4 text-left transition ${
            selected === choice
              ? "border-cyan-300/70 bg-cyan-300/10 text-cyan-50 shadow-lg shadow-cyan-950/20"
              : "border-white/10 bg-white/[0.04] text-slate-200/80 hover:border-cyan-200/30 hover:bg-white/[0.08] hover:text-white"
          }`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}