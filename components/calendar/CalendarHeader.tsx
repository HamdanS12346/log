type CalendarHeaderProps = {
  title: string;
  secondaryTitle?: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function CalendarHeader({
  title,
  secondaryTitle,
  onPrevious,
  onNext
}: CalendarHeaderProps) {
  return (
    <header className="calendar-header" aria-label="Calendar navigation">
      <div className="calendar-header-side">
        <button
          type="button"
          className="calendar-nav-button"
          aria-label="Previous month"
          onClick={onPrevious}
        >
          &lt;
        </button>
        <h2>{title}</h2>
      </div>
      <div className="calendar-header-side calendar-header-side-end">
        {secondaryTitle ? <h2>{secondaryTitle}</h2> : null}
        <button
          type="button"
          className="calendar-nav-button"
          aria-label="Next month"
          onClick={onNext}
        >
          &gt;
        </button>
      </div>
    </header>
  );
}
