"use client";

import React, { useState } from "react";
import { Check, Lock, Play, Mountain, Compass, Waves, Flame, Zap, Sparkles, Star } from "lucide-react";



const sections = [
  { id: "mechanics-1", title: "Mechanics I", worldName: "The First Ridge", icon: Mountain, active: true },
  { id: "mechanics-2", title: "Mechanics II", worldName: "Momentum Highlands", icon: Compass },
  { id: "waves", title: "Waves / Acoustics", worldName: "Echo Pass", icon: Waves },
  { id: "thermo", title: "Thermodynamics", worldName: "Thermal Basin", icon: Flame },
  { id: "em1", title: "Electromagnetism I", worldName: "Charged Expanse", icon: Zap },
  { id: "optics", title: "Optics", worldName: "Crystal Heights", icon: Sparkles },
  { id: "modern", title: "Modern Physics", worldName: "The Quantum Veil", icon: Star },
];

const units = [
  { id: "vectors", number: 1, title: "Vectors", description: "Geometry of physical quantities.", progress: 67 },
  { id: "motion-1d", number: 2, title: "Motion in 1D", description: "Position, velocity, acceleration.", progress: 0 },
  { id: "motion-2d", number: 3, title: "Motion in 2D/3D", description: "Projectiles and relative motion.", progress: 0 },
  { id: "newton", number: 4, title: "Newton’s Laws", description: "Forces and free-body diagrams.", progress: 0 },
  { id: "work", number: 5, title: "Work & Energy", description: "Energy transfer and motion.", progress: 0 },
  { id: "potential", number: 6, title: "Potential Energy", description: "Conservation and stored energy.", progress: 0 },
];

const modules = [
  { number: 1, title: "Why Numbers Aren’t Enough", description: "Scalars, vectors, distance, and displacement.", complete: true, problems: 7, done: 7 },
  { number: 2, title: "What a Vector Actually Is", description: "Magnitude, direction, equality, and opposites.", complete: true, problems: 6, done: 6 },
  { number: 3, title: "Combining Motion", description: "Head-to-tail addition and resultants.", complete: true, problems: 7, done: 7 },
  { number: 4, title: "Breaking Diagonals Into Components", description: "Horizontal and vertical pieces.", complete: true, problems: 7, done: 7 },
  { number: 5, title: "Trigonometric Components", description: "Use sine and cosine as projection tools.", current: true, problems: 8, done: 2 },
  { number: 6, title: "Rebuilding Vectors", description: "Recover magnitude and direction from pieces.", unlocked: true, problems: 8, done: 0 },
  { number: 7, title: "Dot Product", description: "Measure alignment between vectors.", locked: true, problems: 7, done: 0 },
  { number: 8, title: "Cross Product", description: "Measure perpendicular interaction.", locked: true, problems: 8, done: 0 },
];

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-black/40">
      <div className="mb-4 px-1">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/60">
          Internal Design Sandbox
        </p>
        <h2 className="text-2xl font-black text-white">{title}</h2>
      </div>
      <div className="h-[780px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_76%_14%,rgba(56,189,248,0.22),transparent_26%),radial-gradient(circle_at_22%_8%,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(180deg,#1e3a8a,#0f172a_58%,#020617)] text-white">
        {children}
      </div>
    </section>
  );
}

