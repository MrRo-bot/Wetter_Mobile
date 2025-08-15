import { Stack } from "expo-router";

import React from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#110f14" : "#f7f3fb",
        },
        headerTintColor: colorScheme === "dark" ? "#f7f3fb" : "#110f14",
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
