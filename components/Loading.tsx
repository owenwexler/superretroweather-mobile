import { useEffect } from 'react';
import type { FC } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { View } from 'react-native';

// Web used Tailwind's `animate-pulse`; NativeWind has no equivalent, so the pulse is an opacity loop.
const Loading: FC = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View className="flex-col gap-4 items-center justify-center">
      <View className="flex-row gap-3 items-center justify-center">
        <Animated.Text testID="srw-loading" accessibilityRole="header" style={pulseStyle} className="font-retro text-center text-white text-3xl max-sm:text-sm">L O A D I N G</Animated.Text>
      </View>
    </View>
  );
};

export default Loading;
