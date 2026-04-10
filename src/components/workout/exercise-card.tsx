"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExerciseDefinition, ExerciseLog } from "@/lib/types";
import { ExerciseImage } from "./exercise-image";
import { Minus, Plus } from "lucide-react";

interface ExerciseCardProps {
  exercise: ExerciseDefinition;
  log: ExerciseLog;
  previousLog: ExerciseLog | undefined;
  completed: boolean;
  onUpdate: (exerciseId: string, patch: Partial<ExerciseLog>) => void;
}

export function ExerciseCard({
  exercise,
  log,
  previousLog,
  completed,
  onUpdate,
}: ExerciseCardProps) {
  return (
    <Card>
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{exercise.name}</h3>
          {previousLog && previousLog.maxWeight > 0 && (
            <span className="text-sm text-muted-foreground">
              Last: {previousLog.maxWeight} kg
            </span>
          )}
        </div>

        <ExerciseImage images={exercise.images} name={exercise.name} />

        {/* Set counter */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Sets
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              disabled={completed || log.setsCompleted <= 0}
              onClick={() =>
                onUpdate(exercise.id, {
                  setsCompleted: Math.max(0, log.setsCompleted - 1),
                })
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-xl font-bold tabular-nums">
              {log.setsCompleted}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              disabled={completed}
              onClick={() =>
                onUpdate(exercise.id, {
                  setsCompleted: log.setsCompleted + 1,
                })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Weight input */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Max weight (kg)
          </span>
          <Input
            type="number"
            inputMode="decimal"
            className="w-24 text-right"
            value={log.maxWeight || ""}
            placeholder="0"
            disabled={completed}
            onChange={(e) =>
              onUpdate(exercise.id, {
                maxWeight: parseFloat(e.target.value) || 0,
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
