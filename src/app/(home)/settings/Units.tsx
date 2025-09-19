import { useSettingsStore } from "@/src/store/settingsStore";
import { UnitOptionsType } from "@/src/types/types";
import React from "react";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";
import Animated, { BounceInUp, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Units = () => {
  let theme = useColorScheme();

  const { units: unitSettings, setUnits } = useSettingsStore();

  const UNIT_SETTINGS: UnitOptionsType[] = [
    {
      name: "Time",
      key: "time",
      options: [
        { label: "12-hour", value: "12-hour" },
        { label: "24-hour", value: "24-hour" },
      ],
    },
    {
      name: "Temperature",
      key: "temperature",
      options: [
        { label: "°C", value: "celsius" },
        { label: "°F", value: "fahrenheit" },
      ],
    },
    {
      name: "Precipitation",
      key: "precipitation",
      options: [
        { label: "in", value: "in" },
        { label: "mm", value: "mm" },
      ],
    },
    {
      name: "Distance",
      key: "distance",
      options: [
        { label: "mi", value: "mi" },
        { label: "km", value: "km" },
      ],
    },
    {
      name: "Speed",
      key: "speed",
      options: [
        { label: "mph", value: "mph" },
        { label: "m/s", value: "ms" },
        { label: "km/h", value: "kmh" },
        { label: "knots", value: "kn" },
      ],
    },
    {
      name: "Pressure",
      key: "pressure",
      options: [
        { label: "mBar", value: "mBar" },
        { label: "inHg", value: "inHg" },
        { label: "hPa", value: "hPa" },
        { label: "bar", value: "bar" },
        { label: "mmHg", value: "mmHg" },
        { label: "psi", value: "psi" },
      ],
    },
  ];

  return (
    <SafeAreaView
      className={`h-full p-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <FlatList
        data={UNIT_SETTINGS}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={() => <View className="p-2" />}
        renderItem={({ item: setting, index }) => {
          return (
            <Animated.View
              entering={BounceInUp.duration(1000)
                .delay(index * 100)
                .reduceMotion(ReduceMotion.System)}
              className={`pb-8 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
              key={setting.name}
            >
              <Text
                className={`pt-4 pb-2 font-orbitron-medium text-lg ${theme === "dark" ? "text-slate-400" : "text-dark/70"}`}
              >
                {setting.name}
              </Text>

              <FlatList
                data={setting.options}
                keyExtractor={(item) => item.value}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName={`overflow-hidden rounded-xl w-max`}
                horizontal
                renderItem={({ item: option }) => {
                  return (
                    <View
                      key={option.value}
                      className={`${theme === "dark" ? "bg-light/10" : "bg-dark/5"}`}
                    >
                      <Pressable
                        accessibilityLabel={`Select ${setting.name} unit: ${option.label}`}
                        accessibilityRole="button"
                        className={`transition-colors duration-500 ${
                          unitSettings[setting.key] === option.value &&
                          "bg-amber-600"
                        }`}
                        onPress={() =>
                          setUnits({
                            ...unitSettings,
                            [setting.key]: option.value,
                          })
                        }
                      >
                        <Text
                          className={`px-5 py-3 text-lg font-genos-medium leading-none ${theme === "dark" ? "text-light" : "text-dark"}`}
                        >
                          {option.label}
                        </Text>
                      </Pressable>
                    </View>
                  );
                }}
              />
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Units;
