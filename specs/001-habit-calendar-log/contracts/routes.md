# Contract: Routes

## `/`

Behavior:

- Redirect unauthenticated users to `/login`.
- Redirect authenticated users to `/log`.

## `/login`

Behavior:

- Show login and signup modes on the login screen.
- Use labeled email and password fields.
- Successful signup stores the user account and creates the appropriate profile role.
- Successful login opens `/log`.
- Failed login or signup shows a clear error message.

## `/log`

Behavior:

- Require authentication.
- Load the current user's profile role.
- Open the calendar on the current month.
- On desktop, show current month and following month.
- On mobile, show current month only.
- Load habit statuses for the visible month range.
- Show edit controls only for owner.
- Show viewer-only calendar for non-owner users.

## Habit Status Save Boundary

Input:

- `date`: valid calendar date.
- `status`: `red` or `green`.

Behavior:

- Require authenticated owner.
- Create or replace the date's status.
- Return the saved status for display.
- Reject unauthenticated or viewer write attempts.
- Reject invalid date or status values.
