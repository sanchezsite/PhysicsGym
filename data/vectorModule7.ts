import type { LessonModule } from "@/types";

export const vectorModule7: LessonModule = {
  id: "mechanics-1-vectors-dot-product",
  title: "Dot Product",
  description:
    "Learn how the dot product measures alignment between two vectors.",
  problems: [
    {
      id: "dot-product-1",
      type: "multiple_choice",
      title: "What does the dot product measure?",
      prompt:
        "The dot product is useful because it measures how much two vectors point in the same direction. Which idea best matches that?",
      choices: [
        "Turning strength",
        "Alignment",
        "Curvature",
        "Randomness",
      ],
      correctAnswer: "Alignment",
      explanation:
        "The dot product measures alignment. If two vectors point in the same direction, the dot product is positive. If they are perpendicular, it is zero. If they point mostly opposite, it is negative.",
      hint: "Think: how much does one vector point along another?",
    },
    {
      id: "dot-product-2",
      type: "multiple_choice",
      title: "Perpendicular vectors",
      prompt:
        "Two nonzero vectors are perpendicular. What is their dot product?",
      choices: ["Positive", "Negative", "Zero", "Always 1"],
      correctAnswer: "Zero",
      explanation:
        "Perpendicular vectors have no alignment with each other, so their dot product is zero.",
      hint:
        "If one vector points east and the other points north, neither points along the other.",
    },
    {
      id: "dot-product-3",
      type: "multiple_choice",
      title: "Same direction",
      prompt:
        "Two nonzero vectors point in the same direction. What sign is their dot product?",
      choices: ["Positive", "Negative", "Zero", "Imaginary"],
      correctAnswer: "Positive",
      explanation:
        "Vectors pointing in the same direction have positive alignment, so their dot product is positive.",
      hint: "Same direction means strong alignment.",
    },
    {
      id: "dot-product-4",
      type: "multiple_choice",
      title: "Opposite direction",
      prompt:
        "Two nonzero vectors point in exactly opposite directions. What sign is their dot product?",
      choices: ["Positive", "Negative", "Zero", "Always 1"],
      correctAnswer: "Negative",
      explanation:
        "Opposite vectors have negative alignment, so their dot product is negative.",
      hint: "Opposite direction means anti-alignment.",
    },
    {
      id: "dot-product-5",
      type: "sort",
      title: "Dot product signs",
      prompt:
        "Sort each situation by the sign of its dot product.",
      sortBuckets: ["Positive", "Zero", "Negative"],
      sortItems: [
        {
          label: "Two vectors point the same way",
          correctBucket: "Positive",
        },
        {
          label: "Two vectors are perpendicular",
          correctBucket: "Zero",
        },
        {
          label: "Two vectors point opposite ways",
          correctBucket: "Negative",
        },
      ],
      explanation:
        "Dot product sign tells us alignment: same direction is positive, perpendicular is zero, opposite direction is negative.",
      hint:
        "Positive means aligned. Zero means no alignment. Negative means opposite alignment.",
    },
    {
      id: "dot-product-6",
      type: "multiple_choice",
      title: "Formula meaning",
      prompt:
        "The formula A · B = |A||B|cosθ contains cosθ. What does cosθ represent here?",
      choices: [
        "How aligned the vectors are",
        "The total mass of the system",
        "The curvature of the path",
        "The number of components",
      ],
      correctAnswer: "How aligned the vectors are",
      explanation:
        "Cosθ is the alignment factor. It is 1 for same direction, 0 for perpendicular, and -1 for opposite direction.",
      hint:
        "Cosine changes depending on the angle between the two vectors.",
    },
    {
      id: "dot-product-7",
      type: "numeric_pair",
      title: "Component formula",
      prompt:
        "Vector A has components (3, 4). Vector B has components (2, 1). Compute A · B by multiplying matching components and adding. Enter the x-part and y-part contributions.",
      pairLabels: ["X contribution", "Y contribution"],
      pairPlaceholders: ["Example: 6", "Example: 4"],
      correctAnswer: ["6", "4"],
      explanation:
        "The x contribution is 3 × 2 = 6. The y contribution is 4 × 1 = 4. The full dot product is 6 + 4 = 10.",
      hint:
        "Use A · B = AxBx + AyBy.",
    },
    {
      id: "dot-product-boss",
      type: "boss_multi_part",
      title: "Boss problem: work as alignment",
      prompt:
        "A force of 10 N acts at 60° above the direction of motion. The object moves 5 m horizontally. Enter the effective force along motion and the work done.",
      pairLabels: ["Effective force", "Work"],
      pairPlaceholders: ["Example: 5 N", "Example: 25 J"],
      correctAnswer: ["5 N", "25 J"],
      explanation:
        "Only the aligned part of the force does work. The effective force is 10cos60° = 5 N. Work = force along motion × displacement = 5 × 5 = 25 J.",
      hint:
        "The dot product keeps only the part of force aligned with displacement.",
    },
  ],
};