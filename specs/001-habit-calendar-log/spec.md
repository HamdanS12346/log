# Feature Specification: Habit Calendar Log

**Feature Branch**: `[001-habit-calendar-log]`

**Created**: 2026-09-04

**Status**: Draft

**Input**: User description: "A simple web logging application with login/signup and a calendar log page. Users sign up and log in with email and password. The owner account uses email hamdanshaikh11133@gmail.com and password mybumispurple, can mark calendar dates red or green, and changes persist. Other logged-in users can view the calendar but cannot edit it. Sessions should not remain after the app is closed or removed. Login page uses DM Sans, white background, black text, crimson accent #C60000, target/ring logo, log wordmark, title 'This is just a calender', subtitle 'nothing else', and specified desktop/mobile layouts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Owner Records Daily Habit Status (Priority: P1)

As the owner, I want to log in, choose a calendar date, and mark that date red or green so that my habit result is visible and saved for future visits.

**Why this priority**: This is the core value of the application: tracking a habit result on a date and keeping the result available later.

**Independent Test**: Can be fully tested by logging in as the owner, selecting a date, choosing red or green, leaving the log page, returning to the same date, and confirming the selected color remains visible.

**Acceptance Scenarios**:

1. **Given** the owner is logged in and a date has no status, **When** the owner selects that date and chooses green, **Then** the date is shown as green and remains green after the page is revisited.
2. **Given** the owner is logged in and a date is already red, **When** the owner selects that date and chooses green, **Then** the date changes to green and the updated result is saved.
3. **Given** the owner is logged in on the log page, **When** the owner selects any visible calendar date, **Then** exactly two status options are available: red and green.

---

### User Story 2 - Visitor Views Calendar Without Editing (Priority: P2)

As a non-owner user, I want to log in and view the habit calendar so that I can see the tracked results without being able to change them.

**Why this priority**: The application explicitly allows others to view the calendar while preserving owner-only control over changes.

**Independent Test**: Can be fully tested by logging in as a non-owner account, opening the calendar, confirming logged statuses are visible, and confirming no edit action can change a date.

**Acceptance Scenarios**:

1. **Given** a non-owner user is logged in, **When** the user opens the log page, **Then** the calendar and existing red/green date statuses are visible.
2. **Given** a non-owner user is logged in, **When** the user selects a date, **Then** the user is not offered any action that can create or change a status.
3. **Given** a non-owner user attempts to access an edit action directly, **When** the action is submitted, **Then** the calendar remains unchanged and the user is informed that editing is restricted to the owner.

---

### User Story 3 - User Creates Account And Logs In (Priority: P3)

As a new user, I want to sign up with an email and password and then log in so that I can access the calendar view.

**Why this priority**: Authentication gates access to the log page and distinguishes owner editing rights from viewer-only access.

**Independent Test**: Can be fully tested by creating a new account, logging out, logging back in with the same credentials, and confirming the log page opens in viewer-only mode unless the credentials match the owner account.

**Acceptance Scenarios**:

1. **Given** a new user is on the login page, **When** the user chooses sign up and submits an unused email and password, **Then** the account is created and the user can access the log page.
2. **Given** an existing user is on the login page, **When** the user submits a matching email and password, **Then** the user is taken to the log page.
3. **Given** a user submits an incorrect email or password, **When** the login attempt is processed, **Then** access is denied and a clear error message is shown.

---

### User Story 4 - Login Page Matches Requested Layout And Branding (Priority: P4)

As any user, I want the login and signup experience to match the requested simple visual design so that the application feels consistent and intentional before entering the calendar.

**Why this priority**: The user provided detailed desktop and mobile layout, typography, branding, and color requirements for the login page.

**Independent Test**: Can be fully tested by opening the login page on desktop and mobile viewports and confirming the specified branding, text, form fields, button, sign-up prompt, colors, and responsive layout are present.

**Acceptance Scenarios**:

1. **Given** a desktop-sized viewport, **When** the login page loads, **Then** it shows a split layout with left-side logo/title/subtitle/footer and a right-side elevated white form card.
2. **Given** a mobile-sized viewport, **When** the login page loads, **Then** it shows a single-column layout with branding and text above a lower form card with rounded top corners.
3. **Given** the login page is displayed, **When** the user views typography and colors, **Then** all text uses DM Sans, primary text is black, the background is white, and primary actions/accent links use #C60000.

