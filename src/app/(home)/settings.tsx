import components from "@/src/constants/components";
import { ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  let theme = useColorScheme();
  return (
    <SafeAreaView
      className={`${theme === "dark" ? "bg-black" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView contentContainerClassName="gap-y-12 px-3">
        <components.WindChart />
        <components.HumidityChart />
        <components.Temperature />
        <components.Radiation />
        <components.UVChart />
        <components.DewPointChart />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
