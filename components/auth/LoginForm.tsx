"use client";

import { FormEvent, useState } from "react";

export type AuthCredentials = {
  email: string;
  password: string;
};

type LoginFormProps = {
  pending?: boolean;
  errorMessage?: string;
  onSubmit: (credentials: AuthCredentials) => void;
};

export function LoginForm({
  pending = false,
  errorMessage,
  onSubmit
}: LoginFormProps) {
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
          autoComplete="current-password"
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
        Login
      </button>
    </form>
  );
}
