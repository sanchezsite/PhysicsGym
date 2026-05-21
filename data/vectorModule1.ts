import type { LessonModule } from "@/types";

export type LessonInteractionType =
  | "multiple_choice"
  | "sort"
  | "numeric_pair"
  | "visual_choice"
  | "boss_multi_part";

export type LessonProblem = {
  id: string;
  title: string;
  type: LessonInteractionType;
  prompt: string;
  choices?: string[];
  correctAnswer?: string | string[];
  hint?: string;
  explanation: string;
};

export const vectorModule1: LessonModule = {
  id: "vectors-why-numbers-arent-enough",
  title: "Why Numbers Aren’t Enough",
  description:
    "Understand why some physical quantities require direction, not just magnitude.",
  estimatedMinutes: 15,
  problems: [
    {
      id: "robot-instruction",
      title: "Incomplete Instruction",
      type: "multiple_choice",
      prompt:
        'A robot receives the command: "Move 5 meters." Is this enough information to know where it ends up?',
      choices: [
        "Yes, because 5 meters gives the distance.",
        "No, because we also need direction.",
        "Yes, because direction does not matter in physics.",
        "No, because meters are not a physics unit.",
      ],
      correctAnswer: "No, because we also need direction.",
      hint:
        "Could two robots both move 5 meters and end up in different places?",
      explanation:
        "Magnitude alone is not enough when direction changes the outcome. This is why vectors exist.",
    },

    {
  id: "scalar-vector-sort",
  title: "Scalar or Vector?",
  type: "sort",
  prompt:
    "Classify each quantity as either a scalar or a vector.",
  sortBuckets: ["Scalar", "Vector"],
  sortItems: [
    { label: "mass", correctBucket: "Scalar" },
    { label: "temperature", correctBucket: "Scalar" },
    { label: "speed", correctBucket: "Scalar" },
    { label: "energy", correctBucket: "Scalar" },
    { label: "displacement", correctBucket: "Vector" },
    { label: "velocity", correctBucket: "Vector" },
    { label: "force", correctBucket: "Vector" },
    { label: "acceleration", correctBucket: "Vector" },
  ],
  hint:
    "Ask: does this quantity need direction to be fully described?",
  explanation:
    "Mass, temperature, speed, and energy are scalars because they only need magnitude. Displacement, velocity, force, and acceleration are vectors because direction is part of their meaning.",
},

    {
      id: "distance-vs-displacement",
      title: "Distance vs Displacement",
      type: "numeric_pair",
      prompt:
        "You walk 3 meters east, then 3 meters west. What total distance did you walk, and what is your displacement?",
      correctAnswer: ["6 meters", "0 meters"],
      hint:
        "Distance tracks path length. Displacement tracks net position change.",
      explanation:
        "Distance and displacement answer different physical questions.",
    },

    {
      id: "speed-vs-velocity",
      title: "Same Speed, Different Velocity",
      type: "multiple_choice",
      prompt:
        "Car A drives 60 mph north. Car B drives 60 mph south. Which statement is true?",
      choices: [
        "They have the same speed and same velocity.",
        "They have different speeds and different velocities.",
        "They have the same speed but different velocities.",
        "They have different speeds but the same velocity.",
      ],
      correctAnswer: "They have the same speed but different velocities.",
      explanation:
        "Speed ignores direction. Velocity includes direction.",
    },

    {
      id: "equal-opposite-forces",
      title: "Equal Pulls",
      type: "multiple_choice",
      prompt:
        "Two people pull equally on a box in opposite directions. Why doesn't it move?",
      choices: [
        "The forces disappear.",
        "The vector sum of the forces is zero.",
        "The forces are not real.",
        "Direction does not matter for force.",
      ],
      correctAnswer: "The vector sum of the forces is zero.",
      explanation:
        "Equal and opposite vectors cancel.",
    },

    {
  id: "vector-arrow",
  title: "Representing a Vector",
  type: "visual_choice",
  prompt:
    "A hiker’s displacement is 4 km east. Which arrow represents this correctly?",
  visualChoices: [
    {
      id: "arrow-4-east",
      label: "4 km east",
      magnitude: 4,
      direction: "east",
    },
    {
      id: "arrow-4-west",
      label: "4 km west",
      magnitude: 4,
      direction: "west",
    },
    {
      id: "arrow-2-east",
      label: "2 km east",
      magnitude: 2,
      direction: "east",
    },
    {
      id: "arrow-4-north",
      label: "4 km north",
      magnitude: 4,
      direction: "north",
    },
  ],
  correctVisualChoiceId: "arrow-4-east",
  hint:
    "A vector must match both the size and the direction.",
  explanation:
    "The correct arrow must point east and represent a magnitude of 4 km. If either the length or direction is wrong, the vector is wrong.",
},

    {
      id: "drone-boss",
      title: "Drone Delivery Challenge",
      type: "boss_multi_part",
      prompt:
        "A drone flies 10 meters east, then 10 meters west. What distance did it travel, and what is its displacement?",
      correctAnswer: ["20 meters", "0 meters"],
      explanation:
        "Distance is total path traveled. Displacement is net change in position.",
    },
  ],
};