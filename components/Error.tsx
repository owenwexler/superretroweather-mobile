import { Text, View } from 'react-native';
import type { FC } from 'react';

const Error: FC = () => {
  return (
    <View className="gap-4 items-center p-3">
      <Text testID="i-am-error" accessibilityRole="header" className="font-retro text-center text-white text-2xl max-sm:text-sm">I AM ERROR.</Text>
      <Text testID="something-went-wrong" className="font-retro text-center text-white text-md max-sm:text-xs">Something has gone wrong.</Text>
      <Text testID="please-try-again" className="font-retro text-center text-white text-md max-sm:text-xs">Please try again.</Text>
    </View>
  );
};

export default Error;
