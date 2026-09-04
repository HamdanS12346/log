# Feature Specification: Calendar Page Layout

**Feature Branch**: `[002-calendar-page-layout]`

**Created**: 2026-09-04

**Status**: Draft

**Input**: User description: "Calendar log page should be basically only a calendar and nothing else, placed properly and responsive for phone/mobile and desktop. Use DM Sans, white background #FFFFFF, black text #000000, crimson accent #C60000, muted/disabled light gray or 40% opacity text. Desktop should use a horizontal side-by-side dual-month calendar picker on a rounded white container, with previous chevron aligned near the left month title and next chevron aligned near the right month title. Each month has weekday labels Mo Tu We Th Fr Sa Su. Mobile should show one month at a time with a top bar containing left arrow, centered month heading, and right arrow. The calendar should open on the current month, allow navigation backward and forward between months, show any recorded habit statuses, and support logging from the current month or any navigated month. Include proper spacing, smooth microinteractions, strong performance, and responsive desktop/mobile behavior."

## Clarifications

### Session 2026-09-04

- Q: Should the calendar page use the October 16-18 range as a static visual example, or should users actually select date ranges in the app? -> A: The October/November 2020 and October 16-18 range details were only UI examples; the real calendar opens on the current month, supports previous/next month navigation, and displays or updates single-day habit logs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Calendar Clearly On Desktop (Priority: P1)

As a logged-in user, I want the log page to show a clean dual-month calendar on desktop so that I can scan dates and logged habit results without distractions.

**Why this priority**: The calendar is the primary log page experience and desktop users need the full two-month presentation described by the product requirements.

**Independent Test**: Can be fully tested by opening the log page on a desktop viewport and confirming the page contains only the calendar component, the current month and following month are side by side, and any recorded habit statuses are visible on their dates.

**Acceptance Scenarios**:

1. **Given** a desktop viewport, **When** the log page loads, **Then** the page displays a rounded white calendar container with the current month on the left and the following month on the right.
2. **Given** the desktop calendar is visible, **When** the user reviews the header, **Then** the previous chevron appears near the left month title and the next chevron appears near the right month title.
3. **Given** the desktop calendar is visible, **When** the user reviews each month, **Then** each month shows weekday labels "Mo Tu We Th Fr Sa Su" above a seven-column date grid.

---

### User Story 2 - View Calendar Clearly On Mobile (Priority: P2)

As a logged-in mobile user, I want the log page to show one well-spaced month at a time so that the calendar remains readable and easy to navigate on a phone.

**Why this priority**: Mobile usability is explicitly required, and the desktop two-month layout would be too dense on smaller screens.

**Independent Test**: Can be fully tested by opening the log page on a phone-sized viewport and confirming only the current month is shown initially with centered month title, left/right navigation, readable spacing, and any recorded habit statuses.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** the log page loads, **Then** the calendar shows a single-column one-month view with the current month centered in the header.
2. **Given** the mobile calendar is visible, **When** the user reviews navigation, **Then** a left chevron appears on the left side of the header and a right chevron appears on the right side.
3. **Given** the mobile calendar is visible, **When** the user reviews dates, **Then** all date cells fit inside seven equal columns without clipped, overlapping, or crowded text.

---

### User Story 3 - Understand Logged Date Styling (Priority: P3)

As any logged-in user, I want logged dates and muted dates to be visually distinct so that I can immediately understand which dates have recorded habit results and which dates are outside the active month.

**Why this priority**: The date styling communicates meaning and must be precise for the calendar to be useful.

**Independent Test**: Can be fully tested by viewing a month with recorded habit results and confirming recorded dates are visibly marked red or green, active unrecorded dates remain black, and outside-month dates are muted.

**Acceptance Scenarios**:

1. **Given** a month view includes dates outside the active month, **When** the user reviews those outside-month dates, **Then** those dates use muted light gray or 40% opacity styling.
2. **Given** a month view includes active dates without saved logs, **When** the user reviews those dates, **Then** those dates use standard black text.
3. **Given** a month view includes dates with saved logs, **When** the user reviews those dates, **Then** successful days and unsuccessful days are visually distinct using the habit status colors from the broader application specification.

---

### User Story 4 - Navigate With Smooth Feedback (Priority: P4)

As a logged-in user, I want calendar navigation and date interactions to feel smooth and responsive so that the calendar feels polished without slowing down.

**Why this priority**: The user explicitly requested smooth microinteractions, good spacing, performance, and responsive behavior.

**Independent Test**: Can be fully tested by interacting with navigation controls and date cells on desktop and mobile, confirming visible feedback appears promptly and layout remains stable during interaction.

**Acceptance Scenarios**:

1. **Given** the calendar is visible, **When** the user hovers, focuses, presses, or taps a navigation control, **Then** the control provides subtle feedback without shifting surrounding layout.
2. **Given** the calendar is visible, **When** the user interacts with date cells, **Then** feedback appears smoothly and date cells keep stable dimensions.
3. **Given** the viewport changes between desktop and mobile sizes, **When** the layout adapts, **Then** the calendar remains readable, centered, and free from overlap.

