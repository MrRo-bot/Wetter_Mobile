import React from "react";
import { Text, useColorScheme, View } from "react-native";

export default function SearchLocation() {
  let colorScheme = useColorScheme();
  return (
    <View className="flex items-center justify-center h-full">
      <Text
        className={`${colorScheme === "dark" ? "text-light" : "text-dark"}`}
      >
        search
      </Text>
      <Text
        className={`${colorScheme === "dark" ? "text-light" : "text-dark"}`}
      >
        something
      </Text>
    </View>
  );
}
