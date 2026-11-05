import { QueryClient } from '@tanstack/react-query';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import { storage } from '@/lib/storage';
import { isNonRetryableWeatherError } from '@/lib/weatherApi';

const ONE_HOUR = 1000 * 60 * 60;

// Matches the server's one hour Redis TTL, so the app does not refetch data the server would answer from cache anyway
export const WEATHER_STALE_TIME = ONE_HOUR;

// How long saved responses are kept on the device.  Lets the last weather show instantly on launch and while offline.
export const PERSISTED_CACHE_MAX_AGE = ONE_HOUR * 24;

// Change this when the shape of cached data changes, to throw away caches saved by older app versions
export const PERSISTED_CACHE_BUSTER = '1';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // gcTime must be at least as long as the persisted max age, or queries are removed before they can be restored
      gcTime: PERSISTED_CACHE_MAX_AGE,
      retry: (failureCount, error) => !isNonRetryableWeatherError(error) && failureCount < 2
    }
  }
});

// Saves the React Query cache to MMKV, which is synchronous, so the sync persister fits
export const queryPersister = createSyncStoragePersister({
  key: 'srw-query-cache',
  storage: {
    getItem: (key: string) => storage.getString(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key)
  }
});
