// Landing Page for Quizora AI
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import type { ElementRef } from "react";
import { useEffect, useRef, useState } from "react";

import type { LayoutChangeEvent } from "react-native";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/GradientText";
import { useAuth } from "@/context/auth";
import { styles } from "@/styles/landing.styles";

const FEATURES = [
  {
    icon: "sparkles-outline" as const,
    title: "AI-assisted quiz creation",
    description:
      "Help teachers create multiple-choice questions with AI, then review and edit questions before using them.",
  },
  {
    icon: "people-outline" as const,
    title: "Live quiz sessions",
    description:
      "Host interactive quiz sessions so students can participate using a session room code.",
  },
  {
    icon: "time-outline" as const,
    title: "Timed assessments",
    description:
      "Run structured assessments with timed questions and a clear quiz flow.",
  },
  {
    icon: "checkmark-done-outline" as const,
    title: "Automatic evaluation",
    description:
      "Calculate quiz results from submitted answers and reduce manual checking.",
  },
  {
    icon: "podium-outline" as const,
    title: "Results and leaderboard",
    description:
      "Review quiz results and compare participant scores after an assessment.",
  },
  {
    icon: "bar-chart-outline" as const,
    title: "Performance insights",
    description:
      "Use available quiz results to understand student and class performance.",
  },
];

const NAV_ITEMS = ["Features", "About", "Services", "Why Quizora AI"] as const;

type SectionName = (typeof NAV_ITEMS)[number];

const SERVICE_STEPS = [
  {
    number: "01",
    title: "Prepare a quiz",
    description: "Create questions and review AI-assisted suggestions.",
  },
  {
    number: "02",
    title: "Start a session",
    description: "Host an assessment and share its room code with students.",
  },
  {
    number: "03",
    title: "Students participate",
    description: "Students join the session and submit their answers.",
  },
  {
    number: "04",
    title: "Review results",
    description:
      "Check submitted scores and available performance information.",
  },
];

const BENEFITS = [
  "AI assistance when preparing multiple-choice questions",
  "Teacher review and editing before a quiz is used",
  "Room-code based participation for students",
  "Timed quiz sessions and submitted answers",
  "Results and performance information from completed quizzes",
];

