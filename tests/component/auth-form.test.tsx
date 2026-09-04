import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";

type AuthFormProps = {
  pending?: boolean;
  errorMessage?: string;
  onSubmit: (credentials: { email: string; password: string }) => void;
};

async function loadAuthComponent(name: "LoginForm" | "SignUpForm") {
  const modulePath = `@/components/auth/${name}`;
  return import(modulePath) as Promise<Record<typeof name, React.ComponentType<AuthFormProps>>>;
}

describe("login form state", () => {
  it("submits labeled email and password fields", async () => {
    const { LoginForm } = await loadAuthComponent("LoginForm");
    const onSubmit = vi.fn();

    render(createElement(LoginForm, { onSubmit }));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "viewer@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "viewer-password" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "viewer@example.com",
      password: "viewer-password"
    });
  });

  it("shows login errors near the form", async () => {
    const { LoginForm } = await loadAuthComponent("LoginForm");

    render(createElement(LoginForm, {
      errorMessage: "Email or password is incorrect.",
      onSubmit: vi.fn()
    }));

    expect(screen.getByText("Email or password is incorrect.")).toBeInTheDocument();
  });
});

describe("signup form state", () => {
  it("submits labeled email and password fields", async () => {
    const { SignUpForm } = await loadAuthComponent("SignUpForm");
    const onSubmit = vi.fn();

    render(createElement(SignUpForm, { onSubmit }));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "new@example.com" }
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "new-password" }
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: "new@example.com",
      password: "new-password"
    });
  });

  it("disables signup submission while pending", async () => {
    const { SignUpForm } = await loadAuthComponent("SignUpForm");

    render(createElement(SignUpForm, {
      pending: true,
      onSubmit: vi.fn()
    }));

    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
  });
});
