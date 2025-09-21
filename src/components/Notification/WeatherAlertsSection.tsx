import { BlurView } from "expo-blur";
import { useState } from "react";
import { Modal, Pressable, PressableProps, Text, View } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  AnimatedProps,
  ReduceMotion,
  SlideInUp,
} from "react-native-reanimated";

import { useSettingsStore } from "@/src/store/settingsStore";

const WeatherAlertsSection = ({
  theme,
  themeColor,
  AnimatedComponent,
}: {
  theme: string | null | undefined;
  themeColor: string;
  AnimatedComponent: React.FunctionComponent<
    AnimatedProps<PressableProps & React.RefAttributes<View>>
  >;
}) => {
  const { alerts, setWeatherAlert } = useSettingsStore();

  const [weatherAlertsModal, setWeatherAlertsModal] = useState(false);

  return (
    <AnimatedComponent
      entering={SlideInUp.duration(500)
        .delay(100)
        .reduceMotion(ReduceMotion.System)}
      accessibilityRole="button"
      accessibilityLabel="Open weather alerts modal"
      onPress={() => setWeatherAlertsModal(!weatherAlertsModal)}
      className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <Text
        className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
      >
        Weather Alerts
      </Text>
      <Text
        className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
      >
        {alerts.weatherAlerts.advisory && "Advisory"}
        {alerts.weatherAlerts.advisory && alerts.weatherAlerts.severe && ", "}
        {alerts.weatherAlerts.severe && "Severe Alerts"}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        accessible={true}
        accessibilityLabel="Weather Alerts"
        visible={weatherAlertsModal}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setWeatherAlertsModal(!weatherAlertsModal);
        }}
      >
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
          tint={theme === "dark" ? "dark" : "light"}
          className={`items-center justify-center w-full h-full bg-clip-padding ${theme === "dark" ? "bg-light" : "bg-dark"}`}
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={40}
            tint={theme === "dark" ? "dark" : "light"}
            className={`items-start border-[1px] border-solid justify-center w-10/12 p-6 overflow-hidden rounded-2xl gap-y-6 ${theme === "dark" ? "border-light/30" : "border-dark/30"}`}
          >
            <Text
              className={`text-left text-xl font-orbitron-bold ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
            >
              Weather Alerts
            </Text>
            <View className="gap-3">
              <Pressable
                accessibilityLabel="Set severe alerts"
                accessibilityRole="checkbox"
                className="flex-row items-center"
                onPress={() => setWeatherAlert("severe")}
              >
                <Checkbox
                  color={themeColor}
                  status={alerts.weatherAlerts.severe ? "checked" : "unchecked"}
                />
                <Text
                  className={`text-2xl leading-none font-genos-light ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
                >
                  Severe
                </Text>
              </Pressable>
              <Pressable
                accessibilityLabel="Set advisory alerts"
                accessibilityRole="checkbox"
                className="flex-row items-center"
                onPress={() => setWeatherAlert("advisory")}
              >
                <Checkbox
                  color={themeColor}
                  status={
                    alerts.weatherAlerts.advisory ? "checked" : "unchecked"
                  }
                />
                <Text
                  className={`text-2xl leading-none font-genos-light ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
                >
                  Advisory
                </Text>
              </Pressable>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close update frequency modal"
              className={`items-center justify-center ml-auto py-2 px-4 border-2 border-solid rounded-2xl w-max ${theme === "dark" ? "border-light/50 bg-sky-400" : "border-dark/50 bg-sky-900"}`}
              onPress={() => {
                setWeatherAlertsModal(!weatherAlertsModal);
              }}
            >
              <Text
                className={`text-center font-orbitron-bold ${theme === "dark" ? "text-dark" : "text-light"}`}
                numberOfLines={1}
              >
                Ok
              </Text>
            </Pressable>
          </BlurView>
        </BlurView>
      </Modal>
    </AnimatedComponent>
  );
};

export default WeatherAlertsSection;
