import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { getFirebaseDb } from "./client";
import type { HabitStatus } from "@/components/calendar/StatusChooser";

const HABIT_STATUSES_COLLECTION = "habitStatuses";

export async function loadHabitStatuses(
  startDateKey: string,
  endDateKey: string
): Promise<Record<string, HabitStatus>> {
  const snapshot = await getDocs(
    query(
      collection(getFirebaseDb(), HABIT_STATUSES_COLLECTION),
      where("date", ">=", startDateKey),
      where("date", "<=", endDateKey)
    )
  );

  const statuses: Record<string, HabitStatus> = {};

  snapshot.forEach((document) => {
    const data = document.data();
    if (data.status === "red" || data.status === "green") {
      statuses[document.id] = data.status;
    }
  });

  return statuses;
}

export async function persistHabitStatus(
  date: string,
  status: HabitStatus,
  userId: string
) {
  await setDoc(doc(getFirebaseDb(), HABIT_STATUSES_COLLECTION, date), {
    date,
    status,
    updatedBy: userId,
    updatedAt: serverTimestamp()
  });
}
