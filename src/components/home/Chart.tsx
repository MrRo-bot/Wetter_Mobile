import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import { unixConv } from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import PrecipitationChart from "../charts/PrecipitationChart";

const Chart = () => {
  let theme = useColorScheme();

  const router = useRouter();

  const { weather } = weatherStore();
  const { units: unitSettings } = useSettingsStore();

  const chanceOfPrecipitationData = Array.from({ length: 7 }, (_, index) => {
    const indexToShow = (index + 1) * 4;

    return {
      value: weather?.hourly?.precipitation_probability[indexToShow],
      label: unixConv?.timeStamp(
        new Date(weather?.hourly.time[indexToShow]).getTime() / 1000,
        unitSettings.time
      ).hour2,
    };
  });

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.95, {
      stiffness: 900,
      velocity: 0.2,
      damping: 120,
      mass: 4,
      reduceMotion: ReduceMotion.System,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        stiffness: 100,
        velocity: 0.2,
        damping: 10,
        mass: 4,
        reduceMotion: ReduceMotion.System,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.navigate("/(home)/Charts");
    }, 200);
  };

  return (
    <View
      style={
        theme === "dark"
          ? {
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }
          : {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }
      }
      className={`relative overflow-hidden py-4 pt-10 px-2 mx-3 rounded-2xl ${theme === "dark" ? "bg-greenDark" : "bg-greenLight"}`}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View weather charts"
        accessibilityHint="Navigates to charts page for visualisation of weather data"
        onPress={handlePress}
        android_ripple={{ color: `rgb(255,255,255,0.01)` }}
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-dark/50" : "bg-light/50"}`}
      >
        <Animated.Text
          style={animatedStyle}
          className={`font-orbitron-bold top-2.5 leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          CHART
        </Animated.Text>
        <View className="absolute -translate-y-1/2 right-5 top-1/2">
          <Entypo
            accessibilityLabel="Arrow indicating navigation"
            accessibilityRole="image"
            className="rotate-45"
            name="direction"
            size={16}
            color={theme === "dark" ? "lightgreen" : "darkolivegreen"}
          />
        </View>
      </Pressable>
      <View className="w-full">
        <PrecipitationChart
          precipitationData={chanceOfPrecipitationData}
          theme={theme}
        />
      </View>
      <Text
        className={`text-right uppercase w-max pr-3 leading-none font-genos-regular ${theme === "dark" ? "text-dark" : "text-slate-800"}`}
      >
        Chance of precipitation
      </Text>
    </View>
  );
};

export default Chart;
