import { BlurView } from "expo-blur";
import { useState } from "react";
import { Modal, Pressable, PressableProps, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import {
  AnimatedProps,
  ReduceMotion,
  SlideInUp,
} from "react-native-reanimated";

import { useSettingsStore } from "@/src/store/settingsStore";

const AirQualitySection = ({
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
  const [aqiModal, setAqiModal] = useState(false);

  const { alerts, setAQI } = useSettingsStore();

  const AQI_RANGE = ["0", "100", "150", "200", "300"];
  return (
    <AnimatedComponent
      entering={SlideInUp.duration(500)
        .delay(400)
        .reduceMotion(ReduceMotion.System)}
      accessibilityRole="button"
      accessibilityLabel="Open air quality index modal"
      onPress={() => setAqiModal(!aqiModal)}
      className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <Text
        className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
      >
        Air Quality Index
      </Text>
      <Text
        className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
      >
        {alerts.aqi === "0" ? "None" : "> " + alerts.aqi}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        accessible={true}
        accessibilityLabel="Air Quality Index"
        visible={aqiModal}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setAqiModal(!aqiModal);
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
            className={`border-[1px] p-6 gap-y-6 w-10/12 border-solid overflow-hidden rounded-2xl ${theme === "dark" ? "border-light/30" : "border-dark/30"}`}
          >
            <Text
              className={`text-left text-xl font-orbitron-bold ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
            >
              Air Quality Index
            </Text>

            <RadioButton.Group onValueChange={() => {}} value={alerts.aqi}>
              {AQI_RANGE.map((aqiVal) => {
                return (
                  <Pressable
                    key={aqiVal}
                    accessibilityLabel={`Set air quality index to greater than ${aqiVal}%`}
                    accessibilityRole="radio"
                    className="my-1"
                    onPress={() => {
                      setAQI(aqiVal);
                      setAqiModal(!aqiModal);
                    }}
                  >
                    <View className="flex-row items-center justify-start gap-2">
                      <RadioButton color={themeColor} value={aqiVal} />
                      <Text
                        className={`text-2xl leading-none font-genos-light ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
                      >
                        {aqiVal === "0" ? "None" : "> " + aqiVal}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </RadioButton.Group>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close update frequency modal"
              className={`items-center justify-center ml-auto py-1.5 px-2 border-2 border-solid rounded-2xl w-max ${theme === "dark" ? "border-light/50 bg-sky-400" : "border-dark/50 bg-sky-900"}`}
              onPress={() => {
                setAqiModal(!aqiModal);
              }}
            >
              <Text
                className={`text-center font-orbitron-bold ${theme === "dark" ? "text-dark" : "text-light"}`}
                numberOfLines={1}
              >
                Cancel
              </Text>
            </Pressable>
          </BlurView>
        </BlurView>
      </Modal>
    </AnimatedComponent>
  );
};

export default AirQualitySection;
