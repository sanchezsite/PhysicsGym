"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { MultipleChoice } from "@/components/lesson-interactions/MultipleChoice";
import { PairInput } from "@/components/lesson-interactions/PairInput";
import { SortInteraction } from "@/components/lesson-interactions/SortInteraction";
import type { LessonModule, LessonProblem, VisualChoice } from "@/types";

type SortAnswers = Record<string, string>;

function isCorrectAnswer(
  problem: LessonProblem,
  selected: string | null,
  pairAnswers: string[],
  sortAnswers: SortAnswers,
  selectedVisualChoiceId: string | null
) {
  if (problem.type === "numeric_pair" || problem.type === "boss_multi_part") {
    if (!Array.isArray(problem.correctAnswer)) return false;

    return problem.correctAnswer.every((answer, index) => {
      return pairAnswers[index]?.trim().toLowerCase() === answer.toLowerCase();
    });
  }

  if (problem.type === "sort") {
    if (!problem.sortItems) return false;

    return problem.sortItems.every((item) => {
      return sortAnswers[item.label] === item.correctBucket;
    });
  }

  if (problem.type === "visual_choice") {
    return selectedVisualChoiceId === problem.correctVisualChoiceId;
  }

  return selected === problem.correctAnswer;
}

function ArrowDiagram({ choice }: { choice: VisualChoice }) {
  const length = choice.magnitude === 4 ? 120 : choice.magnitude === 0 ? 0 : 70;

  const directions = {
    east: {
      x1: 35,
      y1: 75,
      x2: 35 + length,
      y2: 75,
      labelX: 35 + Math.max(length, 40) / 2,
      labelY: 55,
    },
    west: {
      x1: 165,
      y1: 75,
      x2: 165 - length,
      y2: 75,
      labelX: 165 - Math.max(length, 40) / 2,
      labelY: 55,
    },
    north: {
      x1: 100,
      y1: 135,
      x2: 100,
      y2: 135 - length,
      labelX: 125,
      labelY: 135 - Math.max(length, 40) / 2,
    },
    south: {
      x1: 100,
      y1: 25,
      x2: 100,
      y2: 25 + length,
      labelX: 125,
      labelY: 25 + Math.max(length, 40) / 2,
    },
  };

  const d = directions[choice.direction];

  return (
    <svg viewBox="0 0 200 150" className="h-36 w-full">
      <defs>
        <marker
          id={`arrowhead-${choice.id}`}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="rgb(103 232 249)" />
        </marker>
      </defs>

      {choice.magnitude === 0 ? (
        <circle
          cx="100"
          cy="75"
          r="10"
          fill="none"
          stroke="rgb(103 232 249)"
          strokeWidth="5"
        />
      ) : (
        <line
          x1={d.x1}
          y1={d.y1}
          x2={d.x2}
          y2={d.y2}
          stroke="rgb(103 232 249)"
          strokeWidth="6"
          strokeLinecap="round"
          markerEnd={`url(#arrowhead-${choice.id})`}
        />
      )}

      <text
        x={d.labelX}
        y={d.labelY}
        textAnchor="middle"
        fill="rgb(224 242 254)"
        fontSize="16"
        fontWeight="800"
      >
        {choice.label}
      </text>
    </svg>
  );
}

