export { default } from "@/features/dashboard/DashboardScreen";

// import { Ionicons } from "@expo/vector-icons";
// import type { ReactNode } from "react";
// import {
//   Platform,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { BottomTabInset } from "@/constants/theme";
// import { useAuth } from "@/context/auth";
// import type { Palette } from "@/lib/colors";
// import { usePalette } from "@/lib/colors";

// // Sample dashboard data
// // Replace this with Firestore/API data when ready.

// const DASHBOARD = {
//   totalQuizzes: 12,
//   totalQuestions: 85,
//   totalStudents: 42,
//   totalAttempts: 126,

//   recentQuizzes: [
//     {
//       id: "1",
//       title: "Introduction to Java",
//       category: "Programming",
//       totalQuestions: 10,
//       isPublished: true,
//     },
//     {
//       id: "2",
//       title: "Database Fundamentals",
//       category: "DBMS",
//       totalQuestions: 15,
//       isPublished: false,
//     },
//     {
//       id: "3",
//       title: "Data Structures Basics",
//       category: "DSA",
//       totalQuestions: 20,
//       isPublished: true,
//     },
//   ],

//   recentAttempts: [
//     {
//       id: "1",
//       student: "Riya Patel",
//       quiz: "Introduction to Java",
//       date: "19 Nov",
//       percentage: 85,
//       isPassed: true,
//     },
//     {
//       id: "2",
//       student: "Kabir Singh",
//       quiz: "Data Structures Basics",
//       date: "18 Nov",
//       percentage: 40,
//       isPassed: false,
//     },
//     {
//       id: "3",
//       student: "Meera Joshi",
//       quiz: "Database Fundamentals",
//       date: "18 Nov",
//       percentage: 72,
//       isPassed: true,
//     },
//   ],

//   categoryStats: [
//     { id: "Programming", count: 30 },
//     { id: "DBMS", count: 25 },
//     { id: "DSA", count: 20 },
//     { id: "Networking", count: 10 },
//   ],
// };

// // Reusable components

// function StatsCard({
//   title,
//   value,
//   icon,
//   tint,
//   tintBg,
//   c,
//   cardWidth,
// }: {
//   title: string;
//   value: number;
//   icon: keyof typeof Ionicons.glyphMap;
//   tint: string;
//   tintBg: string;
//   c: Palette;
//   cardWidth: string;
// }) {
//   return (
//     <View
//       style={[
//         styles.statCard,
//         {
//           width: cardWidth,
//           backgroundColor: c.card,
//           borderColor: c.border,
//         },
//         Platform.OS === "web" && styles.webCardShadow,
//       ]}
//     >
//       <View style={[styles.statIcon, { backgroundColor: tintBg }]}>
//         <Ionicons name={icon} size={22} color={tint} />
//       </View>

//       <Text style={[styles.statValue, { color: c.text }]}>{value}</Text>

//       <Text style={{ color: c.muted, fontSize: 13 }} numberOfLines={1}>
//         {title}
//       </Text>
//     </View>
//   );
// }

// function Badge({ label, fg, bg }: { label: string; fg: string; bg: string }) {
//   return (
//     <View style={[styles.badge, { backgroundColor: bg }]}>
//       <Text style={{ color: fg, fontSize: 11, fontWeight: "700" }}>
//         {label}
//       </Text>
//     </View>
//   );
// }

// function Section({
//   title,
//   action,
//   children,
//   c,
// }: {
//   title: string;
//   action?: string;
//   children: ReactNode;
//   c: Palette;
// }) {
//   return (
//     <View
//       style={[
//         styles.section,
//         {
//           backgroundColor: c.card,
//           borderColor: c.border,
//         },
//         Platform.OS === "web" && styles.webCardShadow,
//       ]}
//     >
//       <View style={styles.sectionHeader}>
//         <Text
//           style={{
//             color: c.text,
//             fontSize: 17,
//             fontWeight: "800",
//           }}
//         >
//           {title}
//         </Text>

