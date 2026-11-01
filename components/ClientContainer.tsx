import { View } from 'react-native';
import { useAtom } from 'jotai';
import type { FC } from 'react';

import NoWeatherData from './NoWeatherData';

import WeatherContainer from './WeatherComponents/WeatherContainer';
import { currentLocationAtom } from '@/store/weatherStore';

const ClientContainer: FC = () => {
  const [currentLocation] = useAtom(currentLocationAtom);

  return (
    <View className="flex flex-col items-center gap-3">
      {
        currentLocation === ''
        ?
        <NoWeatherData />
        :
        <WeatherContainer location={currentLocation} />
      }
    </View>
  );
};

export default ClientContainer;
