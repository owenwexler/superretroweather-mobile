import { Text, View } from 'react-native';
import type { FC } from 'react';
import { formatDateMMDDYY } from '../../helper/formatDateMMDDYY';
import type { IVCWeatherDayValueSet } from '../../typedefs/IVCWeatherDayValueSet';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';
import WeatherConditionImage from './WeatherConditionImage';

interface SevenDayListItemProps {
  sevenDayListItem: IVCWeatherDayValueSet;
}

const SevenDayListItem: FC<SevenDayListItemProps> = ({ sevenDayListItem }) => {
  const {
    maxt,
    visibility,
    wspd,
    datetimeStr,
    cloudcover,
    heatindex,
    mint,
    precip,
    snowdepth,
    snow,
    humidity,
    wgust,
    conditions,
    windchill
  } = sevenDayListItem;

  const condition = conditions.toLowerCase() as TConditionImageType;

  const dateTimeIdDate = datetimeStr.slice(0, datetimeStr.indexOf('T'));

  return (
    <View className="flex-col mt-2 items-center gap-1">
      <View className="flex-row items-center gap-12 py-2">
        <WeatherConditionImage
          imageId={`seven-day-image-${dateTimeIdDate}`}
          condition={condition}
          width={50}
          height={50}
        />
        <Text testID={`seven-day-date-${dateTimeIdDate}`} className="font-retro text-center text-xl text-white">{formatDateMMDDYY(datetimeStr)}</Text>
      </View>
      <View className="flex-row items-center gap-12">
        <Text testID={`seven-day-low-${dateTimeIdDate}`} className="font-retro text-center text-lg max-sm:text-sm text-white">LOW: {Math.round(mint)}º</Text>
        <Text testID={`seven-day-high-${dateTimeIdDate}`} className="font-retro text-center text-lg max-sm:text-sm text-white">HIGH: {Math.round(maxt)}º</Text>
      </View>
      <View className="flex-row items-center gap-12">
        <Text testID={`seven-day-wspd-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">WSPD: {Math.round(wspd)}</Text>
        <Text testID={`seven-day-wgust-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">WGUST: {Math.round(wgust)}</Text>
      </View>
      <View className="flex-row items-center gap-12">
        <Text testID={`seven-day-wchill-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">WCHILL: {windchill ? Math.round(windchill) : 0}</Text>
      </View>
      <View className="flex-row max-sm:flex-col items-center gap-12">
        <Text testID={`seven-day-vis-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">VISIBILITY: {Math.round(visibility)}</Text>
      </View>
      <View className="flex-row max-sm:flex-col items-center gap-12">
        <Text testID={`seven-day-cloudcover-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">CLOUD COVER: {Math.round(cloudcover)}</Text>
      </View>
      <View className="flex-row items-center gap-12">
        <Text testID={`seven-day-humidity-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">HUMIDITY: {Math.round(humidity)}</Text>
      </View>
      {
        heatindex
        ?
        <View className="flex-row items-center gap-12">
          <Text testID={`seven-day-heatindex-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">HEAT INDEX: {Math.round(heatindex)}</Text>
        </View>
        :
        null
      }
      {
        precip > 0
        ?
          <View className="flex-row items-center gap-12">
            <Text testID={`seven-day-precip-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">PRECIP: {Math.round(precip)}</Text>
          </View>
        :
          null
      }
      {
        snow > 0 || snowdepth > 0
        ?
          <View className="flex-row items-center gap-12">
            <Text testID={`seven-day-snow-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">SNOW: {Math.round(snow)}</Text>
            <Text testID={`seven-day-snow-${dateTimeIdDate}`} className="font-retro text-center text-sm text-white">DEPTH: {Math.round(snowdepth)}{'"'}</Text>
          </View>
        :
          null
      }
    </View>
  );
};

export default SevenDayListItem;
