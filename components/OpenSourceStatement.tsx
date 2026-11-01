import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import type { FC } from 'react';
import { clickableText } from './style/twClasses/clickableTextClasses';

const GITHUB_URL = 'https://github.com/owenwexler/superretroweather';

const OpenSourceStatement: FC = () => {
  const handleGithubPress = async () => {
    await WebBrowser.openBrowserAsync(GITHUB_URL);
  };

  return (
    <View className="flex-col items-center py-5 px-3 gap-2 mt-5">
      <Text testID="oss-statement" className="font-retro text-center text-white text-sm max-sm:text-xs">
        SuperRetroWeather is a free open-source project made by Owen Wexler.
      </Text>
      <Text testID="oss-contribute" className="font-retro text-center text-white text-sm max-sm:text-xs">
        To contribute, visit the{' '}
        <Text testID="oss-contribute-link" accessibilityRole="link" className={clickableText} onPress={handleGithubPress}>Github</Text>
        {' '}page, read the CONTRIBUTING.MD file, and make a pull request.
      </Text>
    </View>
  );
};

export default OpenSourceStatement;
