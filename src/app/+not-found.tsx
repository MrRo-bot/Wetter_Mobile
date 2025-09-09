import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import images from "../constants/images";

const { width } = Dimensions.get("window");

export default function RouteError() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View className="items-center justify-center w-full h-full bg-white">
        <Image
          style={{ width: width * 0.6, height: width * 0.6 }}
          source={images.location}
          accessibilityLabel="Location error image"
        />
        <View className="flex-row items-center justify-between gap-2 mt-4">
          <Image
            style={{ width: 24, height: 24 }}
            source={images.alert}
            accessibilityLabel="Alert icon"
          />
          <Link
            href="/(home)"
            accessibilityRole="link"
            accessibilityHint="Navigates to the home screen"
          >
            <Text className="text-lg font-orbitron-black text-maroon">
              Go to home screen
            </Text>
          </Link>
          <Image
            style={{ width: 24, height: 24 }}
            source={images.alert}
            accessibilityLabel="Alert icon"
          />
        </View>
      </View>
    </>
  );
}