function renderProblemBody({
  problem,
  selected,
  setSelected,
  pairAnswers,
  setPairAnswers,
  sortAnswers,
  setSortAnswers,
  selectedVisualChoiceId,
  setSelectedVisualChoiceId,
}: {
  problem: LessonProblem;
  selected: string | null;
  setSelected: (value: string) => void;
  pairAnswers: string[];
  setPairAnswers: (value: string[]) => void;
  sortAnswers: SortAnswers;
  setSortAnswers: (value: SortAnswers) => void;
  selectedVisualChoiceId: string | null;
  setSelectedVisualChoiceId: (value: string) => void;
}) {
  switch (problem.type) {
    case "multiple_choice":
      return (
        <MultipleChoice
          choices={problem.choices ?? []}
          selected={selected}
          setSelected={setSelected}
        />
      );

    case "sort":
      return (
        <SortInteraction
          sortItems={problem.sortItems ?? []}
          sortBuckets={problem.sortBuckets ?? []}
          sortAnswers={sortAnswers}
          setSortAnswers={setSortAnswers}
        />
      );

    case "numeric_pair":
    case "boss_multi_part":
      return (
        <PairInput
          labels={[
            problem.pairLabels?.[0] ?? "Distance",
            problem.pairLabels?.[1] ?? "Displacement",
          ]}
          placeholders={[
            problem.pairPlaceholders?.[0] ?? "Example: 6 meters",
            problem.pairPlaceholders?.[1] ?? "Example: 0 meters",
          ]}
          pairAnswers={pairAnswers}
          setPairAnswers={setPairAnswers}
        />
      );

    case "visual_choice":
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {problem.visualChoices?.map((choice) => (
            <button
              key={choice.id}
              onClick={() => setSelectedVisualChoiceId(choice.id)}
              className={`rounded-3xl border p-4 transition ${
                selectedVisualChoiceId === choice.id
                  ? "border-cyan-300/70 bg-cyan-300/10 shadow-xl shadow-cyan-950/20"
                  : "border-white/10 bg-white/[0.04] hover:border-cyan-200/30 hover:bg-white/[0.08]"
              }`}
            >
              <ArrowDiagram choice={choice} />
            </button>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function LessonModuleScreen({
  module,
  completedLessonProblemIds,
  onExit,
  onProblemComplete,
  onComplete,
}: {
  module: LessonModule;
  completedLessonProblemIds: string[];
  onExit: () => void;
  onProblemComplete: (problemId: string) => void;
  onComplete: () => void | Promise<void>;
}) {
  const firstIncompleteIndex = module.problems.findIndex(
  (problem) => !completedLessonProblemIds.includes(problem.id)
  );

  const initialProblemIndex =
    firstIncompleteIndex === -1 ? module.problems.length - 1 : firstIncompleteIndex;

  const [currentIndex, setCurrentIndex] = useState(initialProblemIndex);
  const [selected, setSelected] = useState<string | null>(null);
  const [pairAnswers, setPairAnswers] = useState<string[]>(["", ""]);
  const [sortAnswers, setSortAnswers] = useState<SortAnswers>({});
  const [selectedVisualChoiceId, setSelectedVisualChoiceId] =
    useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [xpEarned, setXpEarned] = useState(0);

  const problem = module.problems[currentIndex];

  function submitAnswer() {
    const correct = isCorrectAnswer(
      problem,
      selected,
      pairAnswers,
      sortAnswers,
      selectedVisualChoiceId
    );

    const alreadyCompleted = completedLessonProblemIds.includes(problem.id);

    if (correct && !alreadyCompleted) {
      onProblemComplete(problem.id);
      setXpEarned(10);
    } else {
      setXpEarned(0);
    }

    setWasCorrect(correct);
    setShowExplanation(true);
  }

  function nextProblem() {
    if (currentIndex < module.problems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setPairAnswers(["", ""]);
      setSortAnswers({});
      setSelectedVisualChoiceId(null);
      setShowExplanation(false);
      setWasCorrect(null);
      setXpEarned(0);
    } else {
      void onComplete();
    }
  }

  const canSubmit =
    problem.type === "numeric_pair" || problem.type === "boss_multi_part"
      ? pairAnswers[0]?.trim().length > 0 && pairAnswers[1]?.trim().length > 0
      : problem.type === "multiple_choice"
        ? selected !== null
        : problem.type === "sort"
          ? Boolean(problem.sortItems?.every((item) => sortAnswers[item.label]))
          : problem.type === "visual_choice"
            ? selectedVisualChoiceId !== null
            : true;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 px-6 py-10 text-white">
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-200/65">
              Lesson Module
            </p>

            <h1 className="mt-2 text-5xl font-black tracking-tight text-white">
              {module.title}
            </h1>

            <p className="mt-3 text-lg text-slate-300/75">
              {module.description}
            </p>
          </div>

          <Button variant="ghost" onClick={onExit}>
            Exit Lesson
          </Button>
        </div>

        <Card className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/25 backdrop-blur-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cyan-100/50">
                Problem {currentIndex + 1} of {module.problems.length}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                {problem.title}
              </h2>
            </div>
          </div>

          <p className="mb-8 text-lg leading-8 text-slate-200/80">
            {problem.prompt}
          </p>

          {renderProblemBody({
            problem,
            selected,
            setSelected,
            pairAnswers,
            setPairAnswers,
            sortAnswers,
            setSortAnswers,
            selectedVisualChoiceId,
            setSelectedVisualChoiceId,
          })}

          {showExplanation && (
            <div
              className={`mt-8 rounded-2xl border p-5 ${
                wasCorrect
                  ? "border-cyan-300/35 bg-cyan-300/10"
                  : "border-amber-300/40 bg-amber-400/10"
              }`}
            >
              <p
                className={`mb-2 text-sm font-bold uppercase tracking-[0.18em] ${
                  wasCorrect ? "text-cyan-100/70" : "text-amber-100/70"
                }`}
              >
                {wasCorrect ? "Correct" : "Not quite"}
              </p>

              <p className="text-slate-100">{problem.explanation}</p>

              {wasCorrect && xpEarned > 0 ? (
                <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-2 text-sm font-black text-cyan-100 shadow-lg shadow-cyan-950/20">
                  <span>✨</span>
                  <span>+{xpEarned} XP</span>
                </div>
              ) : null}

              {!wasCorrect && problem.hint ? (
                <p className="mt-4 text-slate-300/75">
                  Hint: {problem.hint}
                </p>
              ) : null}
            </div>
          )}

          <div className="mt-8 flex gap-4">
            {!showExplanation ? (
              <Button onClick={submitAnswer} disabled={!canSubmit}>
                Submit
              </Button>
            ) : (
              <Button onClick={nextProblem}>
                {currentIndex === module.problems.length - 1
                  ? "Finish Module"
                  : "Next Problem"}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}