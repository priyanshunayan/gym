"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/use-stats";
import { Flame, Trophy } from "lucide-react";

export default function HistoryPage() {
  const { stats, loaded } = useStats();

  if (!loaded) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Stats</h1>
        <p className="text-sm text-muted-foreground">Your workout history</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <Flame className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalCompleted}</p>
              <p className="text-sm text-muted-foreground">
                Total sessions completed
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
