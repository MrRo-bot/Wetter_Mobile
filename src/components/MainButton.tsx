import React from "react";
import { Pressable, Text, View } from "react-native";
import { MainButtonType } from "../types/types";

const MainButton = ({
  colorScheme,
  darkBgColor,
  lightBgColor,
  onPressFunc,
  buttonText,
  darkColor,
  lightColor,
}: MainButtonType) => {
  return (
    <View className={`overflow-hidden rounded-full max-w-max`}>
      <Pressable
        onPress={onPressFunc}
        className={`px-10 py-2.5 ${colorScheme === "dark" ? darkBgColor : lightBgColor}`}
        android_ripple={{
          color:
            colorScheme === "dark"
              ? "hsla(200,100%,50%,0.7)"
              : "hsla(198,60%,70%,0.8)",
        }}
      >
        <Text
          className={`font-orbitron-black tracking-widest ${colorScheme === "dark" ? darkColor : lightColor}`}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
};

export default MainButton;
