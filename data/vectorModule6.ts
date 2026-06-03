import type { LessonModule } from "@/types";

export const vectorModule6: LessonModule = {
  id: "mechanics-1-vectors-rebuild",
  title: "Rebuilding Vectors",
  description:
    "Learn how to reconstruct a vector from its horizontal and vertical components.",
  problems: [
    {
      id: "vector-rebuild-1",
      type: "multiple_choice",
      title: "What do components tell us?",
      prompt:
        "A vector has x and y components. What information do those components fully determine?",
      choices: [
        "Only the direction",
        "Only the magnitude",
        "The full vector",
        "Nothing unless acceleration is known",
      ],
      correctAnswer: "The full vector",
      explanation:
        "Once you know both perpendicular components, you know the complete vector. Magnitude and direction can be reconstructed.",
    },

    {
      id: "vector-rebuild-2",
      type: "multiple_choice",
      title: "Magnitude from components",
      prompt:
        "A vector has components x = 3 and y = 4. What is its magnitude?",
      choices: ["5", "7", "1", "12"],
      correctAnswer: "5",
      explanation:
        "Use the Pythagorean theorem: magnitude = √(3² + 4²) = 5.",
    },

    {
      id: "vector-rebuild-3",
      type: "multiple_choice",
      title: "Direction intuition",
      prompt:
        "A vector has x = 6 and y = 6. Which direction is most accurate?",
      choices: [
        "0° above horizontal",
        "45° above horizontal",
        "90° upward",
        "135° above horizontal",
      ],
      correctAnswer: "45° above horizontal",
      explanation:
        "Equal horizontal and vertical components form an isosceles right triangle, giving 45°.",
    },

    {
      id: "vector-rebuild-4",
      type: "numeric_pair",
      title: "Magnitude + direction",
      prompt:
        "A vector has x = 8 and y = 6. Enter its magnitude and approximate angle above horizontal.",
      pairLabels: ["Magnitude", "Angle"],
      pairPlaceholders: ["Example: 10", "Example: 37 degrees"],
      correctAnswer: ["10", "37 degrees"],
      explanation:
        "Magnitude = √(8² + 6²) = 10. Angle = tan⁻¹(6/8) ≈ 37°.",
      hint:
        "Use Pythagorean theorem first, then inverse tangent.",
    },

    {
      id: "vector-rebuild-5",
      type: "sort",
      title: "Magnitude vs direction ingredients",
      prompt: "Sort what belongs to each calculation.",
      sortBuckets: ["Magnitude", "Direction"],
      sortItems: [
        {
          label: "Pythagorean theorem",
          correctBucket: "Magnitude",
        },
        {
          label: "Inverse tangent",
          correctBucket: "Direction",
        },
        {
          label: "x² + y²",
          correctBucket: "Magnitude",
        },
        {
          label: "y/x ratio",
          correctBucket: "Direction",
        },
      ],
      explanation:
        "Magnitude comes from geometric length. Direction comes from comparing side lengths.",
    },

    {
      id: "vector-rebuild-boss",
      type: "boss_multi_part",
      title: "Boss problem: reconstruct the launch vector",
      prompt:
        "A projectile has horizontal component 12 m/s and vertical component 5 m/s. Enter total speed and approximate launch angle.",
      pairLabels: ["Speed", "Angle"],
      pairPlaceholders: ["Example: 13", "Example: 23 degrees"],
      correctAnswer: ["13", "23 degrees"],
      explanation:
        "Speed = √(12² + 5²) = 13. Angle = tan⁻¹(5/12) ≈ 23°.",
      hint:
        "Build the triangle from the components, then solve for hypotenuse and angle.",
    },
  ],
};