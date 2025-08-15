import React from "react";
import { Text, useColorScheme, View } from "react-native";

export default function SearchLocation() {
  let colorScheme = useColorScheme();
  return (
    <View className="flex items-center justify-center h-full">
      <Text
        className={`font-bold ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        style={{
          fontFamily: "Goldman",
        }}
      >
        search
      </Text>
      <Text
        className={`font-normal ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        style={{
          fontFamily: "Orbitron",
        }}
      >
        something
      </Text>
    </View>
  );
}
