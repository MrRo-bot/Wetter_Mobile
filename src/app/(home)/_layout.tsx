import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import { Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export default function HomeLayout() {
  let theme = useColorScheme();

  const path = usePathname();

  const { weather } = weatherStore();
  const { units } = useSettingsStore();

  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const clockInterval = setInterval(
      () =>
        setClock(
          new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: units.time === "12-hour" ? true : false,
            timeZone: weather?.timezone ? weather?.timezone : "Asia/Kolkata",
          })
        ),
      1000
    );

    return () => clearInterval(clockInterval);
  }, [clock, weather?.timezone]);

  const THEME_BACKGROUND =
    theme === "dark" ? "rgb(17, 15, 20)" : "rgb(247, 243, 251)";

  const THEME_TINT =
    theme === "dark" ? "hsl(266, 54%, 97%)" : "hsl(264, 14%, 7%)";

  const HEADER_TITLE =
    path === "/Days"
      ? "Next 15 Days"
      : path === "/Hours"
        ? "Next 48 Hours"
        : path === "/Charts"
          ? "Chart"
          : path === "/Aqi"
            ? "Air Quality"
            : path === "/" || clock
              ? clock
              : "";

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: THEME_BACKGROUND,
          },
          headerTintColor: THEME_TINT,
          headerTitle: HEADER_TITLE,
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
