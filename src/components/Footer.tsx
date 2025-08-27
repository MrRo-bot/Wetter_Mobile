import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Linking from "expo-linking";
import { useCallback } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

const Footer = () => {
  let theme = useColorScheme();

  const openLink = useCallback(async (appUrl: string, webUrl: string) => {
    const canOpen = await Linking.canOpenURL(appUrl);
    try {
      if (canOpen) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
      await Linking.openURL(webUrl);
    }
  }, []);

  return (
    <View className="pt-8 pb-3">
      <Text
        className={`text-lg leading-none mb-2 tracking-wider text-center font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
      >
        My socials 😘
      </Text>
      <View className="flex flex-row items-center justify-center gap-4 mb-4">
        <Pressable
          onPress={() =>
            openLink("github://profile/MrRo-bot", "https://github.com/MrRo-bot")
          }
        >
          <Entypo
            name="github"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            openLink(
              "linkedin://in/cm-ch",
              "https://www.linkedin.com/in/cm-ch/"
            )
          }
        >
          <AntDesign
            name="linkedin-square"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            openLink(
              "discord://open/434001308484239381",
              "https://discordapp.com/users/434001308484239381"
            )
          }
        >
          <FontAwesome6
            name="discord"
            size={20}
            color={theme === "dark" ? "white" : "black"}
          />
        </Pressable>
      </View>
      <View className="mx-auto">
        <Text
          className={`text-center text-sm ${theme === "dark" ? "text-light/50" : "text-dark/50"}`}
        >
          Weather data by open-meteo.com
        </Text>

        <Text
          className={`text-center text-sm ${theme === "dark" ? "text-light/50" : "text-dark/50"}`}
        >
          Inspired by Today Weather
        </Text>
      </View>
    </View>
  );
};

export default Footer;
