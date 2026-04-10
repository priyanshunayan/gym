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
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Stats</h1>
        <p className="text-sm text-muted-foreground">Your workout history</p>
      </div>

      <div className="grid gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-5 px-5 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-900/20">
              <Flame className="h-7 w-7 text-orange-500" />
            </div>
            <div>
              <p className="text-4xl font-extrabold tracking-tight">
                {stats.currentStreak}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                Day streak
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center gap-5 px-5 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 dark:bg-yellow-900/20">
              <Trophy className="h-7 w-7 text-yellow-500" />
            </div>
            <div>
              <p className="text-4xl font-extrabold tracking-tight">
                {stats.totalCompleted}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                Sessions completed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
