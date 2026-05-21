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
              ? "border-yellow-300 bg-yellow-400/10 text-yellow-100"
              : "border-yellow-300/20 bg-black/20 text-yellow-100/80 hover:border-yellow-300/50"
          }`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
}