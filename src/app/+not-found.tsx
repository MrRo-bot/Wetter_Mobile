import { Image } from "expo-image";
import { Link, Stack } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import images from "../constants/images";

const { width } = Dimensions.get("window");

export default function RouteError() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Error: Page Not Found",
        }}
      />
      <View
        className="items-center justify-center w-full h-full bg-white"
        accessible={true}
        accessibilityRole="alert"
        accessibilityLabel="Error: This screen doesn't exist. Navigate to the home screen."
      >
        <Image
          cachePolicy={"memory-disk"}
          transition={1000}
          style={{ width: width * 0.6, height: width * 0.6 }}
          source={images.location}
          accessibilityLabel="Illustration indicating a page not found error"
        />
        <View className="flex-row items-center justify-between gap-2 mt-4">
          <Image
            cachePolicy={"memory-disk"}
            transition={1000}
            style={{ width: 24, height: 24 }}
            source={images.alert}
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
          <Link
            href="/(home)"
            accessibilityRole="link"
            accessibilityLabel="Go to home screen"
            accessibilityHint="Navigates to the home screen"
          >
            <Text className="text-lg font-orbitron-black text-[#800000]">
              Go to home screen
            </Text>
          </Link>
          <Image
            cachePolicy={"memory-disk"}
            transition={1000}
            style={{ width: 24, height: 24 }}
            source={images.alert}
            accessibilityElementsHidden={true}
            importantForAccessibility="no"
          />
        </View>
        <Text
          className="absolute w-px h-px p-0 m-[-1px] overflow-hidden"
          accessibilityElementsHidden={false}
        >
          This screen does not exist. Use the link to return to the home screen.
        </Text>
      </View>
    </>
  );
}
