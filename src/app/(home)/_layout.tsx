import { Stack } from "expo-router";

import React from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let colorScheme = useColorScheme();

  const themeBackground =
    colorScheme === "dark" ? "hsl(264, 14%, 7%)" : "hsl(266, 54%, 97%)";
  const themeTint =
    colorScheme === "dark" ? "hsl(266, 54%, 97%)" : "hsl(264, 14%, 7%)";

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeBackground,
        },
        headerTintColor: themeTint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="searchLocation" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
