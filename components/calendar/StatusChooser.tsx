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
          aria-label="Mark unsuccessful"
          disabled={!selectedDate || pending}
          onClick={() => onChooseStatus("red")}
        />
        <button
          type="button"
          className="status-button status-green"
          aria-label="Mark successful"
          disabled={!selectedDate || pending}
          onClick={() => onChooseStatus("green")}
        />
      </div>
      {message ? (
        <p className="status-message" role="status" aria-live="polite">
          {message}
        </p>
      ) : null}
    </section>
  );
}
