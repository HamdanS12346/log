# Contract: Supabase Schema And Security

## `profiles`

Purpose: Store app authorization role for each authenticated user.

Fields:

- `user_id`: primary key linked to authenticated user id.
- `email`: unique email address.
- `role`: `owner` or `viewer`.
- `created_at`: creation timestamp.

Rules:

- A profile is created after signup or first login.
- The configured owner email receives role `owner`.
- All other emails receive role `viewer`.
- Authenticated users may read their own profile.

## `habit_statuses`

Purpose: Store one habit status per calendar date.

Fields:

- `date`: primary key date.
- `status`: `red` or `green`.
- `updated_by`: authenticated owner user id.
- `updated_at`: update timestamp.

Rules:

- Authenticated users may read all rows.
- Owner may insert a row for an unrecorded date.
- Owner may update an existing row.
- Viewers may not insert, update, or delete.
- Unauthenticated users may not read or write.
- Invalid status values are rejected.

## Required Policy Tests

- Anonymous user cannot read profiles.
- Anonymous user cannot read habit statuses.
- Viewer can read habit statuses.
- Viewer cannot insert or update habit statuses.
- Owner can insert red and green habit statuses.
- Owner can update an existing date status.
- Duplicate date records cannot be created.
- Invalid status values cannot be saved.
