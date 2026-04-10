export type WorkoutType =
  | "strength-a"
  | "strength-b"
  | "strength-c"
  | "easy-run"
  | "speed-work"
  | "long-run"
  | "rest";

export type WorkoutCategory = "strength" | "run" | "rest";

export interface ExerciseDefinition {
  id: string;
  name: string;
  /** Path pair for animated images: [start, end]. Null if no images available. */
  images: [string, string] | null;
}

export interface WorkoutDefinition {
  type: WorkoutType;
  label: string;
  subtitle: string;
  category: WorkoutCategory;
  description?: string;
  exercises: ExerciseDefinition[];
}

export interface ExerciseLog {
  exerciseId: string;
  setsCompleted: number;
  maxWeight: number;
}

export interface Session {
  date: string; // "YYYY-MM-DD"
  workoutType: WorkoutType;
  category: WorkoutCategory;
  completed: boolean;
  completedAt?: string;
  exercises: ExerciseLog[];
}

export interface Stats {
  currentStreak: number;
  totalCompleted: number;
}
