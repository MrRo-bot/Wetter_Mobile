import { useSettingsStore } from "@/src/store/settingsStore";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Checkbox, RadioButton, Switch } from "react-native-paper";
import Animated, { FlipInXDown, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  let theme = useColorScheme();

  const [weatherAlertsModal, setWeatherAlertsModal] = useState(false);
  const [chanceOfPrecModal, setChanceOfPrecModal] = useState(false);
  const [aqiModal, setAqiModal] = useState(false);
  // const [timeModal, setTimeModal] = useState(false);

  const { alerts, setAlerts } = useSettingsStore();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const PAPER_COMPONENT_COLOR =
    theme === "dark" ? "hsl(353, 80%, 72%)" : "hsl(353, 100%, 72%)";

  const C_O_P_RANGE = ["40", "50", "60", "70", "80", "90"];
  const AQI_RANGE = ["0", "100", "150", "200", "300"];

  return (
    <SafeAreaView
      className={`h-full p-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        {/* Weather alerts */}
        <AnimatedPressable
          entering={FlipInXDown.duration(500)
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
            {alerts.weatherAlerts.advisory &&
              alerts.weatherAlerts.severe &&
              ", "}
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
                    onPress={() =>
                      setAlerts({
                        ...alerts,
                        weatherAlerts: {
                          ...alerts.weatherAlerts,
                          severe: !alerts.weatherAlerts.severe,
                        },
                      })
                    }
                  >
                    <Checkbox
                      color={PAPER_COMPONENT_COLOR}
                      status={
                        alerts.weatherAlerts.severe ? "checked" : "unchecked"
                      }
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
                    onPress={() =>
                      setAlerts({
                        ...alerts,
                        weatherAlerts: {
                          ...alerts.weatherAlerts,
                          advisory: !alerts.weatherAlerts.advisory,
                        },
                      })
                    }
                  >
                    <Checkbox
                      color={PAPER_COMPONENT_COLOR}
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
        </AnimatedPressable>

        {/* Rain & Snow alarm */}
        <AnimatedPressable
          entering={FlipInXDown.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
          accessibilityRole="togglebutton"
          accessibilityLabel="Toggle rain and snow alarm"
          className={`py-8 flex-row items-center  border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
        >
          <View className="w-9/12">
            <Text
              className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
            >
              Rain & Snow Alarm
            </Text>
            <Text
              className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
            >
              Alerts you when rain or snow is approaching
            </Text>
          </View>
          <View className="w-3/12">
            <Switch
              color={PAPER_COMPONENT_COLOR}
              value={alerts.rainAndSnow}
              onValueChange={() =>
                setAlerts({
                  ...alerts,
                  rainAndSnow: !alerts.rainAndSnow,
                })
              }
            />
          </View>
        </AnimatedPressable>

        {/* Chance of precipitation */}
        <AnimatedPressable
          disabled={!alerts.rainAndSnow}
          entering={FlipInXDown.duration(500)
            .delay(100)
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
                  onValueChange={() => setAlerts}
                  value={alerts.chanceOfPrecipitation}
                >
                  {C_O_P_RANGE.map((cop) => {
                    return (
                      <Pressable
                        key={cop}
                        accessibilityLabel={`Set chance of precipitation to greater than ${cop}%`}
                        accessibilityRole="radio"
                        onPress={() => {
                          setAlerts({ ...alerts, chanceOfPrecipitation: cop });
                          setChanceOfPrecModal(!chanceOfPrecModal);
                        }}
                      >
                        <View className="flex-row items-center justify-start gap-2">
                          <RadioButton
                            color={PAPER_COMPONENT_COLOR}
                            value={cop}
                          />
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
        </AnimatedPressable>

        {/* Air quality index */}
        <AnimatedPressable
          entering={FlipInXDown.duration(500)
            .delay(100)
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

                <RadioButton.Group
                  onValueChange={() => setAlerts}
                  value={alerts.aqi}
                >
                  {AQI_RANGE.map((aqiVal) => {
                    return (
                      <Pressable
                        key={aqiVal}
                        accessibilityLabel={`Set air quality index to greater than ${aqiVal}%`}
                        accessibilityRole="radio"
                        className="my-1"
                        onPress={() => {
                          setAlerts({ ...alerts, aqi: aqiVal });
                          setAqiModal(!aqiModal);
                        }}
                      >
                        <View className="flex-row items-center justify-start gap-2">
                          <RadioButton
                            color={PAPER_COMPONENT_COLOR}
                            value={aqiVal}
                          />
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
        </AnimatedPressable>

        {/* Daily notification */}
        <AnimatedPressable
          entering={FlipInXDown.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
          accessibilityRole="togglebutton"
          accessibilityLabel="Toggle daily notification"
          className={`py-8 flex-row items-center justify-between border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
        >
          <View>
            <Text
              className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
            >
              Daily Notification
            </Text>
            <Text
              className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
            >
              {alerts.dailyNotification ? "On" : "Off"}
            </Text>
          </View>
          <View>
            <Switch
              color={PAPER_COMPONENT_COLOR}
              value={alerts.dailyNotification}
              onValueChange={() =>
                setAlerts({
                  ...alerts,
                  dailyNotification: !alerts.dailyNotification,
                })
              }
            />
          </View>
        </AnimatedPressable>

        {/* Time */}
        {/* <AnimatedPressable
          entering={FlipInXDown.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
          accessibilityLabel="Setting time of the day to get notification every day"
          className={`py-8 flex-row items-center justify-between border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
        >
          <View>
            <Text
              className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
            >
              Time
            </Text>
            <Text
              className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
            >
              {alerts.time}
            </Text>
          </View>
          <View>
            <DateTimePicker
              value={new Date()}
              mode="time"
              // is24Hour={true}
              display={Platform.OS === "ios" ? "spinner" : "clock"}
              onChange={(timeVal) => console.log(timeVal)}
            />
          </View>
        </AnimatedPressable> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
