import components from "@/src/constants/components";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";
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
        <Animated.View
          style={{
            animationName: {
              "100%": {
                transform: [{ translateX: 100 }],
              },
            },
            animationDuration: "300ms",
          }}
        >
          <Text
            className={`font-orbitron-black tracking-widest text-5xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
          >
            Wetter
          </Text>
        </Animated.View>
        <Text
          className={`font-genos-regular tracking-widest text-2xl mt-4 text-center ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          A minimal weather app
        </Text>
      </View>

      <components.MainButton
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
