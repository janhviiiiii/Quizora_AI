import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

const TABS = [
  {
    name: "dashboard",
    label: "Dashboard",
    sf: "square.grid.2x2.fill",
    md: "dashboard",
  },
  { name: "quizzes", label: "Quizzes", sf: "book.fill", md: "menu_book" },
  {
    name: "questions",
    label: "Questions",
    sf: "questionmark.circle.fill",
    md: "help",
  },
  { name: "students", label: "Students", sf: "person.2.fill", md: "groups" },
  { name: "settings", label: "Settings", sf: "gearshape.fill", md: "settings" },
] as const;

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}
    >
      {TABS.map((t) => (
        <NativeTabs.Trigger key={t.name} name={t.name}>
          <NativeTabs.Trigger.Label>{t.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={t.sf} md={t.md} />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
