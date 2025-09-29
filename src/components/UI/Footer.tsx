import { ToastRef } from "@/src/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useRef } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Animated, {
  ReduceMotion,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Footer = () => {
  const theme = useColorScheme();

  const toastRef = useRef<ToastRef>(null);

  const githubIntensity = useSharedValue(20);
  const linkedinIntensity = useSharedValue(20);
  const discordIntensity = useSharedValue(20);

  const SOCIAL_LINKS = [
    {
      linkName: "GitHub",
      appUrl: "https://github.com/MrRo-bot",
      webUrl: "https://github.com/MrRo-bot",
      Icon: Entypo,
      iconName: "github",
      intensity: githubIntensity,
    },
    {
      linkName: "LinkedIn",
      appUrl: "linkedin://in/cm-ch",
      webUrl: "https://www.linkedin.com/in/cm-ch/",
      Icon: AntDesign,
      iconName: "linkedin-square",
      intensity: linkedinIntensity,
    },
    {
      linkName: "Discord",
      appUrl: "discord://open/434001308484239381",
      webUrl: "https://discordapp.com/users/434001308484239381",
      Icon: FontAwesome6,
      iconName: "discord",
      intensity: discordIntensity,
    },
  ];

  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  const githubAnimatedProps = useAnimatedProps(() => ({
    intensity: githubIntensity.value,
  }));
  const linkedinAnimatedProps = useAnimatedProps(() => ({
    intensity: linkedinIntensity.value,
  }));
  const discordAnimatedProps = useAnimatedProps(() => ({
    intensity: discordIntensity.value,
  }));

  const animatedPropsMap: {
    [key: string]: Partial<{
      intensity: number;
    }>;
  } = {
    GitHub: githubAnimatedProps,
    LinkedIn: linkedinAnimatedProps,
    Discord: discordAnimatedProps,
  };

  const openLink = async (
    appUrl: string,
    webUrl: string,
    intensity: SharedValue<number>
  ) => {
    intensity.value = withSpring(intensity.value === 20 ? 50 : 20, {
      stiffness: 900,
      velocity: 0.2,
      damping: 120,
      mass: 4,
      reduceMotion: ReduceMotion.System,
    });

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const canOpen = await Linking.canOpenURL(appUrl);
      await Linking.openURL(canOpen ? appUrl : webUrl);
    } catch (error) {
      toastRef.current?.show({
        type: "error",
        description: `Error opening URL: ${error} 😭`,
        accessibilityLiveRegion: "assertive",
      });
      try {
        await Linking.openURL(webUrl);
      } catch (webError) {
        toastRef.current?.show({
          type: "error",
          description: `Error opening webURL: ${webError} 😭`,
          accessibilityLiveRegion: "assertive",
        });
      }
    }
  };

  return (
    <View className="pt-8 pb-3">
      <Text
        accessibilityRole="text"
        accessibilityLabel="Social media links section"
        className={`text-lg leading-none mb-2 tracking-wider text-center font-genos-regular ${
          theme === "dark" ? "text-light" : "text-dark"
        }`}
      >
        My socials 😘
      </Text>
      <View className="flex flex-row items-center justify-center gap-4 mb-2">
        {SOCIAL_LINKS.map(
          ({ linkName, appUrl, webUrl, Icon, iconName, intensity }) => (
            <Pressable
              accessibilityLabel={`Open ${linkName} profile`}
              accessibilityHint={`Navigates to my ${linkName} profile`}
              accessibilityRole="button"
              key={linkName}
              android_ripple={{ color: `rgb(255,255,255,0.01)` }}
              className={`rounded-full shadow-2xl w-12 h-12 items-center overflow-hidden justify-center border-2 border-solid ${
                theme === "dark" ? "border-light/20" : "border-dark/20"
              }`}
              onPress={() => openLink(appUrl, webUrl, intensity)}
            >
              <AnimatedBlurView
                experimentalBlurMethod="dimezisBlurView"
                className={`items-center justify-center w-full h-full`}
                animatedProps={animatedPropsMap[linkName]}
              >
                <Icon
                  accessible={false}
                  name={iconName}
                  size={20}
                  color={theme === "dark" ? "white" : "black"}
                />
              </AnimatedBlurView>
            </Pressable>
          )
        )}
      </View>
      <View className="mx-auto">
        <Text
          accessibilityRole="text"
          className={`text-center text-sm ${
            theme === "dark" ? "text-light/50" : "text-dark/50"
          }`}
        >
          Weather data by open-meteo.com
        </Text>
        <Text
          accessibilityRole="text"
          className={`text-center text-sm ${
            theme === "dark" ? "text-light/50" : "text-dark/50"
          }`}
        >
          Inspired by Today Weather
        </Text>
      </View>
    </View>
  );
};

export default Footer;
