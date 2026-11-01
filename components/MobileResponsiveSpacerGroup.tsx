import { View } from 'react-native';
import { useAtom } from 'jotai';
import { savedLocationsAtom } from '../store/weatherStore';
import ClientSpacer from './ClientSpacer';
import type { FC } from 'react';

const MobileResponsiveSpacerGroup: FC = () => {
  const [savedLocations] = useAtom(savedLocationsAtom);

  return (
    <>
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      <ClientSpacer size={10} />
      <ClientSpacer size={5} />

      {/* this complete mess is required to make everything show up on mobile. */}
      <View className="hidden max-lg:flex">
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
        <ClientSpacer size={10} />
      </View>
      {
        savedLocations.length > 3
        ?
        <>
          <View className="hidden max-lg:flex">
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
          </View>
          <View className="hidden max-lg:flex">
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={12} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
            <ClientSpacer size={10} />
          </View>
        </>
        :
        null
      }
    </>
  );
};

export default MobileResponsiveSpacerGroup;
