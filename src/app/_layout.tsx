import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform, StatusBar, useColorScheme } from "react-native";
import "../global.css";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
  let colorScheme = useColorScheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hide();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (Platform.OS === "android") {
    NavigationBar.setStyle(colorScheme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <StatusBar
        backgroundColor={colorScheme === "dark" ? "#0e0b0b" : "#fefbfb"}
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#0e0b0b" : "#fefbfb",
          },
          headerTintColor: colorScheme === "dark" ? "#fefbfb" : "#0e0b0b",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
}
