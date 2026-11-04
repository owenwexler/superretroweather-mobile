// we have a separate HomePage component so that both the app and the RTL sad path mock can access the full homepage without exporting the actual Home component in routes, which interferes with code splitting

import { ScrollView, View } from "react-native";
import type { FC } from "react";
import NavbarSection from "@/components/Navbar/NavbarSection";
import Navbar from "@/components/Navbar/Navbar";
import ResponsiveLogo from "@/components/style/ResponsiveLogo";
import Search from "@/components/Navbar/Search";
import SavedLocations from "@/components/Navbar/SavedLocations";
import MobileResponsiveSpacerGroup from "@/components/MobileResponsiveSpacerGroup";
import OpenSourceStatement from "@/components/OpenSourceStatement";
import ClientContainer from "@/components/ClientContainer";

const HomePage: FC = () => {
  return (
    <View className="flex-1 bg-black">
      <Navbar>
        <NavbarSection>
          <ResponsiveLogo />
          <Search />
        </NavbarSection>
        <SavedLocations />
      </Navbar>
      <ScrollView
        className="flex-1"
        contentContainerClassName="items-center mt-10"
      >
        <View className="flex-col items-center w-4/6 max-sm:w-full max-sm:p-3 py-9 max-sm:py-9 pb-10">
          <ClientContainer />

          <OpenSourceStatement />
          <View className="p-10" />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;
