import { hours, type DayHours } from "@/data/business";

export type OpenState = "open" | "closing-soon" | "closed";

export type StatusInfo = {
  state: OpenState;
  label: string;
  today: number;
  todayHours: DayHours;
};

function toMin(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getStatus(now: Date = new Date()): StatusInfo {
  const today = now.getDay();
  const todayHours = hours[today];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Check if still open from yesterday's window that crosses midnight
  const yesterday = (today + 6) % 7;
  const yHours = hours[yesterday];
  if (yHours) {
    const yClose = toMin(yHours.close);
    const yOpen = toMin(yHours.open);
    if (yClose < yOpen && nowMin < yClose) {
      // We're in the after-midnight tail of yesterday's window
      return {
        state: nowMin >= yClose - 45 ? "closing-soon" : "open",
        label: nowMin >= yClose - 45 ? "Sluit binnenkort" : "Nu open",
        today,
        todayHours,
      };
    }
  }

  if (!todayHours) {
    return { state: "closed", label: "Gesloten", today, todayHours };
  }

  const open = toMin(todayHours.open);
  let close = toMin(todayHours.close);
  const crossesMidnight = close < open;
  if (crossesMidnight) close += 24 * 60; // treat as same long day

  if (nowMin < open) {
    return { state: "closed", label: "Gesloten", today, todayHours };
  }
  if (nowMin >= close) {
    return { state: "closed", label: "Gesloten", today, todayHours };
  }
  if (close - nowMin <= 45) {
    return { state: "closing-soon", label: "Sluit binnenkort", today, todayHours };
  }
  return { state: "open", label: "Nu open", today, todayHours };
}

export function formatRange(h: DayHours): string {
  if (!h) return "Gesloten";
  return `${h.open} – ${h.close}`;
}
