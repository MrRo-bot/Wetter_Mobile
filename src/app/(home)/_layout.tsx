import { BlurView } from "expo-blur";
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
    colorScheme === "dark" ? "rgba(17, 15, 20,0.7)" : "rgba(247, 243, 251,0.7)";
  const themeTint =
    colorScheme === "dark" ? "hsl(266, 54%, 97%)" : "hsl(264, 14%, 7%)";

  return (
    <>
      <Stack
        screenOptions={{
          headerBackground: () => (
            <BlurView
              style={{ flex: 1, backgroundColor: themeBackground }}
              intensity={colorScheme === "dark" ? 10 : 70}
            />
          ),
          headerTintColor: themeTint,
          headerTransparent: true,
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
    </>
  );
}
