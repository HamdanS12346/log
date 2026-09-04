# Contract: Calendar UI

## Initial Rendering

- Desktop opens with the current month and following month.
- Mobile opens with the current month only.
- The calendar is the only primary content on the log page.
- Weekday labels are `Mo Tu We Th Fr Sa Su`.
- Dates align in seven equal columns.

## Navigation

- Previous and next controls are native buttons.
- Previous moves the visible month range backward.
- Next moves the visible month range forward.
- Navigation loads statuses for the new visible range.
- Feedback appears within 100 milliseconds.

## Status Display

- Empty active dates use normal text.
- Outside-month dates use muted text.
- Saved `red` dates show unsuccessful status styling.
- Saved `green` dates show successful status styling.
- Status styling does not resize date cells.

## Owner Editing

- Owner can select a date and choose red or green.
- Owner can replace an existing date status.
- Viewer cannot see or use edit controls.
- Unauthorized write attempts are rejected by the parent app contract.

## Accessibility

- Controls have accessible names.
- Focus states are visible.
- Interactive dates are keyboard reachable.
- Reduced-motion preferences are respected.
