// Lets image files be imported as modules (import clear from '@/assets/images/weather/clear.png').  Metro turns each import into a bundled asset that <Image source={...}> accepts.
declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native';

  const source: ImageSourcePropType;
  export default source;
}
