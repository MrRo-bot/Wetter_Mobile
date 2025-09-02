import { Image } from "expo-image";

import React, { useEffect, useRef } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

import images from "@/src/constants/images";

import Loader from "@/src/components/UI/Loader";
import ToastMessage from "@/src/components/UI/ToastMessage";
import Components from "@/src/constants/components";
import useLocation from "@/src/hooks/useLocation";
import { locationStore } from "@/src/store/locationStore";
import { ToastRef } from "@/src/types/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Location() {
  let colorScheme = useColorScheme();
  const {
    isLoading,
    getLocation,
    location: fetchedLocation,
    errorMsg,
  } = useLocation();
  const location = locationStore();

  const toastRef = useRef<ToastRef>(null);

  useEffect(() => {
    errorMsg &&
      toastRef?.current?.show({
        type: "error",
        description: errorMsg + " 😭",
      });
  }, [errorMsg]);

  useEffect(() => {
    if (!isLoading && fetchedLocation) location?.addLocation(fetchedLocation);
  }, [isLoading, fetchedLocation, location]); //maybe location dont need to be added

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full justify-evenly items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="w-full">
        <Image
          source={images.location}
          style={{ width: 300, height: 300, marginInline: "auto" }}
          contentFit="contain"
        />
        <Text
          className={`font-orbitron-black tracking-wide uppercase text-2xl mt-4 text-center mx-auto ${colorScheme === "dark" ? "text-mustardLight" : "text-mustardDark"}`}
        >
          Allow Permissions
        </Text>

        <Text
          className={`font-genos-regular tracking-wide text-xl leading-none mt-4 w-3/4 mx-auto text-center ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        >
          Wetter needs to access your device location to provide your
        </Text>
        <Text
          className={`font-genos-bold tracking-wider text-xl text-center ${colorScheme === "dark" ? "text-redLight" : "text-redDark"}`}
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
          <Components.MainButton
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
      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
