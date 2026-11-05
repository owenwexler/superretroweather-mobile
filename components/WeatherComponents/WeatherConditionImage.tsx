import { Image, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { FC } from 'react';
import { getPicNameFromCondition } from '../../helper/getPicNameFromCondition';
import type { TConditionImageType } from '../../typedefs/TConditionImageType';

import clearNight from '@/assets/images/weather/clear-night.png';
import clear from '@/assets/images/weather/clear.png';
import cloudyNight from '@/assets/images/weather/cloudy-night.png';
import partlyCloudyRain from '@/assets/images/weather/partly-cloudy-rain.png';
import partlyCloudy from '@/assets/images/weather/partly-cloudy.png';
import rain from '@/assets/images/weather/rain.png';
import snowRain from '@/assets/images/weather/snow-rain.png';
import snow from '@/assets/images/weather/snow.png';
import thunderstorm from '@/assets/images/weather/thunderstorm.png';

// The web app served these from /public/images/weather.  A phone has no web root to load from, so the images are bundled with the app instead, which also makes them work offline.
// Metro can only bundle images that are imported statically, so each file is listed here by the name getPicNameFromCondition returns.
const weatherImages: Record<string, ImageSourcePropType> = {
  'clear-night.png': clearNight,
  'clear.png': clear,
  'cloudy-night.png': cloudyNight,
  'partly-cloudy-rain.png': partlyCloudyRain,
  'partly-cloudy.png': partlyCloudy,
  'rain.png': rain,
  'snow-rain.png': snowRain,
  'snow.png': snow,
  'thunderstorm.png': thunderstorm
};

interface WeatherConditionImageProps {
  imageId: string;
  condition: TConditionImageType;
  width: number;
  height: number;
}

const WeatherConditionImage: FC<WeatherConditionImageProps> = ({ imageId, condition, width, height }) => {
  const picName = getPicNameFromCondition(condition);
  const source = picName ? weatherImages[picName] : undefined;

  // Conditions with no image (e.g. fog) keep their space so the layout does not shift
  if (!source) {
    console.warn(`No weather image for condition: ${condition}`);
    return <View testID={imageId} style={{ width, height }} />;
  }

  return (
    <Image
      testID={imageId}
      source={source}
      accessibilityLabel={condition}
      style={{ width, height }}
    />
  );
};

export default WeatherConditionImage;
