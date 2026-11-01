import { Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import type { FC } from 'react';
import ResponsiveLogoText from './ResponsiveLogoText';

const ResponsiveLogo: FC = () => {
  return (
    <>
      <View testID="responsive-logo-mobile" className="md:hidden">
        <Link href="/" asChild>
          <Pressable accessibilityRole="link">
            <ResponsiveLogoText id="responsive-logo-text-mobile">
              SuperRetroWeather
            </ResponsiveLogoText>
          </Pressable>
        </Link>
      </View>
      <View testID="responsive-logo-tablet" className="max-md:hidden">
        <Link href="/" asChild>
          <Pressable accessibilityRole="link">
            <ResponsiveLogoText id="responsive-logo-text-tablet">
              SuperRetroWeather
            </ResponsiveLogoText>
          </Pressable>
        </Link>
      </View>
    </>
  );
};

export default ResponsiveLogo;
