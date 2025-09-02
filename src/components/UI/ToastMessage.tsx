import images from "@/src/constants/images";
import { ShowToastParams, ToastConfig, ToastRef } from "@/src/types/types";
import { Image } from "expo-image";
import React, { Ref, useImperativeHandle, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

const ToastMessage = ({ ref }: { ref: Ref<ToastRef> }) => {
  let theme = useColorScheme();
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  useImperativeHandle(ref, () => ({
    show: ({
      type = "success",
      text,
      description,
      timeout = 4000,
    }: ShowToastParams) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        { id, isVisible: true, type, text, description, timeout },
      ]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, timeout);
    },
  }));

  return (
    <>
      {toasts.map((toast, index) => (
        <Animated.View
          key={toast?.id}
          className={`absolute w-max max-w-[90%] border-2 p-3 gap-2 border-dotted self-center rounded-full flex-row items-center z-50 ${theme === "dark" ? "bg-dark/95 border-light/50" : "bg-light/95 border-dark/10"}`}
          style={{
            bottom: 50 + index * 5,
          }}
          entering={FadeInDown.duration(300)}
          exiting={FadeOutUp.duration(300)}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={
              theme === "dark"
                ? images.toast_icon_light
                : images.toast_icon_dark
            }
          />
          <View>
            {toast?.text && (
              <Text
                className={`text-lg font-orbitron-bold ${
                  theme === "dark" ? "text-white/70" : "text-black/70"
                }`}
              >
                {toast?.text}
              </Text>
            )}
            {toast?.description && (
              <Text
                className={`font-orbitron-semiBold tracking-wide ${
                  theme === "dark" ? "text-white/70" : "text-black/70"
                }`}
              >
                {toast?.description}
              </Text>
            )}
          </View>
        </Animated.View>
      ))}
    </>
  );
};

export default ToastMessage;
