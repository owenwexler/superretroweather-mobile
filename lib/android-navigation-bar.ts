import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";
import { NAV_THEME } from "@/lib/constants";

// SDK 58 removed NavigationBar.setButtonStyleAsync / setBackgroundColorAsync.
// Edge-to-edge is mandatory on Android, so the bar's background comes from the
// root background color (expo-system-ui) and button color from NavigationBar.setStyle.
export const setAndroidNavigationBar = async (theme: "light" | "dark") => {
  if (Platform.OS !== "android") return;

  NavigationBar.setStyle(theme === "dark" ? "light" : "dark");
  await SystemUI.setBackgroundColorAsync(
    theme === "dark" ? NAV_THEME.dark.background : NAV_THEME.light.background,
  );
};