//         {action && (
//           <Pressable
//             style={({ pressed, hovered }) => [
//               styles.row,
//               {
//                 opacity: pressed ? 0.65 : hovered ? 0.8 : 1,
//               },
//             ]}
//           >
//             <Text style={{ color: c.primary, fontWeight: "700" }}>
//               {action}
//             </Text>
//             <Ionicons name="chevron-forward" size={16} color={c.primary} />
//           </Pressable>
//         )}
//       </View>

//       {children}
//     </View>
//   );
// }

// // Dashboard screen

// export default function Dashboard() {
//   const c = usePalette();
//   const { user, logout } = useAuth();
//   const { width } = useWindowDimensions();

//   const isDesktop = width >= 1100;
//   const isTablet = width >= 700 && width < 1100;

//   const firstName = user?.fullname.split(" ")[0] ?? "";

//   const statCardWidth = isDesktop ? "23.5%" : isTablet ? "31.5%" : "48%";

//   const categoryCardWidth = isDesktop ? "23.5%" : "48%";

//   // Student view
//   if (user?.role === "student") {
//     return (
//       <SafeAreaView style={[styles.center, { backgroundColor: c.bg }]}>
//         <View
//           style={[
//             styles.studentCard,
//             {
//               backgroundColor: c.card,
//               borderColor: c.border,
//             },
//           ]}
//         >
//           <View
//             style={[styles.studentIcon, { backgroundColor: c.primarySoft }]}
//           >
//             <Ionicons name="school-outline" size={32} color={c.primary} />
//           </View>

//           <Text style={{ color: c.text, fontSize: 23, fontWeight: "800" }}>
//             Hi {firstName}! 🎓
//           </Text>

//           <Text
//             style={{
//               color: c.muted,
//               marginTop: 8,
//               textAlign: "center",
//               lineHeight: 22,
//             }}
//           >
//             Your student dashboard is coming soon.
//           </Text>

//           <Pressable
//             onPress={logout}
//             style={({ pressed }) => [
//               styles.logoutButton,
//               {
//                 backgroundColor: c.primary,
//                 opacity: pressed ? 0.8 : 1,
//               },
//             ]}
//           >
//             <Text style={{ color: "#17121F", fontWeight: "800" }}>Log out</Text>
//           </Pressable>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={["top"]}>
//       <ScrollView
//         contentContainerStyle={{
//           alignItems: "center",
//           paddingHorizontal: isDesktop ? 36 : 18,
//           paddingTop: 24,
//           paddingBottom: BottomTabInset + 36,
//         }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View
//           style={{
//             width: "100%",
//             maxWidth: 1400,
//             gap: 22,
//           }}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <View style={{ gap: 5 }}>
//               <Text
//                 style={{
//                   color: c.primary,
//                   fontWeight: "900",
//                   letterSpacing: 1.5,
//                   fontSize: 12,
//                 }}
//               >
//                 QUIZORA AI · TEACHER
//               </Text>

//               <Text
//                 style={{
//                   color: c.text,
//                   fontSize: isDesktop ? 30 : 25,
//                   fontWeight: "900",
//                 }}
//               >
//                 Welcome back, {firstName}! 👋
//               </Text>

//               <Text style={{ color: c.muted, fontSize: 14 }}>
//                 Here's what's happening with your quizzes.
//               </Text>
//             </View>

//             <Pressable
//               onPress={logout}
//               hitSlop={10}
//               accessibilityRole="button"
//               accessibilityLabel="Log out"
//               style={({ pressed, hovered }) => [
//                 styles.logoutIcon,
//                 {
//                   backgroundColor: c.card,
//                   borderColor: c.border,
//                   opacity: pressed ? 0.7 : hovered ? 0.8 : 1,
//                 },
//               ]}
//             >
//               <Ionicons name="log-out-outline" size={21} color={c.muted} />
//             </Pressable>
//           </View>

