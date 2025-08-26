import Entypo from "@expo/vector-icons/Entypo";
import { Text, useColorScheme, View } from "react-native";

const Chart = () => {
  let theme = useColorScheme();

  return (
    <View
      style={
        theme === "dark"
          ? {
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }
          : {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }
      }
      className={`relative overflow-hidden py-4 pt-10 mx-3 rounded-2xl border-1 border-dotted border-light/50`}
    >
      <View
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-light/10" : "bg-dark/10"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          CHART
        </Text>
        <View className="absolute -translate-y-1/2 right-5 top-1/2">
          <Entypo
            className="rotate-45"
            name="direction"
            size={16}
            color={theme === "dark" ? "white" : "black"}
          />
        </View>
      </View>
      <View className="px-1 py-2"></View>
      <Text
        className={`absolute uppercase w-max right-2 bottom-2 leading-none font-genos-light ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
      >
        Chance of precipitation
      </Text>
    </View>
  );
};

export default Chart;
