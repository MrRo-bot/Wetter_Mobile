import images from "@/src/constants/images";
import * as Application from "expo-application";
import * as Device from "expo-device";
import { Image } from "expo-image";
import * as IntentLauncher from "expo-intent-launcher";
import { useEffect, useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
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

  const openLocationAccuracySettings = async () => {
    if (Platform.OS === "android") {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS
      );
    }
    if (Platform.OS === "ios") {
      await Linking.openURL("App-Prefs:Privacy&path=LOCATION");
    }
  };

  return (
    <SafeAreaView
      className={`h-full px-3 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <Animated.View
          className="items-center justify-center w-full pt-6"
          entering={BounceInUp.duration(500)
            .delay(100)
            .reduceMotion(ReduceMotion.System)}
        >
          <Image
            accessibilityLabel="Illustration of a magnifying glass for location search"
            accessibilityRole="image"
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
          accessibilityRole="header"
          accessibilityLabel="Wetter App Name"
          entering={BounceInLeft.duration(500)
            .delay(200)
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
          accessibilityRole="text"
          accessibilityLabel={`App Version: ${Application?.nativeApplicationVersion}`}
          entering={BounceInRight.duration(500)
            .delay(300)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-2 py-1 text-3xl text-center font-genos-light leading-none ${theme === "dark" ? "text-purpleLight" : "text-purple"}`}
        >
          Version: {Application?.nativeApplicationVersion}
        </Animated.Text>
        <Animated.Text
          accessibilityRole="text"
          accessibilityLabel={`Device: ${Device?.deviceName}`}
          entering={BounceInLeft.duration(500)
            .delay(400)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-1 text-xl text-center w-full font-genos-regular leading-none text-maroon`}
        >
          Device: {Device?.deviceName}
        </Animated.Text>
        <Animated.Text
          accessibilityRole="text"
          accessibilityLabel={`Installed: ${installed}`}
          entering={BounceInLeft.duration(500)
            .delay(500)
            .reduceMotion(ReduceMotion.System)}
          className={`mt-1 text-xl text-center w-full font-genos-regular leading-none text-maroon`}
        >
          Installed: {installed}
        </Animated.Text>

        <Animated.View
          entering={BounceInDown.duration(500)
            .delay(600)
            .reduceMotion(ReduceMotion.System)}
          className={`mx-6 my-10 gap-y-8 px-6 py-4 rounded-2xl border-2 border-dashed border-tealDark`}
        >
          <View>
            <Text
              accessibilityRole="header"
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
              accessibilityRole="header"
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
              accessibilityRole="header"
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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Location"
            accessibilityHint="Opens the settings for fixing location based issues"
            onPress={() => openLocationAccuracySettings()}
          >
            <Text
              accessibilityRole="header"
              style={{
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 3,
              }}
              className={`pb-2 text-xl font-orbitron-semiBold ${theme === "dark" ? "text-redLight" : "text-redDark"}`}
            >
              Location
            </Text>
            <Text
              className={`text-xl leading-none font-genos-regular ${theme === "dark" ? "text-purpleLight" : "text-purpleDark"}`}
            >
              If the location is not updating automatically, Please ensure that
              you have set the location permission to &quot;Allow all the
              time&quot;.
            </Text>
          </Pressable>
        </Animated.View>

        <Animated.Text
          accessibilityRole="text"
          accessibilityLabel={`App ID: ${Application?.applicationId}`}
          entering={BounceInDown.duration(500)
            .delay(700)
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
