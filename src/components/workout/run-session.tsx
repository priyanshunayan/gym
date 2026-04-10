"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkoutDefinition } from "@/lib/types";
import { Check, CircleCheck, Footprints } from "lucide-react";
import { toast } from "sonner";

interface RunSessionProps {
  workout: WorkoutDefinition;
  completed: boolean;
  onMarkDone: () => void;
}

export function RunSession({ workout, completed, onMarkDone }: RunSessionProps) {
  const handleDone = () => {
    onMarkDone();
    toast.success("Run logged!", {
      description: `${workout.label} marked as done.`,
    });
  };

  return (
    <div className="space-y-3">
      {completed && (
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 dark:bg-emerald-900/20">
          <CircleCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
            Done
          </span>
        </div>
      )}

      <Card className="overflow-hidden border-0 shadow-sm">
        <CardContent className="flex flex-col items-center gap-5 py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Footprints className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold">{workout.label}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {workout.description}
            </p>
          </div>

          {!completed && (
            <Button
              className="mt-2 w-full max-w-xs rounded-xl py-6 text-base font-bold shadow-md"
              size="lg"
              onClick={handleDone}
            >
              <Check className="mr-2 h-5 w-5" />
              Mark as Done
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
