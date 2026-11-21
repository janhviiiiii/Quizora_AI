// SIGNUP AND LOGIN AUTHENTICATION PAGE

import React, { useSyncExternalStore } from "react";

export type Role = "teacher" | "student";
export type User = { fullname: string; email: string; role: Role };

let current: User | null = null;
const listeners = new Set<() => void>();

function setUser(u: User | null) {
  current = u;
  listeners.forEach((l) => l());
}
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const getSnapshot = () => current;

// TODO: replace with real API calls later
const login = async (email: string, _password: string, role: Role) => {
  await new Promise((r) => setTimeout(r, 600));
  setUser({ fullname: email.split("@")[0] || "User", email, role });
};
const signup = async (
  fullname: string,
  email: string,
  _password: string,
  role: Role,
) => {
  await new Promise((r) => setTimeout(r, 600));
  setUser({ fullname, email, role });
};
const logout = () => setUser(null);

export function useAuth() {
  const user = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { user, login, signup, logout };
}

// Kept so existing imports still work. It no longer does anything.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
