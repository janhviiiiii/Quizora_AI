// A React Context provider that listens to Supabase authentication changes.
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";
import { authService } from "@/services/auth.service";

export type Role = "teacher" | "student";

export type User = {
  id: string;
  fullname: string;
  email: string;
  role: Role;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: Role) => Promise<void>;
  signup: (
    fullname: string,
    email: string,
    password: string,
    role: Role,
  ) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let version = 0;

    async function loadSession(session: Session | null) {
      const currentVersion = ++version;

      if (!session) {
        if (active && currentVersion === version) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const profile = await authService.getProfile(session.user.id);

        if (!active || currentVersion !== version) return;

        setUser({
          id: session.user.id,
          fullname: profile.full_name,
          email: session.user.email ?? "",
          role: profile.role,
        });
      } catch (error) {
        console.error("Profile loading failed:", error);

        if (active && currentVersion === version) {
          setUser(null);
        }
      } finally {
        if (active && currentVersion === version) {
          setLoading(false);
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Do not await Supabase database calls
      // inside this callback.
      setTimeout(() => {
        if (active) void loadSession(session);
      }, 0);
    });

    return () => {
      active = false;
      version++;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, role: Role) => {
    const result = await authService.login(email, password);

    const profile = await authService.getProfile(result.user.id);

    if (profile.role !== role) {
      await authService.logout();
      throw new Error(`This account is registered as a ${profile.role}.`);
    }

    setUser({
      id: result.user.id,
      fullname: profile.full_name,
      email: result.user.email ?? "",
      role: profile.role,
    });
  };

  const signup = async (
    fullname: string,
    email: string,
    password: string,
    role: Role,
  ) => {
    const result = await authService.signup(fullname, email, password, role);

    // Email confirmation may be required.
    if (!result.session) {
      throw new Error(
        "Account created. Please verify your email before logging in.",
      );
    }

    const profile = await authService.getProfile(result.user!.id);

    setUser({
      id: result.user!.id,
      fullname: profile.full_name,
      email: result.user!.email ?? "",
      role: profile.role,
    });
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
