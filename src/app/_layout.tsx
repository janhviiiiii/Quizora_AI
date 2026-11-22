import { useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";

import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthProvider } from "@/context/auth";

if (Platform.OS !== "web") {
  void SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldUseDarkTheme =
    (Platform.OS !== "web" || hasMounted) && colorScheme === "dark";

  const navigationTheme = shouldUseDarkTheme ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={navigationTheme}>
      <AuthProvider>
        <AnimatedSplashOverlay />

        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
