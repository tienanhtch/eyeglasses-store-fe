import type { UserResponse } from "@/services/auth";

export function getCurrentUser(): UserResponse | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("currentUser");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserResponse;
  } catch {
    return null;
  }
}

export function getCurrentUserId(): string | null {
  return getCurrentUser()?.id ?? null;
}


