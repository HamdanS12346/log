import { describe, expect, it } from "vitest";
import { isOwnerEmail, normalizeEmail, OWNER_EMAIL, roleForEmail } from "@/lib/auth/owner";

describe("owner role detection", () => {
  it("normalizes email addresses before comparison", () => {
    expect(normalizeEmail("  HamdanShaikh11133@GMAIL.COM ")).toBe(OWNER_EMAIL);
  });

  it("identifies the configured owner email", () => {
    expect(isOwnerEmail("hamdanshaikh11133@gmail.com")).toBe(true);
    expect(roleForEmail("hamdanshaikh11133@gmail.com")).toBe("owner");
  });

  it("treats every other email as viewer", () => {
    expect(isOwnerEmail("viewer@example.com")).toBe(false);
    expect(roleForEmail("viewer@example.com")).toBe("viewer");
    expect(roleForEmail(null)).toBe("viewer");
  });
});
