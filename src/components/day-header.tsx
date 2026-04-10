import { Badge } from "@/components/ui/badge";
import { WorkoutDefinition } from "@/lib/types";

interface DayHeaderProps {
  dayName: string;
  formattedDate: string;
  workout: WorkoutDefinition;
}

export function DayHeader({ dayName, formattedDate, workout }: DayHeaderProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{dayName}</h1>
        <Badge variant="secondary">{workout.subtitle}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{formattedDate}</p>
      <h2 className="text-lg font-medium text-primary">{workout.label}</h2>
    </div>
  );
}
