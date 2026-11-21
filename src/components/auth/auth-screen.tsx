import { Link } from "expo-router";
import type { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/GradientText";
import { usePalette } from "@/lib/colors";

type AuthScreenProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: "/login" | "/signup";
};

export default function AuthScreen({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: AuthScreenProps) {
  const c = usePalette();
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width >= 900;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: c.bg,
      }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: isDesktop ? 48 : 24,
            paddingHorizontal: isDesktop ? 32 : 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              width: "100%",
              maxWidth: 1050,
              flexDirection: isDesktop ? "row" : "column",
              alignItems: "center",
              justifyContent: "center",
              gap: isDesktop ? 64 : 0,
            }}
          >
            {/* Left branding panel - desktop only */}
            {isDesktop && (
              <View
                style={{
                  flex: 1,
                  gap: 24,
                  paddingVertical: 30,
                  maxWidth: 460,
                }}
              >
                <GradientText
                  fontSize={25}
                  lineHeight={34}
                  style={{
                    fontWeight: "900",
                    letterSpacing: 2,
                  }}
                >
                  QUIZORA AI
                </GradientText>

                <Text
                  style={{
                    color: c.text,
                    fontSize: 48,
                    lineHeight: 57,
                    fontWeight: "900",
                  }}
                >
                  Make every quiz a better learning experience.
                </Text>

                <Text
                  style={{
                    color: c.muted,
                    fontSize: 16,
                    lineHeight: 27,
                    maxWidth: 410,
                  }}
                >
                  Create assessments, run live quiz sessions, and understand
                  learning progress with one connected platform.
                </Text>

                <View style={{ gap: 16, marginTop: 8 }}>
                  {[
                    "AI-assisted quiz creation",
                    "Live quiz sessions",
                    "Automatic assessment evaluation",
                  ].map((item) => (
                    <View
                      key={item}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 9,
                          height: 9,
                          borderRadius: 5,
                          backgroundColor: c.primary,
                        }}
                      />
                      <Text
                        style={{
                          color: c.muted,
                          fontSize: 14,
                        }}
                      >
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Authentication card */}
            <View
              style={{
                width: "100%",
                maxWidth: isDesktop ? 470 : 500,
                backgroundColor: c.card,
                borderColor: c.border,
                borderWidth: 1,
                borderRadius: 24,
                padding: isDesktop ? 32 : 24,
                gap: 22,

                ...(Platform.OS === "web"
                  ? {
                      boxShadow: "0px 18px 55px rgba(0,0,0,0.28)",
                    }
                  : {
                      elevation: 8,
                    }),
              }}
            >
              {/* Heading */}
              <View style={{ gap: 8 }}>
                {!isDesktop && (
                  <GradientText
                    fontSize={20}
                    lineHeight={28}
                    style={{
                      fontWeight: "900",
                      letterSpacing: 1.5,
                    }}
                  >
                    QUIZORA AI
                  </GradientText>
                )}

                <Text
                  style={{
                    color: c.text,
                    fontSize: 28,
                    lineHeight: 36,
                    fontWeight: "800",
                  }}
                >
                  {title}
                </Text>

                <Text
                  style={{
                    color: c.muted,
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {subtitle}
                </Text>
              </View>

              {/* Form */}
              <View style={{ gap: 17 }}>{children}</View>

              {/* Footer */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: 5,
                  paddingTop: 4,
                }}
              >
                <Text style={{ color: c.muted, fontSize: 13 }}>
                  {footerText}
                </Text>

                <Link
                  href={footerHref}
                  style={{
                    color: c.primary,
                    fontWeight: "800",
                    fontSize: 13,
                  }}
                >
                  {footerLinkText}
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
