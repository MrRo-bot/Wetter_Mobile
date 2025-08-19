import { Image } from "expo-image";

import React, { useEffect } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

import MainButton from "@/src/components/MainButton";
import images from "@/src/constants/images";

import Loader from "@/src/components/Loader";
import useLocation from "@/src/hooks/useLocation";
import { useLocationStore } from "@/src/store/locationStore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Location() {
  let colorScheme = useColorScheme();
  const { isLoading, getLocation, location: fetchedLocation } = useLocation();
  const locationStore = useLocationStore();

  useEffect(() => {
    if (!isLoading && fetchedLocation)
      locationStore.addLocation(fetchedLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, fetchedLocation]);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full justify-evenly items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="w-full">
        <Image
          source={images.location}
          style={{ width: 300, height: 300, marginInline: "auto" }}
        />
        <Text
          className={`font-orbitron-medium tracking-wide uppercase text-2xl mt-4 text-center mx-auto ${colorScheme === "dark" ? "text-mustardLight" : "text-mustardDark"}`}
        >
          Allow Permissions
        </Text>

        <Text
          className={`font-genos-light text-xl leading-none mt-4 w-3/4 mx-auto text-center ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        >
          Wetter needs to access your device location to provide your
        </Text>
        <Text
          className={`text-center ${colorScheme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          local forecast
        </Text>
      </View>

      <View className="relative w-full">
        {isLoading && (
          <View className="absolute -translate-x-1/2 left-1/2 max-w-max -top-16">
            <Loader />
          </View>
        )}
        <View className="mx-auto">
          <MainButton
            colorScheme={colorScheme}
            onPressFunc={getLocation}
            buttonText="Allow"
            darkBgColor="bg-mustardLight"
            lightBgColor="bg-mustardDark"
            darkColor="text-dark"
            lightColor="text-light"
          />
        </View>

        <View className="mx-auto mt-3">
          <Pressable
          // onPress={()=>'add location to search route'}
          >
            <Text
              className={`font-genos-light underline underline-offset-2 text-xl ${colorScheme === "dark" ? "text-mustardLight" : "text-mustardDark font-genos-regular"}`}
            >
              Ignore
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
