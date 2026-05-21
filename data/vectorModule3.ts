import type { LessonModule } from "@/types";

export const vectorModule3: LessonModule = {
  id: "vectors-combining-motion",
  title: "Combining Motion",
  description:
    "Learn how vectors add, subtract, and combine into a single resultant motion.",
  estimatedMinutes: 20,
  problems: [
    {
      id: "journey-not-arithmetic",
      title: "Vectors Are Journeys",
      type: "multiple_choice",
      prompt:
        "You walk 3 m east, then 4 m north. Why is your displacement not simply 7 m east?",
      choices: [
        "Because meters cannot be added.",
        "Because the two motions point in different directions.",
        "Because north cancels east.",
        "Because displacement is always zero.",
      ],
      correctAnswer: "Because the two motions point in different directions.",
      hint: "Adding vectors depends on direction, not just size.",
      explanation:
        "Vector addition is geometric. A 3 m east motion and a 4 m north motion combine into a diagonal resultant, not 7 m east.",
    },
    {
      id: "right-angle-resultant",
      title: "The Resultant Path",
      type: "multiple_choice",
      prompt:
        "You walk 3 m east, then 4 m north. What is the magnitude of your final displacement?",
      choices: ["1 m", "5 m", "7 m", "12 m"],
      correctAnswer: "5 m",
      hint: "The east and north motions form the legs of a right triangle.",
      explanation:
        "The resultant displacement is the hypotenuse of a 3-4-5 right triangle, so its magnitude is 5 m.",
    },
    {
      id: "head-to-tail",
      title: "Head-to-Tail Addition",
      type: "multiple_choice",
      prompt:
        "When adding vector A followed by vector B graphically, where should you place the tail of vector B?",
      choices: [
        "At the tail of vector A.",
        "At the head of vector A.",
        "At the origin no matter what.",
        "At the midpoint of vector A.",
      ],
      correctAnswer: "At the head of vector A.",
      hint: "The second motion starts where the first motion ends.",
      explanation:
        "In head-to-tail addition, the tail of the next vector is placed at the head of the previous vector.",
    },
    {
      id: "commutative-motion",
      title: "Order Does Not Change the Result",
      type: "multiple_choice",
      prompt:
        "You walk 3 m east and 4 m north. If you instead walk 4 m north first and then 3 m east, what changes?",
      choices: [
        "The final displacement changes.",
        "Only the path changes; the final displacement is the same.",
        "The distance becomes zero.",
        "The north motion becomes negative.",
      ],
      correctAnswer: "Only the path changes; the final displacement is the same.",
      hint: "Compare the starting and ending points.",
      explanation:
        "Vector addition is commutative. The route can look different, but the final displacement is the same.",
    },
    {
      id: "vector-subtraction",
      title: "Subtraction Means Add the Opposite",
      type: "visual_choice",
      prompt:
        "Vector A is 4 km east. Which arrow represents A - A?",
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
          id: "arrow-0-east",
          label: "0 km",
          magnitude: 0,
          direction: "east",
        },
      ],
      correctVisualChoiceId: "arrow-0-east",
      hint: "A - A means A plus the opposite of A.",
      explanation:
        "A vector minus itself gives the zero vector. The east motion is exactly canceled by the west motion.",
    },
    {
      id: "missing-vector",
      title: "Find the Missing Motion",
      type: "multiple_choice",
      prompt:
        "You start at home. After walking 5 m east, you want your final displacement to be zero. What second motion do you need?",
      choices: ["5 m east", "5 m west", "5 m north", "10 m west"],
      correctAnswer: "5 m west",
      hint: "To return to the start, you need the opposite displacement.",
      explanation:
        "A 5 m west displacement cancels the original 5 m east displacement, giving zero net displacement.",
    },
    {
      id: "treasure-map-boss",
      title: "Treasure Map Challenge",
      type: "boss_multi_part",
      prompt:
        "A treasure map says: walk 6 m east, then 8 m north. What total distance do you walk, and what is the magnitude of your final displacement?",
      correctAnswer: ["14 meters", "10 meters"],
      hint:
        "Distance is total path. Displacement is the straight-line result.",
      explanation:
        "The total distance is 6 + 8 = 14 meters. The displacement is the hypotenuse of a 6-8-10 triangle, so it is 10 meters.",
    },
  ],
};