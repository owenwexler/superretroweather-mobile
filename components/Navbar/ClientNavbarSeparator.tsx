import { View } from 'react-native';
import type { FC } from 'react';

// Web used an <hr>, which has no native equivalent; a 2px top border on an empty View renders the same rule.
const ClientNavbarSeparator: FC = () => {
  return (
    <View className="mx-auto w-full border-t-2 border-white" />
  );
};

export default ClientNavbarSeparator;
