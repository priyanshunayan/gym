"use client";

import { WorkoutDefinition } from "@/lib/types";

interface DayHeaderProps {
  dayName: string;
  formattedDate: string;
  workout: WorkoutDefinition;
}

export function DayHeader({ dayName, formattedDate, workout }: DayHeaderProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-5 py-5 text-primary-foreground">
      <p className="text-sm font-medium opacity-80">{formattedDate}</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
        {dayName}
      </h1>
      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-full bg-white/20 px-3 py-0.5 text-sm font-semibold backdrop-blur">
          {workout.label}
        </span>
        <span className="text-sm font-medium opacity-70">
          {workout.subtitle}
        </span>
      </div>
    </div>
  );
}
