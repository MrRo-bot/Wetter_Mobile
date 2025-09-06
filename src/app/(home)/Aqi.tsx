import Components from "@/src/constants/components";
import { ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Aqi = () => {
  let theme = useColorScheme();

  return (
    <SafeAreaView
      className={`${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView contentContainerClassName="px-3">
        <Components.DailyAqiCharts />
        <Components.HourlyAqiCharts />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Aqi;
