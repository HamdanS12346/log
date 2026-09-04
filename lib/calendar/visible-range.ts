import { addMonths, startOfMonth, toDateKey } from "./date-format";
import { getMonthGrid } from "./month-grid";

export type PresentationMode = "single_month" | "dual_month";

export type VisibleRange = {
  months: Date[];
  startDateKey: string;
  endDateKey: string;
};

export function getVisibleMonths(anchor: Date, mode: PresentationMode) {
  const first = startOfMonth(anchor);
  return mode === "dual_month" ? [first, addMonths(first, 1)] : [first];
}

export function getVisibleRange(anchor: Date, mode: PresentationMode): VisibleRange {
  const months = getVisibleMonths(anchor, mode);
  const cells = months.flatMap((month) => getMonthGrid(month));

  return {
    months,
    startDateKey: toDateKey(cells[0].date),
    endDateKey: toDateKey(cells[cells.length - 1].date)
  };
}