function Sidebar({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <aside className="w-80 shrink-0 p-4">
      {withHeader ? (
        <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/65">Physics Gym</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Journey Atlas</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300/70">Navigate the physics landscape.</p>
        </div>
      ) : null}

      <div className="space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button key={section.id} className={`w-full rounded-2xl border p-3 text-left transition ${section.active ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/20" : "border-white/10 bg-white/[0.04] text-slate-300/75"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${section.active ? "border-cyan-200/50 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.05]"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{section.worldName}</p>
                  <p className="mt-0.5 truncate text-xs opacity-55">{section.title}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function UnitBar() {
  const [selected, setSelected] = useState("vectors");

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-3 pr-4">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => setSelected(unit.id)}
              className={`min-w-[210px] rounded-2xl border p-4 text-left transition ${
                selected === unit.id
                  ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/20"
                  : "border-white/10 bg-white/[0.04] text-slate-100 hover:border-cyan-200/30 hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-2xl font-black ${selected === unit.id ? "bg-cyan-300 text-slate-950" : "bg-white/10"}`}>
                  {unit.number}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black">{unit.title}</p>
                  <p className="mt-0.5 truncate text-xs opacity-55">{unit.description}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-cyan-300" style={{ width: `${unit.progress}%` }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCard({ module }: { module: any }) {
  const complete = module.complete;
  const current = module.current;
  const locked = module.locked;

  return (
    <button className={`group w-full rounded-3xl border p-5 text-left transition ${
      complete
        ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/15"
        : current
          ? "border-cyan-200/60 bg-cyan-200/10 text-cyan-50 shadow-2xl shadow-cyan-400/20 ring-2 ring-cyan-300/35"
          : locked
            ? "cursor-not-allowed border-white/10 bg-white/[0.025] text-slate-500"
            : "border-white/10 bg-white/[0.05] text-slate-100 hover:border-cyan-200/30 hover:bg-white/[0.08]"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] opacity-50">Module {module.number}</p>
          <h3 className="mt-2 text-lg font-black leading-tight">{module.title}</h3>
          <p className="mt-2 text-sm leading-6 opacity-65">{module.description}</p>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
          complete
            ? "bg-cyan-300 text-slate-950"
            : current
              ? "bg-cyan-300 text-slate-950 shadow-[0_0_25px_rgba(103,232,249,0.55)] animate-pulse scale-110"
              : locked
                ? "bg-white/[0.04] text-slate-500"
                : "bg-white/10 text-slate-200"
        }`}>
          {complete ? <Check className="h-5 w-5" /> : locked ? <Lock className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {Array.from({ length: module.problems }).map((_, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full ${locked ? "bg-white/10" : i < module.done ? "bg-cyan-300 shadow-sm shadow-cyan-300/30" : "bg-white/20"}`} />
        ))}
      </div>
    </button>
  );
}

function ModuleArea({ titleSize = "large" }: { titleSize?: "large" | "small" }) {
  return (
    <section className="min-h-0 flex-1 overflow-y-auto rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-100/50">Selected Unit</p>
          <h3 className={`${titleSize === "large" ? "text-4xl" : "text-3xl"} mt-2 font-black text-white`}>Vectors</h3>
          <p className="mt-2 text-slate-300/70">Geometry of physical quantities.</p>
        </div>
        <p className="text-sm font-bold text-cyan-100/60">67% complete</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => <ModuleCard key={module.number} module={module} />)}
      </div>
    </section>
  );
}

function CompactHeroA() {
  return (
    <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/65">Mechanics I</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-black tracking-tight text-white">The First Ridge</h2>
          <span className="text-sm font-bold text-cyan-100/60">67%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-cyan-300" style={{ width: "67%" }} />
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-200/15 bg-slate-950/35 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">Next lesson</p>
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="font-black text-white">Trig Components</p>
          <button className="rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950">Continue →</button>
        </div>
      </div>
    </section>
  );
}

function InlineHeaderB() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/65">Mechanics I</p>
          <h2 className="truncate text-2xl font-black text-white">The First Ridge</h2>
        </div>
        <div className="hidden w-64 md:block">
          <div className="mb-1 flex justify-between text-xs text-cyan-100/50"><span>Progress</span><span>67%</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: "67%" }} /></div>
        </div>
        <button className="rounded-2xl bg-yellow-300 px-5 py-3 font-black text-slate-950">Continue →</button>
      </div>
    </section>
  );
}

function SidebarPromotionHeader() {
  return (
    <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/25 backdrop-blur-md">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200/65">Mechanics I</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight">The First Ridge</h1>
      <p className="mt-2 text-sm leading-6 text-slate-300/70">67% complete</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{ width: "67%" }} /></div>
    </div>
  );
}

function LayoutA() {
  return (
    <Shell title="A. Compact Observatory">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <CompactHeroA />
          <UnitBar />
          <ModuleArea />
        </main>
      </div>
    </Shell>
  );
}

function LayoutB() {
  return (
    <Shell title="B. Inline Header">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <InlineHeaderB />
          <UnitBar />
          <ModuleArea />
        </main>
      </div>
    </Shell>
  );
}

function LayoutC() {
  return (
    <Shell title="C. Sidebar Promotion">
      <div className="flex h-full">
        <aside className="w-80 shrink-0 p-4">
          <SidebarPromotionHeader />
          <div className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button key={section.id} className={`w-full rounded-2xl border p-3 text-left transition ${section.active ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-50 shadow-xl shadow-cyan-950/20" : "border-white/10 bg-white/[0.04] text-slate-300/75"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${section.active ? "border-cyan-200/50 bg-cyan-300 text-slate-950" : "border-white/10 bg-white/[0.05]"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{section.worldName}</p>
                      <p className="mt-0.5 truncate text-xs opacity-55">{section.title}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <UnitBar />
          <ModuleArea />
        </main>
      </div>
    </Shell>
  );
}

function LayoutD() {
  return (
    <Shell title="D. Minimal / Duolingo">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex min-h-0 flex-1 flex-col gap-5 p-6">
          <section className="rounded-3xl border border-cyan-200/15 bg-slate-950/35 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/50">Next lesson</p>
                <p className="mt-1 text-2xl font-black text-white">Trigonometric Components</p>
              </div>
              <button className="rounded-2xl bg-yellow-300 px-6 py-4 font-black text-slate-950">Continue →</button>
            </div>
          </section>
          <UnitBar />
          <ModuleArea titleSize="small" />
        </main>
      </div>
    </Shell>
  );
}

export default function CompactHeaderDashboardMockups() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto grid max-w-7xl gap-8">
        <LayoutA />
        <LayoutB />
        <LayoutC />
        <LayoutD />
      </div>
    </div>
  );
}
