import { LocationDataType, LocationSearchItemType } from "@/src/types/types";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FlipInXDown, ReduceMotion } from "react-native-reanimated";

const LocationSearchItem = ({
  index,
  theme,
  location,
  getLocation,
}: {
  location: LocationSearchItemType;
  theme: string | null | undefined;
  index: number;
  getLocation: (
    latitude?: number,
    longitude?: number
  ) => Promise<LocationDataType | undefined>;
}) => {
  const TEXT_SHADOW = {
    textShadowColor: theme === "dark" ? "white" : "dark",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  };

  return (
    <Animated.View
      key={location.id}
      entering={FlipInXDown.duration(300)
        .delay(index * 100)
        .reduceMotion(ReduceMotion.System)}
      className="w-[90%] mx-auto"
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${location.name}, ${location.country}`}
        accessibilityHint="Tap to fetch weather data for this location"
        accessible={true}
        onPress={() => getLocation(location.latitude, location.longitude)}
      >
        <View
          className={`border-[1px] border-dashed rounded-xl overflow-hidden ${theme === "dark" ? "border-light/70" : "border-dark/30"}`}
        >
          <View className="flex-row items-center justify-start gap-2 p-3 bg-clip-padding">
            <View>
              <Text
                style={TEXT_SHADOW}
                className={`text-lg font-orbitron-bold ${
                  theme === "dark" ? "text-light" : "text-blue-900"
                }`}
              >
                {location.name}
              </Text>

              <Text
                style={TEXT_SHADOW}
                className={`font-genos-regular text-lg leading-none ${
                  theme === "dark" ? "text-light/70" : "text-dark/70"
                }`}
              >
                {`${location.admin1 ? location.admin1 + ", " : ""}${location.admin2 ? location.admin2 + ", " : ""}${location.admin3 ? location.admin3 + ", " : ""}${location.country ? location.country + "." : ""}`}
              </Text>

              {location.population && (
                <View className="flex-row gap-2">
                  <Text
                    className={`font-genos-medium text-lg ${
                      theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  >
                    Population:{" "}
                  </Text>

                  <Text
                    accessibilityLabel={`Population: ${location.population} people`}
                    style={TEXT_SHADOW}
                    className={`font-genos-regular text-lg ${
                      theme === "dark" ? "text-light/80" : "text-dark/80"
                    }`}
                  >
                    {location.population
                      ? new Intl.NumberFormat().format(location.population)
                      : ""}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default LocationSearchItem;
