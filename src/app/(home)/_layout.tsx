import { weatherStore } from "@/src/store/weatherStore";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let theme = useColorScheme();

  const { weather } = weatherStore();

  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const clockInterval = setInterval(
      () =>
        setClock(
          new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: weather?.timezone ? weather?.timezone : "Asia/Kolkata",
          })
        ),
      1000
    );

    return () => clearInterval(clockInterval);
  }, [clock, weather?.timezone]);

  const themeBackground =
    theme === "dark" ? "rgb(17, 15, 20)" : "rgb(247, 243, 251)";

  const themeTint =
    theme === "dark" ? "hsl(266, 54%, 97%)" : "hsl(264, 14%, 7%)";

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: themeBackground,
          },
          headerTintColor: themeTint,
          headerTitle: clock ? clock : "0:00",
          headerTitleStyle: {
            fontFamily: "genos-light",
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="searchLocation" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="locations" />
      </Stack>
    </>
  );
}
