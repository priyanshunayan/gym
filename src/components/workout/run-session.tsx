"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WorkoutDefinition } from "@/lib/types";
import { Check, Footprints } from "lucide-react";
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
    <div className="space-y-4">
      {completed && (
        <Badge
          variant="secondary"
          className="w-full justify-center bg-emerald-100 py-1.5 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
        >
          <Check className="mr-1 h-3.5 w-3.5" />
          Done
        </Badge>
      )}

      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Footprints className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{workout.label}</h3>
            <p className="text-sm text-muted-foreground">
              {workout.description}
            </p>
          </div>

          {!completed && (
            <Button
              className="mt-2 w-full max-w-xs py-6 text-base font-semibold"
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
