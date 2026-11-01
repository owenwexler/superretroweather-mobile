import { Text, View } from 'react-native';
import type { FC } from 'react';
import { formatDateMMDDYY } from '../../helper/formatDateMMDDYY';
import { formatTime } from '../../helper/formatTime';
import type { ICurrentConditions } from '../../typedefs/ICurrentConditions';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';
import WeatherConditionImage from './WeatherConditionImage';

interface CurrentConditionsProps {
  conditions: ICurrentConditions;
}

const CurrentConditions: FC<CurrentConditionsProps> = ({ conditions }) => {
  const conditionIcon = conditions.icon ? conditions.icon as TConditionImageType : 'clear';

  const {
    temp,
    sunrise,
    visibility,
    wspd,
    cloudcover,
    datetime,
    precip,
    sunset,
    humidity,
    wgust
  } = conditions;

  return (
    <View className="flex-col mt-5 items-center justify-center">
      <Text testID="current-conditions-date" accessibilityRole="header" className="font-retro text-center text-white text-3xl max-sm:text-xl">{formatDateMMDDYY(datetime)}</Text>
      <View className="flex-row gap-5 items-center justify-center py-4">
        <WeatherConditionImage
          imageId="current-conditions-image"
          condition={conditionIcon}
          width={100}
          height={100}
        />
        <Text testID="current-conditions-temp" accessibilityRole="header" className="font-retro text-center text-white text-4xl max-sm:text-2xl">{Math.round(temp)}º</Text>
      </View>
      <View className="flex-row items-center justify-center gap-5">
        <Text testID="current-conditions-wspd" className="font-retro text-center text-lg max-md:text-sm text-white">WSPD: {Math.round(wspd)}</Text>
        <Text testID="current-conditions-gust" className="font-retro text-center text-lg max-md:text-sm text-white">GUST: {Math.round(wgust)}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-5">
        <Text testID="current-conditions-vis" className="font-retro text-center text-lg max-md:text-sm text-white">VISIBILITY: {Math.round(visibility)}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-5">
        <Text testID="current-conditions-cloud-cover" className="font-retro text-center text-lg max-md:text-sm text-white">CLOUD COVER: {Math.round(cloudcover)}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-5">
        <Text testID="current-conditions-humidity" className="font-retro text-center text-lg max-md:text-sm text-white">HUMIDITY: {Math.round(humidity)}</Text>
      </View>
      <View className="flex-row items-center justify-center gap-5">
        <Text testID="current-conditions-precip" className="font-retro text-center text-lg max-md:text-sm text-white">PRECIP: {Math.round(precip)}</Text>
      </View>
      <View className="flex-col items-center justify-center mt-2 gap-1">
        <View className="flex-row items-center justify-center gap-2">
          <Text testID="current-conditions-sunrise" className="font-retro text-center text-lg max-md:text-sm text-white">SUNRISE:</Text>
          <Text testID="current-conditions-sunrise-time" className="font-retro text-center text-lg max-md:text-sm text-white">{sunrise ? `${formatTime(sunrise)}` : 'N/D'}</Text>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <Text testID="current-conditions-sunset" className="font-retro text-center text-lg max-md:text-sm text-white">SUNSET:</Text>
          <Text testID="current-conditions-sunset-time" className="font-retro text-center text-lg max-md:text-sm text-white">{sunset ? formatTime(sunset) : 'N/D'}</Text>
        </View>
      </View>
    </View>
  );
};

export default CurrentConditions;
