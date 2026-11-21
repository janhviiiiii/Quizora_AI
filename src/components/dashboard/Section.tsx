import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { createDashboardStyles } from "@/features/dashboard/dashboard.styles";
import { usePalette } from "@/lib/colors";

interface SectionProps {
  title: string;
  action?: string;
  onActionPress?: () => void;
  children: ReactNode;
}

export function Section({
  title,
  action,
  onActionPress,
  children,
}: SectionProps) {
  const c = usePalette();
  const styles = createDashboardStyles(c);

  return (
    <View
      style={[
        styles.section,
        { backgroundColor: c.card, borderColor: c.border },
        styles.webCardShadow,
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={{ color: c.text, fontSize: 17, fontWeight: "800" }}>
          {title}
        </Text>

        {action && (
          <Pressable
            onPress={onActionPress}
            disabled={!onActionPress}
            style={styles.row}
          >
            <Text style={{ color: c.primary, fontWeight: "700" }}>
              {action}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={c.primary} />
          </Pressable>
        )}
      </View>

      {children}
    </View>
  );
}
