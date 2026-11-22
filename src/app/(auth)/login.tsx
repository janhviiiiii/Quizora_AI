import type { ComponentRef } from "react";
import { useRef, useState } from "react";
import type { TextInput } from "react-native";
import { StyleSheet, Text } from "react-native";

import { Field, PrimaryButton, RoleToggle } from "@/components/auth-ui";
import AuthScreen from "@/components/auth/auth-screen";
import type { Role } from "@/context/auth";
import { useAuth } from "@/context/auth";
import { colors } from "@/lib/colors";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("teacher");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailInput = useRef<ComponentRef<typeof TextInput>>(null);
  const passwordInput = useRef<ComponentRef<typeof TextInput>>(null);
  const submitting = useRef(false);

  const trimmedEmail = email.trim();
  const emailError = !trimmedEmail
    ? "Enter your email address."
    : !emailPattern.test(trimmedEmail)
      ? "Enter a valid email address, like name@example.com."
      : undefined;
  const passwordError = !password
    ? "Enter your password."
    : password.length < 6
      ? "Use at least 6 characters."
      : undefined;

  const submit = async () => {
    if (submitting.current) return;
    setSubmitted(true);
    setLoginError("");

    if (emailError || passwordError) {
      (emailError ? emailInput : passwordInput).current?.focus();
      return;
    }

    submitting.current = true;
    setLoading(true);

    try {
      await login(trimmedEmail, password, role);
    } catch (error) {
      // Show actual Supabase errors on login and signup
      setLoginError(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Log in to continue to your quizzes."
      footerText="New here?"
      footerLinkText="Create an account"
      footerHref="/signup"
    >
      <RoleToggle
        role={role}
        onChange={(value) => {
          setRole(value);
          setLoginError("");
        }}
      />

      <Field
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setLoginError("");
        }}
        keyboardType="email-address"
        autoComplete="username"
        inputRef={emailInput}
        error={submitted || emailTouched ? emailError : undefined}
        onBlur={() => setEmailTouched(true)}
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <Field
        label="Password"
        icon="lock-closed-outline"
        value={password}
        onChangeText={(value) => {
          setPassword(value);
          setLoginError("");
        }}
        autoComplete="current-password"
        inputRef={passwordInput}
        error={submitted || passwordTouched ? passwordError : undefined}
        onBlur={() => setPasswordTouched(true)}
        returnKeyType="go"
        submitBehavior="submit"
        onSubmitEditing={submit}
        secure
      />

      {loginError !== "" && (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.loginError}
        >
          {loginError}
        </Text>
      )}
      <PrimaryButton
        title={loading ? "Logging in…" : "Log in"}
        onPress={submit}
        loading={loading}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  loginError: {
    backgroundColor: colors.dangerBg,
    color: colors.danger,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
