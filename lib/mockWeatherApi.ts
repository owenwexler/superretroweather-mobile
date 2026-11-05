import { errors } from 'dataerror';
import type { DataErrorReturnObject, ErrorType } from 'dataerror';

import { blankVCResponse } from '@/data/blankVCResponse';
import { sleep } from '@/helper/sleep';
import { getOfflineWeatherData } from '@/offlineWeatherData/offlineWeatherData';

import type { SnaxiosReturnObject } from '@/lib/snaxios';
import type { IVCWeatherResponse } from '@/typedefs/IVCWeatherResponse';

// A stand-in for the web app's /api/weather route, used when EXPO_PUBLIC_DEV_MODE is 'offline'.
// It returns the same shape snaxios.get() would, so fetchWeather's unwrapping and error handling run exactly as they do online.

type MockWeatherResponse = SnaxiosReturnObject<DataErrorReturnObject<IVCWeatherResponse>>;

// Long enough to see the loading state on a phone
const MOCK_LATENCY_MS = 1500;

// Typing one of these as the location shows the matching error state
export const MOCK_ERROR_LOCATION = 'error';
export const MOCK_RATE_LIMITED_LOCATION = 'rate limited';

const invalidLocationError: ErrorType = {
  code: 'invalid_location',
  message: 'Invalid location',
  details: 'Location is required',
  hint: 'Use CITY, STATE, CITY, COUNTRY, a postal or ZIP code, latitude,longitude, or a street address'
};

const rateLimitedError: ErrorType = {
  code: 'rate_limited',
  message: 'Too many requests',
  details: 'Too many weather requests were sent from this IP address',
  hint: 'Wait a minute and try again'
};

const errorResponse = (status: number, error: ErrorType): MockWeatherResponse => ({
  status,
  data: null,
  error
});

const successResponse = (weather: IVCWeatherResponse): MockWeatherResponse => ({
  status: 200,
  data: { data: weather, error: null },
  error: null
});

export const getMockWeatherResponse = async (location: string): Promise<MockWeatherResponse> => {
  await sleep(MOCK_LATENCY_MS);

  const trimmedLocation = location.trim();
  const lowerCaseLocation = trimmedLocation.toLowerCase();

  if (trimmedLocation === '') {
    return errorResponse(400, invalidLocationError);
  }

  if (lowerCaseLocation === MOCK_ERROR_LOCATION) {
    return errorResponse(500, errors.internalServerError);
  }

  if (lowerCaseLocation === MOCK_RATE_LIMITED_LOCATION) {
    return errorResponse(429, rateLimitedError);
  }

  const offlineWeatherData = getOfflineWeatherData(trimmedLocation);

  // Like the live route, an unknown location comes back as HTTP 200 with an error on the weather data, which fetchWeather treats as not found
  return offlineWeatherData
    ?
      successResponse(offlineWeatherData)
    :
      successResponse({ ...blankVCResponse, error: 'not found' });
};
