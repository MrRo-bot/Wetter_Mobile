import images from "@/src/constants/images";
import { ShowToastParams, ToastConfig, ToastRef } from "@/src/types/types";
import { BlurView } from "expo-blur";
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
          key={toast.id}
          style={{
            bottom: 70 + index * 5,
            marginInline: "auto",
          }}
          entering={FadeInDown.duration(300)}
          exiting={FadeOutUp.duration(300)}
          className="absolute z-50 items-center justify-center w-full"
        >
          <View
            className={`border-2 border-solid w-max max-w-[90%] rounded-full overflow-hidden ${theme === "dark" ? "border-light/70" : "border-dark/30"}`}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={theme === "dark" ? 20 : 50}
              className="flex-row items-center justify-center gap-2 p-3 bg-clip-padding"
            >
              <View
                className={`rounded-full shadow-sm p-1 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
              >
                <Image
                  style={{ width: 28, height: 28 }}
                  source={
                    theme === "dark"
                      ? images.toast_icon_light
                      : images.toast_icon_dark
                  }
                />
              </View>
              <View>
                {toast.text && (
                  <Text
                    className={`text-lg font-orbitron-bold ${
                      theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  >
                    {toast.text}
                  </Text>
                )}
                {toast.description && (
                  <Text
                    className={`font-orbitron-semiBold tracking-wide ${
                      theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  >
                    {toast.description}
                  </Text>
                )}
              </View>
            </BlurView>
          </View>
        </Animated.View>
      ))}
    </>
  );
};

export default ToastMessage;