### Edge Cases

- If the viewport is narrow, the calendar must show one month at a time rather than squeezing two months side by side.
- If the viewport is wide, the two month grids must align horizontally with balanced spacing inside the rounded container.
- If weekday labels or month names render with the selected font, they must remain legible and must not collide with navigation controls.
- If a user navigates to a month with no recorded logs, the calendar must still show the month clearly with unrecorded dates in the normal active-date style.
- If a user navigates to a previous or future month with recorded logs, those saved statuses must appear on the correct dates.
- If reduced-motion preferences are enabled, microinteractions must remain understandable without relying on large animation.
- If a month starts or ends midweek, empty grid positions must preserve the seven-column alignment.
- If text scaling is increased, dates and headers must remain readable without overlapping adjacent cells.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The log page MUST present the calendar as the only primary content on the page.
- **FR-002**: All calendar text MUST use DM Sans.
- **FR-003**: The calendar experience MUST use #FFFFFF as the primary background, #000000 as the primary text color, and #C60000 as the accent color for selected dates and controls that require emphasis.
- **FR-004**: Muted or disabled dates MUST use light gray styling or approximately 40% text opacity.
- **FR-005**: The calendar MUST use semantic date-grid structure and accessible button controls for navigation and selectable dates.
- **FR-006**: The desktop layout MUST display a horizontal dual-month calendar inside a white rounded container.
- **FR-007**: The desktop header MUST place the previous-month chevron before the left month heading and the next-month chevron after the right month heading.
- **FR-008**: When the desktop calendar first loads, it MUST display the current month as the left month and the following month as the right month.
- **FR-009**: Each displayed month MUST show weekday labels in the order "Mo Tu We Th Fr Sa Su" above seven equal date columns.
- **FR-010**: Dates outside the displayed active month MUST appear muted, while active unrecorded dates MUST appear in standard black text.
- **FR-011**: Dates with saved habit logs MUST visibly show their recorded success or failure status using the status colors defined by the broader application specification.
- **FR-012**: The owner MUST be able to select a date in the visible current, previous, or next navigated month and log a single-day habit result according to the broader application specification.
- **FR-013**: Month navigation MUST allow users to move backward and forward to inspect months where habit statuses may already be recorded.
- **FR-014**: Logged-date styling MUST preserve stable date-cell dimensions and must not cause layout shift when displayed or interacted with.
- **FR-015**: When the mobile calendar first loads, it MUST display the current month as a single-month view.
- **FR-016**: The mobile header MUST place a left chevron on the left, the current month heading centered, and a right chevron on the right.
- **FR-017**: The mobile month grid MUST keep seven equal columns with readable spacing and no overlapping date text.
- **FR-018**: Calendar navigation and date interactions MUST provide smooth, subtle feedback for hover, focus, press, and tap states.
- **FR-019**: Calendar animations and transitions MUST respect reduced-motion preferences.
- **FR-020**: The calendar MUST remain usable and visually stable across common phone, tablet, and desktop viewport sizes.
- **FR-021**: The calendar MUST avoid decorative background clutter, generic hero treatment, hidden scrollbars, arbitrary layout magic numbers, and non-semantic clickable elements.

### Key Entities *(include if feature involves data)*

- **Calendar Month View**: Represents one visible month, including month name, year, weekday labels, aligned date cells, and navigation context.
- **Calendar Date Cell**: Represents an individual date, including date number, active or muted state, logged-status role, and interactive state.
- **Logged Habit Status**: Represents the saved single-day result for a date, including whether the habit was successful or unsuccessful.
- **Viewport Presentation Mode**: Represents whether the calendar is shown as a desktop dual-month layout or a mobile single-month layout.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On desktop review, the calendar opens with the current month and following month visible side by side in 100% of checks.
- **SC-002**: On mobile review, the calendar shows one month at a time and all seven date columns remain readable without clipping or overlap.
- **SC-003**: Users can identify whether a visible date has a saved successful or unsuccessful habit result within 3 seconds of viewing the month.
- **SC-004**: Calendar navigation controls provide visible hover, focus, press, or tap feedback within 100 milliseconds of user interaction.
- **SC-005**: The calendar remains visually stable during navigation, status display, and viewport resizing, with no measurable layout shift caused by logged-date styling.
- **SC-006**: The calendar remains usable across mobile and desktop viewport checks with no overlapping text, hidden required controls, or inaccessible date/navigation actions.

## Assumptions

- This feature refines the log page calendar presentation for the existing habit logging application specification.
- The calendar page is only available after login as defined by the broader application specification.
- Calendar examples using October 2020, November 2020, or an October 16-18 range are visual references only and are not required runtime content.
- Habit logging uses single-day statuses, not date ranges.
- Chevron controls are represented visually as left and right chevrons, but implementation may use accessible icon or text equivalents as long as the visual and accessibility requirements are met.
- Exact spacing values are left to the design system, but spacing must be balanced, readable, and responsive.
