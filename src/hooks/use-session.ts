"use client";

import { useState, useEffect, useCallback } from "react";
import { Session, ExerciseLog, WorkoutDefinition } from "@/lib/types";
import { getSession, saveSession } from "@/lib/storage";

export function useSession(date: string, workout: WorkoutDefinition) {
  const [session, setSession] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = getSession(date);
    if (existing) {
      setSession(existing);
    } else if (workout.category !== "rest") {
      // Create a blank session
      const blank: Session = {
        date,
        workoutType: workout.type,
        category: workout.category,
        completed: false,
        exercises: workout.exercises.map((ex) => ({
          exerciseId: ex.id,
          setsCompleted: 0,
          maxWeight: 0,
        })),
      };
      setSession(blank);
    }
    setLoaded(true);
  }, [date, workout]);

  const updateExercise = useCallback(
    (exerciseId: string, patch: Partial<ExerciseLog>) => {
      setSession((prev) => {
        if (!prev) return prev;
        const updated: Session = {
          ...prev,
          exercises: prev.exercises.map((ex) =>
            ex.exerciseId === exerciseId ? { ...ex, ...patch } : ex
          ),
        };
        saveSession(updated);
        return updated;
      });
    },
    []
  );

  const completeSession = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated: Session = {
        ...prev,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      saveSession(updated);
      return updated;
    });
  }, []);

  const markRunDone = useCallback(() => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated: Session = {
        ...prev,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      saveSession(updated);
      return updated;
    });
  }, []);

  return { session, loaded, updateExercise, completeSession, markRunDone };
}
