import { Stack } from "expo-router";

import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let colorScheme = useColorScheme();
  const [clock, setClock] = useState("");

  const themeBackground =
    colorScheme === "dark" ? "hsl(264, 14%, 7%)" : "hsl(266, 54%, 97%)";
  const themeTint =
    colorScheme === "dark" ? "hsl(266, 54%, 97%)" : "hsl(264, 14%, 7%)";

  useEffect(() => {
    const clockTimeout = setTimeout(
      () =>
        setClock(
          new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })
        ),
      1000
    );

    return () => clearTimeout(clockTimeout);
  }, [clock]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: themeBackground,
        },
        headerTintColor: themeTint,
        headerTitle: clock,
        headerTitleStyle: {
          fontFamily: "orbitron-medium",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="searchLocation" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
