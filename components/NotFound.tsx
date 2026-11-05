import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import type { FC } from 'react';
import { srwTransparentButton } from './style/twClasses/buttonClasses';

// Used for unmatched routes and for locations the weather API cannot find.  Mirrors the web app's NotFound component, including its copy and testIDs.
const NotFound: FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.replace('/');
  };

  return (
    <View className="gap-4 items-center p-3 max-sm:mt-11">
      <Text testID="not-found-title" accessibilityRole="header" className="font-retro text-center text-white text-2xl max-sm:text-lg">404</Text>
      <Text testID="not-found-message" className="font-retro text-center text-white text-xl max-sm:text-md">THANK YOU WEATHER HUNTER!</Text>
      <Text testID="not-found-message" className="font-retro text-center text-white text-md max-sm:text-md">BUT THIS PAGE IS IN ANOTHER CASTLE!</Text>
      <Pressable testID="not-found-home-link" accessibilityRole="button" onPress={handleBackToHome} className={srwTransparentButton}>
        <Text className="font-retro text-white text-md max-sm:text-sm">BACK TO HOME</Text>
      </Pressable>
    </View>
  );
};

export default NotFound;
