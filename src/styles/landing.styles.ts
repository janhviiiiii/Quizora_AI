import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B0B0B",
  },

  header: {
    minHeight: 72,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
  },

  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logoIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },
  desktopNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },
  navText: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "600",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  smallButton: {
    backgroundColor: "#E5E5E5",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  mobileMenu: {
    padding: 20,
    gap: 8,
    backgroundColor: "#141414",
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  mobileMenuItem: {
    paddingVertical: 11,
  },
  menuText: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#303030",
    marginVertical: 8,
  },
  hero: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 72,
    paddingBottom: 82,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#222222",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 30,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  pillText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  heading: {
    color: "#FFFFFF",
    fontWeight: "800",
    textAlign: "center",
    maxWidth: 850,
    marginTop: 32,
  },
  purple: {
    fontWeight: "800",
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 17,
    lineHeight: 27,
    textAlign: "center",
    maxWidth: 700,
    marginTop: 22,
  },
  heroButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 35,
  },
  mobileHeroButtons: {
    flexDirection: "column",
    alignItems: "stretch",
    width: "100%",
  },
  primaryButton: {
    minHeight: 48,
    backgroundColor: "#E5E5E5",
    borderRadius: 11,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  outlineButton: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#383838",
    backgroundColor: "#1B1B1B",
    borderRadius: 11,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  darkButtonText: {
    color: "#111111",
    fontSize: 16,
    fontWeight: "700",
  },
  whiteButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 22,
    paddingVertical: 58,
    alignItems: "center",
  },
  sectionHeading: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
    rowGap: 2,
  },
  sectionEyebrow: {
    color: "#B69AFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    lineHeight: 37,
    fontWeight: "800",
    textAlign: "center",
  },
  sectionSubtitle: {
    color: "#999999",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 720,
    marginTop: 12,
    marginBottom: 32,
  },
  featureGrid: {
    width: "100%",
    maxWidth: 1200,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  featureCard: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#292929",
    borderRadius: 17,
    padding: 22,
    minHeight: 190,
    gap: 14,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#303030",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  featureDescription: {
    color: "#AAAAAA",
    fontSize: 14,
    lineHeight: 22,
  },
  contentSection: {
    paddingHorizontal: 24,
    paddingVertical: 58,
    gap: 18,
    maxWidth: 1050,
    width: "100%",
    alignSelf: "center",
  },
  bodyText: {
    color: "#AAAAAA",
    fontSize: 16,
    lineHeight: 27,
  },
  serviceList: {
    gap: 13,
    marginTop: 8,
  },
  serviceCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#292929",
    borderRadius: 15,
    backgroundColor: "#151515",
  },
  serviceNumber: {
    color: "#B69AFF",
    fontSize: 20,
    fontWeight: "800",
  },
  serviceCopy: {
    flex: 1,
    gap: 8,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
  },
  checkText: {
    color: "#CCCCCC",
    fontSize: 15,
    lineHeight: 23,
    flex: 1,
  },
  ctaSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 65,
    gap: 16,
    backgroundColor: "#141218",
  },
  footer: {
    padding: 28,
    borderTopWidth: 1,
    borderTopColor: "#292929",
    gap: 16,
  },
  footerDescription: {
    color: "#999999",
    fontSize: 14,
    lineHeight: 22,
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 18,
    marginTop: 4,
  },
  footerLink: {
    color: "#AAAAAA",
    fontSize: 13,
  },
  copyright: {
    color: "#777777",
    fontSize: 12,
    marginTop: 10,
  },

  // Hero heading layout
  heroHeadingGroup: {
    width: "100%",
    alignItems: "center",
  },

  headingDesktop: {
    fontSize: 50,
    lineHeight: 59,
  },

  headingMobile: {
    fontSize: 36,
    lineHeight: 44,
  },

  heroGradientText: {
    textAlign: "center",
  },

  // Responsive feature cards
  featureCardDesktop: {
    width: "31%",
  },

  featureCardMobile: {
    width: "100%",
  },
});
