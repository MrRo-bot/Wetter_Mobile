import components from "@/src/constants/components";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Intro() {
  let theme = useColorScheme();

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full justify-evenly items-center ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="w-full">
        <Image
          accessibilityRole="image"
          accessibilityLabel="App Hero Image"
          cachePolicy={"memory-disk"}
          transition={1000}
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
          accessibilityLabel="App name i.e. Wetter"
          className={`font-orbitron-black tracking-widest text-5xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          Wetter
        </Text>

        <Text
          className={`font-genos-regular tracking-widest text-2xl mt-4 text-center ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          A minimal weather app
        </Text>
      </View>

      <components.MainButton
        accessibilityLabel="Next"
        accessibilityHint="moves to page for finding location data"
        theme={theme}
        onPressFunc={() => router.navigate("/(intro)/location")}
        buttonText="Next"
        darkBgColor="bg-redLight"
        lightBgColor="bg-redDark"
        darkColor="text-dark"
        lightColor="text-light"
      />
    </SafeAreaView>
  );
}
