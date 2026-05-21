"use client";

export function PairInput({
  labels,
  placeholders,
  pairAnswers,
  setPairAnswers,
}: {
  labels: [string, string];
  placeholders: [string, string];
  pairAnswers: string[];
  setPairAnswers: (value: string[]) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-yellow-300/70">
          {labels[0]}
        </label>

        <input
          value={pairAnswers[0] ?? ""}
          onChange={(event) =>
            setPairAnswers([event.target.value, pairAnswers[1] ?? ""])
          }
          placeholder={placeholders[0]}
          className="w-full rounded-2xl border border-yellow-300/25 bg-black/25 px-4 py-3 text-yellow-100 outline-none transition placeholder:text-yellow-100/30 focus:border-yellow-300"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-yellow-300/70">
          {labels[1]}
        </label>

        <input
          value={pairAnswers[1] ?? ""}
          onChange={(event) =>
            setPairAnswers([pairAnswers[0] ?? "", event.target.value])
          }
          placeholder={placeholders[1]}
          className="w-full rounded-2xl border border-yellow-300/25 bg-black/25 px-4 py-3 text-yellow-100 outline-none transition placeholder:text-yellow-100/30 focus:border-yellow-300"
        />
      </div>
    </div>
  );
}