//           {/* Quick actions */}
//           <View
//             style={[styles.actions, { maxWidth: isDesktop ? 470 : "100%" }]}
//           >
//             <Pressable
//               style={({ pressed, hovered }) => [
//                 styles.actionButton,
//                 {
//                   backgroundColor: c.card,
//                   borderColor: c.border,
//                   opacity: pressed ? 0.75 : hovered ? 0.85 : 1,
//                 },
//               ]}
//             >
//               <Ionicons name="add" size={19} color={c.text} />
//               <Text style={{ color: c.text, fontWeight: "700" }}>
//                 Add Question
//               </Text>
//             </Pressable>

//             <Pressable
//               style={({ pressed, hovered }) => [
//                 styles.actionButton,
//                 {
//                   backgroundColor: c.primary,
//                   opacity: pressed ? 0.8 : hovered ? 0.9 : 1,
//                   borderColor: c.primary,
//                 },
//               ]}
//             >
//               <Ionicons name="add" size={19} color="#17121F" />
//               <Text style={{ color: "#17121F", fontWeight: "800" }}>
//                 Create Quiz
//               </Text>
//             </Pressable>
//           </View>

//           {/* Statistics */}
//           <View style={styles.statsGrid}>
//             <StatsCard
//               c={c}
//               cardWidth={statCardWidth}
//               title="Total Quizzes"
//               value={DASHBOARD.totalQuizzes}
//               icon="book-outline"
//               tint={c.primary}
//               tintBg={c.primarySoft}
//             />

//             <StatsCard
//               c={c}
//               cardWidth={statCardWidth}
//               title="Total Questions"
//               value={DASHBOARD.totalQuestions}
//               icon="help-circle-outline"
//               tint="#3B82F6"
//               tintBg={c.dark ? "#14264A" : "#DBEAFE"}
//             />

//             <StatsCard
//               c={c}
//               cardWidth={statCardWidth}
//               title="Total Students"
//               value={DASHBOARD.totalStudents}
//               icon="people-outline"
//               tint="#22C55E"
//               tintBg={c.successBg}
//             />

//             <StatsCard
//               c={c}
//               cardWidth={statCardWidth}
//               title="Total Attempts"
//               value={DASHBOARD.totalAttempts}
//               icon="trending-up-outline"
//               tint="#EAB308"
//               tintBg={c.dark ? "#3A3010" : "#FEF9C3"}
//             />
//           </View>

//           {/* Main content columns */}
//           <View
//             style={{
//               flexDirection: isDesktop ? "row" : "column",
//               alignItems: "stretch",
//               gap: 18,
//             }}
//           >
//             <View style={{ flex: 1, gap: 18 }}>
//               {/* Recent quizzes */}
//               <Section c={c} title="Recent Quizzes" action="View all">
//                 {DASHBOARD.recentQuizzes.map((quiz) => (
//                   <View
//                     key={quiz.id}
//                     style={[styles.item, { borderColor: c.border }]}
//                   >
//                     <View style={{ flex: 1, gap: 4 }}>
//                       <Text style={{ color: c.text, fontWeight: "700" }}>
//                         {quiz.title}
//                       </Text>

//                       <Text style={{ color: c.muted, fontSize: 12 }}>
//                         {quiz.category} · {quiz.totalQuestions} questions
//                       </Text>
//                     </View>

//                     <Badge
//                       label={quiz.isPublished ? "Published" : "Draft"}
//                       fg={quiz.isPublished ? c.success : c.muted}
//                       bg={quiz.isPublished ? c.successBg : c.neutralBg}
//                     />
//                   </View>
//                 ))}
//               </Section>

