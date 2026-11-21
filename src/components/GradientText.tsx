import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentType, ReactElement, ReactNode } from "react";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Platform, Text } from "react-native";

interface GradientTextProps {
  children: string;
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  lineHeight?: number;
}

type CompatibleMaskedViewProps = {
  maskElement: ReactElement;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const CompatibleMaskedView =
  MaskedView as unknown as ComponentType<CompatibleMaskedViewProps>;

export default function GradientText({
  children,
  style,
  fontSize = 29,
  lineHeight = 37,
}: GradientTextProps) {
  const textStyle: TextStyle = {
    fontSize,
    lineHeight,
    fontWeight: "800",
    includeFontPadding: false,
    textAlignVertical: "center",
  };

  // React Native Web: use a reliable solid accent color.
  if (Platform.OS === "web") {
    return (
      <Text style={[textStyle, style, { color: "#C4B5FD" }]}>{children}</Text>
    );
  }

  // Native: render the gradient using MaskedView.
  return (
    <CompatibleMaskedView
      style={{ alignSelf: "baseline" }}
      maskElement={
        <Text style={[textStyle, style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={["#A78BFA", "#C4B5FD", "#E9DFFF", "#FFFFFF"]}
        locations={[0, 0.4, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={[textStyle, style, { opacity: 0 }]}>{children}</Text>
      </LinearGradient>
    </CompatibleMaskedView>
  );
}
