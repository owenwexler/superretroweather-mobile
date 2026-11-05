import "./global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { type Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalHost } from "@/components/primitives/portal";
import { DatabaseProvider } from "@/db/provider";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { DARK_THEME, LIGHT_THEME } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { getItem, setItem } from "@/lib/storage";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { Inter_400Regular, Inter_600SemiBold, useFonts } from '@expo-google-fonts/inter';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { PERSISTED_CACHE_BUSTER, PERSISTED_CACHE_MAX_AGE, queryClient, queryPersister } from "@/lib/queryClient";

// Server-level state (fetched data) is managed by React Query per AGENTS.md, and saved to MMKV so it survives restarts and works offline.
const persistOptions = {
  persister: queryPersister,
  maxAge: PERSISTED_CACHE_MAX_AGE,
  buster: PERSISTED_CACHE_BUSTER
};


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    PressStart2P_400Regular,
  });

  useFrameworkReady();

  useEffect(() => {
    const theme = getItem("theme");
    if (!theme) {
      setAndroidNavigationBar(colorScheme);
      setItem("theme", colorScheme);
      return;
    }
    const colorTheme = theme === "dark" ? "dark" : "light";
    setAndroidNavigationBar(colorTheme);
    if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
    <DatabaseProvider>
      <ThemeProvider value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ title: "Settings", headerShadowVisible: false }} />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
      <PortalHost />
    </DatabaseProvider>
    </PersistQueryClientProvider>
  );
}
