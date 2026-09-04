"use server";

import { isOwnerEmail } from "@/lib/auth/owner";
import type { HabitStatus } from "@/components/calendar/StatusChooser";

export type SaveHabitStatusResult =
  | { ok: true; date: string; status: HabitStatus }
  | { ok: false; message: string };

type SaveActor = {
  email: string | null;
  userId: string;
};

export async function saveHabitStatus(
  date: string,
  status: HabitStatus,
  actor?: SaveActor
): Promise<SaveHabitStatusResult> {
  if (!actor?.userId || !isOwnerEmail(actor.email)) {
    return { ok: false, message: "Only the owner can change dates." };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { ok: false, message: "Choose a valid date." };
  }

  if (status !== "red" && status !== "green") {
    return { ok: false, message: "Choose red or green." };
  }

  return { ok: true, date, status };
}
