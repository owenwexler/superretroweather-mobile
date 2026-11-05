import { errors } from 'dataerror';
import type { DataErrorReturnObject, ErrorType } from 'dataerror';

import { env } from '@/lib/env';
import { getMockWeatherResponse } from '@/lib/mockWeatherApi';
import { snaxios } from '@/lib/snaxios';

import type { IVCWeatherResponse } from '@/typedefs/IVCWeatherResponse';

// The web app's /api/weather route holds the VisualCrossing key, caches responses in Redis, rate limits by IP, and validates the location.
const WEATHER_ENDPOINT = `${env.EXPO_PUBLIC_BASE_API_URL.replace(/\/+$/, '')}/api/weather`;

// __DEV__ keeps offline mode out of release builds, even if the variable is set by mistake
export const isOfflineMode = __DEV__ && env.EXPO_PUBLIC_DEV_MODE === 'offline';

if (isOfflineMode) {
  console.log('SuperRetroWeather is in offline mode: weather comes from the fixtures in offlineWeatherData/');
}

const getWeatherResponse = (location: string) => {
  return isOfflineMode
    ?
      getMockWeatherResponse(location)
    :
      snaxios.get<DataErrorReturnObject<IVCWeatherResponse>>(WEATHER_ENDPOINT, {
        params: { location }
      });
};

export const LOCATION_NOT_FOUND = 'location_not_found';

// Errors where trying again with the same location will not help
const NON_RETRYABLE_ERROR_CODES = [LOCATION_NOT_FOUND, 'invalid_location', 'rate_limited'];

const isErrorType = (error: unknown): error is ErrorType => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string'
  );
};

export const hasErrorCode = (error: unknown, code: string): boolean => {
  return isErrorType(error) && error.code === code;
};

export const isNonRetryableWeatherError = (error: unknown): boolean => {
  return isErrorType(error) && NON_RETRYABLE_ERROR_CODES.includes(error.code);
};

// Unwraps the /api/weather body ({ data, error }) so components get the weather data directly.
// Failures are thrown, not returned, because React Query only sets isError when queryFn throws.
export const fetchWeather = async (location: string): Promise<IVCWeatherResponse> => {
  const response = await getWeatherResponse(location);

  if (response.error) {
    throw response.error;
  }

  const body = response.data;

  if (!body || body.error || !body.data) {
    throw body?.error ?? errors.unknownError;
  }

  // Some responses come back with HTTP 200 but no weather, for example an unknown location in offline mode.  Treat them as not found.
  if (body.data.error) {
    throw {
      ...errors.unknownError,
      code: LOCATION_NOT_FOUND,
      message: 'Location not found',
      details: body.data.error
    };
  }

  return body.data;
};
