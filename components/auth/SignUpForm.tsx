"use client";

import { FormEvent, useState } from "react";
import type { AuthCredentials } from "./LoginForm";

type SignUpFormProps = {
  pending?: boolean;
  errorMessage?: string;
  onSubmit: (credentials: AuthCredentials) => void;
};

export function SignUpForm({
  pending = false,
  errorMessage,
  onSubmit
}: SignUpFormProps) {
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: "",
    password: ""
  });

  function updateField(field: keyof AuthCredentials, value: string) {
    setCredentials((current) => ({ ...current, [field]: value }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(credentials);
  }

  return (
    <form className="auth-form" onSubmit={submitForm}>
      <label className="auth-field">
        <span>Email</span>
        <input
          autoComplete="email"
          inputMode="email"
          name="email"
          placeholder="jamesdean@madorwhat.com"
          type="email"
          value={credentials.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <input
          autoComplete="new-password"
          name="password"
          placeholder="secretstuff"
          type="password"
          value={credentials.password}
          onChange={(event) => updateField("password", event.target.value)}
        />
      </label>
      {errorMessage ? (
        <p className="auth-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
      <button className="auth-primary-button" disabled={pending} type="submit">
        Sign up
      </button>
    </form>
  );
}
