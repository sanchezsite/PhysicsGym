export function Metric({
  title,
  value,
  caption,
}: {
  title: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-3xl border border-yellow-300/35 bg-black/20 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300/70">
        {title}
      </p>
      <p className="mt-3 text-4xl font-black text-yellow-100">{value}</p>
      <p className="mt-1 text-sm text-yellow-100/60">{caption}</p>
    </div>
  );
}