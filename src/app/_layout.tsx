import { useEffect, useState } from "react";
import { Platform, useColorScheme } from "react-native";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";

import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

// Prevent the native splash screen from hiding automatically.
if (Platform.OS !== "web") {
  void SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Web: keep server rendering and initial browser rendering consistent.
  // Native: use the device theme immediately.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldUseDarkTheme =
    (Platform.OS !== "web" || hasMounted) && colorScheme === "dark";

  const navigationTheme = shouldUseDarkTheme ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={navigationTheme}>
      {/* Existing animated splash screen */}
      <AnimatedSplashOverlay />

      {/* Application navigation */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
