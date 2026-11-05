import { useEffect } from 'react';
import type { FC } from 'react';
import { Text, View } from 'react-native';
import { useAtom } from 'jotai';
import { clickableText } from "../style/twClasses/clickableTextClasses";
import ClientNavbarSeparator from "./ClientNavbarSeparator";
import { currentLocationAtom, savedLocationsAtom } from "@/store/weatherStore";
import { getItem } from '@/lib/storage';
import { LOCAL_STORAGE_KEY } from '@/data/localStorageKey';

const getLocationId = (location: string) => {
  return location.split(' ').join('-').replace(',', '').toLowerCase();
};

// Exception to the FlashList rule in AGENTS.md: there are never more than MAX_SAVED_LOCATIONS (5) entries, so a plain mapped row is enough.
// A horizontal FlashList positions each item absolutely, with no width, inside a container sized from estimated item widths.  That squeezed every location onto two lines regardless of text size or screen width.
const SavedLocations: FC = () => {
  const [savedLocations, setSavedLocations] = useAtom(savedLocationsAtom);
  const [, setCurrentLocation] = useAtom(currentLocationAtom);

  const handleLocationLinkClick = (location: string) => {
    setCurrentLocation(location);
  };

  useEffect(() => {
    const savedLocationData = getItem<string[]>(LOCAL_STORAGE_KEY) ?? [];
    setSavedLocations(savedLocationData);
  }, [setSavedLocations]);

  const justifyClass =
    savedLocations.length === 1
    ?
      'justify-center'
    :
      'justify-between';

  if (savedLocations.length === 0) {
    return null;
  }

  // Same layout as the web app: one row on large screens, stacked and centered below the lg breakpoint
  return (
    <>
      <ClientNavbarSeparator />
      <View testID="srw-saved-locations-section" className={`flex-row max-lg:flex-col ${justifyClass} max-sm:justify-center items-center max-lg:gap-2 pl-3 pr-4 max-md:pl-1 max-md:pr-1 py-3`}>
        {
          savedLocations.map((location) => (
            <Text
              key={`saved-location-${getLocationId(location)}`}
              testID={`saved-location-${getLocationId(location)}`}
              accessibilityRole="button"
              className={`font-retro ${clickableText}`}
              onPress={() => handleLocationLinkClick(location)}
            >
              {location}
            </Text>
          ))
        }
      </View>
    </>
  );
};

export default SavedLocations;
