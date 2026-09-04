import { monthLabel, toDateKey } from "@/lib/calendar/date-format";
import { getMonthGrid, WEEKDAY_LABELS } from "@/lib/calendar/month-grid";
import { DateCell } from "./DateCell";
import type { HabitStatus } from "./StatusChooser";

type MonthGridProps = {
  month: Date;
  canEdit: boolean;
  selectedDate?: string | null;
  statuses: Record<string, HabitStatus>;
  onSelectDate: (dateKey: string) => void;
  onClearDate?: (dateKey: string) => void;
};

export function MonthGrid({
  month,
  canEdit,
  selectedDate,
  statuses,
  onSelectDate,
  onClearDate
}: MonthGridProps) {
  const label = monthLabel(month);
  const todayKey = toDateKey(new Date());
  const cells = getMonthGrid(month);

  return (
    <section className="month-panel" aria-label={label}>
      <div role="row" className="weekday-row" aria-hidden="true">
        {WEEKDAY_LABELS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>
      <div role="grid" aria-label={label} className="month-grid">
        {cells.map((cell) => (
          <DateCell
            key={cell.dateKey}
            date={cell.date}
            dateKey={cell.dateKey}
            dayNumber={cell.dayNumber}
            isActiveMonth={cell.isActiveMonth}
            status={statuses[cell.dateKey]}
            canEdit={canEdit}
            isToday={cell.dateKey === todayKey}
            isSelected={cell.dateKey === selectedDate}
            onSelectDate={onSelectDate}
            onClearDate={onClearDate}
          />
        ))}
      </div>
    </section>
  );
}
