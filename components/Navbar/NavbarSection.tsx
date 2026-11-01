import { View } from 'react-native';
import type { FC } from 'react';

const NavbarSection: FC<{ children: any }> = ({ children }) => {
  return (
    <View testID="srw-navbar-inner" className="flex-row max-lg:flex-col justify-between max-lg:justify-center items-center pl-3 pr-4 max-md:pl-1 max-lg:pr-1 max-sm:gap-2 py-3">
      {children}
    </View>
  );
};

export default NavbarSection;
