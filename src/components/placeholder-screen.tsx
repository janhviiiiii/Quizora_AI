import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePalette } from '@/lib/colors';

export default function PlaceholderScreen({ title }: { title: string }) {
  const c = usePalette();
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.bg }}>
      <Text style={{ color: c.text, fontSize: 22, fontWeight: '800' }}>{title}</Text>
      <Text style={{ color: c.muted, marginTop: 6 }}>Coming soon</Text>
    </SafeAreaView>
  );
}