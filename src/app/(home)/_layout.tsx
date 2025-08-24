import { Stack } from "expo-router";

import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let colorScheme = useColorScheme();
  const [clock, setClock] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  useEffect(() => {
    const clockInterval = setInterval(
      () =>
        setClock(
          new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        ),
      1000 * 60 //minute long interval
    );

    return () => clearInterval(clockInterval);
  }, [clock]);

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
        headerTitle: clock,
        headerTitleStyle: {
          fontFamily: "genos-light",
          fontSize: 24,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="searchLocation" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
