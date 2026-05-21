import type { LessonModule } from "@/types";

export const vectorModule2: LessonModule = {
  id: "vectors-what-a-vector-is",
  title: "What a Vector Actually Is",
  description:
    "Learn how vectors encode magnitude, direction, equality, opposites, and scaling.",
  estimatedMinutes: 18,
  problems: [
    {
      id: "vector-as-instruction",
      title: "A Directional Instruction",
      type: "multiple_choice",
      prompt:
        'Which statement best describes the vector "8 meters northeast"?',
      choices: [
        "Only a distance.",
        "Only a direction.",
        "A quantity with magnitude and direction.",
        "A unit conversion.",
      ],
      correctAnswer: "A quantity with magnitude and direction.",
      hint: "The 8 meters gives size. Northeast gives direction.",
      explanation:
        "A vector carries both magnitude and direction. Here, 8 meters is the magnitude and northeast is the direction.",
    },
    {
      id: "same-vector-different-place",
      title: "Same Vector, Different Location",
      type: "multiple_choice",
      prompt:
        "Two arrows have the same length and point east, but they start at different places on the screen. Are they the same vector?",
      choices: [
        "Yes, if they have the same magnitude and direction.",
        "No, because they start at different places.",
        "Yes, but only if they are horizontal.",
        "No, because all arrows are different.",
      ],
      correctAnswer: "Yes, if they have the same magnitude and direction.",
      hint: "For free vectors, location on the page is not what defines equality.",
      explanation:
        "Two vectors are equal when they have the same magnitude and direction. Their drawing location does not matter.",
    },
    {
      id: "negative-vector",
      title: "The Negative of a Vector",
      type: "visual_choice",
      prompt:
        "A vector points 4 km east. Which arrow represents the negative of this vector?",
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
          id: "arrow-2-west",
          label: "2 km west",
          magnitude: 2,
          direction: "west",
        },
        {
          id: "arrow-4-north",
          label: "4 km north",
          magnitude: 4,
          direction: "north",
        },
      ],
      correctVisualChoiceId: "arrow-4-west",
      hint: "The negative vector keeps the same magnitude but reverses direction.",
      explanation:
        "The negative of a vector has the same magnitude and the opposite direction. So the negative of 4 km east is 4 km west.",
    },
    {
      id: "scale-vector",
      title: "Scaling a Vector",
      type: "visual_choice",
      prompt:
        "A vector is 2 km north. Which arrow represents twice that vector?",
      visualChoices: [
        {
          id: "arrow-2-north",
          label: "2 km north",
          magnitude: 2,
          direction: "north",
        },
        {
          id: "arrow-4-north",
          label: "4 km north",
          magnitude: 4,
          direction: "north",
        },
        {
          id: "arrow-4-south",
          label: "4 km south",
          magnitude: 4,
          direction: "south",
        },
        {
          id: "arrow-2-east",
          label: "2 km east",
          magnitude: 2,
          direction: "east",
        },
      ],
      correctVisualChoiceId: "arrow-4-north",
      hint: "Multiplying by positive 2 doubles the magnitude but keeps the direction.",
      explanation:
        "Twice a vector means same direction, double the magnitude. So 2 km north becomes 4 km north.",
    },
    {
      id: "opposite-scaling",
      title: "Negative Scaling",
      type: "visual_choice",
      prompt:
        "A vector is 2 km north. Which arrow represents -2 times that vector?",
      visualChoices: [
        {
          id: "arrow-4-north",
          label: "4 km north",
          magnitude: 4,
          direction: "north",
        },
        {
          id: "arrow-4-south",
          label: "4 km south",
          magnitude: 4,
          direction: "south",
        },
        {
          id: "arrow-2-south",
          label: "2 km south",
          magnitude: 2,
          direction: "south",
        },
        {
          id: "arrow-2-east",
          label: "2 km east",
          magnitude: 2,
          direction: "east",
        },
      ],
      correctVisualChoiceId: "arrow-4-south",
      hint: "The 2 doubles the length. The negative sign reverses direction.",
      explanation:
        "Multiplying by -2 doubles the magnitude and reverses the direction. So 2 km north becomes 4 km south.",
    },
    {
      id: "vector-meaning-boss",
      title: "Pilot Correction Challenge",
      type: "multiple_choice",
      prompt:
        "A pilot plans to fly 100 km east, but the correction vector is -100 km east. What does the correction vector mean?",
      choices: [
        "Fly 100 km farther east.",
        "Fly 100 km west.",
        "Fly 200 km east.",
        "Stop moving completely.",
      ],
      correctAnswer: "Fly 100 km west.",
      hint: "The negative of east points west.",
      explanation:
        "A negative vector points opposite the original direction. So -100 km east means 100 km west.",
    },
  ],
};