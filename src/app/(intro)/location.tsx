import Loader from "@/src/components/UI/Loader";
import ToastMessage from "@/src/components/UI/ToastMessage";
import Components from "@/src/constants/components";
import images from "@/src/constants/images";
import useLocation from "@/src/hooks/useLocation";
import { locationStore } from "@/src/store/locationStore";
import { ToastRef } from "@/src/types/types";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Location() {
  let theme = useColorScheme();

  const toastRef = useRef<ToastRef>(null);

  const {
    isLoading,
    getLocation,
    location: fetchedLocation,
    errorMsg,
  } = useLocation();
  const location = locationStore();

  useEffect(() => {
    errorMsg &&
      toastRef?.current?.show({
        type: "error",
        description: `${errorMsg} 😭`,
        accessibilityLiveRegion: "assertive",
      });
  }, [errorMsg]);

  useEffect(() => {
    if (!isLoading && fetchedLocation) {
      location?.addLocation(fetchedLocation);
      location?.addLocationToShow(fetchedLocation?.id);
    }
  }, [isLoading, fetchedLocation]);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full justify-evenly items-center ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="w-full">
        <Image
          accessibilityRole="image"
          accessibilityLabel={`Image showing a globe and location pin`}
          cachePolicy={"memory-disk"}
          transition={1000}
          source={images.location}
          style={{ width: 300, height: 300, marginInline: "auto" }}
          contentFit="contain"
        />
        <Text
          accessibilityLabel="
          
          Allow Permissions
          "
          className={`font-orbitron-black tracking-wide uppercase text-2xl mt-4 text-center mx-auto ${theme === "dark" ? "text-mustardLight" : "text-mustardDark"}`}
        >
          Allow Permissions
        </Text>

        <Text
          accessibilityLabel="
          
          Wetter needs your device location to provide accurate
          "
          className={`font-genos-regular tracking-wide text-xl leading-none mt-4 w-3/4 mx-auto text-center ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          Wetter needs your device location to provide accurate
        </Text>
        <Text
          accessibilityLabel="
          
          local weather forecasts
          "
          className={`font-genos-bold tracking-wider text-xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          local weather forecasts
        </Text>
      </View>

      <View className="relative w-full">
        {isLoading && (
          <View className="absolute -translate-x-1/2 left-1/2 max-w-max -top-16">
            <Loader />
          </View>
        )}
        <View className="mx-auto">
          <Components.MainButton
            accessibilityLabel="Allow"
            accessibilityHint="Button to enable location service to get location data"
            theme={theme}
            onPressFunc={() => getLocation()}
            buttonText="Allow"
            darkBgColor="bg-mustardLight"
            lightBgColor="bg-mustardDark"
            darkColor="text-dark"
            lightColor="text-light"
          />
        </View>

        <View className="mx-auto mt-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go to location search"
            onFocus={() => console.log("Focused on location search button")}
            onPress={() => router.replace("/(home)/searchLocation")}
          >
            <Text
              className={`font-genos-light underline underline-offset-2 text-xl ${theme === "dark" ? "text-mustardLight" : "text-mustardDark font-genos-regular"}`}
            >
              Ignore
            </Text>
          </Pressable>
        </View>
      </View>
      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
