"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { problems } from "@/data/problems";
import { curriculumSections, curriculumUnits, learningPathSequences } from "@/data/curriculum";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Metric } from "@/components/Metric";
import { AuthScreen } from "@/components/AuthScreen";
import { ProblemScreen } from "@/components/ProblemScreen";
import { WorldMapScreen } from "@/components/world-map/WorldMapScreen";
import { LessonModuleScreen } from "@/components/LessonModuleScreen";
import {
  getModuleById,
  getNextIncompleteModule,
} from "@/data/curriculum/helpers";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type Topic = "Forces" | "Energy" | "Momentum" | "Rotation" | "Electricity";
type Screen = "landing" | "auth" | "dashboard" | "onboarding" | "path" | "problem" | "complete" | "lesson";
type Level = "new" | "highschool" | "college" | "intermediate" | "advanced" | "quantum";
type Struggle = "translation" | "principles" | "math" | "multistep" | "visualization" | "unsure";
type Challenge = "gentle" | "medium" | "hard";
type FeedbackState = "idle" | "correct" | "incorrect";
type DiagramType = "elevator" | "two-blocks" | "loop" | "rolling" | "capacitor";
type AuthMode = "signin" | "signup";

type AuthUser = { id: string; email: string };
type SavedProfile = {
  level: Level | null;
  struggle: Struggle | null;
  challenge: Challenge | null;
  current_path_ids: number[] | null;
  current_unit_id: string | null;
  current_problem_index: number | null;
  updated_at?: string | null;
};
type Problem = {
  id: number;
  title: string;
  topic: Topic;
  difficulty: Difficulty;
  time: string;
  pattern: string;
  prompt: string;
  diagram?: DiagramType;
  choices: string[];
  correctChoiceIndex: number;
  correctFeedback: string;
  conceptualHint: string;
  solution: string[];
  finalAnswer: string;
};
type UserProfile = { level: Level | null; struggle: Struggle | null; challenge: Challenge | null };
type Option<T extends string> = { value: T; label: string; description: string };
type LearningPath = { title: string; subtitle: string; problemIds: number[]; mission: string[] };
type CurriculumUnit = { id: string; title: string; subtitle: string; section: string; problemIds: number[] };
type CurriculumSection = { id: string; title: string; description: string; units: CurriculumUnit[] };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseIsConfigured = Boolean(supabaseUrl && supabaseAnonKey);
const supabase: SupabaseClient | null = supabaseIsConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

function toAuthUser(user: User): AuthUser {
  return { id: user.id, email: user.email ?? "unknown@email.com" };
}

const levelOptions: Option<Level>[] = [
  { value: "new", label: "I am completely new", description: "Start with motion, forces, and the language of physics." },
  { value: "highschool", label: "High school physics", description: "Practice core mechanics with gentle conceptual support." },
  { value: "college", label: "Intro college physics", description: "Work through mechanics, energy, momentum, and circuits." },
  { value: "intermediate", label: "Intermediate university physics", description: "Strengthen rotation, electricity, and mathematical modeling." },
  { value: "advanced", label: "Advanced / upper division", description: "Train harder problems with less scaffolding." },
  { value: "quantum", label: "Quantum or modern physics", description: "Build intuition for advanced and modern topics." },
];

const struggleOptions: Option<Struggle>[] = [
  { value: "translation", label: "Turning words into equations", description: "You know formulas, but the setup feels unclear." },
  { value: "principles", label: "Knowing which principle applies", description: "Choosing Newton, energy, momentum, or something else feels hard." },
  { value: "math", label: "The algebra or calculus", description: "The idea makes sense, but the math gets heavy." },
  { value: "multistep", label: "Multi-step problems", description: "Longer problems feel disorganized." },
  { value: "visualization", label: "Visualizing what is happening", description: "You want the picture and physical meaning to click." },
  { value: "unsure", label: "I am not sure yet", description: "Start with a balanced diagnostic path." },
];

