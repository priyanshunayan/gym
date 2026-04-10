"use client";

import { Button } from "@/components/ui/button";
import { ExerciseCard } from "./exercise-card";
import { WorkoutDefinition, ExerciseLog } from "@/lib/types";
import { Check, CircleCheck } from "lucide-react";
import { toast } from "sonner";

interface StrengthSessionProps {
  workout: WorkoutDefinition;
  exercises: ExerciseLog[];
  previousExercises: ExerciseLog[] | null;
  completed: boolean;
  onUpdateExercise: (exerciseId: string, patch: Partial<ExerciseLog>) => void;
  onComplete: () => void;
}

export function StrengthSession({
  workout,
  exercises,
  previousExercises,
  completed,
  onUpdateExercise,
  onComplete,
}: StrengthSessionProps) {
  const handleComplete = () => {
    onComplete();
    toast.success("Session completed!", {
      description: `${workout.label} done. Keep it up!`,
    });
  };

  return (
    <div className="space-y-3">
      {completed && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 dark:bg-emerald-900/20">
          <CircleCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
            Session Completed
          </span>
        </div>
      )}

      {workout.exercises.map((exerciseDef) => {
        const log = exercises.find((e) => e.exerciseId === exerciseDef.id);
        const prevLog = previousExercises?.find(
          (e) => e.exerciseId === exerciseDef.id
        );
        if (!log) return null;

        return (
          <ExerciseCard
            key={exerciseDef.id}
            exercise={exerciseDef}
            log={log}
            previousLog={prevLog}
            completed={completed}
            onUpdate={onUpdateExercise}
          />
        );
      })}

      {!completed && (
        <Button
          className="w-full rounded-xl py-6 text-base font-bold shadow-md"
          size="lg"
          onClick={handleComplete}
        >
          <Check className="mr-2 h-5 w-5" />
          Complete Session
        </Button>
      )}
    </div>
  );
}
