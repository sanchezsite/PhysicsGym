export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Topic = "Forces" | "Energy" | "Momentum" | "Rotation" | "Electricity";
export type Screen = "landing" | "auth" | "dashboard" | "onboarding" | "path" | "problem" | "complete";
export type Level = "new" | "highschool" | "college" | "intermediate" | "advanced" | "quantum";
export type Struggle = "translation" | "principles" | "math" | "multistep" | "visualization" | "unsure";
export type Challenge = "gentle" | "medium" | "hard";
export type FeedbackState = "idle" | "correct" | "incorrect";
export type DiagramType = "elevator" | "two-blocks" | "loop" | "rolling" | "capacitor";
export type AuthMode = "signin" | "signup";

export type AuthUser = { id: string; email: string };

export type SavedProfile = {
  level: Level | null;
  struggle: Struggle | null;
  challenge: Challenge | null;
  current_path_ids: number[] | null;
  current_unit_id: string | null;
  current_problem_index: number | null;
  updated_at?: string | null;
};

export type Problem = {
  id: number;
  title: string;
  topic: Topic;
  difficulty: Difficulty;
  time: string;
  pattern: string;
  prompt: string;
  diagram?: DiagramType;
  choices: string[];
  correctChoiceIndex: number;
  correctFeedback: string;
  conceptualHint: string;
  solution: string[];
  finalAnswer: string;
};

export type UserProfile = {
  level: Level | null;
  struggle: Struggle | null;
  challenge: Challenge | null;
};

export type Option<T extends string> = {
  value: T;
  label: string;
  description: string;
};

export type LearningPath = {
  title: string;
  subtitle: string;
  problemIds: number[];
  mission: string[];
};

export type CurriculumUnit = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  problemIds: number[];
};

export type CurriculumSection = {
  id: string;
  title: string;
  description: string;
  units: CurriculumUnit[];
};

export type LessonInteractionType =
  | "multiple_choice"
  | "sort"
  | "numeric_pair"
  | "visual_choice"
  | "boss_multi_part";

export type SortItem = {
  label: string;
  correctBucket: string;
};

export type VisualChoice = {
  id: string;
  label: string;
  magnitude: number;
  direction: "east" | "west" | "north" | "south";
};

export type LessonProblem = {
  id: string;
  title: string;
  type: LessonInteractionType;
  prompt: string;
  choices?: string[];
  correctAnswer?: string | string[];
  sortBuckets?: string[];
  sortItems?: SortItem[];
  hint?: string;
  explanation: string;
  visualChoices?: VisualChoice[];
  correctVisualChoiceId?: string; 
  pairLabels?: [string, string];
  pairPlaceholders?: [string, string];
};

export type LessonModule = {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  problems: LessonProblem[];
};