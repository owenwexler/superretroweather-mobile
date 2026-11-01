import { Text, View } from 'react-native';
import type { FC } from 'react';

const NoWeatherData: FC = () => {
  return (
    <View className="gap-4 items-center p-3 max-sm:mt-11">
      <Text testID="default-msg-its-dangerous" accessibilityRole="header" className="font-retro text-center text-white text-2xl max-sm:text-lg">{"IT'S DANGEROUS TO NOT KNOW THE WEATHER!"}</Text>
      <Text testID="default-msg-enter-your-location" className="font-retro text-center text-white text-md max-sm:text-md">Enter your location above or pick one of your previous saved locations.</Text>
    </View>
  );
};

export default NoWeatherData;
