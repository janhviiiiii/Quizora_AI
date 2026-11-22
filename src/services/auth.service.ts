import { supabase } from "@/lib/supabase";

export type Role = "teacher" | "student";

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
};

export const authService = {
  async signup(fullname: string, email: string, password: string, role: Role) {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullname.trim(),
          role,
        },
      },
    });

    if (error) throw error;

    return data;
  },

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;

    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },

  async getProfile(userId: string): Promise<Profile> {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return data as Profile;
  },
};
