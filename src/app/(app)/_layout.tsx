// This prevents the app from redirecting to login while Supabase is still restoring a saved session.
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import AppTabs from "@/components/app-tabs";
import { useAuth } from "@/context/auth";

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0B0B0B",
        }}
      >
        <ActivityIndicator size="large" color="#A78BFA" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <AppTabs />;
}
