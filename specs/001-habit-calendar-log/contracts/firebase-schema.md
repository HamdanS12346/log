# Contract: Firebase Schema And Security

## Firebase Authentication

Purpose: Store and verify email/password user accounts.

Rules:

- Email/password sign-up and login are enabled.
- Password reset and email verification are out of scope.
- The configured owner email receives the owner application role.
- All other authenticated users receive the viewer application role.

## Firestore Collection: `profiles`

Purpose: Store app authorization role for each authenticated user.

Document id:

- Authenticated user id.

Fields:

- `email`: unique email address.
- `role`: `owner` or `viewer`.
- `createdAt`: creation timestamp.

Rules:

- Authenticated users may read their own profile.
- The configured owner email may have role `owner`.
- All other emails must have role `viewer`.
- Clients may not assign themselves owner role unless their authenticated email is the configured owner email.

## Firestore Collection: `habitStatuses`

Purpose: Store one habit status per calendar date.

Document id:

- Canonical date string in `YYYY-MM-DD` format.

Fields:

- `date`: canonical date string matching the document id.
- `status`: `red` or `green`.
- `updatedBy`: authenticated owner user id.
- `updatedAt`: update timestamp.

Rules:

- Authenticated users may read all habit status documents.
- Owner may create a document for an unrecorded date.
- Owner may update an existing document.
- Viewers may not create, update, or delete.
- Unauthenticated users may not read or write.
- Invalid status values are rejected.

## Required Security Rules Tests

- Anonymous user cannot read profiles.
- Anonymous user cannot read habit statuses.
- Viewer can read habit statuses.
- Viewer cannot create or update habit statuses.
- Owner can create red and green habit statuses.
- Owner can update an existing date status.
- Invalid date document ids are rejected.
- Invalid status values cannot be saved.
