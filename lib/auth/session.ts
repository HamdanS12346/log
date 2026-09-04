import type { User } from "firebase/auth";
import { configureSessionPersistence, subscribeToAuthState } from "@/lib/firebase/auth";
import { roleForEmail, type UserRole } from "./owner";

export type AppSession = {
  userId: string;
  email: string;
  role: UserRole;
};

export function sessionFromFirebaseUser(user: User | null): AppSession | null {
  if (!user?.email) {
    return null;
  }

  return {
    userId: user.uid,
    email: user.email,
    role: roleForEmail(user.email)
  };
}

export async function prepareBrowserSession() {
  await configureSessionPersistence();
}

export function watchSession(callback: (session: AppSession | null) => void) {
  return subscribeToAuthState((user) => {
    callback(sessionFromFirebaseUser(user));
  });
}
