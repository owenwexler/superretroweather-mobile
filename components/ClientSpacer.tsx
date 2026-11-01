import { View } from 'react-native';
import type { FC } from 'react';

interface ClientSpacerProps {
  size: number;
}

// Web used `mt-${size}`, but NativeWind cannot resolve dynamic class names.
// Tailwind's spacing scale is 4px per unit (mt-10 === 40px), so the margin is computed inline.
const ClientSpacer: FC<ClientSpacerProps> = ({ size }) => {
  return (
    <View style={{ marginTop: size * 4 }} />
  );
};

export default ClientSpacer;
