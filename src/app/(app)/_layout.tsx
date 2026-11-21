import { Redirect } from 'expo-router';

import AppTabs from '@/components/app-tabs';
import { useAuth } from '@/context/auth';

export default function AppLayout() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/login" />;
  return <AppTabs />;
}