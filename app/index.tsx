import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-12 bg-retro-bg px-4">
      <View className="items-center gap-6">
        <Text className="font-retro text-center text-[28px] leading-[40px] text-retro-fg">
          {"SUPER\nRETRO\nWEATHER"}
        </Text>
        <Text className="font-retro text-center text-xs leading-5 text-retro-fg">
          Weather in 8-bit style
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        className="border-2 border-retro-fg bg-retro-bg px-6 py-4 active:opacity-70"
        onPress={() => router.push("/settings")}
      >
        <Text className="font-retro text-sm text-retro-fg">SETTINGS</Text>
      </Pressable>
    </View>
  );
}
