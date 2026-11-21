import type { DashboardData } from "./dashboard.types";

// Temporary demo data.
// Replace with API data when backend integration is ready.

export const DASHBOARD_DATA: DashboardData = {
  totalQuizzes: 12,
  totalQuestions: 85,
  totalStudents: 42,
  totalAttempts: 126,

  recentQuizzes: [
    {
      id: "1",
      title: "Introduction to Java",
      category: "Programming",
      totalQuestions: 10,
      isPublished: true,
    },
    {
      id: "2",
      title: "Database Fundamentals",
      category: "DBMS",
      totalQuestions: 15,
      isPublished: false,
    },
    {
      id: "3",
      title: "Data Structures Basics",
      category: "DSA",
      totalQuestions: 20,
      isPublished: true,
    },
  ],

  recentAttempts: [
    {
      id: "1",
      student: "Riya Patel",
      quiz: "Introduction to Java",
      date: "19 Nov",
      percentage: 85,
      isPassed: true,
    },
    {
      id: "2",
      student: "Kabir Singh",
      quiz: "Data Structures Basics",
      date: "18 Nov",
      percentage: 40,
      isPassed: false,
    },
    {
      id: "3",
      student: "Meera Joshi",
      quiz: "Database Fundamentals",
      date: "18 Nov",
      percentage: 72,
      isPassed: true,
    },
  ],

  categoryStats: [
    { id: "Programming", count: 30 },
    { id: "DBMS", count: 25 },
    { id: "DSA", count: 20 },
    { id: "Networking", count: 10 },
  ],
};
