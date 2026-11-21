import type { Palette } from "@/lib/colors";
import { Platform, StyleSheet } from "react-native";

export function createDashboardStyles(c: Palette) {
  return StyleSheet.create({
    center: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },

    actions: {
      flexDirection: "row",
      gap: 12,
      width: "100%",
    },

    actionButton: {
      flex: 1,
      minHeight: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      borderWidth: 1,
      borderRadius: 13,
      paddingHorizontal: 10,
    },

    logoutIcon: {
      width: 43,
      height: 43,
      borderWidth: 1,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },

    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "flex-start",
    },

    statCard: {
      borderWidth: 1,
      borderRadius: 17,
      padding: 17,
      gap: 5,
    },

    statIcon: {
      width: 43,
      height: 43,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 7,
    },

    statValue: {
      fontSize: 27,
      fontWeight: "900",
    },

    section: {
      borderWidth: 1,
      borderRadius: 17,
      padding: 17,
      gap: 12,
      backgroundColor: c.card,
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 3,
    },

    item: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 13,
      borderWidth: 1,
      borderRadius: 13,
    },

    badge: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 999,
    },

    catGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },

    catCard: {
      borderWidth: 1,
      borderRadius: 13,
      padding: 13,
      minHeight: 105,
      flexGrow: 0,
    },

    studentCard: {
      width: "100%",
      maxWidth: 420,
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 22,
      padding: 30,
    },

    studentIcon: {
      width: 64,
      height: 64,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },

    logoutButton: {
      marginTop: 22,
      paddingHorizontal: 25,
      paddingVertical: 12,
      borderRadius: 12,
    },

    webCardShadow: Platform.select({
      web: {
        boxShadow: "0px 8px 28px rgba(0,0,0,0.16)",
      },
      default: {},
    }),
  });
}
