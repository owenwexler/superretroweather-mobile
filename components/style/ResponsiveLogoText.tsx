import { Text } from 'react-native';
import type { FC } from 'react';

interface ResponsiveLogoTextProps {
  id: string;
  children: any;
}

// Hover and transition classes from web are dropped; press feedback comes from the parent Pressable.
const ResponsiveLogoText: FC<ResponsiveLogoTextProps> = ({ id, children }) => {
  return (
    <Text
      testID={id}
      className="font-retro text-2xl max-sm:text-[20px] max-sm:pb-4 text-white scale-95"
    >
      {children}
    </Text>
  );
};

export default ResponsiveLogoText;
