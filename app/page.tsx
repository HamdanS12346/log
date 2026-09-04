"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { watchSession } from "@/lib/auth/session";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    return watchSession((session) => {
      router.replace(session ? "/log" : "/login");
    });
  }, [router]);

  return (
    <main aria-label="Loading log" className="root-loading">
      <p>Loading</p>
    </main>
  );
}
