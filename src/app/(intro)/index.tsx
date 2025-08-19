import MainButton from "@/src/components/MainButton";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Intro() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex h-full justify-evenly items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
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
            className={`text-5xl uppercase text-center ${colorScheme === "dark" ? "text-redDark" : "text-redLight"}`}
          >
            Wetter
          </Text>
        </Animated.View>
        <Text
          className={`mt-4 text-center ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        >
          A minimal weather app
        </Text>
      </View>

      <MainButton
        colorScheme={colorScheme}
        onPressFunc={() => router.navigate("/(intro)/location")}
        buttonText="Next"
        darkBgColor="bg-redDark"
        lightBgColor="bg-redLight"
        darkColor="text-dark"
        lightColor="text-light"
      />
    </SafeAreaView>
  );
}
// duration delay repeat
