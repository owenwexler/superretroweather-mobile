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
      {/* In React Native, text-center has to be on the Text itself.  Text styles are not inherited from a parent View like they are from a div on the web. */}
      <View className="items-center justify-center">
        <Text testID="seven-day-header" accessibilityRole="header" className="font-retro text-center text-2xl max-sm:text-lg mt-9 mb-2 text-white">SEVEN-DAY FORECAST</Text>
      </View>
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
