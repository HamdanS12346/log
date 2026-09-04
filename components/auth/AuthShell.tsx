"use client";

import type { ReactNode } from "react";
import { TargetLogo } from "@/components/ui/TargetLogo";

type AuthShellProps = {
  mode: "login" | "signup";
  children: ReactNode;
  onModeChange: (mode: "login" | "signup") => void;
};

export function AuthShell({ mode, children, onModeChange }: AuthShellProps) {
  const isLogin = mode === "login";

  return (
    <main className="auth-page" aria-label="Authentication">
      <section className="auth-container" aria-label="Log authentication">
        <section className="auth-branding" aria-label="Branding">
          <a className="auth-logo" href="/login" aria-label="log home">
            <TargetLogo className="auth-logo-icon" />
            <span>log</span>
          </a>
          <div className="auth-copy">
            <h1>This is just a calender</h1>
            <p>nothing else</p>
          </div>
          <p className="auth-footer">© 2023 log. All Rights Reserved.</p>
        </section>

        <section className="auth-card" aria-label={isLogin ? "Login" : "Sign up"}>
          {children}
          <footer className="auth-card-footer">
            <span>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              className="auth-link-button"
              type="button"
              onClick={() => onModeChange(isLogin ? "signup" : "login")}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </footer>
        </section>
      </section>
    </main>
  );
}
