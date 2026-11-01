import { Image } from 'react-native';
import type { FC } from 'react';
import { getPicNameFromCondition } from '../../helper/getPicNameFromCondition';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';

// Web served these from /public/images/weather. Native cannot resolve a root-relative path, so the base URL comes from the environment.
const WEATHER_IMAGE_BASE_URL = process.env.EXPO_PUBLIC_WEATHER_IMAGE_BASE_URL ?? '/images/weather';

interface WeatherConditionImageProps {
  imageId: string;
  condition: TConditionImageType;
  width: number;
  height: number;
}

const WeatherConditionImage: FC<WeatherConditionImageProps> = ({ imageId, condition, width, height }) => {
  const picName = getPicNameFromCondition(condition);
  const url = `${WEATHER_IMAGE_BASE_URL}/${picName}`;

  return (
    <Image
      testID={imageId}
      source={{ uri: url }}
      accessibilityLabel={condition}
      style={{ width, height }}
    />
  );
};

export default WeatherConditionImage;
