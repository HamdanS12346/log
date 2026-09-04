import { fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";

describe("login form state", () => {
  it("submits labeled email and password fields", () => {
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

  it("shows login errors near the form", () => {
    render(createElement(LoginForm, {
      errorMessage: "Email or password is incorrect.",
      onSubmit: vi.fn()
    }));

    expect(screen.getByText("Email or password is incorrect.")).toBeInTheDocument();
  });
});

describe("signup form state", () => {
  it("submits labeled email and password fields", () => {
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

  it("disables signup submission while pending", () => {
    render(createElement(SignUpForm, {
      pending: true,
      onSubmit: vi.fn()
    }));

    expect(screen.getByRole("button", { name: "Sign up" })).toBeDisabled();
  });
});

describe("auth shell layout and accessibility", () => {
  it("renders required branding copy and a labeled auth region", () => {
    render(
      createElement(AuthShell, {
        mode: "login",
        onModeChange: vi.fn(),
        children: createElement(LoginForm, { onSubmit: vi.fn() })
      })
    );

    expect(screen.getByRole("main", { name: "Authentication" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "log home" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "This is just a calender" })).toBeInTheDocument();
    expect(screen.getByText("nothing else")).toBeInTheDocument();
    expect(screen.getByText("© 2023 log.")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("uses a native button to switch between login and signup modes", () => {
    const onModeChange = vi.fn();

    render(
      createElement(AuthShell, {
        mode: "login",
        onModeChange,
        children: createElement(LoginForm, { onSubmit: vi.fn() })
      })
    );

    fireEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(onModeChange).toHaveBeenCalledWith("signup");
  });
});
