"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { addMonths } from "@/lib/calendar/date-format";
import {
  getVisibleRange,
  type PresentationMode
} from "@/lib/calendar/visible-range";
import { saveHabitStatus } from "@/app/log/actions";
import { watchSession, type AppSession } from "@/lib/auth/session";
import {
  loadHabitStatuses,
  persistHabitStatus
} from "@/lib/firebase/habit-statuses";
import type { HabitStatus } from "./StatusChooser";

type HabitCalendarOptions = {
  initialStatuses: Record<string, HabitStatus>;
  mode: PresentationMode;
};

export function useHabitCalendar({
  initialStatuses,
  mode
}: HabitCalendarOptions) {
  const router = useRouter();
  const [anchorMonth, setAnchorMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [statuses, setStatuses] = useState(initialStatuses);
  const [message, setMessage] = useState<string>();
  const [session, setSession] = useState<AppSession | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [pending, startTransition] = useTransition();

  const visibleRange = useMemo(
    () => getVisibleRange(anchorMonth, mode),
    [anchorMonth, mode]
  );
  const canEdit = session?.role === "owner";

  useEffect(() => {
    return watchSession((currentSession) => {
      setSession(currentSession);
      setSessionReady(true);

      if (!currentSession) {
        router.replace("/login");
      }
    });
  }, [router]);

  useEffect(() => {
    if (!sessionReady || !session) {
      return;
    }

    let ignore = false;

    loadHabitStatuses(visibleRange.startDateKey, visibleRange.endDateKey)
      .then((loadedStatuses) => {
        if (!ignore) {
          setStatuses(loadedStatuses);
        }
      })
      .catch(() => {
        if (!ignore) {
          setMessage("Could not load saved dates.");
        }
      });

    return () => {
      ignore = true;
    };
  }, [sessionReady, session, visibleRange.startDateKey, visibleRange.endDateKey]);

  function moveMonth(amount: number) {
    setAnchorMonth((current) => addMonths(current, amount));
    setSelectedDate(null);
    setMessage(undefined);
  }

  function chooseStatus(status: HabitStatus) {
    if (!session) {
      setMessage("Log in before changing dates.");
      return;
    }

    if (!canEdit) {
      setMessage("Only the owner can change dates.");
      return;
    }

    if (!selectedDate) {
      setMessage("Choose a date first.");
      return;
    }

    startTransition(async () => {
      const result = await saveHabitStatus(selectedDate, status, {
        email: session.email,
        userId: session.userId
      });

      if (!result.ok) {
        setMessage(result.message);
        return;
      }

      try {
        await persistHabitStatus(result.date, result.status, session.userId);
      } catch {
        setMessage("Could not save that date.");
        return;
      }

      setStatuses((current) => ({
        ...current,
        [result.date]: result.status
      }));
      setMessage("Saved");
    });
  }

  return {
    canEdit,
    chooseStatus,
    message,
    months: visibleRange.months,
    moveMonth,
    pending,
    selectedDate,
    sessionReady,
    setSelectedDate,
    statuses
  };
}
