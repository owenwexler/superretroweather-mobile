import { Text } from 'react-native';
import type { FC } from 'react';

interface WeatherHeaderProps {
  name: string;
}

const WeatherHeader: FC<WeatherHeaderProps> = ({ name }) => {
  return (
    <Text testID="weather-header" accessibilityRole="header" className="font-retro text-center text-white text-3xl max-sm:text-xl">{name}</Text>
  );
};

export default WeatherHeader;
