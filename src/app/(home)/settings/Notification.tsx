import React from "react";
import { Pressable, ScrollView, useColorScheme } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import components from "@/src/constants/components";

const Notification = () => {
  let theme = useColorScheme();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const PAPER_COMPONENT_COLOR =
    theme === "dark" ? "hsl(353, 80%, 72%)" : "hsl(353, 100%, 72%)";

  return (
    <SafeAreaView
      className={`h-full p-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        {/* Weather alerts */}
        <components.WeatherAlertsSection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />

        {/* Rain & Snow alarm */}
        <components.RainAndSnowSection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />

        {/* Chance of precipitation */}
        <components.ChanceOfPrecipitationSection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />

        {/* Air quality index */}
        <components.AirQualitySection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />

        {/* Daily notification */}
        <components.DailyNotificationSection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />

        {/* Time */}
        <components.TimeSection
          AnimatedComponent={AnimatedPressable}
          theme={theme}
          themeColor={PAPER_COMPONENT_COLOR}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
