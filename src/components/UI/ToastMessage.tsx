import images from "@/src/constants/images";
import { ShowToastParams, ToastConfig, ToastRef } from "@/src/types/types";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React, { Ref, useImperativeHandle, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  ReduceMotion,
} from "react-native-reanimated";

const ToastMessage = ({ ref }: { ref: Ref<ToastRef> }) => {
  let theme = useColorScheme();

  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  useImperativeHandle(ref, () => ({
    show: ({
      type = "success",
      text,
      description,
      timeout = 4000,
      accessibilityLiveRegion = "polite",
    }: ShowToastParams) => {
      const id = Date.now().toString();
      setToasts((prev) => [
        ...prev,
        {
          id,
          isVisible: true,
          type,
          text,
          description,
          timeout,
          accessibilityLiveRegion,
        },
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
          accessibilityLiveRegion={toast.accessibilityLiveRegion}
          accessibilityRole="alert"
          key={toast.id}
          style={{
            bottom: 100 + index * 5,
            marginInline: "auto",
          }}
          entering={FadeInDown.duration(300).reduceMotion(ReduceMotion.System)}
          exiting={FadeOutUp.duration(300).reduceMotion(ReduceMotion.System)}
          className="absolute z-50 items-center justify-center w-full"
        >
          <View
            className={`border-[1px] border-solid max-w-[80%] rounded-full overflow-hidden ${theme === "dark" ? "border-light" : "border-dark"}`}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={theme === "dark" ? 20 : 50}
              tint={theme === "dark" ? "dark" : "light"}
              className={`flex-row items-center justify-between gap-2 p-2 pr-4 bg-clip-padding ${theme === "dark" ? "bg-light" : "bg-dark"}`}
            >
              <View
                className={`rounded-full shadow-sm p-1 items-center justify-center 
                  ${theme === "dark" ? "bg-light" : "bg-dark"}
                  `}
              >
                <Image
                  accessibilityLabel={`${toast.type} icon`}
                  style={{ width: 20, height: 20 }}
                  source={
                    theme === "dark"
                      ? images.toast_icon_dark
                      : images.toast_icon_light
                  }
                />
              </View>
              <View>
                {toast.text && (
                  <Text
                    className={`font-orbitron-bold ${
                      theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  >
                    {toast.text}
                  </Text>
                )}
                {toast.description && (
                  <Text
                    className={`text-sm font-orbitron-semiBold tracking-wide ${
                      theme === "dark" ? "text-light" : "text-dark"
                    }`}
                  >
                    {toast.description}
                  </Text>
                )}
              </View>
              {/* <Pressable
    onPress={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
    accessibilityRole="button"
    accessibilityLabel="Dismiss toast"
  >
    <Text className="text-sm">Close</Text>
  </Pressable> */}
            </BlurView>
          </View>
        </Animated.View>
      ))}
    </>
  );
};

export default ToastMessage;
