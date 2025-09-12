import components from "@/src/constants/components";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  BounceInUp,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Intro() {
  let theme = useColorScheme();

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full justify-evenly items-center ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <Animated.View
        entering={BounceInUp.duration(500).delay(1000).easing(Easing.ease)}
        className="w-full"
      >
        <Image
          accessibilityRole="image"
          accessibilityLabel="App Hero Image"
          cachePolicy={"memory-disk"}
          contentFit="cover"
          source={{ uri: "introduction" }}
          style={{
            marginInline: "auto",
            width: 350,
            height: 350,
          }}
        />
      </Animated.View>
      <View className="w-full">
        <Animated.Text
          entering={BounceInLeft.duration(500)
            .delay(1200)
            .reduceMotion(ReduceMotion.System)
            .easing(Easing.ease)}
          accessibilityLabel="App name i.e. Wetter"
          className={`font-orbitron-black tracking-widest text-5xl text-center ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          Wetter
        </Animated.Text>

        <Animated.Text
          entering={BounceInRight.duration(500)
            .delay(1400)
            .reduceMotion(ReduceMotion.System)
            .easing(Easing.ease)}
          className={`font-genos-regular tracking-widest text-2xl mt-4 text-center ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          A minimal weather app
        </Animated.Text>
      </View>

      <Animated.View
        entering={BounceInDown.duration(500)
          .delay(1600)
          .reduceMotion(ReduceMotion.System)
          .easing(Easing.ease)}
      >
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
      </Animated.View>
    </SafeAreaView>
  );
}
