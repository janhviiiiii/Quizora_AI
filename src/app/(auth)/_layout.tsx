import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) return <Redirect href="/(app)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
