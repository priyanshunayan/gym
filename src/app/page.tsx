"use client";

import { useEffect, useState } from "react";
import { DayHeader } from "@/components/day-header";
import { StrengthSession } from "@/components/workout/strength-session";
import { RunSession } from "@/components/workout/run-session";
import { RestDay } from "@/components/workout/rest-day";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { usePreviousSession } from "@/hooks/use-previous-session";
import { useStats } from "@/hooks/use-stats";
import {
  getTodaysWorkout,
  getDayName,
  formatDate,
  toDateString,
} from "@/lib/schedule";
import { Flame, Trophy } from "lucide-react";

export default function HomePage() {
  const [today] = useState(() => new Date());
  const workout = getTodaysWorkout();
  const dateStr = toDateString(today);

  const { session, loaded, updateExercise, completeSession, markRunDone } =
    useSession(dateStr, workout);
  const { previousExercises } = usePreviousSession(workout.type, dateStr);
  const { stats, loaded: statsLoaded } = useStats();

  // Re-compute stats after session completion
  const [localStats, setLocalStats] = useState(stats);
  useEffect(() => {
    if (statsLoaded) setLocalStats(stats);
  }, [stats, statsLoaded]);

  if (!loaded) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DayHeader
        dayName={getDayName(today)}
        formattedDate={formatDate(today)}
        workout={workout}
      />

      {/* Stats bar */}
      {statsLoaded && (
        <div className="flex gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">
              {localStats.currentStreak} day streak
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {localStats.totalCompleted} sessions
            </span>
          </div>
        </div>
      )}

      {/* Workout content */}
      {workout.category === "rest" && <RestDay />}

      {workout.category === "run" && session && (
        <RunSession
          workout={workout}
          completed={session.completed}
          onMarkDone={markRunDone}
        />
      )}

      {workout.category === "strength" && session && (
        <StrengthSession
          workout={workout}
          exercises={session.exercises}
          previousExercises={previousExercises}
          completed={session.completed}
          onUpdateExercise={updateExercise}
          onComplete={completeSession}
        />
      )}
    </div>
  );
}
