# Quickstart: Calendar Page Layout

## Prerequisites

- Parent app plan in `../001-habit-calendar-log/plan.md`.
- Firebase schema, rules, and auth behavior from `../001-habit-calendar-log/contracts/`.

## Validation Scenarios

### Desktop

Expected outcome:

- `/log` shows current month and following month side by side.
- The page has no primary content besides the calendar.
- Navigation controls align with month headings.
- Saved statuses appear on the correct dates.

### Mobile

Expected outcome:

- `/log` shows one month at a time.
- Current month appears first.
- Previous/next navigation works.
- Seven date columns remain readable without overlap.

### Owner And Viewer

Expected outcome:

- Owner can select a date and save red or green.
- Viewer can see statuses but cannot edit.

### Motion And Accessibility

Expected outcome:

- Hover, focus, press, and tap feedback is visible within 100 milliseconds.
- Reduced-motion settings avoid large animation.
- Keyboard users can navigate controls and editable dates.
