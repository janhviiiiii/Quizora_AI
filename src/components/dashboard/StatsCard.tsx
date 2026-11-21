import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { createDashboardStyles } from "@/features/dashboard/dashboard.styles";
import { usePalette } from "@/lib/colors";

interface StatsCardProps {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  tintBg: string;
  cardWidth?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  tint,
  tintBg,
}: StatsCardProps) {
  const c = usePalette();
  const styles = createDashboardStyles(c);

  return (
    <View
      style={[
        styles.statCard,
        { backgroundColor: c.card, borderColor: c.border },
        styles.webCardShadow,
      ]}
    >
      <View style={[styles.statIcon, { backgroundColor: tintBg }]}>
        <Ionicons name={icon} size={22} color={tint} />
      </View>

      <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>

      <Text style={{ color: c.muted, fontSize: 13 }} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}
