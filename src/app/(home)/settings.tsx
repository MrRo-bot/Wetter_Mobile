import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, useColorScheme } from "react-native";
import Animated, { FlipInEasyX, ReduceMotion } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  let theme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView
      className={`h-full px-3 py-6 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable
            onPress={() => router.navigate("/(home)/settings/WeatherAlerts")}
          >
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              Weather Alerts
            </Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable onPress={() => router.navigate("/(home)/settings/Units")}>
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              Units
            </Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable
            onPress={() => router.navigate("/(home)/settings/UpdateFrequency")}
          >
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              Update Frequency
            </Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable
            onPress={() => router.navigate("/(home)/settings/LanguageSupport")}
          >
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              Language Support
            </Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable
            onPress={() => router.navigate("/(home)/settings/Troubleshooting")}
          >
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              Troubleshooting
            </Text>
          </Pressable>
        </Animated.View>
        <Animated.View
          entering={FlipInEasyX.duration(500)
            .delay(300)
            .reduceMotion(ReduceMotion.System)}
        >
          <Pressable onPress={() => router.navigate("/(home)/settings/About")}>
            <Text
              className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
            >
              About
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
