import { Text, View } from "react-native";

import { createDashboardStyles } from "@/features/dashboard/dashboard.styles";
import { usePalette } from "@/lib/colors";

interface BadgeProps {
  label: string;
  fg: string;
  bg: string;
}

export function Badge({ label, fg, bg }: BadgeProps) {
  const c = usePalette();
  const styles = createDashboardStyles(c);

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text
        style={{
          color: fg,
          fontSize: 11,
          fontWeight: "700",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
