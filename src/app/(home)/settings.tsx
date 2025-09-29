import { useSettingsStore } from "@/src/store/settingsStore";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Animated, { ReduceMotion, SlideInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const UpdateFreqComponent = ({
  theme,
  updateFreqModal,
  setUpdateFreqModal,
}: {
  theme: string | null | undefined;
  updateFreqModal: boolean;
  setUpdateFreqModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateFreq, setUpdateFreq } = useSettingsStore();

  const RADIO_THEME =
    theme === "dark" ? "hsl(353, 80%, 72%)" : "hsl(353, 100%, 72%)";

  return (
    <>
      <Text
        className={`font-orbitron-bold text-lg ${
          theme === "dark" ? "text-light/80" : "text-dark/80"
        }`}
      >
        Update Frequency
      </Text>
      <Text
        className={`font-genos-regular text-xl leading-none mt-1 ${
          theme === "dark" ? "text-light/30" : "text-dark/30"
        }`}
      >
        {updateFreq}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        accessible={true}
        accessibilityLabel="Update Frequency Selection"
        visible={updateFreqModal}
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={() => {
          setUpdateFreqModal(!updateFreqModal);
        }}
      >
        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
          tint={theme === "dark" ? "dark" : "light"}
          className={`flex-row items-center justify-center gap-2 p-2 bg-clip-padding w-full h-full ${
            theme === "dark" ? "bg-light" : "bg-dark"
          }`}
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={40}
            tint={theme === "dark" ? "dark" : "light"}
            className={`items-start border-[1px] border-solid justify-center w-10/12 p-6 overflow-hidden rounded-2xl h-3/12 gap-y-6 ${
              theme === "dark" ? "border-light/30" : "border-dark/30"
            }`}
          >
            <Text
              className={`text-left text-xl font-orbitron-bold ${
                theme === "dark" ? "text-light/80" : "text-dark/80"
              }`}
            >
              Update Frequency
            </Text>
            <View>
              <RadioButton.Group
                onValueChange={(value) => {
                  setUpdateFreq(value);
                  setUpdateFreqModal(false);
                }}
                value={updateFreq}
              >
                {[
                  "15 Minutes",
                  "30 Minutes",
                  "1 Hour",
                  "2 Hours",
                  "3 Hours",
                ].map((freq) => (
                  <Pressable
                    key={freq}
                    accessibilityLabel={`Set update frequency to ${freq}`}
                    accessibilityRole="radio"
                    android_ripple={{ color: `rgb(255,255,255,0.01)` }}
                    onPress={() => {
                      setUpdateFreq(freq);
                      setUpdateFreqModal(false);
                    }}
                    className="my-1 w-[70vw]"
                  >
                    <View className="flex-row items-center gap-5">
                      <RadioButton
                        color={RADIO_THEME}
                        value={freq}
                        status={updateFreq === freq ? "checked" : "unchecked"}
                      />
                      <Text
                        className={`text-3xl leading-none font-genos-light ${
                          theme === "dark" ? "text-light/80" : "text-dark/70"
                        }`}
                      >
                        {freq}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </RadioButton.Group>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close update frequency modal"
              className={`items-center justify-center ml-auto py-1.5 px-2 border-2 border-solid rounded-2xl w-max ${
                theme === "dark"
                  ? "border-light/50 bg-sky-400"
                  : "border-dark/50 bg-sky-900"
              }`}
              onPress={() => setUpdateFreqModal(false)}
              android_ripple={{
                color:
                  theme === "dark"
                    ? "hsla(200,100%,50%,0.7)"
                    : "hsla(198,60%,70%,0.8)",
              }}
            >
              <Text
                className={`text-center font-orbitron-bold ${
                  theme === "dark" ? "text-dark" : "text-light"
                }`}
                numberOfLines={1}
              >
                Cancel
              </Text>
            </Pressable>
          </BlurView>
        </BlurView>
      </Modal>
    </>
  );
};

const Settings = () => {
  let theme = useColorScheme();

  const [updateFreqModal, setUpdateFreqModal] = useState(false);

  const router = useRouter();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <SafeAreaView
      className={`h-full p-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <AnimatedPressable
          accessibilityLabel="Navigate to Weather Alerts settings"
          accessibilityHint="Opens the weather alerts configuration screen"
          onPress={() => router.navigate("/(home)/settings/Notification")}
          className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
          entering={SlideInUp.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Text
            className={`font-orbitron-bold text-lg ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            Notification
          </Text>
        </AnimatedPressable>
        <AnimatedPressable
          accessibilityLabel="Navigate to Units"
          accessibilityHint="Opens the measurement units configuration screen"
          onPress={() => router.navigate("/(home)/settings/Units")}
          className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
          entering={SlideInUp.duration(500)
            .delay(200)
            .reduceMotion(ReduceMotion.System)}
        >
          <Text
            className={`font-orbitron-bold text-lg ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            Units
          </Text>
        </AnimatedPressable>
        <AnimatedPressable
          entering={SlideInUp.duration(500)
            .delay(300)
            .reduceMotion(ReduceMotion.System)}
          accessibilityRole="button"
          accessibilityLabel="Open update frequency modal"
          onPress={() => setUpdateFreqModal(!updateFreqModal)}
          className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
        >
          <UpdateFreqComponent
            theme={theme}
            updateFreqModal={updateFreqModal}
            setUpdateFreqModal={setUpdateFreqModal}
          />
        </AnimatedPressable>
        <AnimatedPressable
          accessibilityLabel="Navigate to About page"
          accessibilityHint="Opens the description about the app"
          onPress={() => router.navigate("/(home)/settings/About")}
          className={`py-6 border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
          entering={SlideInUp.duration(500)
            .delay(400)
            .reduceMotion(ReduceMotion.System)}
        >
          <Text
            className={`font-orbitron-bold text-lg ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            About
          </Text>
        </AnimatedPressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
