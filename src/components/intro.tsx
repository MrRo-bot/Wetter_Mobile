import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function Intro() {
  let colorScheme = useColorScheme();
  return (
    <View className="flex flex-col items-center justify-center h-full">
      <View className="w-full">
        <Image
          contentFit="cover"
          source={{ uri: "introduction" }}
          style={{
            marginInline: "auto",
            width: 300,
            height: 300,
          }}
        />
      </View>
      <View className="w-full mt-12">
        <Text
          style={{ fontFamily: "Orbitron" }}
          className={`mx-auto text-5xl font-bold ${colorScheme === "dark" ? "text-mustardLight" : "text-mustardDark"}`}
        >
          Wetter
        </Text>
        <Text
          style={{ fontFamily: "Goldman" }}
          className={`mt-2 mx-auto text-lg font-semibold  ${colorScheme === "dark" ? "text-greenDark" : "text-outlineLight"}`}
        >
          A minimal weather app
        </Text>
      </View>
      <View className="mt-24 overflow-hidden rounded-full">
        <Pressable
          className={`px-5 py-2.5 ${colorScheme === "dark" ? "bg-redDark" : "bg-redLight"}`}
          android_ripple={{
            color: "hsl(198,91%,78%)",
          }}
        >
          <Text
            style={{ fontFamily: "Orbitron" }}
            className={`text-xl font-semibold ${colorScheme === "dark" ? "text-yellow-200" : "text-zinc-50 "}`}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
