import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth';
import { usePalette } from '@/lib/colors';

export default function Settings() {
  const c = usePalette();
  const { user, logout } = useAuth();
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: c.bg }}>
      <Text style={{ color: c.text, fontSize: 22, fontWeight: '800' }}>Settings</Text>
      <Text style={{ color: c.muted }}>{user?.email}</Text>
      <Pressable
        onPress={logout}
        style={{ marginTop: 12, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, backgroundColor: c.primary }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Log out</Text>
      </Pressable>
    </SafeAreaView>
  );
}