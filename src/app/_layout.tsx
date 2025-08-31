import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import * as NavigationBar from "expo-navigation-bar";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
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
import images from "../constants/images";
import "../global.css";
import { locationStore } from "../store/locationStore";

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const { locations } = locationStore();
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(null);
  const [isReady, setIsReady] = useState(false);

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
  let theme = useColorScheme();

  const themeBackground =
    theme === "dark" ? "hsl(264, 14%, 7%)" : "hsl(266, 54%, 97%)";
  const themeStyle = theme === "dark" ? "light-content" : "dark-content";
  const themeScheme = theme === "dark" ? "light" : "dark";

  //navigation bar theming
  if (Platform.OS === "android") {
    NavigationBar.setStyle(themeScheme);
  }

  // Prepare app and handle navigation
  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Wait for AsyncStorage to load hasLaunched
        const storedValue = await AsyncStorage.getItem("hasLaunched");
        if (storedValue === null) {
          // First launch
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
        console.error("Error with AsyncStorage:", error);
        setHasLaunched(false);
        setIsReady(true);
      }
    };

    prepareApp();
  }, []);

  useEffect(() => {
    if (!isReady || !fontsLoaded || hasLaunched === null) {
      return;
    }
    if (hasLaunched && (!locations || locations.length === 0)) {
      router.replace("/(intro)");
    } else if (hasLaunched && locations && locations.length > 0) {
      router.replace("/(home)");
    }

    SplashScreen.hideAsync();
  }, [isReady, fontsLoaded, hasLaunched, locations]);

  const scale = useSharedValue(1); // Initial scale value
  // Animation setup
  useEffect(() => {
    const animation = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 800, easing: Easing.inOut(Easing.ease) }), // Scale up
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }) // Scale down
      ),
      -1 // Repeat indefinitely
    );

    scale.value = animation;

    // Cleanup to prevent flickering or memory leaks
    return () => {
      cancelAnimation(scale);
    };
  }, [scale]);

  // Animated style
  const animatedPulse = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (!isReady || !fontsLoaded || hasLaunched === null) {
    return (
      <View
        style={{ flex: 1, backgroundColor: themeBackground }}
        className="items-center justify-center w-full h-full"
      >
        <Animated.View style={[animatedPulse]}>
          <Image
            style={{ width: 300, height: 300 }}
            source={theme === "dark" ? images.icon_light : images.icon_dark}
          />
        </Animated.View>
        <Text
          className={`font-orbitron-semiBold mt-8 tracking-widest text-4xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          WETTER
        </Text>
      </View>
    );
  }

  //wrapping query client all over the project
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={themeStyle} backgroundColor={themeBackground} />
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
