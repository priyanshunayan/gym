import { WorkoutDefinition, WorkoutType } from "./types";

const SCHEDULE: Record<number, WorkoutDefinition> = {
  // 0 = Sunday
  0: {
    type: "rest",
    label: "Rest",
    subtitle: "Recovery",
    category: "rest",
    description: "Full rest or active mobility",
    exercises: [],
  },
  1: {
    type: "strength-a",
    label: "Strength A",
    subtitle: "Full body",
    category: "strength",
    exercises: [
      {
        id: "back-squats",
        name: "Back Squats",
        images: ["/exercises/back-squats-0.jpg", "/exercises/back-squats-1.jpg"],
      },
      {
        id: "bench-press",
        name: "Bench Press",
        images: ["/exercises/bench-press-0.jpg", "/exercises/bench-press-1.jpg"],
      },
      {
        id: "barbell-rows",
        name: "Barbell Rows",
        images: ["/exercises/barbell-rows-0.jpg", "/exercises/barbell-rows-1.jpg"],
      },
      {
        id: "planks",
        name: "Planks",
        images: null,
      },
    ],
  },
  2: {
    type: "easy-run",
    label: "Easy Run",
    subtitle: "Zone 2",
    category: "run",
    description: "30\u201345 mins at conversational pace",
    exercises: [],
  },
  3: {
    type: "strength-c",
    label: "Strength C",
    subtitle: "Full body",
    category: "strength",
    exercises: [
      {
        id: "front-squats",
        name: "Front/Zercher Squats",
        images: null,
      },
      {
        id: "incline-press",
        name: "Incline Press",
        images: ["/exercises/incline-press-0.jpg", "/exercises/incline-press-1.jpg"],
      },
      {
        id: "landmine-rows",
        name: "Landmine Rows",
        images: null,
      },
      {
        id: "rdls",
        name: "RDLs",
        images: null,
      },
    ],
  },
  4: {
    type: "speed-work",
    label: "Speed Work",
    subtitle: "High intensity",
    category: "run",
    description: "Intervals or tempo run",
    exercises: [],
  },
  5: {
    type: "strength-b",
    label: "Strength B",
    subtitle: "Full body",
    category: "strength",
    exercises: [
      {
        id: "deadlifts",
        name: "Deadlifts",
        images: ["/exercises/deadlifts-0.jpg", "/exercises/deadlifts-1.jpg"],
      },
      {
        id: "overhead-press",
        name: "Overhead Press",
        images: ["/exercises/overhead-press-0.jpg", "/exercises/overhead-press-1.jpg"],
      },
      {
        id: "pull-ups",
        name: "Pull-ups",
        images: ["/exercises/pull-ups-0.jpg", "/exercises/pull-ups-1.jpg"],
      },
      {
        id: "hanging-leg-raises",
        name: "Hanging Leg Raises",
        images: null,
      },
    ],
  },
  6: {
    type: "long-run",
    label: "Long Run",
    subtitle: "Endurance",
    category: "run",
    description: "Progressive distance build",
    exercises: [],
  },
};

export function getWorkoutForDate(date: Date): WorkoutDefinition {
  return SCHEDULE[date.getDay()];
}

export function getTodaysWorkout(): WorkoutDefinition {
  return getWorkoutForDate(new Date());
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getWorkoutTypeForDay(dayOfWeek: number): WorkoutType {
  return SCHEDULE[dayOfWeek].type;
}
