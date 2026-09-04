import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User
} from "firebase/auth";
import { getFirebaseApp } from "./client";

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; message: string };

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export async function configureSessionPersistence(auth = getFirebaseAuth()) {
  await setPersistence(auth, browserSessionPersistence);
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await configureSessionPersistence();
    const credential = await signInWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      password
    );
    return { ok: true, user: credential.user };
  } catch {
    return { ok: false, message: "Email or password is incorrect." };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    await configureSessionPersistence();
    const credential = await createUserWithEmailAndPassword(
      getFirebaseAuth(),
      email,
      password
    );
    return { ok: true, user: credential.user };
  } catch {
    return { ok: false, message: "Could not create that account." };
  }
}

export async function signOutCurrentUser() {
  await signOut(getFirebaseAuth());
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}
