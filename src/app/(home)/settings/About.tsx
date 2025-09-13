import images from "@/src/constants/images";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";
import Animated, {
  BounceInDown,
  BounceInLeft,
  BounceInRight,
  BounceInUp,
  ReduceMotion,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  let theme = useColorScheme();
  const [installed, setInstalled] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await Application.getInstallationTimeAsync();
      const final = res.toLocaleString();
      setInstalled(final);
    })();
  }, []);

  return (
    <SafeAreaView
      className={`h-full px-3 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <Animated.View
          className="items-center justify-center w-full pt-6"
          entering={BounceInUp.duration(1000)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Image
            accessibilityLabel="Illustration of a magnifying glass for location search"
            style={{ width: 200, height: 200 }}
            contentFit="contain"
            source={
              theme === "dark"
                ? images.toast_icon_light
                : images.toast_icon_dark
            }
          />
        </Animated.View>
        <Animated.Text
          entering={BounceInLeft.duration(1000)
            .delay(300)
            .reduceMotion(ReduceMotion.System)}
          style={{
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 8,
          }}
          className={`mt-10 py-1 text-4xl text-center font-orbitron-black leading-none ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
        >
          Wetter
        </Animated.Text>
        <Animated.Text
          entering={BounceInRight.duration(1000)
            .delay(600)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-2 py-1 text-3xl text-center font-genos-light leading-none ${theme === "dark" ? "text-purpleLight" : "text-purple"}`}
        >
          Version: {Application?.nativeApplicationVersion}
        </Animated.Text>
        <Animated.Text
          entering={BounceInLeft.duration(1000)
            .delay(900)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-1 text-xl text-center w-full font-genos-regular leading-none text-maroon`}
        >
          Device: {Device?.deviceName}
        </Animated.Text>
        <Animated.Text
          entering={BounceInLeft.duration(1000)
            .delay(1200)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-1 text-xl text-center w-full font-genos-regular leading-none text-maroon`}
        >
          Installed: {installed}
        </Animated.Text>

        <Animated.View
          entering={BounceInDown.duration(1000)
            .delay(1500)
            .reduceMotion(ReduceMotion.System)}
          className={`mx-6 my-10 gap-y-8 px-6 py-4 rounded-2xl border-2 border-dashed border-tealDark`}
        >
          <View>
            <Text
              style={{
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3,
              }}
              className={`mb-2 text-xl leading-none font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
            >
              Rate
            </Text>
            <Text
              className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-purpleLight" : "text-purpleDark"}`}
            >
              If you enjoy then please like this app on store and support us by
              donating.
            </Text>
          </View>
          <View>
            <Text
              style={{
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3,
              }}
              className={`mb-2 text-xl leading-none font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
            >
              Feedback
            </Text>
            <Text
              className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-purpleLight" : "text-purpleDark"}`}
            >
              Report bugs or make suggestions.
            </Text>
          </View>
          <View>
            <Text
              style={{
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3,
              }}
              className={`mb-2 text-xl leading-none font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
            >
              Share
            </Text>
            <Text
              className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-purpleLight" : "text-purpleDark"}`}
            >
              Share with friends and family!.
            </Text>
          </View>
        </Animated.View>

        <Animated.Text
          entering={BounceInDown.duration(1000)
            .delay(1800)
            .reduceMotion(ReduceMotion.System)}
          className={`my-4 text-xl text-center w-full font-genos-regular leading-none ${theme === "dark" ? "text-light/40" : "text-dark/40"}`}
        >
          {Application?.applicationId}
        </Animated.Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;
