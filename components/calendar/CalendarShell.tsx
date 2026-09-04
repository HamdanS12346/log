"use client";

import { monthLabel } from "@/lib/calendar/date-format";
import type { PresentationMode } from "@/lib/calendar/visible-range";
import { CalendarHeader } from "./CalendarHeader";
import { MonthGrid } from "./MonthGrid";
import { StatusChooser, type HabitStatus } from "./StatusChooser";
import { useHabitCalendar } from "./useHabitCalendar";

type CalendarShellProps = {
  initialStatuses?: Record<string, HabitStatus>;
  mode?: PresentationMode;
};

export function CalendarShell({
  initialStatuses = {},
  mode = "dual_month"
}: CalendarShellProps) {
  const {
    canEdit,
    chooseStatus,
    message,
    months,
    moveMonth,
    pending,
    selectedDate,
    sessionReady,
    setSelectedDate,
    statuses
  } = useHabitCalendar({ initialStatuses, mode });
  const title = monthLabel(months[0]);
  const secondaryTitle = months[1] ? monthLabel(months[1]) : undefined;

  return (
    <main className="calendar-page" aria-label="Habit calendar">
      <section className="calendar-shell" aria-label="Habit calendar controls">
        {!sessionReady ? (
          <p className="calendar-message" role="status">
            Loading calendar.
          </p>
        ) : null}
        <CalendarHeader
          title={title}
          secondaryTitle={secondaryTitle}
          onPrevious={() => moveMonth(-1)}
          onNext={() => moveMonth(1)}
        />
        <div className="calendar-months" data-mode={mode}>
          {months.map((month) => (
            <MonthGrid
              key={`${month.getFullYear()}-${month.getMonth()}`}
              month={month}
              canEdit={canEdit}
              statuses={statuses}
              onSelectDate={setSelectedDate}
            />
          ))}
        </div>
        {canEdit ? (
          <StatusChooser
            selectedDate={selectedDate}
            pending={pending}
            message={message}
            onChooseStatus={chooseStatus}
          />
        ) : null}
      </section>
    </main>
  );
}
