import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function RouteError() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Link href="/">Go to home screen</Link>
      </View>
    </>
  );
}
