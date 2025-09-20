import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import { Platform, StatusBar, Text, useColorScheme, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import components from "../constants/components";
import images from "../constants/images";
import "../global.css";
import { locationStore } from "../store/locationStore";
import { ToastRef } from "../types/types";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);

  const toastRef = useRef<ToastRef>(null);

  const { locations } = locationStore();

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

  let theme = useColorScheme();

  const THEME_BACKGROUND =
    theme === "dark" ? "hsl(264, 14%, 7%)" : "hsl(266, 54%, 97%)";
  const THEME_STYLE = theme === "dark" ? "light-content" : "dark-content";
  const THEME_SCHEME = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setStyle(THEME_SCHEME);
    }
  }, [THEME_SCHEME]);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        const storedValue = await AsyncStorage.getItem("hasLaunched");
        if (storedValue === null) {
          if (locations) {
            setHasLaunched(true);
            await AsyncStorage.setItem("hasLaunched", JSON.stringify(true));
          } else {
            setHasLaunched(false);
            await AsyncStorage.setItem("hasLaunched", JSON.stringify(false));
          }
        } else {
          setHasLaunched(JSON.parse(storedValue));
        }
        setIsReady(true);
      } catch (error) {
        toastRef.current?.show({
          type: "error",
          description: `Error with AsyncStorage: ${error} 😭`,
          accessibilityLiveRegion: "assertive",
        });
        setHasLaunched(false);
        setIsReady(true);
      }
    };

    prepareApp();
  }, [locations]);

  useEffect(() => {
    if (!isReady || !fontsLoaded || hasLaunched === null) return;

    let navigated = false;

    if (hasLaunched && (!locations || locations?.length === 0)) {
      navigated = true;
      router.replace("/(intro)");
    } else if (hasLaunched && locations && locations?.length > 0) {
      navigated = true;
      router.replace("/(home)");
    }

    if (navigated) SplashScreen.hideAsync();
  }, [isReady, fontsLoaded, hasLaunched, locations]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isReady && fontsLoaded && hasLaunched !== null) {
        SplashScreen.hideAsync();
      }
    }, 5000); // 5-second timeout
    return () => clearTimeout(timeout);
  }, [isReady, fontsLoaded, hasLaunched]);

  const scale = useSharedValue(1);

  useEffect(() => {
    if (isReady && fontsLoaded && hasLaunched !== null) {
      cancelAnimation(scale);
      return;
    }
    const animation = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
    scale.value = animation;

    return () => {
      cancelAnimation(scale);
    };
  }, [scale, isReady, fontsLoaded, hasLaunched]);

  const animatedPulse = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (!isReady || !fontsLoaded || hasLaunched === null) {
    return (
      <View
        style={{ flex: 1, backgroundColor: THEME_BACKGROUND }}
        className="items-center justify-center w-full h-full"
      >
        <Animated.View style={[animatedPulse]}>
          <Image
            accessibilityRole="image"
            accessibilityLabel="app logo as toast icon"
            style={{ width: 150, height: 150 }}
            source={
              theme === "dark"
                ? images.toast_icon_light
                : images.toast_icon_dark
            }
          />
        </Animated.View>
        <Text
          accessibilityLabel="App name i.e. Wetter"
          className={`font-orbitron-semiBold mt-12 w-full tracking-widest text-4xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          WETTER
        </Text>
      </View>
    );
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={THEME_STYLE} backgroundColor={THEME_BACKGROUND} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: THEME_BACKGROUND },
        }}
      />
      <components.NotificationSetup />
    </QueryClientProvider>
  );
}
