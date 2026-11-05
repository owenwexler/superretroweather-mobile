import { useEffect } from 'react';
import type { FC } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Text, View } from 'react-native';

// Web used Tailwind's `animate-pulse`; NativeWind has no equivalent, so the pulse is an opacity loop.
// NativeWind only applies className to components it knows about (Text, View, etc.), not Reanimated's Animated components.  So the pulse goes on an Animated.View with a plain style, and the Text inside keeps its classes.
const Loading: FC = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <View className="flex-col gap-4 items-center justify-center">
      <Animated.View style={pulseStyle}>
        <View className="flex-row gap-3 items-center justify-center">
          <Text testID="srw-loading" accessibilityRole="header" className="font-retro text-center text-white text-3xl max-sm:text-sm">L O A D I N G</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Loading;
