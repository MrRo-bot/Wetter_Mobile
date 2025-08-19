import components from "@/src/constants/components";
import { ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full ${colorScheme === "dark" ? "bg-black" : "bg-light"}`}
    >
      <ScrollView contentContainerClassName="gap-y-4">
        <components.Brief theme={colorScheme} />
        <components.Detail theme={colorScheme} />
        <components.Hourly theme={colorScheme} />
        {/* <components.Days theme={colorScheme} />
        <components.Charts theme={colorScheme} />
        <components.AirQuality theme={colorScheme} />
        <components.Wind theme={colorScheme} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
