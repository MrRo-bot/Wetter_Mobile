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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../global.css";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  //all fonts imported
  const [fontsLoaded] = useFonts({
    "genos-thin": require("@/src/assets/fonts/Genos-Thin.otf"),
    "genos-extraLight": require("@/src/assets/fonts/Genos-ExtraLight.otf"),
    "genos-light": require("@/src/assets/fonts/Genos-Light.otf"),
    "genos-regular": require("@/src/assets/fonts/Genos-Regular.otf"),
    "genos-medium": require("@/src/assets/fonts/Genos-Medium.otf"),
    "genos-semiBold": require("@/src/assets/fonts/Genos-SemiBold.otf"),
    "genos-bold": require("@/src/assets/fonts/Genos-Bold.otf"),
    "genos-extraBold": require("@/src/assets/fonts/Genos-ExtraBold.otf"),
    "genos-black": require("@/src/assets/fonts/Genos-Black.otf"),

    "orbitron-regular": require("@/src/assets/fonts/Orbitron-Regular.otf"),
    "orbitron-medium": require("@/src/assets/fonts/Orbitron-Medium.otf"),
    "orbitron-semiBold": require("@/src/assets/fonts/Orbitron-SemiBold.otf"),
    "orbitron-bold": require("@/src/assets/fonts/Orbitron-Bold.otf"),
    "orbitron-extraBold": require("@/src/assets/fonts/Orbitron-ExtraBold.otf"),
    "orbitron-black": require("@/src/assets/fonts/Orbitron-Black.otf"),
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
      const isFirstLaunch = await checkFirstLaunch();
      // const isFirstLaunch = true;
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

  //wrapping query client all over the project
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={themeStyle} backgroundColor={themeBackground} />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
