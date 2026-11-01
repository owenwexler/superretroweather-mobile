import { View } from 'react-native';
import type { FC } from 'react';

interface NavbarProps {
  children: React.ReactNode;
}

// Web used `fixed top-0`; on native the navbar is a normal top-of-screen sibling of the page ScrollView, so it stays visible without positioning.
const Navbar: FC<NavbarProps> = ({ children }) => {
  return (
    <View testID="srw-navbar-outer" className="w-full z-50 bg-black border-b border-b-4 border-b-white">
      {children}
    </View>
  );
};

export default Navbar;
