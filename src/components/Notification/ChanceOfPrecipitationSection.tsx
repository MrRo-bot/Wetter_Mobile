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

const ChanceOfPrecipitationSection = ({
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
  const [chanceOfPrecModal, setChanceOfPrecModal] = useState(false);

  const { alerts, setChanceOfPrecipitation } = useSettingsStore();

  const C_O_P_RANGE = ["40", "50", "60", "70", "80", "90"];

  return (
    <AnimatedComponent
      disabled={!alerts.rainAndSnow}
      entering={SlideInUp.duration(500)
        .delay(300)
        .reduceMotion(ReduceMotion.System)}
      accessibilityRole="button"
      accessibilityLabel="Open chance of precipitation modal"
      onPress={() => setChanceOfPrecModal(!chanceOfPrecModal)}
      className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <Text
        className={`font-orbitron-bold text-lg ${!alerts.rainAndSnow && "opacity-50"} ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
      >
        Chance Of Precipitation
      </Text>
      <Text
        className={`font-genos-regular text-xl leading-none mt-1 ${!alerts.rainAndSnow && "opacity-50"} ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
      >
        {"> " + alerts.chanceOfPrecipitation + "%"}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        accessible={true}
        accessibilityLabel="Chance Of Precipitation"
        visible={chanceOfPrecModal}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setChanceOfPrecModal(!chanceOfPrecModal);
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
              Chance Of Precipitation
            </Text>

            <RadioButton.Group
              onValueChange={() => {}}
              value={alerts.chanceOfPrecipitation}
            >
              {C_O_P_RANGE.map((cop) => {
                return (
                  <Pressable
                    key={cop}
                    accessibilityLabel={`Set chance of precipitation to greater than ${cop}%`}
                    accessibilityRole="radio"
                    onPress={() => {
                      setChanceOfPrecipitation(cop);
                      setChanceOfPrecModal(!chanceOfPrecModal);
                    }}
                  >
                    <View className="flex-row items-center justify-start gap-2">
                      <RadioButton color={themeColor} value={cop} />
                      <Text
                        className={`text-2xl leading-none font-genos-light ${theme === "dark" ? "text-light/80" : "text-dark/70"}`}
                      >{`> ${cop}%`}</Text>
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
                setChanceOfPrecModal(!chanceOfPrecModal);
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

export default ChanceOfPrecipitationSection;
