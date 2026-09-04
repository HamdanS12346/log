# Research: Habit Calendar Log

## Decision: Use Next.js App Router

Rationale: The app has route-level screens for login and the log page, needs server-aware session checks, and has a small interactive calendar. App Router supports server-rendered routes by default and client components for interactive controls.

Alternatives considered:

- Static HTML only: rejected because authentication and persisted shared data require app logic.
- Separate frontend and backend apps: rejected because the required server boundary is small and Supabase covers auth and persistence.

## Decision: Use Supabase Auth For Users

Rationale: The feature requires email/password signup and login with stored users. Supabase Auth avoids custom password storage while coordinating with database security policies.

Alternatives considered:

- Custom password table: rejected because it creates avoidable security risk.
- No accounts: rejected because viewer access and owner-only editing require authentication.

## Decision: Use Supabase Postgres For Habit Logs

Rationale: Habit statuses need to persist, be visible to all authenticated users, and allow only one status per calendar date. A relational table with a unique date key fits the product model.

Alternatives considered:

- Browser storage: rejected because viewers on other devices must see the same calendar.
- File storage: rejected because it complicates concurrent web reads and writes.

## Decision: Enforce Owner-Only Writes With RLS And App Role Checks

Rationale: The UI hides editing from viewers, but database rules must also reject unauthorized writes. Profiles store the application role and policies allow authenticated reads while limiting inserts and updates to the owner.

Alternatives considered:

- UI-only restrictions: rejected because direct requests could bypass the UI.
- Multiple owners: rejected because the specification allows only the specified owner to edit.

## Decision: Owner Role Comes From The Specified Owner Email

Rationale: Supabase Auth owns password verification. The application assigns the owner role to the profile whose authenticated email is `hamdanshaikh11133@gmail.com`; the supplied password is used for the owner account login, not for application-side plaintext checks.

Alternatives considered:

- Store and compare the owner password in application code: rejected as unnecessary and unsafe.
- Manually assign roles for every user: rejected because the product has one known owner and all others are viewers.

## Decision: Non-Persistent Session Behavior

Rationale: The product requires users to log in again after the app/browser context is closed or removed. The client auth setup must avoid durable local persistence where supported and the app must treat missing or expired sessions as a redirect to login.

Alternatives considered:

- Remember users indefinitely: rejected because it contradicts the requested logout behavior.
- Require manual logout only: rejected because closing/removing the app should clear access.

## Decision: Calendar Reads Use Visible Month Range

Rationale: The calendar opens on the current month. Desktop needs current plus following month; mobile needs one month. Loading statuses for the visible range keeps reads small while supporting previous/next navigation.

Alternatives considered:

- Load all historical logs on every page load: rejected because it is unnecessary for visible calendar rendering.
- Restrict editing to current month only: rejected because the clarified spec allows logging in navigated months.

## Decision: UI Styling Uses Tokens And Semantic Components

Rationale: The constitution requires tokenized colors, semantic HTML, accessible controls, mobile-first responsive layout, and no decorative clutter. The requested palette maps cleanly to background, foreground, accent, muted, border, and status tokens.

Alternatives considered:

- Hardcode color values in every component: rejected because tokenized styling is a constitution requirement.
- Build the log page as a marketing hero: rejected because the log page must be only the calendar.
