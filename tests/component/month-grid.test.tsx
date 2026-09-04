import { fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { MonthGrid } from "@/components/calendar/MonthGrid";
import { StatusChooser } from "@/components/calendar/StatusChooser";

const september = new Date(2026, 8, 1);

describe("owner calendar status rendering", () => {
  it("renders weekday labels, muted outside-month dates, and owner-editable logged dates", () => {
    render(createElement(MonthGrid, {
      month: september,
      canEdit: true,
      statuses: {
          "2026-09-04": "green",
          "2026-09-05": "red"
      },
      onSelectDate: vi.fn()
    }));

    for (const label of ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: /september 4, 2026.*green/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /september 5, 2026.*red/i })).toBeEnabled();
    expect(screen.getByText("31")).toHaveAttribute("data-muted", "true");
  });

  it("keeps calendar cells dimensionally stable when statuses are present", () => {
    render(createElement(MonthGrid, {
      month: september,
      canEdit: true,
      statuses: {
          "2026-09-04": "green"
      },
      onSelectDate: vi.fn()
    }));

    const grid = screen.getByRole("grid", { name: /september 2026/i });
    const cells = within(grid).getAllByRole("gridcell");

    expect(cells).toHaveLength(42);
    for (const cell of cells) {
      expect(cell).toHaveAttribute("data-cell-size", "stable");
    }
  });

  it("clears a logged date once on double click", () => {
    const onClearDate = vi.fn();

    render(createElement(MonthGrid, {
      month: september,
      canEdit: true,
      statuses: {
          "2026-09-04": "green"
      },
      onSelectDate: vi.fn(),
      onClearDate
    }));

    fireEvent.doubleClick(screen.getByRole("button", { name: /september 4, 2026.*green/i }));

    expect(onClearDate).toHaveBeenCalledTimes(1);
    expect(onClearDate).toHaveBeenCalledWith("2026-09-04");
  });
});

describe("viewer-only calendar rendering", () => {
  it("shows logged statuses without exposing editable date buttons", () => {
    const onSelectDate = vi.fn();

    render(createElement(MonthGrid, {
      month: september,
      canEdit: false,
      statuses: {
          "2026-09-04": "green",
          "2026-09-05": "red"
      },
      onSelectDate
    }));

    expect(screen.getByLabelText(/september 4, 2026.*green/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/september 5, 2026.*red/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /september 4, 2026/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /september 5, 2026/i })).not.toBeInTheDocument();
    expect(onSelectDate).not.toHaveBeenCalled();
  });
});

describe("owner status chooser", () => {
  it("renders textless circular status buttons with accessible names", () => {
    render(createElement(StatusChooser, {
      selectedDate: "2026-09-04",
      onChooseStatus: vi.fn()
    }));

    const unsuccessfulButton = screen.getByRole("button", { name: "Mark unsuccessful" });
    const successfulButton = screen.getByRole("button", { name: "Mark successful" });

    expect(unsuccessfulButton).toHaveClass("status-button", "status-red");
    expect(successfulButton).toHaveClass("status-button", "status-green");
    expect(unsuccessfulButton).toHaveTextContent("");
    expect(successfulButton).toHaveTextContent("");
  });
});
