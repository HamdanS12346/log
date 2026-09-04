export type HabitStatus = "red" | "green";

type StatusChooserProps = {
  selectedDate: string | null;
  pending?: boolean;
  message?: string;
  onChooseStatus: (status: HabitStatus) => void;
};

export function StatusChooser({
  selectedDate,
  pending = false,
  message,
  onChooseStatus
}: StatusChooserProps) {
  return (
    <section className="status-chooser" aria-label="Choose habit status">
      <p>{selectedDate ? `Logging ${selectedDate}` : "Choose a date"}</p>
      <div className="status-actions">
        <button
          type="button"
          className="status-button status-red"
          disabled={!selectedDate || pending}
          onClick={() => onChooseStatus("red")}
        >
          Red
        </button>
        <button
          type="button"
          className="status-button status-green"
          disabled={!selectedDate || pending}
          onClick={() => onChooseStatus("green")}
        >
          Green
        </button>
      </div>
      {message ? (
        <p className="status-message" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </section>
  );
}
