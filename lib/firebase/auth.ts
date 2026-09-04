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
import { FirebaseError } from "firebase/app";
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
  } catch (error) {
    return { ok: false, message: authErrorMessage(error, "login") };
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
  } catch (error) {
    return { ok: false, message: authErrorMessage(error, "signup") };
  }
}

export async function signOutCurrentUser() {
  await signOut(getFirebaseAuth());
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

function authErrorMessage(error: unknown, mode: "login" | "signup") {
  if (!(error instanceof FirebaseError)) {
    return mode === "login"
      ? "Email or password is incorrect."
      : "Could not create that account.";
  }

  if (error.code === "auth/email-already-in-use") {
    return "That email already has an account.";
  }

  if (error.code === "auth/weak-password") {
    return "Password must be at least 6 characters.";
  }

  if (error.code === "auth/invalid-email") {
    return "Enter a valid email address.";
  }

  return mode === "login"
    ? "Email or password is incorrect."
    : "Could not create that account.";
}
