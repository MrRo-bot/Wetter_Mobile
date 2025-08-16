import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import {
  Platform,
  StatusBar,
  ToastAndroid,
  useColorScheme,
} from "react-native";

import "../global.css";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  //all fonts imported
  const [fontsLoaded] = useFonts({
    "Goldman-Regular": require("@/src/assets/fonts/Goldman-Regular.otf"),
    "Goldman-Bold": require("@/src/assets/fonts/Goldman-Bold.otf"),
    "Orbitron-Black": require("@/src/assets/fonts/Orbitron-Black.otf"),
    "Orbitron-Regular": require("@/src/assets/fonts/Orbitron-Regular.otf"),
    "Orbitron-Medium": require("@/src/assets/fonts/Orbitron-Medium.otf"),
    "Orbitron-SemiBold": require("@/src/assets/fonts/Orbitron-SemiBold.otf"),
    "Orbitron-Bold": require("@/src/assets/fonts/Orbitron-Bold.otf"),
    "Orbitron-ExtraBold": require("@/src/assets/fonts/Orbitron-ExtraBold.otf"),
  });

  //sysmte theme checker
  let colorScheme = useColorScheme();

  const themeBackground =
    colorScheme === "dark" ? "hsl(264, 14%, 7%)" : "hsl(266, 54%, 97%)";
  const themeStyle = colorScheme === "dark" ? "light-content" : "dark-content";
  const themeScheme = colorScheme === "dark" ? "light" : "dark";

  //navigation bar theming
  if (Platform.OS === "android") {
    NavigationBar.setStyle(themeScheme);
  }

  //checking for initial launch to show intro routes
  useEffect(() => {
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

  //hide splashscreen when fonts are loaded
  useEffect(() => {
    fontsLoaded && SplashScreen.hideAsync();
  }, [fontsLoaded]);

  //keep splashscreen on
  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar barStyle={themeStyle} backgroundColor={themeBackground} />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
