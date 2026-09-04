# log

Just a log

## Local setup

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Create `.env.local` from `.env.example` and fill in the Firebase web app values:

   ```text
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   ```

3. In Firebase Console, enable Email/Password Authentication and Cloud Firestore.

4. Deploy Firestore rules:

   ```powershell
   firebase deploy --only firestore
   ```

5. Run the app:

   ```powershell
   npm run dev
   ```

## Owner account

The owner email is `hamdanshaikh11133@gmail.com`. That account is the only account that can edit calendar statuses. Other signed-in users can view the calendar only.

## Validation

Run local TypeScript and component/unit checks:

```powershell
npm run typecheck
npm run test -- --run tests/component tests/unit
```

Run Playwright checks with the app and Firebase test accounts configured:

```powershell
npm run test:e2e
```

Run Firestore rules tests with Java installed and on `PATH`:

```powershell
firebase emulators:exec --only firestore "npm.cmd run test -- --run firebase/tests/firestore.rules.test.ts"
```
