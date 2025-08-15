import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
// import { useBearStore } from "../store/bearStore";

export default function Intro() {
  let colorScheme = useColorScheme();
  // const bears = useBearStore((state) => state.bears);
  // const increaseBears = useBearStore((state) => state.increasePopulation);
  // const decreaseBears = useBearStore((state) => state.decreasePopulation);
  // const removeAllBears = useBearStore((state) => state.removeAllPopulation);

  return (
    <View className="flex flex-col items-center justify-between h-[calc(100%-12%)]">
      <View className="w-full">
        <Image
          contentFit="cover"
          source={{ uri: "introduction" }}
          style={{
            marginInline: "auto",
            width: 350,
            height: 350,
          }}
        />
      </View>
      <View className="w-full">
        <Text
          style={{ fontFamily: "Orbitron" }}
          className={`text-6xl mx-auto ${colorScheme === "dark" ? "text-mustardLight" : "text-mustardDark"}`}
        >
          Wetter
        </Text>
        <Text
          style={{ fontFamily: "Goldman" }}
          className={`text-lg mt-4 mx-auto ${colorScheme === "dark" ? "text-textDark" : "text-textLight"}`}
        >
          A minimal weather app
        </Text>
      </View>
      <View className="overflow-hidden rounded-full">
        <Pressable
          className={`px-10 py-2.5 ${colorScheme === "dark" ? "bg-redDark" : "bg-redLight"}`}
          android_ripple={{
            color:
              colorScheme === "dark"
                ? "hsla(200,100%,50%,0.7)"
                : "hsla(198,60%,70%,0.8)",
          }}
        >
          <Text
            style={{ fontFamily: "Orbitron" }}
            className={`font-bold ${colorScheme === "dark" ? "text-textLight" : "text-zinc-50"}`}
          >
            Next
          </Text>
        </Pressable>
      </View>
      {/* <View>
        <View className="overflow-hidden rounded-full">
          <Pressable
            onPress={increaseBears}
            className={`px-10 py-2.5 ${colorScheme === "dark" ? "bg-redDark" : "bg-redLight"}`}
            android_ripple={{
              color:
                colorScheme === "dark"
                  ? "hsla(200,100%,50%,0.7)"
                  : "hsla(198,60%,70%,0.8)",
            }}
          >
            <Text
              style={{ fontFamily: "Orbitron" }}
              className={`font-bold ${colorScheme === "dark" ? "text-textLight" : "text-zinc-50"}`}
            >
              Add a bear
            </Text>
          </Pressable>
        </View>
        <View className="overflow-hidden rounded-full">
          <Pressable
            onPress={decreaseBears}
            className={`px-10 py-2.5 ${colorScheme === "dark" ? "bg-redDark" : "bg-redLight"}`}
            android_ripple={{
              color:
                colorScheme === "dark"
                  ? "hsla(200,100%,50%,0.7)"
                  : "hsla(198,60%,70%,0.8)",
            }}
          >
            <Text
              style={{ fontFamily: "Orbitron" }}
              className={`font-bold ${colorScheme === "dark" ? "text-textLight" : "text-zinc-50"}`}
            >
              Remove a bear
            </Text>
          </Pressable>
        </View>
        <View className="overflow-hidden rounded-full">
          <Pressable
            onPress={removeAllBears}
            className={`px-10 py-2.5 ${colorScheme === "dark" ? "bg-redDark" : "bg-redLight"}`}
            android_ripple={{
              color:
                colorScheme === "dark"
                  ? "hsla(200,100%,50%,0.7)"
                  : "hsla(198,60%,70%,0.8)",
            }}
          >
            <Text
              style={{ fontFamily: "Orbitron" }}
              className={`font-bold ${colorScheme === "dark" ? "text-textLight" : "text-zinc-50"}`}
            >
              Clear all
            </Text>
          </Pressable>
        </View>
      </View>
      <Text>{bears}</Text> */}
    </View>
  );
}
