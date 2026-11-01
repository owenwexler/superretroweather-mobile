import { useEffect } from 'react';
import type { FC } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAtom } from 'jotai';
import { clickableText } from "../style/twClasses/clickableTextClasses";
import ClientNavbarSeparator from "./ClientNavbarSeparator";
import { currentLocationAtom, savedLocationsAtom } from "@/store/weatherStore";
import { getItem } from '@/lib/storage';
import { LOCAL_STORAGE_KEY } from '@/data/localStorageKey';

const getLocationId = (location: string) => {
  return location.split(' ').join('-').replace(',', '').toLowerCase();
};

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

  // Web used justify-center / justify-between on a wrapping row; FlashList is a horizontal scroller here, so the same spacing is applied to its content container.
  const justifyContent = savedLocations.length === 1 ? 'center' : 'space-between';

  if (savedLocations.length === 0) {
    return null;
  }

  return (
    <>
      <ClientNavbarSeparator />
      <View testID="srw-saved-locations-section" className="py-3 pl-3 pr-4 max-md:pl-1 max-md:pr-1">
        <FlashList
          data={savedLocations}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent }}
          keyExtractor={(location) => `saved-location-${getLocationId(location)}`}
          renderItem={({ item: location }) => (
            <Text
              testID={`saved-location-${getLocationId(location)}`}
              accessibilityRole="button"
              className={`font-retro mx-3 ${clickableText}`}
              onPress={() => handleLocationLinkClick(location)}
            >
              {location}
            </Text>
          )}
        />
      </View>
    </>
  );
};

export default SavedLocations;
