import { Session, WorkoutType } from "./types";

const SESSION_PREFIX = "gym:session:";

export function getSession(date: string): Session | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`${SESSION_PREFIX}${date}`);
  if (!raw) return null;
  return JSON.parse(raw) as Session;
}

export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `${SESSION_PREFIX}${session.date}`,
    JSON.stringify(session)
  );
}

/**
 * Find the last completed session of the same workout type.
 * Walks backward by 7-day increments (same weekday) up to 52 weeks.
 */
export function findLastSessionByType(
  workoutType: WorkoutType,
  beforeDate: string
): Session | null {
  if (typeof window === "undefined") return null;

  const d = new Date(beforeDate + "T00:00:00");
  for (let i = 0; i < 52; i++) {
    d.setDate(d.getDate() - 7);
    const key = formatDateKey(d);
    const session = getSession(key);
    if (session && session.workoutType === workoutType && session.completed) {
      return session;
    }
  }
  return null;
}

export function getAllCompletedSessionCount(): number {
  if (typeof window === "undefined") return 0;
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(SESSION_PREFIX)) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const session = JSON.parse(raw) as Session;
        if (session.completed) count++;
      }
    }
  }
  return count;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
