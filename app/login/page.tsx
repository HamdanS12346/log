"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm, type AuthCredentials } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { signInWithEmail, signUpWithEmail } from "@/lib/firebase/auth";
import { confirmUserProfile } from "@/lib/firebase/profiles";

type AuthMode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [pending, startTransition] = useTransition();

  function handleSubmit(credentials: AuthCredentials) {
    setErrorMessage(undefined);

    startTransition(async () => {
      const result =
        mode === "login"
          ? await signInWithEmail(credentials.email, credentials.password)
          : await signUpWithEmail(credentials.email, credentials.password);

      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }

      if (result.user.email) {
        await confirmUserProfile(result.user.uid, result.user.email);
      }

      router.push("/log");
    });
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setErrorMessage(undefined);
  }

  return (
    <AuthShell mode={mode} onModeChange={changeMode}>
      {mode === "login" ? (
        <LoginForm
          errorMessage={errorMessage}
          pending={pending}
          onSubmit={handleSubmit}
        />
      ) : (
        <SignUpForm
          errorMessage={errorMessage}
          pending={pending}
          onSubmit={handleSubmit}
        />
      )}
    </AuthShell>
  );
}
