import { View } from 'react-native';
import type { FC } from 'react';

interface ClientNavbarSectionProps {
  children: any;
}

const ClientNavbarSection: FC<ClientNavbarSectionProps> = ({ children }) => {
  return (
    <View testID="srw-navbar-inner" className="flex-row max-md:flex-col justify-between max-md:justify-center items-center pl-3 pr-4 max-md:pl-1 max-md:pr-1 max-sm:gap-2 py-3">
      {children}
    </View>
  );
};

export default ClientNavbarSection;