const challengeOptions: Option<Challenge>[] = [
  { value: "gentle", label: "Gentle progression", description: "Small steps, more hints, lower stress." },
  { value: "medium", label: "Medium challenge", description: "Some support, but enough resistance to grow." },
  { value: "hard", label: "Push me hard", description: "Less scaffolding, tougher prompts." },
];

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200",
  Intermediate: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  Advanced: "border-orange-400/40 bg-orange-400/10 text-orange-200",
};
const appDataIsValid = problems.every((p) => p.choices.length === 4 && p.correctChoiceIndex >= 0 && p.correctChoiceIndex < 4 && p.solution.length > 0) && Object.values(learningPathSequences).every((path) => path.every((id) => problems.some((p) => p.id === id)));

function ProgressDots({ step }: { step: number }) {
  return <div className="flex items-center gap-2">{[0, 1, 2].map((dot) => <div key={dot} className={`h-2.5 rounded-full transition-all ${dot === step ? "w-10 bg-yellow-400" : dot < step ? "w-2.5 bg-yellow-300/70" : "w-2.5 bg-yellow-100/20"}`} />)}</div>;
}

function OptionCard<T extends string>({ option, selected, onSelect }: { option: Option<T>; selected: boolean; onSelect: () => void }) {
  return (
    <motion.button whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.985 }} onClick={onSelect} className={`w-full rounded-3xl border p-5 text-left transition ${selected ? "border-yellow-400 bg-yellow-400 text-red-950" : "border-yellow-300/45 bg-red-950/40 text-yellow-50 hover:border-yellow-400/50 hover:bg-red-900/50"}`}>
      <p className="text-base font-bold">{option.label}</p>
      <p className={`mt-2 text-sm leading-6 ${selected ? "text-red-950/75" : "text-yellow-100/60"}`}>{option.description}</p>
    </motion.button>
  );
}

function MiniToolkitCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <motion.div whileHover={{ y: -6, rotateX: 3, rotateY: title === "Energy" ? -3 : 3, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} style={{ transformStyle: "preserve-3d" }} className="rounded-3xl border border-yellow-300/25 bg-black/20 p-5 transition-colors hover:border-yellow-300/80 hover:bg-yellow-400/10"><p className="text-lg font-black text-yellow-100">{title}</p>{children}</motion.div>;
}

