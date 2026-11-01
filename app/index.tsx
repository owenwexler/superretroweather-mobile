import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from 'react';

import HomePage from '../components/HomePage';

export default function Landing() {
  const router = useRouter();

  return (
    <HomePage />
  );
}
