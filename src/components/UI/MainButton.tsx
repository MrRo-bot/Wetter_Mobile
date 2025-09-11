import { MainButtonType } from "@/src/types/types";
import React from "react";
import { Pressable, Text, View } from "react-native";

const MainButton = ({
  theme,
  darkBgColor,
  lightBgColor,
  onPressFunc,
  buttonText,
  darkColor,
  lightColor,
  accessibilityLabel,
  accessibilityHint,
}: MainButtonType) => {
  return (
    <View className={`overflow-hidden rounded-full max-w-max`}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || buttonText}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: !onPressFunc }}
        onPress={onPressFunc}
        className={`px-10 py-2.5 ${theme === "dark" ? darkBgColor : lightBgColor}`}
        android_ripple={{
          color:
            theme === "dark"
              ? "hsla(200,100%,50%,0.7)"
              : "hsla(198,60%,70%,0.8)",
        }}
      >
        <Text
          className={`font-orbitron-black tracking-widest ${theme === "dark" ? darkColor : lightColor}`}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
};

export default MainButton;
