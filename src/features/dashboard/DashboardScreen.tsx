import { Ionicons } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomTabInset } from "@/constants/theme";
import { useAuth } from "@/context/auth";
import { usePalette } from "@/lib/colors";

import { Badge } from "@/components/dashboard/Badge";
import { Section } from "@/components/dashboard/Section";
import { StatsCard } from "@/components/dashboard/StatsCard";

import { DASHBOARD_DATA } from "./dashboard.data";
import { createDashboardStyles } from "./dashboard.styles";

export default function DashboardScreen() {
  const c = usePalette();
  const styles = createDashboardStyles(c);

  const { user, logout } = useAuth();
  const { width } = useWindowDimensions();

  const isDesktop = width >= 1100;
  const isTablet = width >= 700 && width < 1100;

  const firstName = user?.fullname?.split(" ")[0] ?? "";

  const statCardWidth = isDesktop ? "23.5%" : isTablet ? "31.5%" : "48%";
  const categoryCardWidth = isDesktop ? "23.5%" : "48%";

  // Student dashboard
  if (user?.role === "student") {
    return (
      <SafeAreaView
        style={[
          styles.center,
          {
            backgroundColor: c.bg,
            padding: 20,
          },
        ]}
      >
        <View
          style={[
            styles.studentCard,
            {
              backgroundColor: c.card,
              borderColor: c.border,
            },
          ]}
        >
          <View
            style={[styles.studentIcon, { backgroundColor: `${c.primary}22` }]}
          >
            <Ionicons name="school-outline" size={32} color={c.primary} />
          </View>

          <Text
            style={{
              color: c.text,
              fontSize: 23,
              fontWeight: "800",
            }}
          >
            Hi {firstName}! 🎓
          </Text>

          <Text
            style={{
              color: c.muted,
              marginTop: 8,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            Your student dashboard is coming soon.
          </Text>

          <Pressable
            onPress={logout}
            style={({ pressed }) => [
              styles.logoutButton,
              {
                backgroundColor: c.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={{ color: "#17121F", fontWeight: "800" }}>Log out</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // Teacher dashboard
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: isDesktop ? 36 : 18,
          paddingTop: 24,
          paddingBottom: BottomTabInset + 36,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 1400,
            gap: 22,
          }}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text
                style={{
                  color: c.primary,
                  fontWeight: "900",
                  letterSpacing: 1.5,
                  fontSize: 12,
                }}
              >
                QUIZORA AI · TEACHER
              </Text>

              <Text
                style={{
                  color: c.text,
                  fontSize: isDesktop ? 30 : 25,
                  fontWeight: "900",
                }}
              >
                Welcome back, {firstName}! 👋
              </Text>

              <Text style={{ color: c.muted, fontSize: 14 }}>
                Here's what's happening with your quizzes.
              </Text>
            </View>

            <Pressable
              onPress={logout}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Log out"
              style={({ pressed, hovered }) => [
                styles.logoutIcon,
                {
                  backgroundColor: c.card,
                  borderColor: c.border,
                  opacity: pressed ? 0.7 : hovered ? 0.8 : 1,
                },
              ]}
            >
              <Ionicons name="log-out-outline" size={21} color={c.muted} />
            </Pressable>
          </View>

          {/* Quick actions */}
          <View
            style={[styles.actions, { maxWidth: isDesktop ? 470 : "100%" }]}
          >
            <Pressable
              accessibilityRole="button"
              style={({ pressed, hovered }) => [
                styles.actionButton,
                {
                  backgroundColor: c.card,
                  borderColor: c.border,
                  opacity: pressed ? 0.75 : hovered ? 0.85 : 1,
                },
              ]}
            >
              <Ionicons name="add" size={19} color={c.text} />
              <Text style={{ color: c.text, fontWeight: "700" }}>
                Add Question
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              style={({ pressed, hovered }) => [
                styles.actionButton,
                {
                  backgroundColor: c.primary,
                  borderColor: c.primary,
                  opacity: pressed ? 0.8 : hovered ? 0.9 : 1,
                },
              ]}
            >
              <Ionicons name="add" size={19} color="#17121F" />
              <Text style={{ color: "#17121F", fontWeight: "800" }}>
                Create Quiz
              </Text>
            </Pressable>
          </View>

          {/* Statistics */}
          <View style={styles.statsGrid}>
            <StatsCard
              cardWidth={statCardWidth}
              title="Total Quizzes"
              value={DASHBOARD_DATA.totalQuizzes}
              icon="book-outline"
              tint={c.primary}
              tintBg={`${c.primary}22`}
            />

            <StatsCard
              cardWidth={statCardWidth}
              title="Total Questions"
              value={DASHBOARD_DATA.totalQuestions}
              icon="help-circle-outline"
              tint="#3B82F6"
              tintBg="#DBEAFE"
            />

            <StatsCard
              cardWidth={statCardWidth}
              title="Total Students"
              value={DASHBOARD_DATA.totalStudents}
              icon="people-outline"
              tint="#22C55E"
              tintBg="#DCFCE7"
            />

            <StatsCard
              cardWidth={statCardWidth}
              title="Total Attempts"
              value={DASHBOARD_DATA.totalAttempts}
              icon="trending-up-outline"
              tint="#EAB308"
              tintBg="#FEF9C3"
            />
          </View>

          {/* Main dashboard columns */}
          <View
            style={{
              flexDirection: isDesktop ? "row" : "column",
              alignItems: "stretch",
              gap: 18,
            }}
          >
            {/* Left column */}
            <View style={{ flex: 1, gap: 18 }}>
              <Section title="Recent Quizzes" action="View all">
                {DASHBOARD_DATA.recentQuizzes.map((quiz) => (
                  <View
                    key={quiz.id}
                    style={[styles.item, { borderColor: c.border }]}
                  >
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text
                        style={{
                          color: c.text,
                          fontWeight: "700",
                        }}
                      >
                        {quiz.title}
                      </Text>

                      <Text style={{ color: c.muted, fontSize: 12 }}>
                        {quiz.category} · {quiz.totalQuestions} questions
                      </Text>
                    </View>

                    <Badge
                      label={quiz.isPublished ? "Published" : "Draft"}
                      fg={quiz.isPublished ? "#16A34A" : c.muted}
                      bg={quiz.isPublished ? "#DCFCE7" : c.surface}
                    />
                  </View>
                ))}
              </Section>

              <Section title="Questions by Category">
                <View style={styles.catGrid}>
                  {DASHBOARD_DATA.categoryStats.map((category) => (
                    <View
                      key={category.id}
                      style={[
                        styles.catCard,
                        {
                          width: categoryCardWidth,
                          borderColor: c.border,
                          backgroundColor: c.surface,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: c.text,
                          fontWeight: "700",
                        }}
                      >
                        {category.id}
                      </Text>

                      <Text
                        style={{
                          color: c.primary,
                          fontSize: 25,
                          fontWeight: "900",
                          marginTop: 8,
                        }}
                      >
                        {category.count}
                      </Text>

                      <Text style={{ color: c.muted, fontSize: 12 }}>
                        Questions
                      </Text>
                    </View>
                  ))}
                </View>
              </Section>
            </View>

            {/* Right column */}
            <View style={{ flex: 1, gap: 18 }}>
              <Section title="Recent Student Attempts">
                {DASHBOARD_DATA.recentAttempts.map((attempt) => (
                  <View
                    key={attempt.id}
                    style={[styles.item, { borderColor: c.border }]}
                  >
                    <View style={{ flex: 1, gap: 4 }}>
                      <Text
                        style={{
                          color: c.text,
                          fontWeight: "700",
                        }}
                      >
                        {attempt.student}
                      </Text>

                      <Text
                        style={{ color: c.muted, fontSize: 12 }}
                        numberOfLines={1}
                      >
                        {attempt.quiz} · {attempt.date}
                      </Text>
                    </View>

                    <View style={{ alignItems: "flex-end", gap: 5 }}>
                      <Text
                        style={{
                          color: c.text,
                          fontWeight: "900",
                          fontSize: 16,
                        }}
                      >
                        {attempt.percentage}%
                      </Text>

                      <Badge
                        label={attempt.isPassed ? "Passed" : "Failed"}
                        fg={attempt.isPassed ? "#16A34A" : "#DC2626"}
                        bg={attempt.isPassed ? "#DCFCE7" : "#FEE2E2"}
                      />
                    </View>
                  </View>
                ))}
              </Section>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
