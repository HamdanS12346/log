# Data Model: Habit Calendar Log

## User Account

Represents a Firebase-authenticated person.

Fields:

- `id`: Unique authenticated user id.
- `email`: Unique login email.
- `created_at`: Account creation timestamp.

Validation rules:

- Email must be unique.
- Login requires matching email and password.
- Password reset and email verification are out of scope.

Relationships:

- Has one profile.
- Can read habit statuses after authentication.

## Profile

Represents app-specific authorization.

Fields:

- `user_id`: Primary key linked to the authenticated user.
- `email`: User email.
- `role`: `owner` or `viewer`.
- `created_at`: Profile creation timestamp.

Validation rules:

- `hamdanshaikh11133@gmail.com` is assigned `owner`.
- All other users are assigned `viewer`.
- Only the owner role can create or change habit statuses.

Relationships:

- Belongs to one user account.
- Determines whether the calendar shows edit controls.

## Habit Date Status

Represents one saved habit result for one date.

Fields:

- `date`: Unique calendar date.
- `status`: `red` or `green`.
- `updated_by`: Owner user id that last changed the date.
- `updated_at`: Last update timestamp.

Validation rules:

- Only one row per date.
- Status must be exactly `red` or `green`.
- Authenticated users can read all statuses.
- Only the owner can insert or update statuses.
- Unauthenticated users cannot read or write statuses.

State transitions:

- Empty date -> `red`.
- Empty date -> `green`.
- `red` -> `green`.
- `green` -> `red`.

## Calendar View State

Represents the visible calendar UI state.

Fields:

- `anchor_month`: The month used as the current visible month.
- `presentation_mode`: `single_month` or `dual_month`.
- `visible_start_date`: First date needed for the visible grid.
- `visible_end_date`: Last date needed for the visible grid.
- `selected_date`: Date currently selected by the owner, if any.

Validation rules:

- Initial anchor month is the user's current month.
- Desktop presentation shows current and following month.
- Mobile presentation shows one month at a time.
- Previous/next navigation updates the anchor month.

## Calendar Date Cell

Represents one visible calendar cell.

Fields:

- `date`: Calendar date represented by the cell.
- `day_number`: Visible day number.
- `is_active_month`: Whether the date belongs to its displayed month.
- `habit_status`: Empty, `red`, or `green`.
- `can_edit`: Whether current user is owner.

Validation rules:

- Outside-month dates appear muted.
- Active unrecorded dates use normal text.
- Recorded dates visibly show red or green status.
- Cell dimensions stay stable across status and interaction states.

## Session State

Represents access during the active browser/app context.

Fields:

- `user_id`: Authenticated user id.
- `role`: `owner` or `viewer`.
- `expires_at`: Session expiration timestamp when available.

Validation rules:

- Missing or expired sessions redirect to login.
- Closing/removing the browser/app context requires login again.
- Viewer sessions never expose edit controls.
