import * as NavigationBar from "expo-navigation-bar";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Platform,
  StatusBar,
  ToastAndroid,
  useColorScheme,
} from "react-native";

import React, { useEffect } from "react";

import "../global.css";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  let colorScheme = useColorScheme();

  if (Platform.OS === "android") {
    NavigationBar.setStyle(colorScheme === "dark" ? "light" : "dark");
  }

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (!hasLaunched) {
        await AsyncStorage.setItem("hasLaunched", "true");
        return true;
      }
      return false;
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.BOTTOM);
      return false;
    } finally {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    const initializeNavigation = async () => {
      // const isFirstLaunch = await checkFirstLaunch();
      const isFirstLaunch = true;
      if (isFirstLaunch) {
        router.replace("/(intro)");
      } else {
        router.replace("/(home)");
      }
    };

    initializeNavigation();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#110f14" : "#f7f3fb"}
      />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define groups explicitly if needed, but Expo Router handles this via file structure */}
        <Stack.Screen name="(intro)" />
        <Stack.Screen name="(home)" />
        {/* <Stack.Screen name="drawer" options={{ headerShown: false }} /> */}
      </Stack>
    </>
  );
}
