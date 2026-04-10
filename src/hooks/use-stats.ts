"use client";

import { useState, useEffect } from "react";
import { Stats } from "@/lib/types";
import { getAllCompletedSessionCount } from "@/lib/storage";
import { calculateStreak } from "@/lib/streak";
import { toDateString } from "@/lib/schedule";

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    currentStreak: 0,
    totalCompleted: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const today = toDateString(new Date());
    setStats({
      currentStreak: calculateStreak(today),
      totalCompleted: getAllCompletedSessionCount(),
    });
    setLoaded(true);
  }, []);

  return { stats, loaded };
}
