import * as Application from "expo-application";
import * as IntentLauncher from "expo-intent-launcher";
import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  Text,
  useColorScheme,
} from "react-native";
import Animated, { BounceInDown, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Troubleshooting = () => {
  let theme = useColorScheme();

  const openBatterySettings = async () => {
    if (Platform.OS === "android") {
      const packageName = Application.applicationId;
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.IGNORE_BATTERY_OPTIMIZATION_SETTINGS,
        { data: `package:${packageName}` }
      );
    }
    if (Platform.OS === "ios") {
      await Linking.openSettings();
    }
  };

  const openLocationAccuracySettings = async () => {
    if (Platform.OS === "android") {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS
      );
    }
    if (Platform.OS === "ios") {
      await Linking.openURL("App-Prefs:Privacy&path=LOCATION");
    }
  };

  return (
    <SafeAreaView
      className={`h-full w-full px-3 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <Animated.View
        entering={BounceInDown.duration(1000)
          .delay(100)
          .reduceMotion(ReduceMotion.System)}
        className={`gap-y-8 mt-8 py-6 px-4 rounded-2xl border-2 border-dashed border-purpleDark`}
      >
        <Pressable onPress={() => openLocationAccuracySettings()}>
          <Text
            style={{
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 3,
            }}
            className={`pb-2 text-xl font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
          >
            Location
          </Text>
          <Text
            className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            If the location is not updating automatically, Please ensure that
            you have set the location permission to &quot;Allow all the
            time&quot;.
          </Text>
        </Pressable>
        <Pressable onPress={() => openBatterySettings()}>
          <Text
            style={{
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 3,
            }}
            className={`pb-2 text-xl font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
          >
            Widget
          </Text>
          <Text
            className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            If the widget is not updating automatically, Please try setting
            battery usage to &quot;Unrestricted&quot; or disabling battery
            optimization. (Tap here then look for the &quot;Battery usage&quot;
            option and set it to &quot;Unrestricted&quot;).
          </Text>
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Troubleshooting;
