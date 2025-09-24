import { ToastRef } from "@/src/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Linking from "expo-linking";
import { useRef } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

const Footer = () => {
  let theme = useColorScheme();

  const toastRef = useRef<ToastRef>(null);

  const SOCIAL_LINKS = [
    {
      linkName: "GitHub",
      appUrl: "github://profile/MrRo-bot",
      webUrl: "https://github.com/MrRo-bot",
      Icon: Entypo,
      iconName: "github",
    },
    {
      linkName: "LinkedIn",
      appUrl: "linkedin://in/cm-ch",
      webUrl: "https://www.linkedin.com/in/cm-ch/",
      Icon: AntDesign,
      iconName: "linkedin-square",
    },
    {
      linkName: "Discord",
      appUrl: "discord://open/434001308484239381",
      webUrl: "https://discordapp.com/users/434001308484239381",
      Icon: FontAwesome6,
      iconName: "discord",
    },
  ];

  const openLink = async (appUrl: string, webUrl: string) => {
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
        className={`text-lg leading-none mb-2 tracking-wider text-center font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
      >
        My socials 😘
      </Text>
      <View className="flex flex-row items-center justify-center gap-4 mb-2">
        {SOCIAL_LINKS.map(({ linkName, appUrl, webUrl, Icon, iconName }) => (
          <Pressable
            key={linkName}
            onPress={() => openLink(appUrl, webUrl)}
            android_ripple={{ color: `rgb(255,255,255,0.01)` }}
            accessibilityLabel={`Open ${linkName} profile`}
            accessibilityHint={`Navigates to my ${linkName} profile`}
            accessibilityRole="button"
          >
            <Icon
              accesssible={false}
              name={iconName}
              size={24}
              color={theme === "dark" ? "white" : "black"}
            />
          </Pressable>
        ))}
      </View>
      <View className="mx-auto">
        <Text
          accessibilityRole="text"
          className={`text-center text-sm ${theme === "dark" ? "text-light/50" : "text-dark/50"}`}
        >
          Weather data by open-meteo.com
        </Text>

        <Text
          accessibilityRole="text"
          className={`text-center text-sm ${theme === "dark" ? "text-light/50" : "text-dark/50"}`}
        >
          Inspired by Today Weather
        </Text>
      </View>
    </View>
  );
};

export default Footer;
