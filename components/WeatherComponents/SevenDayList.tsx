import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import type { FC } from 'react';
import type { IVCWeatherDayValueSet } from '../../typedefs/IVCWeatherDayValueSet';
import SevenDayListItem from './SevenDayListItem';

interface SevenDayListProps {
  sevenDayList: IVCWeatherDayValueSet[];
  location: string;
}

const SevenDayList: FC<SevenDayListProps> = ({ sevenDayList, location }) => {
  return (
    <View className="flex-col mt-9 w-full">
      <Text testID="seven-day-header" accessibilityRole="header" className="font-retro text-2xl mt-9 mb-2 text-white">SEVEN-DAY FORECAST</Text>
      <FlashList
        data={sevenDayList}
        // The page itself scrolls (HomePage ScrollView), so this list does not scroll independently.
        scrollEnabled={false}
        keyExtractor={(item, idx) => `seven-day-list-item-${location}-${idx}-${item.datetimeStr}`}
        ItemSeparatorComponent={() => <View className="h-8" />}
        renderItem={({ item }) => <SevenDayListItem sevenDayListItem={item} />}
      />
    </View>
  );
};

export default SevenDayList;
