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
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-cyan-100/55">
          {labels[0]}
        </label>

        <input
          value={pairAnswers[0] ?? ""}
          onChange={(event) =>
            setPairAnswers([event.target.value, pairAnswers[1] ?? ""])
          }
          placeholder={placeholders[0]}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-400/45 focus:border-cyan-300/60 focus:bg-white/[0.07]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-cyan-100/55">
          {labels[1]}
        </label>

        <input
          value={pairAnswers[1] ?? ""}
          onChange={(event) =>
            setPairAnswers([pairAnswers[0] ?? "", event.target.value])
          }
          placeholder={placeholders[1]}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-400/45 focus:border-cyan-300/60 focus:bg-white/[0.07]"
        />
      </div>
    </div>
  );
}