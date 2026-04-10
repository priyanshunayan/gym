"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExerciseCard } from "./exercise-card";
import { WorkoutDefinition, ExerciseLog } from "@/lib/types";
import { Check } from "lucide-react";
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
    <div className="space-y-4">
      {completed && (
        <Badge
          variant="secondary"
          className="w-full justify-center bg-emerald-100 py-1.5 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <Check className="mr-1 h-3.5 w-3.5" />
          Session Completed
        </Badge>
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
          className="w-full py-6 text-base font-semibold"
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
