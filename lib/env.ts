import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

// Expo only ships variables prefixed with EXPO_PUBLIC_ to the app, and inlines them at build time.  Never put secrets in them.
// Each variable must be read with its full literal name (process.env.EXPO_PUBLIC_X) in runtimeEnv, or Expo will not inline it.
export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    // Base URL of the SuperRetroWeather web app, which serves /api/weather.  e.g. http://localhost:3000 in development.
    EXPO_PUBLIC_BASE_API_URL: z.url(),
    // 'offline' serves the fixtures in offlineWeatherData/ from a mock API on the device, so no server or network is needed.  Only works in development builds.
    EXPO_PUBLIC_DEV_MODE: z.enum(['offline', 'online']).default('online')
  },
  runtimeEnv: {
    EXPO_PUBLIC_BASE_API_URL: process.env.EXPO_PUBLIC_BASE_API_URL,
    EXPO_PUBLIC_DEV_MODE: process.env.EXPO_PUBLIC_DEV_MODE
  },
  // React Native defines `window`, but set this explicitly so client variables are never treated as server-only.
  isServer: false,
  emptyStringAsUndefined: true
});