function HeroToolkit() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
      <Card className="relative overflow-hidden rounded-[2rem] border-yellow-300/45 shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.08),transparent_25%)]" />
        <div className="relative p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/70">Inside the physicist&apos;s toolkit</p>
          <div className="mt-8 grid gap-5">
            <motion.div whileHover={{ y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="rounded-3xl border border-yellow-300/25 bg-black/20 p-5 transition-colors hover:border-yellow-300/80 hover:bg-yellow-400/10">
              <div className="flex items-center justify-between"><p className="text-lg font-black text-yellow-100">Mechanics</p><p className="text-sm text-yellow-300/60">Force analysis</p></div>
              <svg viewBox="0 0 420 140" className="mt-4 h-auto w-full"><rect x="140" y="55" width="90" height="50" rx="10" fill="rgb(254 240 138)" /><text x="185" y="86" textAnchor="middle" fill="rgb(69 10 10)" fontSize="22" fontWeight="800">m</text><line x1="185" y1="40" x2="185" y2="12" stroke="rgb(250 204 21)" strokeWidth="4" /><line x1="185" y1="105" x2="185" y2="132" stroke="rgb(250 204 21)" strokeWidth="4" /><line x1="230" y1="80" x2="300" y2="80" stroke="rgb(250 204 21)" strokeWidth="4" /><text x="20" y="30" fill="rgb(254 240 138)" fontSize="20" fontWeight="700">ΣF = ma</text></svg>
            </motion.div>
            <div className="grid gap-5 md:grid-cols-2">
              <MiniToolkitCard title="Energy"><svg viewBox="0 0 220 160" className="mt-4 h-auto w-full"><circle cx="110" cy="82" r="48" fill="none" stroke="rgb(253 224 71)" strokeWidth="5" /><rect x="96" y="30" width="28" height="18" rx="5" fill="rgb(254 240 138)" /><text x="22" y="145" fill="rgb(254 240 138)" fontSize="16">mgh → KE</text></svg></MiniToolkitCard>
              <MiniToolkitCard title="Fields"><svg viewBox="0 0 220 160" className="mt-4 h-auto w-full"><line x1="60" y1="40" x2="60" y2="120" stroke="rgb(254 240 138)" strokeWidth="5" /><line x1="95" y1="40" x2="95" y2="120" stroke="rgb(254 240 138)" strokeWidth="5" /><path d="M95 80 H145 l8 -16 l8 32 l8 -32 l8 32" fill="none" stroke="rgb(253 224 71)" strokeWidth="4" /></svg></MiniToolkitCard>
            </div>
            <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity }} className="rounded-3xl border border-yellow-300/40 bg-yellow-400/10 p-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">Insight</p><p className="mt-4 text-2xl font-black leading-tight text-yellow-100">“A scale measures support force—not weight.”</p><p className="mt-4 leading-7 text-yellow-100/65">Interactive reasoning that teaches how physicists frame problems.</p></motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function LandingScreen({ startOnboarding, tryDemo }: { startOnboarding: () => void; tryDemo: () => void }) {
  return <div className="flex-1"><section className="grid items-center gap-14 py-10 lg:grid-cols-2 lg:py-16"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/45 bg-red-950/50 px-4 py-2 text-sm text-yellow-100 shadow-sm">✦ Train like a physicist</div><h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-yellow-100 md:text-7xl">Build the kind of mind that sees what others miss.</h1><p className="mt-6 max-w-2xl text-xl leading-9 text-yellow-100/75">Master physics—not just the formulas.</p><div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button onClick={startOnboarding} className="h-14 px-8 text-base font-bold">Start free →</Button><Button variant="outline" onClick={tryDemo} className="h-14 px-8 text-base font-bold">Try a demo problem</Button></div><div className="mt-10 grid gap-4 sm:grid-cols-3"><Metric title="Diagnostic" value="3" caption="question diagnostic" /><Metric title="Hints" value="Hints" caption="before solutions" /><Metric title="Paths" value="Paths" caption="tailored to level" /></div></div><HeroToolkit /></section><section className="py-10 text-center"><p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-300/70">Why students get stuck</p><h2 className="mt-4 text-4xl font-black text-yellow-100 md:text-5xl">Physics is not the problem. Practice design is.</h2><div className="mt-10 grid gap-6 md:grid-cols-3"><Card className="rounded-[2rem] border-yellow-300/45 p-8"><h3 className="text-2xl font-black text-yellow-100">Learn structure</h3><p className="mt-4 leading-8 text-yellow-100/70">Problems stop feeling random when you learn what experts notice first.</p></Card><Card className="rounded-[2rem] border-yellow-300/45 p-8"><h3 className="text-2xl font-black text-yellow-100">Get feedback</h3><p className="mt-4 leading-8 text-yellow-100/70">Wrong answers trigger hints, not dead ends.</p></Card><Card className="rounded-[2rem] border-yellow-300/45 p-8"><h3 className="text-2xl font-black text-yellow-100">Train mastery</h3><p className="mt-4 leading-8 text-yellow-100/70">Build habits: diagrams, principles, systems, and intuition.</p></Card></div></section></div>;
}

function CompleteScreen({ solvedCount, totalChecks, accuracy, totalProblems, continueTraining, reviewPath, resetAll }: { solvedCount: number; totalChecks: number; accuracy: number; totalProblems: number; continueTraining: () => void; reviewPath: () => void; resetAll: () => void }) {
  return <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-8"><Card className="rounded-[2rem] border-yellow-300/45 p-8 text-center shadow-2xl shadow-black/40 md:p-12"><p className="text-sm font-bold uppercase tracking-[0.24em] text-yellow-300/80">Mission complete</p><h1 className="mt-4 text-5xl font-black tracking-tight text-yellow-100 md:text-7xl">You finished your first path.</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-yellow-100/70">Nice. You committed to answers, got feedback, and kept moving.</p><div className="mt-10 grid gap-4 md:grid-cols-3"><Metric title="Solved" value={String(solvedCount)} caption={`of ${totalProblems} problems`} /><Metric title="Checks" value={String(totalChecks)} caption="answer attempts" /><Metric title="Accuracy" value={`${accuracy}%`} caption="based on checks" /></div><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={continueTraining}>Continue training →</Button><Button variant="outline" onClick={reviewPath}>Review path</Button><Button variant="ghost" onClick={resetAll}>Start over</Button></div></Card></div>;
}