### Edge Cases

- If the owner signs up or logs in with the exact configured owner credentials, the account is treated as the only editor.
- If another user signs up with any other email or password, that user can only view the calendar.
- If a user closes the application or removes it from their device/browser context, the next visit requires login again before the log page is shown.
- If a selected date is outside the currently displayed month, the user must navigate to that month before viewing or changing its status.
- If a user submits an already registered email during signup, account creation is rejected with a clear message.
- If no habit status exists for a date, the date appears unmarked until the owner assigns red or green.
- If saving a status fails, the calendar must keep or restore the last confirmed saved status and tell the owner the change was not saved.
- If a user is not logged in and tries to open the log page, the user is redirected to the login page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a login page that includes the inline target/ring logo and "log" wordmark, the main title "This is just a calender", the subtitle "nothing else", email and password fields, a login action, and a sign-up prompt.
- **FR-002**: The login page MUST use DM Sans for all text, #FFFFFF as the primary background, #000000 as the primary text color, and #C60000 for primary actions and accent links.
- **FR-003**: The login page MUST adapt between the specified desktop split layout and mobile single-column layout without losing required branding, form fields, or actions.
- **FR-004**: The system MUST allow a new user to sign up with an email and password and store the account so the user can log in later.
- **FR-005**: The system MUST allow an existing user to log in with a registered email and matching password.
- **FR-006**: The system MUST deny login when credentials do not match a registered account.
- **FR-007**: The system MUST identify the account with email `hamdanshaikh11133@gmail.com` and password `mybumispurple` as the owner account for edit permissions.
- **FR-008**: The system MUST restrict creation and modification of calendar date statuses to the owner account only.
- **FR-009**: The system MUST allow logged-in non-owner users to view the calendar and all saved date statuses without edit controls.
- **FR-010**: The system MUST provide a log page containing a calendar where users can inspect dates by month.
- **FR-011**: The system MUST allow the owner to select a calendar date and choose exactly one of two statuses: red or green.
- **FR-012**: The system MUST visibly display saved red and green statuses on their corresponding calendar dates.
- **FR-013**: The system MUST persist date statuses so they remain available after users leave and later return to the application.
- **FR-014**: The system MUST allow the owner to replace a date's existing status with the other available status.
- **FR-015**: The system MUST require login again after the application has been closed or removed from the user's active context.
- **FR-016**: The system MUST prevent unauthenticated users from viewing the log page.
- **FR-017**: The system MUST show clear, user-friendly messages for failed login, failed signup, unauthorized edit attempts, and failed status saves.
- **FR-018**: The system MUST keep the product scope to two primary screens: login/signup and the calendar log page.
- **FR-019**: The system MUST not require email verification, password reset, or forgot-password flows.

### Key Entities *(include if feature involves data)*

- **User Account**: Represents a person who can authenticate. Key attributes include email, password credential, role determined by owner credential match, and account creation date.
- **Habit Date Status**: Represents the owner's result for a calendar date. Key attributes include calendar date, status color red or green, last changed time, and the owner account that made the change.
- **Session State**: Represents whether a user is currently allowed to access the log page during the active application usage period.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The owner can log in and mark any visible calendar date red or green in under 30 seconds from the login page.
- **SC-002**: A saved date status is still visible on the same date after the owner logs out and logs back in.
- **SC-003**: 100% of non-owner accounts can view saved calendar statuses but cannot create or modify a date status.
- **SC-004**: 100% of unauthenticated attempts to open the log page require the user to log in before viewing calendar data.
- **SC-005**: At least 95% of users can complete signup and reach the log page on their first attempt when using a valid unused email and password.
- **SC-006**: The login page matches all specified branding, typography, color, and responsive layout requirements across desktop and mobile review.

## Assumptions

- The application is a web experience only; no installed mobile or desktop app is required.
- Sign-up and login use email and password only.
- Users who forget their password create a new account because password recovery is intentionally out of scope.
- The exact owner email and password supplied in the request are the intended edit-permission gate for this feature.
- Red means an unsuccessful habit result and green means a successful habit result.
- Calendar date statuses are global and visible to every logged-in user, not private per viewer.
- The requested spelling "calender" is intentional for visible title text and should be preserved.
- The footer text is "© 2023 log." without "All Rights Reserved."
