import { ScrollView, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  let theme = useColorScheme();
  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView>
        <Text
          className={`border-b-[1px] border-solid px-8 py-6 font-orbitron-bold text-xl ${theme === "dark" ? "border-b-light/5 text-light" : "border-b-dark/5 text-dark"}`}
        >
          Weather Alerts
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
