# Implementation Plan: Habit Calendar Log

**Branch**: `[001-habit-calendar-log]` | **Date**: 2026-09-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-habit-calendar-log/spec.md`; coordinated calendar UI refinement from `/specs/002-calendar-page-layout/spec.md`

## Summary

Build a two-screen web habit logging app using Next.js for the frontend/application routes and Supabase for authentication plus persisted habit date statuses. `001-habit-calendar-log` is the parent implementation plan covering login, signup, owner-only red/green logging, viewer-only calendar access, and persistence. `002-calendar-page-layout` is a required refinement for the log page calendar: current-month start, previous/next navigation, desktop dual-month layout, mobile single-month layout, and responsive calendar-only presentation.

## Technical Context

**Language/Version**: TypeScript with current Next.js App Router conventions

**Primary Dependencies**: Next.js, React, Supabase JavaScript client with server-side auth helpers, Tailwind CSS or equivalent token-driven styling, DM Sans web font

**Storage**: Supabase Auth for user accounts; Supabase Postgres for profiles and habit date statuses

**Testing**: Type checking, linting, component tests for auth and calendar rendering, end-to-end browser tests for login/signup/calendar/permissions, and Supabase RLS policy tests

**Target Platform**: Mobile and desktop web browsers

**Project Type**: Single web application

**Performance Goals**: Authenticated calendar visible within 2 seconds on normal broadband; calendar navigation and status interaction feedback within 100 milliseconds; no visible layout shift when status indicators render

**Constraints**: Two primary screens only, no installed app, no email verification, no forgot-password flow, no persistent browser session after app/browser close, owner-only writes, authenticated viewer reads, no frontend anti-patterns prohibited by the constitution

**Scale/Scope**: Personal habit tracker with one owner account, multiple viewer accounts, global calendar statuses visible to logged-in users, one red/green status per date

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Brand-Aligned Visual Restraint: PASS. Uses the specified white, black, and crimson palette; avoids purple/indigo dark themes, decorative clutter, generic hero defaults, and icon spam.
- Responsive Layout Discipline: PASS. Calendar refinement requires mobile-first one-month layout and desktop dual-month layout using stable grid dimensions and dynamic viewport-safe containers.
- Semantic And Accessible Interfaces: PASS. Login/signup forms require labels and native submit controls; calendar and status actions require accessible buttons and keyboard-visible focus.
- Tokenized Design Systems: PASS. Exact colors are defined as design tokens and consumed semantically throughout UI components.
- Component Size And State Discipline: PASS. Planned source structure decomposes auth shell, forms, calendar shell, month grid, date cell, and status chooser; form and calendar state are structured objects.

Post-design re-check: PASS. Phase 0 and Phase 1 artifacts preserve all constitution constraints and add no justified violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-habit-calendar-log/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   |-- supabase-schema.md
|   |-- routes.md
|   `-- ui.md
`-- tasks.md

specs/002-calendar-page-layout/
|-- spec.md
`-- checklists/
    `-- requirements.md
```

### Source Code (repository root)

```text
app/
|-- layout.tsx
|-- page.tsx
|-- login/
|   `-- page.tsx
|-- log/
|   `-- page.tsx
|-- auth/
|   |-- callback/
|   |   `-- route.ts
|   `-- sign-out/
|       `-- route.ts
`-- globals.css

components/
|-- auth/
|   |-- AuthShell.tsx
|   |-- LoginForm.tsx
|   `-- SignUpForm.tsx
|-- calendar/
|   |-- CalendarShell.tsx
|   |-- CalendarHeader.tsx
|   |-- MonthGrid.tsx
|   |-- DateCell.tsx
|   `-- StatusChooser.tsx
`-- ui/
    `-- TargetLogo.tsx

lib/
|-- auth/
|   |-- owner.ts
|   `-- session.ts
|-- calendar/
|   |-- month-grid.ts
|   `-- visible-range.ts
`-- supabase/
    |-- client.ts
    |-- server.ts
    `-- middleware.ts

supabase/
|-- migrations/
|   `-- 001_initial_habit_log.sql
`-- tests/
    `-- habit_status_rls.sql

tests/
|-- component/
|   |-- auth-form.test.tsx
|   `-- month-grid.test.tsx
|-- e2e/
|   |-- auth.spec.ts
|   |-- calendar-layout.spec.ts
|   `-- permissions.spec.ts
`-- unit/
    |-- month-grid.test.ts
    `-- owner.test.ts
```

**Structure Decision**: Use one root-level Next.js application. Supabase provides hosted authentication and database persistence, so a separate backend project is unnecessary. The `001` plan owns implementation; `002` supplies required calendar UI acceptance details.

## Complexity Tracking

No constitution violations require justification.
