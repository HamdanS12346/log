import { describe, expect, it } from "vitest";
import { monthKey, toDateKey } from "@/lib/calendar/date-format";
import { getMonthGrid, WEEKDAY_LABELS } from "@/lib/calendar/month-grid";
import { getVisibleRange, getVisibleMonths } from "@/lib/calendar/visible-range";

describe("calendar month utilities", () => {
  it("uses Monday-first weekday labels", () => {
    expect(WEEKDAY_LABELS).toEqual(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
  });

  it("formats stable local date keys", () => {
    expect(toDateKey(new Date(2026, 8, 4))).toBe("2026-09-04");
    expect(monthKey(new Date(2026, 8, 4))).toBe("2026-09");
  });

  it("builds a stable six-week grid for a month", () => {
    const grid = getMonthGrid(new Date(2026, 8, 1));

    expect(grid).toHaveLength(42);
    expect(grid[0]).toMatchObject({
      dateKey: "2026-08-31",
      dayNumber: 31,
      isActiveMonth: false
    });
    expect(grid.some((cell) => cell.dateKey === "2026-09-04" && cell.isActiveMonth)).toBe(true);
  });

  it("returns one visible month for mobile and two for desktop", () => {
    const anchor = new Date(2026, 8, 4);

    expect(getVisibleMonths(anchor, "single_month").map(monthKey)).toEqual(["2026-09"]);
    expect(getVisibleMonths(anchor, "dual_month").map(monthKey)).toEqual([
      "2026-09",
      "2026-10"
    ]);
  });

  it("returns the full grid range for the visible months", () => {
    const mobile = getVisibleRange(new Date(2026, 8, 4), "single_month");
    const desktop = getVisibleRange(new Date(2026, 8, 4), "dual_month");

    expect(mobile.startDateKey).toBe("2026-08-31");
    expect(mobile.endDateKey).toBe("2026-10-11");
    expect(desktop.startDateKey).toBe("2026-08-31");
    expect(desktop.endDateKey).toBe("2026-11-08");
  });
});
