import type { HabitStatus } from "./StatusChooser";

type DateCellProps = {
  date: Date;
  dayNumber: number;
  dateKey: string;
  isActiveMonth: boolean;
  status?: HabitStatus;
  canEdit: boolean;
  isToday?: boolean;
  onSelectDate?: (dateKey: string) => void;
};

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function DateCell({
  date,
  dayNumber,
  dateKey,
  isActiveMonth,
  status,
  canEdit,
  isToday = false,
  onSelectDate
}: DateCellProps) {
  const labelParts = [
    isToday ? "Today" : "Select date",
    formatDateLabel(date),
    status ? status : "unrecorded"
  ];
  const className = [
    "calendar-date",
    !isActiveMonth ? "is-muted" : "",
    status ? `is-${status}` : "",
    isToday ? "is-today" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span data-muted={!isActiveMonth ? "true" : undefined} className="calendar-date-number">
      {dayNumber}
    </span>
  );

  return (
    <div role="gridcell" data-cell-size="stable" className="calendar-cell">
      {canEdit && isActiveMonth ? (
        <button
          type="button"
          className={className}
          aria-label={labelParts.join(", ")}
          data-date={dateKey}
          onClick={() => onSelectDate?.(dateKey)}
        >
          {content}
        </button>
      ) : (
        <span className={className} aria-label={labelParts.join(", ")} data-date={dateKey}>
          {content}
        </span>
      )}
    </div>
  );
}
