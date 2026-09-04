# Data Model: Calendar Page Layout

## Calendar View State

Fields:

- `anchor_month`: The first visible month.
- `presentation_mode`: `single_month` on mobile or `dual_month` on desktop.
- `visible_start_date`: First date included in the rendered grid range.
- `visible_end_date`: Last date included in the rendered grid range.
- `selected_date`: Date selected by the owner, if any.

Rules:

- Initial anchor month is the current month.
- Previous navigation moves the anchor month backward.
- Next navigation moves the anchor month forward.
- Desktop renders anchor month plus following month.
- Mobile renders only anchor month.

## Month Grid

Fields:

- `month_label`: Human-readable month and year.
- `weekday_labels`: Always `Mo Tu We Th Fr Sa Su`.
- `date_cells`: Ordered cells in seven-column weeks.

Rules:

- Empty or outside-month cells preserve grid alignment.
- Month headings do not collide with chevron controls.

## Date Cell

Fields:

- `date`: Date represented by the cell.
- `day_number`: Display number.
- `is_active_month`: Whether the date belongs to the displayed month.
- `habit_status`: Empty, `red`, or `green`.
- `can_edit`: Whether current user is owner.

Rules:

- Outside-month dates are muted.
- Active unrecorded dates use standard text.
- Logged dates visibly show saved status.
- Owner can open the status chooser from editable date cells.
- Viewers cannot change status.
