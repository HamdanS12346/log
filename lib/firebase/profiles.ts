import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { roleForEmail } from "@/lib/auth/owner";
import { getFirebaseDb } from "./client";

export async function confirmUserProfile(userId: string, email: string) {
  await setDoc(
    doc(getFirebaseDb(), "profiles", userId),
    {
      email,
      role: roleForEmail(email),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}
