import { Card, CardContent } from "@/components/ui/card";
import { Moon } from "lucide-react";

export function RestDay() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Moon className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Today is Rest Day</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Full rest or active mobility. You&apos;ve earned it.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
