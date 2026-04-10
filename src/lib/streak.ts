import { getSession } from "./storage";

/**
 * Calculate the current streak of consecutive completed workout days.
 * - Sundays (rest days) are skipped and do not break the streak.
 * - Today is excluded from breaking the streak (user may complete it later).
 */
export function calculateStreak(todayStr: string): number {
  let streak = 0;
  const cursor = new Date(todayStr + "T00:00:00");

  // Check if today is completed — if so, count it
  const todaySession = getSession(todayStr);
  const todayDow = cursor.getDay();
  if (todayDow !== 0 && todaySession?.completed) {
    streak++;
  }

  // Walk backward from yesterday
  cursor.setDate(cursor.getDate() - 1);

  for (let i = 0; i < 365; i++) {
    const dow = cursor.getDay();
    const dateStr = formatDateKey(cursor);

    if (dow === 0) {
      // Sunday — skip, doesn't break or count
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    const session = getSession(dateStr);
    if (session?.completed) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
