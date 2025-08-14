import React from "react";
import { Text, useColorScheme, View } from "react-native";

export default function Search() {
  let colorScheme = useColorScheme();
  return (
    <View>
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
