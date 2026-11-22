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

export default function Signup() {
  const { signup } = useAuth();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("teacher");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const nameInput = useRef<ComponentRef<typeof TextInput>>(null);
  const emailInput = useRef<ComponentRef<typeof TextInput>>(null);
  const passwordInput = useRef<ComponentRef<typeof TextInput>>(null);
  const submitting = useRef(false);

  const trimmedName = fullname.trim();
  const trimmedEmail = email.trim();
  const nameError = trimmedName ? undefined : "Enter your full name.";
  const emailError = !trimmedEmail
    ? "Enter your email address."
    : !emailPattern.test(trimmedEmail)
      ? "Enter a valid email address, like name@example.com."
      : undefined;
  const missingPasswordRequirements = [
    { met: [...password].length >= 8, label: "at least 8 characters" },
    { met: /\p{Lu}/u.test(password), label: "an uppercase letter" },
    { met: /\p{Ll}/u.test(password), label: "a lowercase letter" },
    {
      met: /[\p{P}\p{S}]/u.test(password),
      label: "a special character (such as ! or @)",
    },
  ].filter(({ met }) => !met);
  const passwordError = missingPasswordRequirements.length
    ? `Password needs ${missingPasswordRequirements.map(({ label }) => label).join(", ")}.`
    : undefined;

  const submit = async () => {
    if (submitting.current) return;
    setSubmitted(true);
    setSignupError("");

    const invalidInput = [
      { error: nameError, input: nameInput },
      { error: emailError, input: emailInput },
      { error: passwordError, input: passwordInput },
    ].find(({ error }) => error);

    if (invalidInput) {
      invalidInput.input.current?.focus();
      return;
    }

    submitting.current = true;
    setLoading(true);

    try {
      await signup(trimmedName, trimmedEmail, password, role);
    } catch (error) {
      // Show actual Supabase errors on login and signup
      setSignupError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      title="Create your account"
      subtitle="Pick your role and get started."
      footerText="Already have an account?"
      footerLinkText="Log in"
      footerHref="/login"
    >
      <RoleToggle
        role={role}
        onChange={(value) => {
          setRole(value);
          setSignupError("");
        }}
      />

      <Field
        label="Full name"
        icon="person-outline"
        value={fullname}
        onChangeText={(value) => {
          setFullname(value);
          setSignupError("");
        }}
        autoCapitalize="words"
        autoComplete="name"
        inputRef={nameInput}
        error={submitted || nameTouched ? nameError : undefined}
        onBlur={() => setNameTouched(true)}
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailInput.current?.focus()}
      />

      <Field
        label="Email"
        icon="mail-outline"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setSignupError("");
        }}
        keyboardType="email-address"
        autoComplete="email"
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
          setSignupError("");
        }}
        autoComplete="new-password"
        inputRef={passwordInput}
        error={submitted || passwordTouched ? passwordError : undefined}
        onBlur={() => setPasswordTouched(true)}
        returnKeyType="go"
        submitBehavior="submit"
        onSubmitEditing={submit}
        secure
      />

      {signupError !== "" && (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.signupError}
        >
          {signupError}
        </Text>
      )}
      <PrimaryButton
        title={loading ? "Creating account…" : "Sign up"}
        onPress={submit}
        loading={loading}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  signupError: {
    backgroundColor: colors.dangerBg,
    color: colors.danger,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
  },
});
