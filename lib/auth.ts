export type UserRole = "librarian" | "student";

export function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getExistingAuth() {
  const accessToken = getCookieValue("accessToken");
  const userRole = getCookieValue("userRole") as UserRole | null;
  return { accessToken, userRole };
}

export function setAuthCookies(role: UserRole) {
  const maxAge = 60 * 60 * 24; // 1 day
  document.cookie = `accessToken=fake-token; path=/; max-age=${maxAge}; SameSite=Lax`;
  document.cookie = `userRole=${role}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearAuthCookies() {
  document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax";
  document.cookie = "userRole=; path=/; max-age=0; SameSite=Lax";
}
