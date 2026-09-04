# Implementation Plan: Calendar Page Layout

**Branch**: `[002-calendar-page-layout]` | **Date**: 2026-09-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-calendar-page-layout/spec.md`; parent implementation plan from `/specs/001-habit-calendar-log/plan.md`

## Summary

Implement this feature as a calendar UI refinement within the parent `001-habit-calendar-log` Next.js and Firebase app. This plan does not create a separate app. It supplies detailed calendar rendering, responsive behavior, accessibility, and interaction requirements that must be satisfied when implementing the `/log` screen from `001`.

## Technical Context

**Language/Version**: TypeScript with current Next.js App Router conventions

**Primary Dependencies**: Same as `001-habit-calendar-log`: Next.js, React, Firebase modular Web SDK, token-driven styling, DM Sans

**Storage**: Same Firestore habit status collection from `001`; this feature reads visible-month statuses and writes single-day red/green statuses through the parent app permission model

**Testing**: Component tests for month grid/date cell rendering, end-to-end layout checks for desktop/mobile, permission-aware owner/viewer calendar tests, reduced-motion and keyboard-focus checks

**Target Platform**: Mobile and desktop web browsers

**Project Type**: Calendar UI refinement inside a single web application

**Performance Goals**: Calendar navigation feedback within 100 milliseconds; visible month status rendering without layout shift; authenticated calendar visible within the parent app's 2 second target

**Constraints**: Calendar is the only primary content on `/log`; desktop shows current and following month; mobile shows current month only; previous/next navigation is real; no date-range behavior at runtime

**Scale/Scope**: One calendar surface backed by global single-day habit statuses from the parent app

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Brand-Aligned Visual Restraint: PASS. Calendar uses the parent white/black/crimson token system and no decorative clutter.
- Responsive Layout Discipline: PASS. Mobile-first single-month and desktop dual-month modes are explicit.
- Semantic And Accessible Interfaces: PASS. Calendar controls and owner status actions are planned as native accessible buttons.
- Tokenized Design Systems: PASS. Calendar consumes the same semantic tokens defined by `001`.
- Component Size And State Discipline: PASS. CalendarShell, CalendarHeader, MonthGrid, DateCell, and StatusChooser are separate components in the parent structure.

Post-design re-check: PASS. No added design artifact violates the constitution.

## Project Structure

### Documentation (this feature)

```text
specs/002-calendar-page-layout/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- calendar-ui.md
`-- tasks.md
```

### Source Code (repository root)

```text
components/
`-- calendar/
    |-- CalendarShell.tsx
    |-- CalendarHeader.tsx
    |-- MonthGrid.tsx
    |-- DateCell.tsx
    `-- StatusChooser.tsx

lib/
`-- calendar/
    |-- month-grid.ts
    `-- visible-range.ts

tests/
|-- component/
|   `-- month-grid.test.tsx
|-- e2e/
|   `-- calendar-layout.spec.ts
`-- unit/
    `-- month-grid.test.ts
```

**Structure Decision**: Implement this feature inside the parent `001` app source tree. Do not create a separate project or duplicate auth/storage concerns.

## Complexity Tracking

No constitution violations require justification.