export default function PhysicsProblemGym() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ level: null, struggle: null, challenge: null });
  const [activeProblemId, setActiveProblemId] = useState(1);
  const [currentPathIds, setCurrentPathIds] = useState<number[]>([1, 4, 3, 2]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [activeUnitId, setActiveUnitId] = useState("vectors");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showConceptHint, setShowConceptHint] = useState(false);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [solvedCount, setSolvedCount] = useState(0);
  const [totalChecks, setTotalChecks] = useState(0);
  const [completedProblemIds, setCompletedProblemIds] = useState<number[]>([]);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [completedLessonModuleIds, setCompletedLessonModuleIds] = useState<string[]>([]);
  const [completedLessonProblemIds, setCompletedLessonProblemIds] = useState<string[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeLessonModuleId, setActiveLessonModuleId] = useState<string | null>(null);
  const activeProblem = problems.find((p) => p.id === activeProblemId) ?? problems[0];
  const recommendedPath = useMemo<LearningPath>(() => {
    const { level, struggle, challenge } = profile;
    if (level === "quantum") return { title: "Modern Physics Foundations", subtitle: "Start with conceptual precision before formal machinery.", problemIds: [...learningPathSequences.quantum], mission: ["State behavior", "Measurement intuition", "Probability amplitudes"] };
    if (level === "advanced") return { title: "Advanced Mechanics Sprint", subtitle: "Harder problems with less scaffolding.", problemIds: [...learningPathSequences.advanced], mission: ["Rotational energy", "System selection", "Multi-step reasoning"] };
    if (level === "intermediate") return { title: challenge === "hard" ? "Advanced Mechanics Sprint" : "University Mechanics Builder", subtitle: "Strengthen system choice and modeling.", problemIds: challenge === "hard" ? [...learningPathSequences.advanced] : [...learningPathSequences.university], mission: ["System selection", "Rotational energy", "Multi-step reasoning"] };
    if (level === "college") return { title: struggle === "principles" ? "Principle Recognition Path" : "Intro College Mechanics Path", subtitle: "Choose the right law before algebra.", problemIds: [...learningPathSequences.college], mission: ["Free-body diagrams", "Energy constraints", "Momentum as a vector"] };
    return { title: struggle === "visualization" ? "Physics Intuition Starter" : "Newtonian Foundations", subtitle: "Begin with force, motion, and physical meaning.", problemIds: [...learningPathSequences.beginner], mission: ["What forces exist?", "What does a scale measure?", "What does acceleration change?"] };
  }, [profile]);
  const firstRecommendedProblem = problems.find((p) => p.id === recommendedPath.problemIds[0]) ?? problems[0];
  const accuracy = totalChecks === 0 ? 0 : Math.round((solvedCount / totalChecks) * 100);
  const canContinue = onboardingStep === 0 ? profile.level !== null : onboardingStep === 1 ? profile.struggle !== null : profile.challenge !== null;

  function openLessonModule(moduleId: string) {
    setActiveLessonModuleId(moduleId);
    setScreen("lesson");
  }

  function getActiveLessonModule() {
  return getModuleById(activeLessonModuleId);
}

  function resetProblemState(problemId: number) {
    setActiveProblemId(problemId);
    setShowSolution(false);
    setSelectedAnswer(null);
    setAttemptCount(0);
    setShowConceptHint(false);
    setFeedbackState("idle");
  }

  async function loadProgress(userId: string) {
    if (!supabase) return;
    const { data: profileRow } = await supabase.from("profiles").select("level, struggle, challenge, current_path_ids, current_unit_id, current_problem_index, updated_at").eq("id", userId).maybeSingle();
    const saved = profileRow as SavedProfile | null;
    if (saved) {
      setProfile({ level: saved.level, struggle: saved.struggle, challenge: saved.challenge });
      if (saved.current_unit_id) setActiveUnitId(saved.current_unit_id);
      if (Array.isArray(saved.current_path_ids) && saved.current_path_ids.length > 0) {
        const safeIndex = Math.min(saved.current_problem_index ?? 0, saved.current_path_ids.length - 1);
        setCurrentPathIds(saved.current_path_ids);
        setCurrentPathIndex(safeIndex);
        resetProblemState(saved.current_path_ids[safeIndex]);
      }
      if (saved.updated_at) setLastSavedAt(saved.updated_at);
    }
    const { data: completedRows } = await supabase.from("completed_problems").select("problem_id").eq("user_id", userId);
    const { data: attemptRows } = await supabase.from("problem_attempts").select("is_correct").eq("user_id", userId);
    const completedIds = completedRows?.map((row) => Number(row.problem_id)) ?? [];
    setCompletedProblemIds(completedIds);
    setSolvedCount(completedIds.length);
    setTotalChecks(attemptRows?.length ?? 0);
  }

  async function saveProgressSnapshot(nextValues?: { pathIds?: number[]; unitId?: string; problemIndex?: number; level?: Level | null; struggle?: Struggle | null; challenge?: Challenge | null }) {
    if (!supabase || !authUser) return;
    const snapshotTime = new Date().toISOString();
    await supabase.from("profiles").upsert({
      id: authUser.id,
      email: authUser.email,
      level: nextValues?.level ?? profile.level,
      struggle: nextValues?.struggle ?? profile.struggle,
      challenge: nextValues?.challenge ?? profile.challenge,
      current_path_ids: nextValues?.pathIds ?? currentPathIds,
      current_unit_id: nextValues?.unitId ?? activeUnitId,
      current_problem_index: nextValues?.problemIndex ?? currentPathIndex,
      updated_at: snapshotTime,
    });
    setLastSavedAt(snapshotTime);
  }

  function beginPath(pathIds: number[], unitId = activeUnitId) {
    const firstIncompleteIndex = pathIds.findIndex((id) => !completedProblemIds.includes(id));
    const safeIndex = firstIncompleteIndex === -1 ? pathIds.length - 1 : firstIncompleteIndex;
    setCurrentPathIds(pathIds);
    setCurrentPathIndex(safeIndex);
    setActiveUnitId(unitId);
    resetProblemState(pathIds[safeIndex]);
    void saveProgressSnapshot({ pathIds, unitId, problemIndex: safeIndex });
  }

  function startUnit(unit: CurriculumUnit) {
    beginPath(unit.problemIds, unit.id);
    setScreen("problem");
  }

  function goToNextProblem() {
    const nextIndex = currentPathIndex + 1;
    if (nextIndex >= currentPathIds.length) {
      void saveProgressSnapshot({ problemIndex: currentPathIds.length - 1 });
      setScreen("complete");
      return;
    }
    setCurrentPathIndex(nextIndex);
    resetProblemState(currentPathIds[nextIndex]);
    void saveProgressSnapshot({ problemIndex: nextIndex });
  }

  async function saveAttempt(isCorrect: boolean) {
    if (!supabase || !authUser || selectedAnswer === null) return;
    await supabase.from("problem_attempts").insert({ user_id: authUser.id, problem_id: activeProblem.id, selected_answer_index: selectedAnswer, correct_answer_index: activeProblem.correctChoiceIndex, is_correct: isCorrect });
    if (isCorrect) await supabase.from("completed_problems").upsert({ user_id: authUser.id, problem_id: activeProblem.id, completed_at: new Date().toISOString() });
  }

  function checkAnswer() {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === activeProblem.correctChoiceIndex;
    setTotalChecks((v) => v + 1);
    void saveAttempt(isCorrect);
    if (isCorrect) {
      setShowConceptHint(false);
      setShowSolution(false);
      setFeedbackState("correct");
      setCompletedProblemIds((ids) => (ids.includes(activeProblem.id) ? ids : [...ids, activeProblem.id]));
      if (!completedProblemIds.includes(activeProblem.id)) setSolvedCount((v) => v + 1);
      return;
    }
    setFeedbackState("incorrect");
    if (attemptCount === 0) {
      setAttemptCount(1);
      setShowConceptHint(true);
      return;
    }
    setAttemptCount(2);
    setShowSolution(true);
  }

  function openAuth(mode: AuthMode) {
    setAuthMode(mode);
    setAuthError(null);
    setScreen("auth");
  }

  async function handleAuthSubmit() {
    if (!authEmail.includes("@")) {
      setAuthError("Enter a valid email address.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Use at least 6 characters for your password.");
      return;
    }
    if (!supabase) {
      const nextUser = { id: `demo-${authEmail.toLowerCase()}`, email: authEmail.toLowerCase() };
      setAuthUser(nextUser);
      window.localStorage.setItem("physics-gym-user", JSON.stringify(nextUser));
      setAuthError(null);
      setScreen(authMode === "signup" ? "onboarding" : "path");
      return;
    }
    const response = authMode === "signup" ? await supabase.auth.signUp({ email: authEmail.toLowerCase(), password: authPassword }) : await supabase.auth.signInWithPassword({ email: authEmail.toLowerCase(), password: authPassword });
    if (response.error) {
      setAuthError(response.error.message);
      return;
    }
    if (!response.data.user) {
      setAuthError("Check your email to confirm your account, then log in.");
      return;
    }
    const nextUser = toAuthUser(response.data.user);
    setAuthUser(nextUser);
    setAuthEmail(nextUser.email);
    setAuthError(null);
    await supabase.from("profiles").upsert({ id: nextUser.id, email: nextUser.email, updated_at: new Date().toISOString() });
    setScreen(authMode === "signup" ? "onboarding" : "path");
    void loadProgress(nextUser.id);
    void loadCompletedLessons(nextUser.id); 
    void loadCompletedLessonProblems(nextUser.id);
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setAuthUser(null);
    window.localStorage.removeItem("physics-gym-user");
    setSolvedCount(0);
    setTotalChecks(0);
    setCompletedProblemIds([]);
    setCompletedLessonModuleIds([]);
    setCompletedLessonProblemIds([]);
    setScreen("landing");
  }

  function startOnboarding() {
    if (!authUser) {
      openAuth("signup");
      return;
    }
    setOnboardingStep(0);
    setScreen("onboarding");
  }

  function goToPath() {
    beginPath(recommendedPath.problemIds);
    void saveProgressSnapshot({ pathIds: recommendedPath.problemIds, problemIndex: 0, level: profile.level, struggle: profile.struggle, challenge: profile.challenge });
    setScreen("path");
  }

  function startRecommendedProblem() {
    beginPath(recommendedPath.problemIds, activeUnitId);
    setScreen("problem");
  }

  function continueTraining() {
    beginPath(currentPathIds, activeUnitId);
    setScreen("problem");
  }

  function goHome() {
    setScreen(authUser ? "path" : "landing");
  }

  async function markLessonProblemComplete(problemId: string) {
    setCompletedLessonProblemIds((current) =>
      current.includes(problemId) ? current : [...current, problemId]
    );

    if (!supabase || !authUser) return;

    const { error } = await supabase
      .from("lesson_problem_progress")
      .upsert(
        {
          user_id: authUser.id,
          problem_id: problemId,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,problem_id",
        }
      );

    if (error) {
      console.error("Failed to save lesson problem progress:", error.message);
    }
  }

  function resetAll() {
    setScreen(authUser ? "path" : "landing");
    setOnboardingStep(0);
    setProfile({ level: null, struggle: null, challenge: null });
    setCurrentPathIds([1, 4, 3, 2]);
    setCurrentPathIndex(0);
    setActiveUnitId("vectors");
    resetProblemState(1);
  }

  useEffect(() => {
    let mounted = true;
    async function loadSession() {
      if (!supabase) {
        const savedUser = window.localStorage.getItem("physics-gym-user");
        if (!savedUser) return;
        try {
          const parsedUser = JSON.parse(savedUser) as AuthUser;
          if (!mounted) return;
          setAuthUser(parsedUser);
          setAuthEmail(parsedUser.email);
          setScreen("path");
        } catch {
          window.localStorage.removeItem("physics-gym-user");
        }
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user || !mounted) return;
      const nextUser = toAuthUser(data.user);
      setAuthUser(nextUser);
      setAuthEmail(nextUser.email);
      setScreen("path");
      void loadProgress(nextUser.id);
      void loadCompletedLessons(nextUser.id);
      void loadCompletedLessonProblems(nextUser.id);
    }
    void loadSession();
    if (!supabase) return () => { mounted = false; };
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setAuthUser(null);
        return;
      }
      const nextUser = toAuthUser(session.user);
      setAuthUser(nextUser);
      setAuthEmail(nextUser.email);
      void loadProgress(nextUser.id);
      void loadCompletedLessons(nextUser.id);
      void loadCompletedLessonProblems(nextUser.id);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function markLessonComplete(moduleId: string) {
  setCompletedLessonModuleIds((current) =>
    current.includes(moduleId) ? current : [...current, moduleId]
  );

  if (!supabase || !authUser) return;

  const { error } = await supabase
    .from("lesson_progress")
    .upsert(
      {
        user_id: authUser.id,
        module_id: moduleId,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,module_id",
      }
    );

  if (error) {
    console.error("Failed to save lesson progress:", error.message);
  }
}

async function loadCompletedLessons(userId: string) {
  if (!supabase) return;

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("module_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to load lesson progress:", error.message);
    return;
  }

  setCompletedLessonModuleIds(data?.map((row) => row.module_id) ?? []);
}

