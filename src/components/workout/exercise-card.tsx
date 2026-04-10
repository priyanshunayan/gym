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
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardContent className="space-y-4 p-4">
        {/* Top row: image + name + previous weight */}
        <div className="flex items-center gap-3">
          <ExerciseImage images={exercise.images} name={exercise.name} />
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-bold leading-tight">
              {exercise.name}
            </h3>
            {previousLog && previousLog.maxWeight > 0 ? (
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                Previous: {previousLog.maxWeight} kg
              </p>
            ) : (
              <p className="mt-0.5 text-xs text-muted-foreground">
                No previous record
              </p>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          {/* Set counter */}
          <div className="flex flex-1 items-center justify-between rounded-xl bg-muted/60 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sets
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg"
                disabled={completed || log.setsCompleted <= 0}
                onClick={() =>
                  onUpdate(exercise.id, {
                    setsCompleted: Math.max(0, log.setsCompleted - 1),
                  })
                }
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center text-lg font-extrabold tabular-nums">
                {log.setsCompleted}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
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
          <div className="flex items-center gap-2 rounded-xl bg-muted/60 px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              kg
            </span>
            <Input
              type="number"
              inputMode="decimal"
              className="h-9 w-16 border-0 bg-transparent p-0 text-center text-lg font-extrabold shadow-none focus-visible:ring-0"
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
        </div>
      </CardContent>
    </Card>
  );
}
