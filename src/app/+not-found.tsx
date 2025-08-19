import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RouteError() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View className="items-center justify-center w-full h-full">
        <Link href="/(home)">Go to home screen</Link>
      </View>
    </>
  );
}