async function loadCompletedLessonProblems(userId: string) {
  if (!supabase) return;

  const { data, error } = await supabase
    .from("lesson_problem_progress")
    .select("problem_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to load lesson problem progress:", error.message);
    return;
  }

  setCompletedLessonProblemIds(data?.map((row) => row.problem_id) ?? []);
}

return (
  <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_76%_14%,rgba(56,189,248,0.22),transparent_26%),radial-gradient(circle_at_22%_8%,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_50%_95%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(180deg,#1e3a8a,#0f172a_58%,#020617)] text-white">
    <div className="pointer-events-none fixed inset-0 opacity-30">
      <div className="absolute left-10 top-24 text-7xl text-yellow-300/20">∇</div>
      <div className="absolute right-16 top-40 text-8xl text-yellow-300/10">Σ</div>
      <div className="absolute bottom-20 left-1/4 text-7xl text-yellow-300/10">Ψ</div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.05)_1px,transparent_1px)] bg-[size:54px_54px]" />
    </div>

    <section className="relative flex min-h-screen w-full flex-col">
      <nav className="relative z-50 px-6 pt-6">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.06] px-5 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-md">
          <button onClick={goHome} className="flex items-center gap-3 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950 shadow-lg shadow-cyan-950/20">
              Ψ
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-white">
                Physics Gym
              </p>
              <p className="text-sm text-slate-300/70">
                A guided path into problem solving.
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {authUser ? (
              <span className="hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300/75 md:inline">
                {authUser.email}
              </span>
            ) : null}

            {screen !== "landing" ? (
              <button
                onClick={resetAll}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-cyan-200/30 hover:bg-white/[0.08]"
              >
                Start over
              </button>
            ) : null}

            {authUser ? (
              <button
                onClick={signOut}
                className="rounded-2xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-50 transition hover:border-cyan-200/45 hover:bg-cyan-300/15"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => openAuth("signin")}
                className="rounded-2xl border border-cyan-200/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-50 transition hover:border-cyan-200/45 hover:bg-cyan-300/15"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </nav>

      {!appDataIsValid ? (
        <Card className="rounded-3xl border-red-300/60 bg-red-950/80 p-6 text-red-100">
          Problem data is invalid.
        </Card>
      ) : null}

      {screen === "landing" ? (
        <LandingScreen
          startOnboarding={startOnboarding}
          tryDemo={() => setScreen("problem")}
        />
      ) : null}

      {screen === "auth" ? (
        <AuthScreen
          mode={authMode}
          email={authEmail}
          password={authPassword}
          error={authError}
          setEmail={setAuthEmail}
          setPassword={setAuthPassword}
          setMode={setAuthMode}
          submit={handleAuthSubmit}
          usingDemoAuth={!supabaseIsConfigured}
        />
      ) : null}

      {screen === "onboarding" ? (
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center py-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300/70">
                Starting point quiz
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-yellow-100 md:text-5xl">
                {onboardingStep === 0
                  ? "Where are you in physics?"
                  : onboardingStep === 1
                    ? "What feels hardest right now?"
                    : "How much challenge do you want?"}
              </h1>
            </div>

            <ProgressDots step={onboardingStep} />
          </div>

          <div className={`grid gap-4 ${onboardingStep === 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {onboardingStep === 0
              ? levelOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    option={option}
                    selected={profile.level === option.value}
                    onSelect={() =>
                      setProfile((current) => ({
                        ...current,
                        level: option.value,
                      }))
                    }
                  />
                ))
              : null}

            {onboardingStep === 1
              ? struggleOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    option={option}
                    selected={profile.struggle === option.value}
                    onSelect={() =>
                      setProfile((current) => ({
                        ...current,
                        struggle: option.value,
                      }))
                    }
                  />
                ))
              : null}

            {onboardingStep === 2
              ? challengeOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    option={option}
                    selected={profile.challenge === option.value}
                    onSelect={() =>
                      setProfile((current) => ({
                        ...current,
                        challenge: option.value,
                      }))
                    }
                  />
                ))
              : null}
          </div>

          <div className="mt-8 flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setOnboardingStep((step) => Math.max(0, step - 1))}
              disabled={onboardingStep === 0}
            >
              Back
            </Button>

            <Button
              onClick={() =>
                onboardingStep < 2
                  ? setOnboardingStep((step) => step + 1)
                  : goToPath()
              }
              disabled={!canContinue}
            >
              {onboardingStep < 2 ? "Continue →" : "Start here →"}
            </Button>
          </div>
        </div>
      ) : null}

      {screen === "path" || screen === "dashboard" ? (
       <WorldMapScreen
          completedProblemIds={completedProblemIds}
          completedLessonModuleIds={completedLessonModuleIds}
          completedLessonProblemIds={completedLessonProblemIds}
          startLesson={() => {
            const nextModule = getNextIncompleteModule(completedLessonModuleIds);
            openLessonModule(nextModule.id);
          }}
          openLessonModule={openLessonModule}
          lastSavedAt={lastSavedAt}
        />
      ) : null}

      {screen === "lesson" ? (
        <LessonModuleScreen
          module={getActiveLessonModule()}
          onExit={() => setScreen("dashboard")}
          onProblemComplete={markLessonProblemComplete}
          onComplete={async () => {
            const activeModule = getActiveLessonModule();

            await markLessonComplete(activeModule.id);
            setScreen("dashboard");
          }}
        />
      ) : null}

      {screen === "problem" ? (
        <ProblemScreen
          activeProblem={activeProblem}
          currentPathIndex={currentPathIndex}
          currentPathLength={currentPathIds.length}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          setFeedbackState={setFeedbackState}
          feedbackState={feedbackState}
          showSolution={showSolution}
          setShowSolution={setShowSolution}
          showConceptHint={showConceptHint}
          attemptCount={attemptCount}
          checkAnswer={checkAnswer}
          goToNextProblem={goToNextProblem}
          goBack={() => setScreen("path")}
        />
      ) : null}

      {screen === "complete" ? (
        <CompleteScreen
          solvedCount={solvedCount}
          totalChecks={totalChecks}
          accuracy={accuracy}
          totalProblems={currentPathIds.length}
          continueTraining={continueTraining}
          reviewPath={() => setScreen("path")}
          resetAll={resetAll}
        />
      ) : null}
    </section>
  </main>
);
}
