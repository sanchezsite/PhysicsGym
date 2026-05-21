import type { LessonModule } from "@/types";

export const vectorModule5: LessonModule = {
  id: "vectors-trigonometric-components",
  title: "Trigonometric Components",
  description:
    "Learn how sine and cosine reveal the horizontal and vertical pieces of angled vectors.",
  estimatedMinutes: 24,
  problems: [
    {
      id: "trig-components-why",
      title: "Why Trig Appears",
      type: "multiple_choice",
      prompt:
        "Why do sine and cosine show up when we break an angled vector into components?",
      choices: [
        "Because vectors are always curved.",
        "Because the vector and its components form a right triangle.",
        "Because sine and cosine remove direction.",
        "Because components only work for circles.",
      ],
      correctAnswer:
        "Because the vector and its components form a right triangle.",
      hint:
        "A vector, its x-component, and its y-component create a right triangle.",
      explanation:
        "Sine and cosine enter because an angled vector and its perpendicular components form a right triangle. Trig is the language of side lengths in that triangle.",
    },
    {
      id: "cosine-adjacent",
      title: "Cosine Finds the Adjacent Side",
      type: "multiple_choice",
      prompt:
        "A vector makes an angle θ measured from the positive x-axis. Which component is adjacent to θ?",
      choices: [
        "The x-component.",
        "The y-component.",
        "The full vector magnitude.",
        "Neither component.",
      ],
      correctAnswer: "The x-component.",
      hint:
        "If the angle is measured from the x-axis, the horizontal side touches the angle.",
      explanation:
        "When θ is measured from the x-axis, the x-component is adjacent to the angle, so x = A cos θ.",
    },
    {
      id: "sine-opposite",
      title: "Sine Finds the Opposite Side",
      type: "multiple_choice",
      prompt:
        "A vector makes an angle θ measured from the positive x-axis. Which component is opposite θ?",
      choices: [
        "The x-component.",
        "The y-component.",
        "The full vector magnitude.",
        "The zero vector.",
      ],
      correctAnswer: "The y-component.",
      hint:
        "The side across from the angle is the opposite side.",
      explanation:
        "When θ is measured from the x-axis, the y-component is opposite the angle, so y = A sin θ.",
    },
    {
      id: "component-formulas",
      title: "Choosing the Formula",
      type: "sort",
      prompt:
        "Sort each expression into the component it usually represents when θ is measured from the positive x-axis.",
      sortBuckets: ["X-component", "Y-component"],
      sortItems: [
        { label: "A cos θ", correctBucket: "X-component" },
        { label: "A sin θ", correctBucket: "Y-component" },
      ],
      hint:
        "Cosine gives adjacent. Sine gives opposite.",
      explanation:
        "If θ is measured from the x-axis, the x-component is adjacent to θ, so A cos θ. The y-component is opposite θ, so A sin θ.",
    },
    {
      id: "calculate-components",
      title: "Calculate the Components",
      type: "numeric_pair",
      prompt:
        "A 10-meter vector makes a 60° angle above the positive x-axis. What are its x- and y-components? Use rounded values.",
      pairLabels: ["X-component", "Y-component"],
      pairPlaceholders: ["Example: 5 meters", "Example: 8.7 meters"],
      correctAnswer: ["5 meters", "8.7 meters"],
      hint:
        "Use x = A cos θ and y = A sin θ.",
      explanation:
        "The x-component is 10 cos 60° = 5 meters. The y-component is 10 sin 60° ≈ 8.7 meters.",
    },
    {
      id: "angle-reference-trap",
      title: "Angle Reference Trap",
      type: "multiple_choice",
      prompt:
        "A vector angle is measured from the y-axis instead of the x-axis. What should you do before blindly using x = A cos θ?",
      choices: [
        "Use the formula anyway.",
        "Check which component is adjacent to the given angle.",
        "Set both components equal to zero.",
        "Switch sine and cosine randomly.",
      ],
      correctAnswer:
        "Check which component is adjacent to the given angle.",
      hint:
        "Sine and cosine depend on where the angle is measured from.",
      explanation:
        "The formulas depend on the reference angle. Cosine always gives the adjacent side, but the adjacent side may not be the x-component if the angle is measured from the y-axis.",
    },
    {
      id: "sign-check",
      title: "Sign Check",
      type: "multiple_choice",
      prompt:
        "A vector points up and to the left. What signs should its x- and y-components have?",
      choices: [
        "x positive, y positive",
        "x negative, y positive",
        "x positive, y negative",
        "x negative, y negative",
      ],
      correctAnswer: "x negative, y positive",
      hint:
        "Left means negative x. Up means positive y.",
      explanation:
        "A vector pointing up-left has a negative x-component and a positive y-component.",
    },
    {
      id: "trig-components-boss",
      title: "Rescue Signal Challenge",
      type: "boss_multi_part",
      prompt:
        "A rescue signal points 20 km at 30° above the positive x-axis. What are the x- and y-components? Use rounded values.",
      pairLabels: ["X-component", "Y-component"],
      pairPlaceholders: ["Example: 17.3 km", "Example: 10 km"],
      correctAnswer: ["17.3 km", "10 km"],
      hint:
        "Use x = A cos θ and y = A sin θ.",
      explanation:
        "The x-component is 20 cos 30° ≈ 17.3 km. The y-component is 20 sin 30° = 10 km.",
    },
  ],
};