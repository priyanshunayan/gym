"use client";

import { useState, useEffect } from "react";
import { ExerciseLog, WorkoutType } from "@/lib/types";
import { findLastSessionByType } from "@/lib/storage";

export function usePreviousSession(
  workoutType: WorkoutType,
  currentDate: string
) {
  const [previousExercises, setPreviousExercises] = useState<
    ExerciseLog[] | null
  >(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const prev = findLastSessionByType(workoutType, currentDate);
    if (prev) {
      setPreviousExercises(prev.exercises);
    }
    setLoaded(true);
  }, [workoutType, currentDate]);

  return { previousExercises, loaded };
}
