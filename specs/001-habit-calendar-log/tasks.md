# Tasks: Habit Calendar Log

**Input**: Design documents from `/specs/001-habit-calendar-log/` plus calendar refinement from `/specs/002-calendar-page-layout/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included because the implementation plan requires type checks, component tests, end-to-end browser tests, and Firebase Emulator security rules tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Every task includes an exact target path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js and Firebase project skeleton.

- [X] T001 Initialize the Next.js TypeScript app configuration in package.json
- [X] T002 [P] Configure TypeScript compiler options in tsconfig.json
- [X] T003 [P] Configure Next.js runtime settings in next.config.ts
- [X] T004 [P] Configure linting in eslint.config.mjs
- [X] T005 [P] Configure Tailwind or token-driven styling entry points in postcss.config.mjs and app/globals.css
- [X] T006 Create the planned app, components, lib, firebase, and tests directories from specs/001-habit-calendar-log/plan.md
- [X] T007 [P] Add local environment variable template for Firebase web app config in .env.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared auth, data, style, and calendar foundations that must exist before any story is implemented.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T008 Define global design tokens for background, foreground, accent, muted, border, success, and failure colors in app/globals.css
- [X] T009 Configure DM Sans and root metadata in app/layout.tsx
- [X] T010 [P] Implement Firebase browser app initialization in lib/firebase/client.ts
- [X] T011 [P] Implement Firebase Auth helpers in lib/firebase/auth.ts
- [X] T012 Implement Firebase session route protection helpers in lib/auth/session.ts
- [X] T013 Implement owner role helper for hamdanshaikh11133@gmail.com in lib/auth/owner.ts
- [X] T014 Implement session utility functions for non-persistent browser-session behavior in lib/auth/session.ts
- [X] T015 Create Firestore collections contract and security rules in firebase/firestore.rules and firebase/firestore.indexes.json
- [X] T016 [P] Create Firebase Emulator security rules tests for anonymous, viewer, and owner access in firebase/tests/firestore.rules.test.ts
- [X] T017 [P] Implement calendar month grid generation utility in lib/calendar/month-grid.ts
- [X] T018 [P] Implement visible month range utility for mobile and desktop in lib/calendar/visible-range.ts
- [X] T019 [P] Implement canonical date formatting helpers in lib/calendar/date-format.ts
- [X] T020 Create root redirect route for authenticated and unauthenticated users in app/page.tsx
- [X] T021 [P] Create shared target/ring logo component in components/ui/TargetLogo.tsx

**Checkpoint**: Foundation ready; user story implementation can now begin.

---

## Phase 3: User Story 1 - Owner Records Daily Habit Status (Priority: P1) MVP

**Goal**: Owner can log in, view the calendar, mark any visible or navigated date red/green, and see the saved status persist.

**Independent Test**: Log in as owner, select a date, choose green or red, leave and return to the log page, and confirm the status remains visible.

### Tests for User Story 1

- [X] T022 [P] [US1] Add unit tests for owner role detection in tests/unit/owner.test.ts
- [X] T023 [P] [US1] Add unit tests for month grid and visible range generation in tests/unit/month-grid.test.ts
- [X] T024 [P] [US1] Add component tests for owner calendar status rendering in tests/component/month-grid.test.tsx
- [X] T025 [P] [US1] Add end-to-end owner logging flow test in tests/e2e/permissions.spec.ts

### Implementation for User Story 1

- [X] T026 [P] [US1] Implement calendar date cell component with stable dimensions in components/calendar/DateCell.tsx
- [X] T027 [P] [US1] Implement calendar header with previous and next controls in components/calendar/CalendarHeader.tsx
- [X] T028 [P] [US1] Implement month grid component with weekday labels and muted outside-month dates in components/calendar/MonthGrid.tsx
- [X] T029 [P] [US1] Implement red/green status chooser for owner edits in components/calendar/StatusChooser.tsx
- [X] T030 [US1] Implement calendar shell state for visible months, selected date, status map, and owner edit mode in components/calendar/CalendarShell.tsx
- [X] T031 [US1] Implement protected log page data loading for profile and visible habit statuses in app/log/page.tsx
- [X] T032 [US1] Implement owner-only habit status save boundary in app/log/actions.ts
- [X] T033 [US1] Wire CalendarShell to save and refresh red/green status changes in components/calendar/CalendarShell.tsx
- [X] T034 [US1] Add user-facing save failure and unauthorized edit messages in components/calendar/StatusChooser.tsx
- [X] T035 [US1] Verify quickstart owner editing scenario against specs/001-habit-calendar-log/quickstart.md

**Checkpoint**: User Story 1 is fully functional and independently testable as the MVP.

---

## Phase 4: User Story 2 - Visitor Views Calendar Without Editing (Priority: P2)

**Goal**: Non-owner users can log in and view all saved calendar statuses without any ability to edit them.

**Independent Test**: Log in as a viewer, open the calendar, confirm saved statuses are visible, and confirm no UI or direct request can change a date.

### Tests for User Story 2

- [X] T036 [P] [US2] Add component tests for viewer-only calendar rendering in tests/component/month-grid.test.tsx
- [X] T037 [P] [US2] Add end-to-end viewer read-only calendar test in tests/e2e/permissions.spec.ts
- [X] T038 [P] [US2] Add Firebase rules assertions for viewer write rejection in firebase/tests/firestore.rules.test.ts

### Implementation for User Story 2

- [X] T039 [US2] Hide status chooser and edit affordances for viewer profiles in components/calendar/CalendarShell.tsx
- [X] T040 [US2] Ensure viewer role data loading still fetches saved habit statuses in app/log/page.tsx
- [X] T041 [US2] Add direct unauthorized write rejection handling in app/log/actions.ts
- [X] T042 [US2] Verify quickstart viewer read-only scenario against specs/001-habit-calendar-log/quickstart.md

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - User Creates Account And Logs In (Priority: P3)

**Goal**: Users can sign up, log in, and reach the calendar with owner or viewer permissions assigned correctly.

**Independent Test**: Create a new account, log out, log back in, and confirm the account reaches the log page as viewer unless it is the configured owner account.

### Tests for User Story 3

- [ ] T043 [P] [US3] Add component tests for login and signup form states in tests/component/auth-form.test.tsx
- [ ] T044 [P] [US3] Add end-to-end signup and login flow tests in tests/e2e/auth.spec.ts

### Implementation for User Story 3

- [ ] T045 [P] [US3] Implement login/signup visual shell with requested branding in components/auth/AuthShell.tsx
- [ ] T046 [P] [US3] Implement accessible login form in components/auth/LoginForm.tsx
- [ ] T047 [P] [US3] Implement accessible signup form in components/auth/SignUpForm.tsx
- [ ] T048 [US3] Implement login page composition and mode switching in app/login/page.tsx
- [ ] T049 [US3] Implement auth callback route for post-auth redirects in app/auth/callback/route.ts
- [ ] T050 [US3] Implement sign-out route that clears the active session in app/auth/sign-out/route.ts
- [ ] T051 [US3] Ensure signup creates or confirms profile role in app/login/page.tsx
- [ ] T052 [US3] Add clear login, signup, duplicate email, and invalid credential errors in components/auth/LoginForm.tsx and components/auth/SignUpForm.tsx
- [ ] T053 [US3] Verify quickstart signup and login scenarios against specs/001-habit-calendar-log/quickstart.md

**Checkpoint**: User Story 3 works independently with protected calendar access.

---

## Phase 6: User Story 4 - Login Page Matches Requested Layout And Branding (Priority: P4)

**Goal**: Login and signup experience matches the specified desktop and mobile layout, typography, color, and branding.

**Independent Test**: Open the login page on desktop and mobile viewports and confirm required branding, copy, form fields, colors, and responsive layout.

### Tests for User Story 4

- [ ] T054 [P] [US4] Add desktop and mobile login layout checks in tests/e2e/auth.spec.ts
- [ ] T055 [P] [US4] Add visual/accessibility component assertions for AuthShell in tests/component/auth-form.test.tsx

### Implementation for User Story 4

- [ ] T056 [US4] Apply desktop split layout and right-side elevated form card in components/auth/AuthShell.tsx
- [ ] T057 [US4] Apply mobile single-column layout and lower rounded form card in components/auth/AuthShell.tsx
- [ ] T058 [US4] Apply exact visible copy, logo placement, footer copy, and accent link styling in components/auth/AuthShell.tsx
- [ ] T059 [US4] Verify login page avoids constitution-prohibited visual anti-patterns in app/login/page.tsx and components/auth/AuthShell.tsx

**Checkpoint**: All four main user stories are independently functional.

---

## Phase 7: Calendar Refinement From 002

**Goal**: Ensure `/log` satisfies the detailed calendar presentation requirements from `specs/002-calendar-page-layout/spec.md`.

**Independent Test**: Open `/log` on desktop and mobile, navigate months, inspect saved statuses, and confirm spacing, responsiveness, and microinteractions match the refinement spec.

### Tests for Calendar Refinement

- [ ] T060 [P] Add desktop dual-month calendar layout test in tests/e2e/calendar-layout.spec.ts
- [ ] T061 [P] Add mobile single-month calendar layout test in tests/e2e/calendar-layout.spec.ts
- [ ] T062 [P] Add reduced-motion and keyboard-focus calendar checks in tests/e2e/calendar-layout.spec.ts

### Implementation for Calendar Refinement

- [ ] T063 Refine desktop current-plus-following-month layout in components/calendar/CalendarShell.tsx
- [ ] T064 Refine mobile current-month-only layout in components/calendar/CalendarShell.tsx
- [ ] T065 Refine chevron alignment and month heading behavior in components/calendar/CalendarHeader.tsx
- [ ] T066 Refine spacing, muted date styling, logged date styling, and microinteractions in components/calendar/DateCell.tsx and components/calendar/MonthGrid.tsx
- [ ] T067 Verify calendar refinement quickstart scenarios against specs/002-calendar-page-layout/quickstart.md

**Checkpoint**: Calendar UI refinement is complete and coordinated with the main app.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, performance, accessibility, and documentation cleanup across all stories.

- [ ] T068 [P] Add README setup notes for Next.js and Firebase environment configuration in README.md
- [ ] T069 Run type checking and linting for the full project using package.json scripts
- [ ] T070 Run component and unit tests for tests/component and tests/unit
- [ ] T071 Run end-to-end tests for tests/e2e
- [ ] T072 Run Firebase Emulator security rules tests for firebase/tests/firestore.rules.test.ts
- [ ] T073 Validate no UI file over 150 lines needs further decomposition in components/auth and components/calendar
- [ ] T074 Validate all frontend code uses semantic tokens instead of scattered hardcoded colors in app/globals.css, components/auth, and components/calendar
- [ ] T075 Validate final quickstart scenarios in specs/001-habit-calendar-log/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; start immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **US1 Owner Records Daily Habit Status (Phase 3)**: Depends on Foundational; MVP.
- **US2 Visitor Views Calendar Without Editing (Phase 4)**: Depends on Foundational and can run after calendar read/status display pieces from US1 exist.
- **US3 User Creates Account And Logs In (Phase 5)**: Depends on Foundational and can run in parallel with US1 after shared auth clients exist.
- **US4 Login Page Layout And Branding (Phase 6)**: Depends on US3 auth screen components.
- **Calendar Refinement From 002 (Phase 7)**: Depends on US1 calendar components and should finish before final polish.
- **Polish (Phase 8)**: Depends on all desired user stories and calendar refinement.

### User Story Dependencies

- **US1 (P1)**: Core MVP; no dependency on other user stories after foundation.
- **US2 (P2)**: Uses calendar display and authorization boundaries from US1.
- **US3 (P3)**: Provides signup/login route completion; can proceed after foundation.
- **US4 (P4)**: Refines UI created in US3.

### Parallel Opportunities

- T002, T003, T004, T005, and T007 can run in parallel after T001.
- T010, T011, T016, T017, T018, T019, and T021 can run in parallel after directory setup.
- US1 tests T022 through T025 can run in parallel before implementation.
- US1 components T026 through T029 can run in parallel before CalendarShell integration.
- US3 components T045 through T047 can run in parallel.
- Calendar refinement tests T060 through T062 can run in parallel.

---

## Parallel Example: User Story 1

```text
Task: "T022 [P] [US1] Add unit tests for owner role detection in tests/unit/owner.test.ts"
Task: "T023 [P] [US1] Add unit tests for month grid and visible range generation in tests/unit/month-grid.test.ts"
Task: "T024 [P] [US1] Add component tests for owner calendar status rendering in tests/component/month-grid.test.tsx"
Task: "T025 [P] [US1] Add end-to-end owner logging flow test in tests/e2e/permissions.spec.ts"
Task: "T026 [P] [US1] Implement calendar date cell component with stable dimensions in components/calendar/DateCell.tsx"
Task: "T027 [P] [US1] Implement calendar header with previous and next controls in components/calendar/CalendarHeader.tsx"
Task: "T028 [P] [US1] Implement month grid component with weekday labels and muted outside-month dates in components/calendar/MonthGrid.tsx"
Task: "T029 [P] [US1] Implement red/green status chooser for owner edits in components/calendar/StatusChooser.tsx"
```

## Parallel Example: User Story 3

```text
Task: "T043 [P] [US3] Add component tests for login and signup form states in tests/component/auth-form.test.tsx"
Task: "T044 [P] [US3] Add end-to-end signup and login flow tests in tests/e2e/auth.spec.ts"
Task: "T045 [P] [US3] Implement login/signup visual shell with requested branding in components/auth/AuthShell.tsx"
Task: "T046 [P] [US3] Implement accessible login form in components/auth/LoginForm.tsx"
Task: "T047 [P] [US3] Implement accessible signup form in components/auth/SignUpForm.tsx"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 setup.
2. Complete Phase 2 foundation.
3. Complete Phase 3 US1 owner logging.
4. Validate owner can mark a date red/green and see it persist.

### Incremental Delivery

1. Add US2 viewer read-only access and verify unauthorized writes fail.
2. Add US3 signup/login completion and session behavior.
3. Add US4 login layout polish.
4. Complete Phase 7 calendar refinement from `002`.
5. Complete Phase 8 full validation.

### Coordination Rule

Tasks in `001` own the app implementation. `002` must not become a separate build; its calendar requirements are satisfied through Phase 7 and the calendar component tasks above.
