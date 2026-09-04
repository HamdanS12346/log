# Research: Calendar Page Layout

## Decision: Implement As A Refinement Of The Parent App

Rationale: The calendar depends on Firebase authentication, owner permissions, and persisted statuses defined by `001-habit-calendar-log`. Keeping the implementation inside the same Next.js app prevents duplicated routing, state, and data access.

Alternatives considered:

- Separate calendar app: rejected because it would duplicate auth and persistence.
- Static calendar mock: rejected because the clarified requirement needs current month navigation and real recorded statuses.

## Decision: Use Visible Month Range Loading

Rationale: Mobile needs one month and desktop needs two months. The calendar should request statuses only for the visible range so navigation stays responsive and the data model stays simple.

Alternatives considered:

- Load all records every time: rejected as unnecessary over time.
- Load only current month on desktop: rejected because desktop requires the following month too.

## Decision: Use Single-Day Status Display Instead Of Ranges

Rationale: The clarified requirement says October/November examples and the range were UI references. The actual product tracks single-day red/green habit results.

Alternatives considered:

- Persist date ranges: rejected because it changes the product behavior.
- Remove all visual status styling: rejected because the calendar must show recorded statuses.

## Decision: Keep Date Cells Dimensionally Stable

Rationale: Status marks and microinteractions must not shift the calendar grid. Stable cells also make mobile layout and screenshot validation reliable.

Alternatives considered:

- Let cells resize around content: rejected because it risks overlap and layout shift.
