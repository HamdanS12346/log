# Quickstart: Habit Calendar Log

## Prerequisites

- Node.js available for a Next.js project.
- Supabase project available.
- Supabase project URL and publishable key configured locally.
- Owner credentials available:
  - Email: `hamdanshaikh11133@gmail.com`
  - Password: `mybumispurple`

## Setup

1. Create the Next.js app structure described in `plan.md`.
2. Configure Supabase environment variables.
3. Apply schema and policies from `contracts/supabase-schema.md`.
4. Run Supabase policy tests.
5. Start the local web app.

## Validation Scenarios

### Signup

Expected outcome:

- A new email and password create a viewer account.
- Duplicate email signup shows a clear error.
- The user reaches the calendar after successful signup.

### Login

Expected outcome:

- Registered users can log in.
- Incorrect credentials show a clear error.
- Unauthenticated visits to `/log` redirect to `/login`.
- Closing/removing the active app context requires login again.

### Owner Editing

Expected outcome:

- The owner logs in with the configured credentials.
- The owner sees calendar edit controls.
- The owner can mark any visible or navigated date red or green.
- Saved statuses remain visible after logout and later login.
- The owner can change a date from red to green or green to red.

### Viewer Read-Only Access

Expected outcome:

- Viewer accounts can see saved calendar statuses.
- Viewer accounts do not see edit controls.
- Direct viewer write attempts fail.

### Calendar Layout

Expected outcome:

- Desktop opens with current month and following month side by side.
- Mobile opens with current month only.
- Previous and next controls navigate months.
- Recorded statuses appear on the correct dates after navigation.
- The calendar remains readable without overlap on mobile and desktop.

### Accessibility And Visual Quality

Expected outcome:

- All form inputs have labels.
- Buttons are native controls with visible focus states.
- Calendar cells keep stable dimensions across status and interaction states.
- The UI uses the white, black, crimson, and muted token palette.
- The UI avoids constitution-prohibited visual and structural anti-patterns.

## References

- Main spec: `spec.md`
- Calendar refinement: `../002-calendar-page-layout/spec.md`
- Data model: `data-model.md`
- Supabase contract: `contracts/supabase-schema.md`
- Route contract: `contracts/routes.md`
- UI contract: `contracts/ui.md`
