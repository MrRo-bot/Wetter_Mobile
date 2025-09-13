import { useSettingsStore } from "@/src/store/settingsStore";
import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, { BounceInUp, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Units = () => {
  let theme = useColorScheme();

  const { units, setUnits } = useSettingsStore();

  const unitsSettings = [
    { Time: ["12-hour", "24-hour"] },
    { Temperature: ["C", "F"] },
    { Distance: ["km", "mi"] },
    { Speed: ["kph", "mph", "km/h", "m/s", "beaufort", "knots"] },
    { Pressure: ["mBar", "inHg", "hPa", "bar", "mmHg", "psi"] },
  ];

  return (
    <SafeAreaView
      className={`h-full p-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView contentContainerClassName="gap-y-2">
        {unitsSettings.map((unitSetting) => (
          <Animated.View
            entering={BounceInUp.duration(1000).reduceMotion(
              ReduceMotion.System
            )}
            className={`pb-8 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
            key={Object.entries(unitSetting)[0][0]}
          >
            <Text
              className={`pt-4 pb-2 font-orbitron-medium text-lg ${theme === "dark" ? "text-slate-400" : "text-dark/70"}`}
            >
              {Object.entries(unitSetting)[0][0]}
            </Text>

            <ScrollView
              contentContainerClassName={`overflow-hidden rounded-xl w-max`}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              {Object.entries(unitSetting)[0][1].map((val: string) => {
                return (
                  <View
                    key={val}
                    className={`${theme === "dark" ? "bg-light/10" : "bg-dark/5"}`}
                  >
                    <Pressable
                      className={`transition-colors duration-500 ${
                        units[Object.keys(unitSetting)[0].toLowerCase()] ===
                          val && "bg-amber-600"
                      }`}
                      onPress={() =>
                        setUnits({
                          ...units,
                          [Object.keys(unitSetting)[0].toLowerCase()]: val,
                        })
                      }
                    >
                      <Text
                        className={`px-5 py-3 text-lg font-genos-medium leading-none ${theme === "dark" ? "text-light" : "text-dark"}`}
                      >
                        {Object.keys(unitSetting)[0].toLowerCase() ===
                        "temperature"
                          ? "৹" + val
                          : val}
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Units;
