export const OWNER_EMAIL = "hamdanshaikh11133@gmail.com";

export type UserRole = "owner" | "viewer";

export function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export function isOwnerEmail(email: string | null | undefined) {
  return normalizeEmail(email) === OWNER_EMAIL;
}

export function roleForEmail(email: string | null | undefined): UserRole {
  return isOwnerEmail(email) ? "owner" : "viewer";
}
