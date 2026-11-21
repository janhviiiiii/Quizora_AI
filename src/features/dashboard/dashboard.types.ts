export interface Quiz {
  id: string;
  title: string;
  category: string;
  totalQuestions: number;
  isPublished: boolean;
}

export interface Attempt {
  id: string;
  student: string;
  quiz: string;
  date: string;
  percentage: number;
  isPassed: boolean;
}

export interface CategoryStat {
  id: string;
  count: number;
}

export interface DashboardData {
  totalQuizzes: number;
  totalQuestions: number;
  totalStudents: number;
  totalAttempts: number;
  recentQuizzes: Quiz[];
  recentAttempts: Attempt[];
  categoryStats: CategoryStat[];
}
