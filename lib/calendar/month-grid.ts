import { toDateKey } from "./date-format";

export const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

export type CalendarDateCell = {
  date: Date;
  dateKey: string;
  dayNumber: number;
  isActiveMonth: boolean;
};

function mondayFirstDayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

export function getMonthGrid(anchor: Date): CalendarDateCell[] {
  const monthStart = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - mondayFirstDayIndex(monthStart));

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);

    return {
      date,
      dateKey: toDateKey(date),
      dayNumber: date.getDate(),
      isActiveMonth: date.getMonth() === anchor.getMonth()
    };
  });
}
