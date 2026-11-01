import type { IVCWeatherResponse } from '@/typedefs/IVCWeatherResponse';

// The TanStack Start server function (server/server.ts → getWeatherData) cannot be imported on-device.
// This client wrapper keeps the same call shape and calls a plain HTTP endpoint instead.
// The endpoint path `/weather` is a placeholder and must match the backend once it is exposed.
const WEATHER_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';

export const getWeatherData = async ({ location }: { location: string }): Promise<IVCWeatherResponse | { error: string }> => {
  const response = await fetch(
    `${WEATHER_API_BASE_URL}/weather?location=${encodeURIComponent(location)}`
  );

  if (!response.ok) {
    throw new Error(`Weather request failed with status ${response.status}`);
  }

  return await response.json();
};
