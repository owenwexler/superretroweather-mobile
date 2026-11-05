import type { IOfflineWeatherDataLookup } from '@/typedefs/IOfflineWeatherData';
import type { IVCWeatherResponse } from '@/typedefs/IVCWeatherResponse';

import { dallas } from './VCMockData/dallas';
import { dc } from './VCMockData/dc';
import { denver } from './VCMockData/denver';
import { la } from './VCMockData/la';
import { malaga } from './VCMockData/malaga';
import { nashville } from './VCMockData/nashville';
import { orlando } from './VCMockData/orlando';
import { toronto } from './VCMockData/toronto';
import { vb } from './VCMockData/vb';

// Real VisualCrossing responses captured on October 31, 2023, for developing and testing without a network or an API key.
// Some fixtures are cast because they were captured with slightly different field types than IVCWeatherResponse.
const offlineWeatherDataLookup: IOfflineWeatherDataLookup = {
  'Dallas, TX': dallas,
  'Washington, DC': dc,
  'Denver, CO': denver,
  'Los Angeles, CA': la as unknown as IVCWeatherResponse,
  'Malaga, Spain': malaga,
  'Nashville, TN': nashville,
  'Orlando, FL': orlando as unknown as IVCWeatherResponse,
  'Toronto, Canada': toronto,
  'Virginia Beach, VA': vb
};

export const offlineLocations = Object.keys(offlineWeatherDataLookup);

// "  dallas,tx " and "Dallas, TX" both become "dallas, tx"
const normalizeLocation = (location: string): string => {
  return location
    .trim()
    .toLowerCase()
    .replace(/\s*,\s*/g, ', ')
    .replace(/\s+/g, ' ');
};

// Matches the full location ("Dallas, TX") or just the city ("dallas").  Returns null when there is no fixture for the location.
export const getOfflineWeatherData = (location: string): IVCWeatherResponse | null => {
  const normalizedLocation = normalizeLocation(location);

  const matchingKey = offlineLocations.find((key) => {
    const normalizedKey = normalizeLocation(key);
    const city = normalizedKey.split(',')[0];

    return normalizedKey === normalizedLocation || city === normalizedLocation;
  });

  return matchingKey
    ?
      { ...offlineWeatherDataLookup[matchingKey] }
    :
      null;
};
