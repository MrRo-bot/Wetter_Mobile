import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  let theme = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView
      className={`h-full px-3 ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <Pressable onPress={() => router.replace("/(home)/settings/Units")}>
          <Text
            className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
          >
            Units
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
