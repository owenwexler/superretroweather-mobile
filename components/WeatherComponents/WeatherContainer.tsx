import type { FC } from 'react';
import Loading from '../Loading';
import Error from '../Error';
import NotFound from '../NotFound';
import CurrentConditions from './CurrentConditions';
import WeatherHeader from './WeatherHeader';
import SevenDayList from './SevenDayList';

import { useWeather } from '@/hooks/useWeather';
import { hasErrorCode, LOCATION_NOT_FOUND } from '@/lib/weatherApi';

interface WeatherContainerProps {
  location: string;
}

const WeatherContainer: FC<WeatherContainerProps> = ({ location }) => {
  const { data, isPending, error } = useWeather(location);

  if (isPending) {
    return <Loading />;
  }

  // Only show an error when there is nothing to display.  If a background refetch fails (e.g. offline), keep showing the cached weather.
  if (!data) {
    console.error(error);

    if (hasErrorCode(error, LOCATION_NOT_FOUND)) {
      return <NotFound />;
    }

    return <Error />;
  }

  return (
    <>
      <WeatherHeader name={data.location.name} />

      <CurrentConditions conditions={data.location.currentConditions} />

      <SevenDayList
        sevenDayList={data.location.values}
        location={data.location.name}
      />
    </>
  );
};

export default WeatherContainer;
