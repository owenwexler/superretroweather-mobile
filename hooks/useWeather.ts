import { useQuery } from '@tanstack/react-query';

import { WEATHER_STALE_TIME } from '@/lib/queryClient';
import { fetchWeather } from '@/lib/weatherApi';

export const useWeather = (location: string) => {
  return useQuery({
    queryKey: ['srw', location],
    queryFn: () => fetchWeather(location),
    staleTime: WEATHER_STALE_TIME,
    enabled: location !== ''
  });
};
