import { ShowToastParams, ToastConfig, ToastRef } from "@/src/types/types";
import React, { Ref, useImperativeHandle, useState } from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const ToastMessage = ({ ref }: { ref: Ref<ToastRef> }) => {
  let theme = useColorScheme();
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const TOAST_TYPES = {
    success: { icon: "✅" },
    error: { icon: "❌" },
    pending: { icon: "⌛" },
  };

  useImperativeHandle(ref, () => ({
    show: ({
      type = "success",
      text,
      description,
      timeout = 3000,
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
          className={`absolute w-max max-w-[90%] self-center rounded-lg px-3 py-1.5 flex-row items-center z-50 ${theme === "dark" ? "bg-dark/95" : "bg-light/95"}`}
          style={{
            bottom: 32 + index * 70,
          }}
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(300)}
        >
          <Text className="mr-3 text-base">{TOAST_TYPES[toast.type].icon}</Text>
          <View>
            {toast.text && (
              <Text
                className={`tracking-wider font-orbitron-bold ${
                  theme === "dark" ? "text-white/70" : "text-black/70"
                }`}
              >
                {toast.text}
              </Text>
            )}
            {toast.description && (
              <Text
                className={`text-sm tracking-wide ${
                  theme === "dark" ? "text-white/70" : "text-black/70"
                }`}
              >
                {toast.description}
              </Text>
            )}
          </View>
        </Animated.View>
      ))}
    </>
  );
};

export default ToastMessage;
