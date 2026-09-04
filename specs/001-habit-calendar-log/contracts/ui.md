# Contract: UI

## Login/Signup Screen

Required elements:

- Target/ring logo.
- `log` wordmark.
- Title text: `This is just a calender`.
- Subtitle text: `nothing else`.
- Email label and input.
- Password label and input.
- Login action.
- Sign-up prompt/action.

Layout:

- Desktop uses the specified split layout with left branding and right elevated form card.
- Mobile uses a single-column layout with branding above the form card.
- Background is white, text is black, accent is crimson.
- All text uses DM Sans.

Accessibility:

- Inputs have visible labels.
- Submit actions use native buttons.
- Errors appear in text near the form.

## Calendar Log Screen

Required elements:

- Calendar as only primary content.
- Month heading or headings.
- Previous and next month controls.
- Weekday labels `Mo Tu We Th Fr Sa Su`.
- Date cells in seven equal columns.
- Red/green status display for logged dates.
- Red/green status chooser for owner only.

Layout:

- Desktop shows current month and following month side by side in a rounded white container.
- Mobile shows one month at a time with left chevron, centered month heading, and right chevron.
- Outside-month dates are muted.
- Active unrecorded dates use normal black text.
- Logged dates visibly distinguish success and failure.

Interaction:

- Owner can select a date and choose red or green.
- Owner can update an existing date's status.
- Viewer can inspect statuses but cannot edit.
- Navigation and date interactions provide subtle feedback within 100 milliseconds.
- Reduced-motion preferences are respected.

Accessibility:

- Navigation controls are native buttons with accessible names.
- Date cells are keyboard reachable when interactive.
- Status choices are native buttons.
- Focus states are visible.
