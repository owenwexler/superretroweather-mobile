import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from 'react';

import { srwTransparentButton } from '../components/style/twClasses/buttonClasses';

export default function Landing() {
  const [count, setCount] = useState(1);

  const router = useRouter();

  return (
    <>
      <View className="flex-1 items-center justify-center gap-12 bg-retro-bg px-4">
        <View className="items-center gap-6">
          <Text className="font-retro text-center text-xs leading-5 text-retro-fg">
            Weather in 8-bit style
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          className={srwTransparentButton}
          onPress={() => setCount(prev => prev + 1)}
        >
          <Text className="font-retro text-sm text-retro-fg">SETTINGS</Text>
        </Pressable>
      </View>
      <View className="flex-1 items-center justify-center gap-12 bg-retro-bg px-4">
        <Text className="font-retro text-center text-xs leading-5 text-retro-fg">
          {count}
        </Text>
      </View>
    </>
  );
}
