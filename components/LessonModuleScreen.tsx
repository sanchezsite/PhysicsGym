"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { MultipleChoice } from "@/components/lesson-interactions/MultipleChoice";
import { PairInput } from "@/components/lesson-interactions/PairInput";
import { SortInteraction } from "@/components/lesson-interactions/SortInteraction";
import type {
  LessonModule,
  LessonProblem,
  VisualChoice,
} from "@/types";

type SortAnswers = Record<string, string>;

function isCorrectAnswer(
  problem: LessonProblem,
  selected: string | null,
  pairAnswers: string[],
  sortAnswers: SortAnswers,
  selectedVisualChoiceId: string | null
) {
  if (
    problem.type === "numeric_pair" ||
    problem.type === "boss_multi_part"
  ) {
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
  const length = choice.magnitude === 4 ? 120 : 70;

  const directions = {
    east: {
      x1: 35,
      y1: 75,
      x2: 35 + length,
      y2: 75,
      labelX: 35 + length / 2,
      labelY: 55,
    },
    west: {
      x1: 165,
      y1: 75,
      x2: 165 - length,
      y2: 75,
      labelX: 165 - length / 2,
      labelY: 55,
    },
    north: {
      x1: 100,
      y1: 135,
      x2: 100,
      y2: 135 - length,
      labelX: 125,
      labelY: 135 - length / 2,
    },
    south: {
      x1: 100,
      y1: 25,
      x2: 100,
      y2: 25 + length,
      labelX: 125,
      labelY: 25 + length / 2,
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
          <path d="M0,0 L0,6 L9,3 z" fill="rgb(253 224 71)" />
        </marker>
      </defs>

      <line
        x1={d.x1}
        y1={d.y1}
        x2={d.x2}
        y2={d.y2}
        stroke="rgb(253 224 71)"
        strokeWidth="6"
        strokeLinecap="round"
        markerEnd={`url(#arrowhead-${choice.id})`}
      />

      <text
        x={d.labelX}
        y={d.labelY}
        textAnchor="middle"
        fill="rgb(254 240 138)"
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
                  ? "border-yellow-300 bg-yellow-400/10"
                  : "border-yellow-300/20 bg-black/20 hover:border-yellow-300/50"
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
  onExit,
  onComplete,
}: {
  module: LessonModule;
  onExit: () => void;
  onComplete: () => void | Promise<void>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [pairAnswers, setPairAnswers] = useState<string[]>(["", ""]);
  const [sortAnswers, setSortAnswers] = useState<SortAnswers>({});
  const [selectedVisualChoiceId, setSelectedVisualChoiceId] =
    useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const problem = module.problems[currentIndex];

  function submitAnswer() {
    const correct = isCorrectAnswer(
      problem,
      selected,
      pairAnswers,
      sortAnswers,
      selectedVisualChoiceId
    );

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
    } else {
        void onComplete();
    }
  }

  const canSubmit =
    problem.type === "numeric_pair" ||
    problem.type === "boss_multi_part"
      ? pairAnswers[0]?.trim().length > 0 && pairAnswers[1]?.trim().length > 0
      : problem.type === "multiple_choice"
        ? selected !== null
        : problem.type === "sort"
          ? Boolean(
              problem.sortItems?.every((item) => sortAnswers[item.label])
            )
          : problem.type === "visual_choice"
            ? selectedVisualChoiceId !== null
            : true;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 py-10">
      <div className="w-full space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/70">
              Lesson Module
            </p>

            <h1 className="mt-2 text-5xl font-black text-yellow-100">
              {module.title}
            </h1>

            <p className="mt-3 text-lg text-yellow-100/70">
              {module.description}
            </p>
          </div>

          <Button variant="ghost" onClick={onExit}>
            Exit Lesson
          </Button>
        </div>

        <Card className="rounded-3xl border-yellow-300/35 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-yellow-300/60">
                Problem {currentIndex + 1} of {module.problems.length}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-yellow-100">
                {problem.title}
              </h2>
            </div>
          </div>

          <p className="mb-8 text-lg leading-8 text-yellow-100/80">
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
                  ? "border-yellow-300/40 bg-yellow-400/10"
                  : "border-amber-300/40 bg-amber-400/10"
              }`}
            >
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-yellow-300/70">
                {wasCorrect ? "Correct" : "Not quite"}
              </p>

              <p className="text-yellow-100">{problem.explanation}</p>

              {!wasCorrect && problem.hint ? (
                <p className="mt-4 text-yellow-100/70">
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