export default function LandingPage() {
  const { user } = useAuth();
  const { width } = useWindowDimensions();

  // Keep the initial server and browser renders consistent.
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Responsive desktop layout is enabled after browser hydration.
  const isWide = hasMounted && width >= 760;

  const scrollRef = useRef<ElementRef<typeof ScrollView>>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [sectionPositions, setSectionPositions] = useState<
    Partial<Record<SectionName, number>>
  >({});

  // Redirect authenticated users to the application.
  if (user) {
    return <Redirect href="/(app)" />;
  }

  // Record section positions for navigation scrolling.
  const registerSection = (name: SectionName) => (event: LayoutChangeEvent) => {
    setSectionPositions((current) => ({
      ...current,
      [name]: event.nativeEvent.layout.y,
    }));
  };

  // Scroll to a selected landing page section.
  const navigateTo = (name: SectionName) => {
    const y = sectionPositions[name];

    if (y !== undefined) {
      scrollRef.current?.scrollTo({
        y,
        animated: true,
      });
    }

    setMenuOpen(false);
  };

  // Scroll back to the top.
  const navigateHome = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

    setMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.logo}
            onPress={navigateHome}
            accessibilityRole="button"
            accessibilityLabel="Quizora AI home"
          >
            <View style={styles.logoIcon}>
              <Ionicons name="school-outline" size={25} color="#171717" />
            </View>

            <Text style={styles.logoText}>Quizora AI</Text>
          </Pressable>

          {/* Desktop navigation */}
          {isWide && (
            <View style={styles.desktopNav}>
              {NAV_ITEMS.map((item) => (
                <Pressable
                  key={item}
                  onPress={() => navigateTo(item)}
                  hitSlop={8}
                  accessibilityRole="button"
                >
                  <Text style={styles.navText}>{item}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <View style={styles.headerActions}>
            {isWide ? (
              <>
                <Link href="/login" asChild>
                  <Pressable hitSlop={8}>
                    <Text style={styles.navText}>Sign In</Text>
                  </Pressable>
                </Link>

                <Link href="/signup" asChild>
                  <Pressable style={styles.smallButton}>
                    <Text style={styles.darkButtonText}>Sign Up</Text>
                  </Pressable>
                </Link>
              </>
            ) : (
              <Pressable
                onPress={() => setMenuOpen((open) => !open)}
                hitSlop={12}
                accessibilityRole="button"
                accessibilityLabel={menuOpen ? "Close menu" : "Open menu"}
              >
                <Ionicons
                  name={menuOpen ? "close" : "menu"}
                  size={29}
                  color="#FFFFFF"
                />
              </Pressable>
            )}
          </View>
        </View>

        {/* MOBILE NAVIGATION */}
        {!isWide && menuOpen && (
          <View style={styles.mobileMenu}>
            {NAV_ITEMS.map((item) => (
              <Pressable
                key={item}
                onPress={() => navigateTo(item)}
                style={styles.mobileMenuItem}
              >
                <Text style={styles.menuText}>{item}</Text>
              </Pressable>
            ))}

            <View style={styles.menuDivider} />

            <Link href="/login" asChild>
              <Pressable style={styles.outlineButton}>
                <Text style={styles.whiteButtonText}>Sign In</Text>
              </Pressable>
            </Link>

            <Link href="/signup" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.darkButtonText}>Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        )}

        {/* HERO SECTION */}
        <View style={styles.hero}>
          <View style={styles.pill}>
            <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />

            <Text style={styles.pillText}>
              AI-assisted quiz and assessment platform
            </Text>
          </View>

          {/* Hero heading: separate text nodes for native compatibility. */}
          <View style={styles.heroHeadingGroup}>
            <Text
              style={[
                styles.heading,
                isWide ? styles.headingDesktop : styles.headingMobile,
              ]}
            >
              Make Learning Interactive with
            </Text>

            <GradientText
              style={[styles.purple, styles.heroGradientText]}
              fontSize={isWide ? 50 : 36}
              lineHeight={isWide ? 59 : 44}
            >
              Quizora AI
            </GradientText>
          </View>

          <Text style={styles.subtitle}>
            Create quizzes with AI assistance, host live assessments, and review
            results in one platform built for teachers and students.
          </Text>

          <View
            style={[styles.heroButtons, !isWide && styles.mobileHeroButtons]}
          >
            <Link href="/signup" asChild>
              <Pressable style={styles.primaryButton}>
                <Text style={styles.darkButtonText}>Get Started</Text>

                <Ionicons name="arrow-forward" size={19} color="#111111" />
              </Pressable>
            </Link>

            <Pressable
              style={styles.outlineButton}
              onPress={() => navigateTo("Features")}
            >
              <Text style={styles.whiteButtonText}>Explore Features</Text>
            </Pressable>
          </View>
        </View>

        {/* FEATURES SECTION */}
        <View onLayout={registerSection("Features")} style={styles.section}>
          <Text style={styles.sectionEyebrow}>WHAT YOU CAN DO</Text>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Tools for</Text>

            <GradientText
              style={styles.sectionTitle}
              fontSize={29}
              lineHeight={37}
            >
              better assessments
            </GradientText>
          </View>

          <Text style={styles.sectionSubtitle}>
            From preparing questions to hosting quizzes and reviewing results,
            Quizora AI brings the assessment workflow together.
          </Text>

          <View style={styles.featureGrid}>
            {FEATURES.map((feature) => (
              <View
                key={feature.title}
                style={[
                  styles.featureCard,
                  isWide ? styles.featureCardDesktop : styles.featureCardMobile,
                ]}
              >
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon} size={25} color="#FFFFFF" />
                </View>

                <Text style={styles.featureTitle}>{feature.title}</Text>

                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ABOUT SECTION */}
        <View onLayout={registerSection("About")} style={styles.contentSection}>
          <Text style={styles.sectionEyebrow}>ABOUT THE PLATFORM</Text>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>About</Text>

            <GradientText
              style={styles.sectionTitle}
              fontSize={29}
              lineHeight={37}
            >
              Quizora AI
            </GradientText>
          </View>

          <Text style={styles.bodyText}>
            Quizora AI is designed to support teachers in preparing and
            conducting quizzes, while giving students a straightforward way to
            participate in assessments.
          </Text>

          <Text style={styles.bodyText}>
            Teachers can use AI assistance to prepare multiple-choice questions,
            review and edit them, and organize quiz sessions. Students can join
            a session with its room code, answer questions, and view results
            when they are made available.
          </Text>
        </View>

        {/* SERVICES SECTION */}
        <View
          onLayout={registerSection("Services")}
          style={styles.contentSection}
        >
          <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Quiz creation</Text>

            <GradientText
              style={styles.sectionTitle}
              fontSize={29}
              lineHeight={37}
            >
              to results
            </GradientText>
          </View>

          <Text style={styles.sectionSubtitle}>
            A simple assessment flow for teachers and students.
          </Text>

          <View style={styles.serviceList}>
            {SERVICE_STEPS.map((step) => (
              <View key={step.number} style={styles.serviceCard}>
                <Text style={styles.serviceNumber}>{step.number}</Text>

                <View style={styles.serviceCopy}>
                  <Text style={styles.featureTitle}>{step.title}</Text>

                  <Text style={styles.featureDescription}>
                    {step.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* WHY QUIZORA AI SECTION */}
        <View
          onLayout={registerSection("Why Quizora AI")}
          style={styles.contentSection}
        >
          <Text style={styles.sectionEyebrow}>WHY QUIZORA AI</Text>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>One</Text>

            <GradientText
              style={styles.sectionTitle}
              fontSize={29}
              lineHeight={37}
            >
              connected quiz workflow
            </GradientText>
          </View>

          <Text style={styles.bodyText}>
            Quizora AI brings quiz preparation, live participation, and result
            review into one place. It is designed to make classroom assessments
            easier to organize without making unsupported promises about
            learning outcomes.
          </Text>

          {BENEFITS.map((item) => (
            <View key={item} style={styles.checkRow}>
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#B69AFF"
              />

              <Text style={styles.checkText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* CALL TO ACTION */}
        <View style={styles.ctaSection}>
          <Text style={styles.sectionTitle}>Ready to get started?</Text>

          <Text style={styles.sectionSubtitle}>
            Create an account to explore Quizora AI.
          </Text>

          <Link href="/signup" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.darkButtonText}>Create an Account</Text>

              <Ionicons name="arrow-forward" size={19} color="#111111" />
            </Pressable>
          </Link>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <View style={styles.logo}>
            <View style={styles.logoIcon}>
              <Ionicons name="school-outline" size={22} color="#171717" />
            </View>

            <Text style={styles.logoText}>Quizora AI</Text>
          </View>

          <Text style={styles.footerDescription}>
            AI-assisted quizzes and assessments for teachers and students.
          </Text>

          <View style={styles.footerLinks}>
            {NAV_ITEMS.map((item) => (
              <Pressable key={item} onPress={() => navigateTo(item)}>
                <Text style={styles.footerLink}>{item}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.copyright}>
            © Quizora AI. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// import { Ionicons } from "@expo/vector-icons";
// import { Link, Redirect } from "expo-router";
// import type { ElementRef } from "react";
// import { useEffect, useRef, useState } from "react";

// import {
//   LayoutChangeEvent,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
//   useWindowDimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { useAuth } from "@/context/auth";
// // css of Landing page
// import { styles } from "@/styles/landing.styles";
// // Purple Gradient Text Component
// import GradientText from "@/components/GradientText";

// const FEATURES = [
//   {
//     icon: "sparkles-outline" as const,
//     title: "AI-assisted quiz creation",
//     description:
//       "Help teachers create multiple-choice questions with AI, then review and edit questions before using them.",
//   },
//   {
//     icon: "people-outline" as const,
//     title: "Live quiz sessions",
//     description:
//       "Host interactive quiz sessions so students can participate using a session room code.",
//   },
//   {
//     icon: "time-outline" as const,
//     title: "Timed assessments",
//     description:
//       "Run structured assessments with timed questions and a clear quiz flow.",
//   },
//   {
//     icon: "checkmark-done-outline" as const,
//     title: "Automatic evaluation",
//     description:
//       "Calculate quiz results from submitted answers and reduce manual checking.",
//   },
//   {
//     icon: "podium-outline" as const,
//     title: "Results and leaderboard",
//     description:
//       "Review quiz results and compare participant scores after an assessment.",
//   },
//   {
//     icon: "bar-chart-outline" as const,
//     title: "Performance insights",
//     description:
//       "Use available quiz results to understand student and class performance.",
//   },
// ];

// const NAV_ITEMS = ["Features", "About", "Services", "Why Quizora AI"] as const;
// type SectionName = (typeof NAV_ITEMS)[number];

// export default function LandingPage() {
//   const { user } = useAuth();
//   const { width } = useWindowDimensions();
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   const isWide = width >= 760;
//   const scrollRef = useRef<ElementRef<typeof ScrollView>>(null);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [sectionPositions, setSectionPositions] = useState<
//     Partial<Record<SectionName, number>>
//   >({});

//   if (user) return <Redirect href="/(app)" />;

//   const registerSection = (name: SectionName) => (event: LayoutChangeEvent) => {
//     setSectionPositions((current) => ({
//       ...current,
//       [name]: event.nativeEvent.layout.y,
//     }));
//   };

//   const navigateTo = (name: SectionName) => {
//     const y = sectionPositions[name];

//     if (y !== undefined) {
//       scrollRef.current?.scrollTo({
//         y,
//         animated: true,
//       });
//     }

//     setMenuOpen(false);
//   };
//   return (
//     <SafeAreaView style={styles.screen} edges={["top"]}>
//       <ScrollView
//         ref={scrollRef}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <Pressable
//             style={styles.logo}
//             onPress={() =>
//               scrollRef.current?.scrollTo({ y: 0, animated: true })
//             }
//             accessibilityRole="button"
//             accessibilityLabel="Quizora AI home"
//           >
//             <View style={styles.logoIcon}>
//               <Ionicons name="school-outline" size={25} color="#171717" />
//             </View>
//             <Text style={styles.logoText}>Quizora AI</Text>
//           </Pressable>

//           {isWide && (
//             <View style={styles.desktopNav}>
//               {NAV_ITEMS.map((item) => (
//                 <Pressable
//                   key={item}
//                   onPress={() => navigateTo(item)}
//                   hitSlop={8}
//                   accessibilityRole="button"
//                 >
//                   <Text style={styles.navText}>{item}</Text>
//                 </Pressable>
//               ))}
//             </View>
//           )}

//           <View style={styles.headerActions}>
//             {isWide ? (
//               <>
//                 <Link href="/login" asChild>
//                   <Pressable hitSlop={8}>
//                     <Text style={styles.navText}>Sign In</Text>
//                   </Pressable>
//                 </Link>
//                 <Link href="/signup" asChild>
//                   <Pressable style={styles.smallButton}>
//                     <Text style={styles.darkButtonText}>Sign Up</Text>
//                   </Pressable>
//                 </Link>
//               </>
//             ) : (
//               <Pressable
//                 onPress={() => setMenuOpen((open) => !open)}
//                 hitSlop={12}
//                 accessibilityRole="button"
//                 accessibilityLabel={menuOpen ? "Close menu" : "Open menu"}
//               >
//                 <Ionicons
//                   name={menuOpen ? "close" : "menu"}
//                   size={29}
//                   color="#FFFFFF"
//                 />
//               </Pressable>
//             )}
//           </View>
//         </View>

//         {/* Mobile navigation */}
//         {!isWide && menuOpen && (
//           <View style={styles.mobileMenu}>
//             {NAV_ITEMS.map((item) => (
//               <Pressable
//                 key={item}
//                 onPress={() => navigateTo(item)}
//                 style={styles.mobileMenuItem}
//               >
//                 <Text style={styles.menuText}>{item}</Text>
//               </Pressable>
//             ))}
//             <View style={styles.menuDivider} />
//             <Link href="/login" asChild>
//               <Pressable style={styles.outlineButton}>
//                 <Text style={styles.whiteButtonText}>Sign In</Text>
//               </Pressable>
//             </Link>
//             <Link href="/signup" asChild>
//               <Pressable style={styles.primaryButton}>
//                 <Text style={styles.darkButtonText}>Sign Up</Text>
//               </Pressable>
//             </Link>
//           </View>
//         )}

//         {/* Hero */}
//         <View style={styles.hero}>
//           <View style={styles.pill}>
//             <Ionicons name="sparkles-outline" size={18} color="#FFFFFF" />
//             <Text style={styles.pillText}>
//               AI-assisted quiz and assessment platform
//             </Text>
//           </View>

//           <Text
//             style={[
//               styles.heading,
//               {
//                 fontSize: isWide ? 50 : 36,
//                 lineHeight: isWide ? 59 : 44,
//               },
//             ]}
//           >
//             Make Learning Interactive with{" "}
//             <GradientText
//               style={styles.purple}
//               fontSize={isWide ? 50 : 36}
//               lineHeight={isWide ? 59 : 44}
//             >
//               Quizora AI
//             </GradientText>
//           </Text>

//           <Text style={styles.subtitle}>
//             Create quizzes with AI assistance, host live assessments, and review
//             results in one platform built for teachers and students.
//           </Text>

//           <View
//             style={[styles.heroButtons, !isWide && styles.mobileHeroButtons]}
//           >
//             <Link href="/signup" asChild>
//               <Pressable style={styles.primaryButton}>
//                 <Text style={styles.darkButtonText}>Get Started</Text>
//                 <Ionicons name="arrow-forward" size={19} color="#111111" />
//               </Pressable>
//             </Link>
//             <Pressable
//               style={styles.outlineButton}
//               onPress={() => navigateTo("Features")}
//             >
//               <Text style={styles.whiteButtonText}>Explore Features</Text>
//             </Pressable>
//           </View>
//         </View>

//         {/* Features */}
//         <View onLayout={registerSection("Features")} style={styles.section}>
//           <Text style={styles.sectionEyebrow}>WHAT YOU CAN DO</Text>
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionTitle}>Tools for</Text>
//             <GradientText
//               style={styles.sectionTitle}
//               fontSize={29}
//               lineHeight={37}
//             >
//               better assessments
//             </GradientText>
//           </View>
//           <Text style={styles.sectionSubtitle}>
//             From preparing questions to hosting quizzes and reviewing results,
//             Quizora AI brings the assessment workflow together.
//           </Text>

//           <View style={styles.featureGrid}>
//             {FEATURES.map((feature) => (
//               <View
//                 key={feature.title}
//                 style={[styles.featureCard, { width: isWide ? "31%" : "100%" }]}
//               >
//                 <View style={styles.featureIcon}>
//                   <Ionicons name={feature.icon} size={25} color="#FFFFFF" />
//                 </View>
//                 <Text style={styles.featureTitle}>{feature.title}</Text>
//                 <Text style={styles.featureDescription}>
//                   {feature.description}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* About */}
//         <View onLayout={registerSection("About")} style={styles.contentSection}>
//           <Text style={styles.sectionEyebrow}>ABOUT THE PLATFORM</Text>
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionTitle}>About</Text>
//             <GradientText
//               style={styles.sectionTitle}
//               fontSize={29}
//               lineHeight={37}
//             >
//               Quizora AI
//             </GradientText>
//           </View>
//           <Text style={styles.bodyText}>
//             Quizora AI is designed to support teachers in preparing and
//             conducting quizzes, while giving students a straightforward way to
//             participate in assessments.
//           </Text>
//           <Text style={styles.bodyText}>
//             Teachers can use AI assistance to prepare multiple-choice questions,
//             review and edit them, and organize quiz sessions. Students can join
//             a session with its room code, answer questions, and view results
//             when they are made available.
//           </Text>
//         </View>

//         {/* Services */}
//         <View
//           onLayout={registerSection("Services")}
//           style={styles.contentSection}
//         >
//           <Text style={styles.sectionEyebrow}>HOW IT WORKS</Text>
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionTitle}>Quiz creation</Text>
//             <GradientText
//               style={styles.sectionTitle}
//               fontSize={29}
//               lineHeight={37}
//             >
//               to results
//             </GradientText>
//           </View>{" "}
//           <Text style={styles.sectionSubtitle}>
//             A simple assessment flow for teachers and students.
//           </Text>
//           <View style={styles.serviceList}>
//             {[
//               [
//                 "01",
//                 "Prepare a quiz",
//                 "Create questions and review AI-assisted suggestions.",
//               ],
//               [
//                 "02",
//                 "Start a session",
//                 "Host an assessment and share its room code with students.",
//               ],
//               [
//                 "03",
//                 "Students participate",
//                 "Students join the session and submit their answers.",
//               ],
//               [
//                 "04",
//                 "Review results",
//                 "Check submitted scores and available performance information.",
//               ],
//             ].map(([number, title, description]) => (
//               <View key={number} style={styles.serviceCard}>
//                 <Text style={styles.serviceNumber}>{number}</Text>
//                 <View style={styles.serviceCopy}>
//                   <Text style={styles.featureTitle}>{title}</Text>
//                   <Text style={styles.featureDescription}>{description}</Text>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>

//         {/* Why Quizora AI */}
//         <View
//           onLayout={registerSection("Why Quizora AI")}
//           style={styles.contentSection}
//         >
//           <Text style={styles.sectionEyebrow}>WHY QUIZORA AI</Text>
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionTitle}>One</Text>
//             <GradientText
//               style={styles.sectionTitle}
//               fontSize={29}
//               lineHeight={37}
//             >
//               connected quiz workflow
//             </GradientText>
//           </View>{" "}
//           <Text style={styles.bodyText}>
//             Quizora AI brings quiz preparation, live participation, and result
//             review into one place. It is designed to make classroom assessments
//             easier to organize without making unsupported promises about
//             learning outcomes.
//           </Text>
//           {[
//             "AI assistance when preparing multiple-choice questions",
//             "Teacher review and editing before a quiz is used",
//             "Room-code based participation for students",
//             "Timed quiz sessions and submitted answers",
//             "Results and performance information from completed quizzes",
//           ].map((item) => (
//             <View key={item} style={styles.checkRow}>
//               <Ionicons
//                 name="checkmark-circle-outline"
//                 size={21}
//                 color="#B69AFF"
//               />
//               <Text style={styles.checkText}>{item}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Call to action */}
//         <View style={styles.ctaSection}>
//           <Text style={styles.sectionTitle}>Ready to get started?</Text>
//           <Text style={styles.sectionSubtitle}>
//             Create an account to explore Quizora AI.
//           </Text>
//           <Link href="/signup" asChild>
//             <Pressable style={styles.primaryButton}>
//               <Text style={styles.darkButtonText}>Create an Account</Text>
//               <Ionicons name="arrow-forward" size={19} color="#111111" />
//             </Pressable>
//           </Link>
//         </View>

//         {/* Footer */}
//         <View style={styles.footer}>
//           <View style={styles.logo}>
//             <View style={styles.logoIcon}>
//               <Ionicons name="school-outline" size={22} color="#171717" />
//             </View>
//             <Text style={styles.logoText}>Quizora AI</Text>
//           </View>
//           <Text style={styles.footerDescription}>
//             AI-assisted quizzes and assessments for teachers and students.
//           </Text>
//           <View style={styles.footerLinks}>
//             {NAV_ITEMS.map((item) => (
//               <Pressable key={item} onPress={() => navigateTo(item)}>
//                 <Text style={styles.footerLink}>{item}</Text>
//               </Pressable>
//             ))}
//           </View>
//           <Text style={styles.copyright}>
//             © Quizora AI. All rights reserved.
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
