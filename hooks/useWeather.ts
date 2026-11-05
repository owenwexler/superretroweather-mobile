import { useQuery } from '@tanstack/react-query';

import { WEATHER_STALE_TIME } from '@/lib/queryClient';
import { fetchWeather, isOfflineMode } from '@/lib/weatherApi';

// The mode is part of the key so fixture data saved to the device cache is never shown as live weather, or the other way around
const DATA_MODE =
  isOfflineMode
  ?
    'offline'
  :
    'online';

export const useWeather = (location: string) => {
  return useQuery({
    queryKey: ['srw', DATA_MODE, location],
    queryFn: () => fetchWeather(location),
    staleTime: WEATHER_STALE_TIME,
    enabled: location !== ''
  });
};
