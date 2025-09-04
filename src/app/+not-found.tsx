import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import images from "../constants/images";

export default function RouteError() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View className="items-center justify-center w-full h-full">
        <Image style={{ width: 250, height: 250 }} source={images.location} />
        <View className="flex-row items-center justify-between gap-2">
          <Image style={{ width: 24, height: 24 }} source={images.alert} />
          <Link href="/(home)">
            <Text className="font-orbitron-black text-maroon">
              Go to home screen
            </Text>
          </Link>
          <Image style={{ width: 24, height: 24 }} source={images.alert} />
        </View>
      </View>
    </>
  );
}
