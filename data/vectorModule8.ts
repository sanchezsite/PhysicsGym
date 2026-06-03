import type { LessonModule } from "@/types";

export const vectorModule8: LessonModule = {
  id: "mechanics-1-vectors-cross-product",
  title: "Cross Product",
  description:
    "Learn how the cross product measures perpendicular interaction and creates a new vector.",
  problems: [
    {
      id: "cross-product-1",
      type: "multiple_choice",
      title: "What does the cross product measure?",
      prompt:
        "The dot product measures alignment. The cross product measures something different. Which idea best matches the cross product?",
      choices: [
        "Parallel alignment",
        "Perpendicular interaction",
        "Temperature change",
        "Total distance traveled",
      ],
      correctAnswer: "Perpendicular interaction",
      explanation:
        "The cross product measures how strongly two vectors interact perpendicularly. It is largest when the vectors are perpendicular and zero when they are parallel.",
      hint: "Think of torque: a force creates rotation best when it pushes perpendicular to a lever arm.",
    },
    {
      id: "cross-product-2",
      type: "multiple_choice",
      title: "Parallel vectors",
      prompt:
        "Two nonzero vectors point in the same direction. What is the magnitude of their cross product?",
      choices: ["Zero", "Maximum", "Negative", "Always 1"],
      correctAnswer: "Zero",
      explanation:
        "Parallel vectors have no perpendicular separation, so their cross product magnitude is zero.",
      hint: "Cross product cares about perpendicularity, not alignment.",
    },
    {
      id: "cross-product-3",
      type: "multiple_choice",
      title: "Perpendicular vectors",
      prompt:
        "Two vectors are perpendicular. When is the cross product magnitude largest?",
      choices: [
        "When the angle is 0°",
        "When the angle is 90°",
        "When the angle is 180°",
        "It is always zero",
      ],
      correctAnswer: "When the angle is 90°",
      explanation:
        "The cross product magnitude is |A||B|sinθ. Since sin90° = 1, perpendicular vectors produce the largest cross product magnitude.",
      hint: "Sine is largest at 90°.",
    },
    {
      id: "cross-product-4",
      type: "multiple_choice",
      title: "Direction is new",
      prompt:
        "If vector A points east and vector B points north, what is special about A × B?",
      choices: [
        "It points east",
        "It points north",
        "It points perpendicular to both A and B",
        "It has no direction",
      ],
      correctAnswer: "It points perpendicular to both A and B",
      explanation:
        "The cross product creates a new vector perpendicular to the plane formed by the original two vectors.",
      hint: "The cross product does not point along either original vector.",
    },
    {
      id: "cross-product-5",
      type: "sort",
      title: "Dot product vs cross product",
      prompt:
        "Sort each idea into the product it belongs to.",
      sortBuckets: ["Dot Product", "Cross Product"],
      sortItems: [
        {
          label: "Measures alignment",
          correctBucket: "Dot Product",
        },
        {
          label: "Measures perpendicular interaction",
          correctBucket: "Cross Product",
        },
        {
          label: "Uses cosine",
          correctBucket: "Dot Product",
        },
        {
          label: "Uses sine",
          correctBucket: "Cross Product",
        },
      ],
      explanation:
        "The dot product uses cosine and measures alignment. The cross product uses sine and measures perpendicular interaction.",
      hint:
        "Cosine connects to along-the-same-line. Sine connects to perpendicular height.",
    },
    {
      id: "cross-product-6",
      type: "multiple_choice",
      title: "Torque intuition",
      prompt:
        "Why does a wrench work best when you push perpendicular to the handle?",
      choices: [
        "Because perpendicular force maximizes rotational effect",
        "Because parallel force is always stronger",
        "Because gravity disappears",
        "Because the wrench becomes lighter",
      ],
      correctAnswer:
        "Because perpendicular force maximizes rotational effect",
      explanation:
        "Torque is based on a cross product. The rotational effect is strongest when the force is perpendicular to the lever arm.",
      hint:
        "A push along the handle does not rotate it much. A sideways push does.",
    },
    {
      id: "cross-product-7",
      type: "numeric_pair",
      title: "Magnitude from sine",
      prompt:
        "Vector A has magnitude 6. Vector B has magnitude 4. The angle between them is 90°. Enter sinθ and the cross product magnitude.",
      pairLabels: ["sinθ", "Magnitude"],
      pairPlaceholders: ["Example: 1", "Example: 24"],
      correctAnswer: ["1", "24"],
      explanation:
        "The cross product magnitude is |A||B|sinθ. Since sin90° = 1, the magnitude is 6 × 4 × 1 = 24.",
      hint:
        "Use |A × B| = |A||B|sinθ.",
    },
    {
      id: "cross-product-boss",
      type: "boss_multi_part",
      title: "Boss problem: turning a bolt",
      prompt:
        "A wrench is 0.5 m long. You push with 20 N at 90° to the wrench. Enter sinθ and the torque magnitude.",
      pairLabels: ["sinθ", "Torque"],
      pairPlaceholders: ["Example: 1", "Example: 10 N m"],
      correctAnswer: ["1", "10 N m"],
      explanation:
        "Torque magnitude is rFsinθ. Here r = 0.5 m, F = 20 N, and sin90° = 1, so torque = 0.5 × 20 × 1 = 10 N m.",
      hint:
        "Torque is the cross-product idea applied to rotation.",
    },
  ],
};