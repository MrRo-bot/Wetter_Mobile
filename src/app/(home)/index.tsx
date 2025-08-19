import components from "@/src/constants/components";
import { ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex h-full justify-center items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <ScrollView>
        <components.Brief theme={colorScheme} />
        <components.Detail theme={colorScheme} />
      </ScrollView>
    </SafeAreaView>
  );
}
