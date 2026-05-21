import type { LessonModule } from "@/types";

export const vectorModule4: LessonModule = {
  id: "vectors-components",
  title: "Breaking Diagonals Into Components",
  description:
    "Learn how to turn an angled vector into horizontal and vertical pieces.",
  estimatedMinutes: 22,
  problems: [
    {
      id: "why-components",
      title: "The Big Unlock",
      type: "multiple_choice",
      prompt: "Why do physicists break diagonal vectors into components?",
      choices: [
        "Because diagonal vectors are not real.",
        "Because horizontal and vertical pieces are often easier to analyze separately.",
        "Because components remove the direction from a vector.",
        "Because vectors can only point east or north.",
      ],
      correctAnswer:
        "Because horizontal and vertical pieces are often easier to analyze separately.",
      hint:
        "Think of a diagonal as being made from sideways motion plus vertical motion.",
      explanation:
        "Components let us replace one angled vector with two simpler pieces: one horizontal and one vertical. This is one of the most powerful moves in physics.",
    },
    {
      id: "projection-intuition",
      title: "Shadow of a Vector",
      type: "multiple_choice",
      prompt:
        "A vector points mostly east and slightly north. Which component should be larger?",
      choices: [
        "The x-component.",
        "The y-component.",
        "They must be equal.",
        "Both components must be zero.",
      ],
      correctAnswer: "The x-component.",
      hint: "If it points mostly east, most of the vector lies horizontally.",
      explanation:
        "The x-component is larger because the vector points more in the horizontal direction than the vertical direction.",
    },
    {
      id: "component-zero",
      title: "Pure Direction",
      type: "multiple_choice",
      prompt: "A vector points exactly east. What is its vertical component?",
      choices: ["Its full magnitude.", "Half its magnitude.", "Zero.", "Negative."],
      correctAnswer: "Zero.",
      hint: "Does an eastward vector point up or down at all?",
      explanation:
        "An exactly eastward vector has no vertical part. Its y-component is zero.",
    },
    {
      id: "basic-components",
      title: "A 3-4-5 Vector",
      type: "numeric_pair",
      prompt:
        "A vector has a horizontal component of 3 meters east and a vertical component of 4 meters north. What are the x-component and y-component?",
      pairLabels: ["X-component", "Y-component"],
      pairPlaceholders: ["Example: 3 meters", "Example: 4 meters"],
      correctAnswer: ["3 meters", "4 meters"],
      hint:
        "The x-component is the horizontal piece. The y-component is the vertical piece.",
      explanation:
        "The vector is built from 3 meters horizontally and 4 meters vertically, so its components are x = 3 meters and y = 4 meters.",
    },
    {
      id: "magnitude-from-components-preview",
      title: "The Whole From the Pieces",
      type: "multiple_choice",
      prompt:
        "A vector has components 3 m east and 4 m north. What is its magnitude?",
      choices: ["1 m", "5 m", "7 m", "12 m"],
      correctAnswer: "5 m",
      hint: "The components form a right triangle.",
      explanation:
        "The vector magnitude is the hypotenuse of a 3-4-5 triangle, so the magnitude is 5 m.",
    },
    {
      id: "sign-of-components",
      title: "Signs Matter",
      type: "multiple_choice",
      prompt:
        "A vector points west and north. What are the signs of its x- and y-components?",
      choices: [
        "x positive, y positive",
        "x negative, y positive",
        "x positive, y negative",
        "x negative, y negative",
      ],
      correctAnswer: "x negative, y positive",
      hint: "West is negative x. North is positive y.",
      explanation:
        "West corresponds to negative x, while north corresponds to positive y. So the vector has x negative and y positive.",
    },
    {
      id: "components-boss",
      title: "Mountain Rescue Challenge",
      type: "boss_multi_part",
      prompt:
        "A rescue helicopter moves 6 km east and 8 km north. What total distance does it travel along this two-part route, and what is the magnitude of its straight-line displacement?",
      pairLabels: ["Total distance", "Displacement magnitude"],
      pairPlaceholders: ["Example: 14 kilometers", "Example: 10 kilometers"],
      correctAnswer: ["14 kilometers", "10 kilometers"],
      hint:
        "Distance is the route length. Displacement magnitude is the straight-line hypotenuse.",
      explanation:
        "The helicopter travels 6 + 8 = 14 kilometers along the route. Its straight-line displacement is the hypotenuse of a 6-8-10 triangle, so the magnitude is 10 kilometers.",
    },
  ],
};