import { useState } from "react";
import type { ComponentProps, ComponentRef, Ref } from "react";

import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { Role } from "@/context/auth";
import { usePalette } from "@/lib/colors";

export function Field({
  label,
  icon,
  value,
  onChangeText,
  secure,
  keyboardType,
  autoCapitalize = "none",
  error,
  inputRef,
  autoComplete,
  onBlur,
  onSubmitEditing,
  returnKeyType,
  submitBehavior,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (t: string) => void;
  secure?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "words";
  error?: string;
  inputRef?: Ref<ComponentRef<typeof TextInput>>;
} & Pick<
  ComponentProps<typeof TextInput>,
  "autoComplete" | "onBlur" | "onSubmitEditing" | "returnKeyType" | "submitBehavior"
>) {
  const c = usePalette();
  const [hidden, setHidden] = useState(!!secure);
  const [focused, setFocused] = useState(false);
  const accent = error ? c.danger : focused ? c.primary : c.muted;
  return (
    <View style={{ gap: 6 }}>
      <Text style={[s.label, { color: c.text }]}>{label}</Text>

      <View
        style={[
          s.inputWrap,
          {
            backgroundColor: error ? c.dangerBg : c.surface,
            borderColor: error || focused ? accent : c.border,
          },
        ]}
      >
        <Ionicons name={icon} size={18} color={accent} />
        <TextInput
          ref={inputRef}
          accessibilityLabel={label}
          accessibilityHint={error}
          style={[s.input, { color: c.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={label}
          placeholderTextColor={c.muted}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          submitBehavior={submitBehavior}
          blurOnSubmit={Platform.OS === "web" && submitBehavior === "submit" ? false : undefined}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />
        {secure && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            onPress={() => setHidden((h) => !h)}
            style={s.visibilityToggle}
          >
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={18}
              color={c.muted}
            />
          </Pressable>
        )}
      </View>
      {error && (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={[s.error, { color: c.danger }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  loading,
}: {
  title: string;
  onPress: () => void;
  loading?: boolean;
}) {
  const c = usePalette();
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: loading }}
      style={({ pressed }) => [
        s.button,
        {
          backgroundColor: c.primary,
          opacity: pressed || loading ? 0.82 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      {loading ? (
        <View style={s.buttonContent}>
          <ActivityIndicator color="#17121F" />
          <Text style={s.buttonText}>{title}</Text>
        </View>
      ) : (
        <Text style={s.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
}

type RoleToggleProps = {
  role: Role;
  onChange: (role: Role) => void;
};

export function RoleToggle({ role, onChange }: RoleToggleProps) {
  const c = usePalette();

  const roles = [
    {
      value: "teacher" as Role,
      title: "Teacher",
      subtitle: "Create and manage quizzes",
      icon: "school-outline" as const,
    },
    {
      value: "student" as Role,
      title: "Student",
      subtitle: "Join and attempt quizzes",
      icon: "book-outline" as const,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: c.text }]}>Choose your role</Text>

      <View style={styles.options}>
        {roles.map((item) => {
          const selected = role === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => onChange(item.value)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: selected ? "#2A203B" : c.surface,
                  borderColor: selected ? c.primary : c.border,
                  borderWidth: selected ? 2 : 1,
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                },
              ]}
            >
              <View style={styles.topRow}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: selected ? "#493365" : c.card,
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={23}
                    color={selected ? c.primary : c.muted}
                  />
                </View>

                {selected && (
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  </View>
                )}
              </View>

              <Text
                style={[styles.title, { color: selected ? "#D9C7FF" : c.text }]}
              >
                {item.title}
              </Text>

              <Text
                style={[
                  styles.subtitle,
                  { color: selected ? "#C2B1DD" : c.muted },
                ]}
              >
                {item.subtitle}
              </Text>

              {selected && <View style={styles.selectedIndicator} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 11,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
  },
  options: {
    flexDirection: "row",
    gap: 12,
  },
  option: {
    flex: 1,
    minHeight: 132,
    padding: 14,
    borderRadius: 17,
    gap: 9,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkCircle: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#9870D8",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 11,
    lineHeight: 16,
  },
  selectedIndicator: {
    position: "absolute",
    bottom: 0,
    left: 14,
    right: 14,
    height: 3,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "#B69AFF",
  },
});

const s = StyleSheet.create({
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 2,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    height: 53,
  },
  input: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    fontSize: 16,
  },
  visibilityToggle: {
    width: 44,
    height: 44,
    marginRight: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 13,
    lineHeight: 19,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    height: 53,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#17121F",
    fontSize: 15,
    fontWeight: "800",
  },
});
