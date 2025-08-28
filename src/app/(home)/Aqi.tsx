import { ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Aqi = () => {
  let theme = useColorScheme();
  return (
    <SafeAreaView
      className={`${theme === "dark" ? "bg-black" : "bg-light"}`}
      edges={["bottom"]}
    >
      <ScrollView contentContainerClassName="gap-y-12 px-3"></ScrollView>
    </SafeAreaView>
  );
};

export default Aqi;
