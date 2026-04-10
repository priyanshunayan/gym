import { Card, CardContent } from "@/components/ui/card";
import { Moon } from "lucide-react";

export function RestDay() {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <CardContent className="flex flex-col items-center gap-5 py-14">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
          <Moon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold">Today is Rest Day</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Full rest or active mobility.
            <br />
            You&apos;ve earned it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
