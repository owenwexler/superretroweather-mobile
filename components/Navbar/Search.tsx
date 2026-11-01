import { Pressable, Text, TextInput, View } from 'react-native';
import { useAtom } from 'jotai';
import { useState } from 'react';
import type { FC } from 'react';
import { currentLocationAtom, savedLocationsAtom } from '../../store/weatherStore';
import { srwTransparentInput } from '../style/twClasses/inputClasses';
import { srwTransparentButton } from '../style/twClasses/buttonClasses';
import { addLocation } from '../../helper/savedLocationFunctions';
import { LOCAL_STORAGE_KEY } from '../../data/localStorageKey';
import { setItem } from '@/lib/storage';

const Search: FC = () => {
  const [, setCurrentLocation] = useAtom(currentLocationAtom);
  const [savedLocations, setSavedLocations] = useAtom(savedLocationsAtom);

  const [value, setValue] = useState('');

  const setInputValue = (val: string) => {
    setCurrentLocation(val);
    const newSavedLocations = addLocation(val, savedLocations);
    setSavedLocations(newSavedLocations);
    setItem(LOCAL_STORAGE_KEY, newSavedLocations);

    setValue('');
  };

  // Web handled Enter via onKeyUp; on native the keyboard's submit key fires onSubmitEditing.
  const handleSubmit = () => {
    if (value === '') {
      return;
    }

    setInputValue(value);
  };

  return (
    <View className="flex-row items-center justify-center gap-5 max-md:gap-8 max-md:pr-4">
      <TextInput
        testID="srw-search-input"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        className={`font-retro ${srwTransparentInput}`}
        placeholder="Enter location..."
      />

      <Pressable
        testID="srw-search-button"
        accessibilityRole="button"
        onPress={handleSubmit}
        className={srwTransparentButton}
      >
        <Text className="font-retro text-xs text-white">SEARCH</Text>
      </Pressable>
    </View>
  );
};

export default Search;