//               {/* Categories */}
//               <Section c={c} title="Questions by Category">
//                 <View style={styles.catGrid}>
//                   {DASHBOARD.categoryStats.map((category) => (
//                     <View
//                       key={category.id}
//                       style={[
//                         styles.catCard,
//                         {
//                           width: categoryCardWidth,
//                           borderColor: c.border,
//                           backgroundColor: c.surface,
//                         },
//                       ]}
//                     >
//                       <Text
//                         style={{
//                           color: c.text,
//                           fontWeight: "700",
//                         }}
//                       >
//                         {category.id}
//                       </Text>

//                       <Text
//                         style={{
//                           color: c.primary,
//                           fontSize: 25,
//                           fontWeight: "900",
//                           marginTop: 8,
//                         }}
//                       >
//                         {category.count}
//                       </Text>

//                       <Text style={{ color: c.muted, fontSize: 12 }}>
//                         Questions
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </Section>
//             </View>

//             {/* Recent attempts */}
//             <View style={{ flex: 1, gap: 18 }}>
//               <Section c={c} title="Recent Student Attempts">
//                 {DASHBOARD.recentAttempts.map((attempt) => (
//                   <View
//                     key={attempt.id}
//                     style={[styles.item, { borderColor: c.border }]}
//                   >
//                     <View style={{ flex: 1, gap: 4 }}>
//                       <Text style={{ color: c.text, fontWeight: "700" }}>
//                         {attempt.student}
//                       </Text>

//                       <Text
//                         style={{ color: c.muted, fontSize: 12 }}
//                         numberOfLines={1}
//                       >
//                         {attempt.quiz} · {attempt.date}
//                       </Text>
//                     </View>

//                     <View style={{ alignItems: "flex-end", gap: 5 }}>
//                       <Text
//                         style={{
//                           color: c.text,
//                           fontWeight: "900",
//                           fontSize: 16,
//                         }}
//                       >
//                         {attempt.percentage}%
//                       </Text>

//                       <Badge
//                         label={attempt.isPassed ? "Passed" : "Failed"}
//                         fg={attempt.isPassed ? c.success : c.danger}
//                         bg={attempt.isPassed ? c.successBg : c.dangerBg}
//                       />
//                     </View>
//                   </View>
//                 ))}
//               </Section>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // Styles

// const styles = StyleSheet.create({
//   center: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 16,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   actions: {
//     flexDirection: "row",
//     gap: 12,
//     width: "100%",
//   },

//   actionButton: {
//     flex: 1,
//     minHeight: 48,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 7,
//     borderWidth: 1,
//     borderRadius: 13,
//     paddingHorizontal: 10,
//   },

//   logoutIcon: {
//     width: 43,
//     height: 43,
//     borderWidth: 1,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   statsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//     justifyContent: "flex-start",
//   },

//   statCard: {
//     borderWidth: 1,
//     borderRadius: 17,
//     padding: 17,
//     gap: 5,
//   },

//   statIcon: {
//     width: 43,
//     height: 43,
//     borderRadius: 13,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 7,
//   },

//   statValue: {
//     fontSize: 27,
//     fontWeight: "900",
//   },

//   section: {
//     borderWidth: 1,
//     borderRadius: 17,
//     padding: 17,
//     gap: 12,
//   },

//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 3,
//   },

//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     padding: 13,
//     borderWidth: 1,
//     borderRadius: 13,
//   },

//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 999,
//   },

//   catGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//   },

//   catCard: {
//     borderWidth: 1,
//     borderRadius: 13,
//     padding: 13,
//     minHeight: 105,
//   },

//   studentCard: {
//     width: "100%",
//     maxWidth: 420,
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 22,
//     padding: 30,
//   },

//   studentIcon: {
//     width: 64,
//     height: 64,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   logoutButton: {
//     marginTop: 22,
//     paddingHorizontal: 25,
//     paddingVertical: 12,
//     borderRadius: 12,
//   },

//   webCardShadow: Platform.select({
//     web: {
//       boxShadow: "0px 8px 28px rgba(0,0,0,0.16)",
//     },
//     default: {},
//   }),
// });
