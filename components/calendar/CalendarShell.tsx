"use client";

import { useMemo, useState, useTransition } from "react";
import { addMonths, monthLabel } from "@/lib/calendar/date-format";
import { getVisibleMonths, type PresentationMode } from "@/lib/calendar/visible-range";
import { saveHabitStatus } from "@/app/log/actions";
import { CalendarHeader } from "./CalendarHeader";
import { MonthGrid } from "./MonthGrid";
import { StatusChooser, type HabitStatus } from "./StatusChooser";

type CalendarShellProps = {
  initialStatuses?: Record<string, HabitStatus>;
  canEdit: boolean;
  mode?: PresentationMode;
};

export function CalendarShell({
  initialStatuses = {},
  canEdit,
  mode = "dual_month"
}: CalendarShellProps) {
  const [anchorMonth, setAnchorMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [message, setMessage] = useState<string>();
  const [pending, startTransition] = useTransition();

  const months = useMemo(
    () => getVisibleMonths(anchorMonth, mode),
    [anchorMonth, mode]
  );
  const title = monthLabel(months[0]);
  const secondaryTitle = months[1] ? monthLabel(months[1]) : undefined;

  function moveMonth(amount: number) {
    setAnchorMonth((current) => addMonths(current, amount));
    setSelectedDate(null);
    setMessage(undefined);
  }

  function chooseStatus(status: HabitStatus) {
    if (!selectedDate) {
      setMessage("Choose a date first.");
      return;
    }

    startTransition(async () => {
      const result = await saveHabitStatus(selectedDate, status);

      if (!result.ok) {
        setMessage(result.message);
        return;
      }

      setStatuses((current) => ({
        ...current,
        [result.date]: result.status
      }));
      setMessage("Saved");
    });
  }

  return (
    <main className="calendar-page" aria-label="Habit calendar">
      <section className="calendar-shell" aria-label="Habit calendar controls">
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
