import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MonthGrid } from "@/components/calendar/MonthGrid";

const september = new Date(2026, 8, 1);

describe("owner calendar status rendering", () => {
  it("renders weekday labels, muted outside-month dates, and owner-editable logged dates", () => {
    render(
      <MonthGrid
        month={september}
        canEdit
        statuses={{
          "2026-09-04": "green",
          "2026-09-05": "red"
        }}
        onSelectDate={vi.fn()}
      />
    );

    for (const label of ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: /september 4, 2026.*green/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /september 5, 2026.*red/i })).toBeEnabled();
    expect(screen.getByText("31")).toHaveAttribute("data-muted", "true");
  });

  it("keeps calendar cells dimensionally stable when statuses are present", () => {
    render(
      <MonthGrid
        month={september}
        canEdit
        statuses={{
          "2026-09-04": "green"
        }}
        onSelectDate={vi.fn()}
      />
    );

    const grid = screen.getByRole("grid", { name: /september 2026/i });
    const cells = within(grid).getAllByRole("gridcell");

    expect(cells).toHaveLength(42);
    for (const cell of cells) {
      expect(cell).toHaveAttribute("data-cell-size", "stable");
    }
  });
});
