import { ScrollView, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Loader from "@/src/components/Loader";
import useWeatherData from "@/src/hooks/useWeatherData";
import { locationStore } from "@/src/store/locationStore";

export default function Home() {
  let colorScheme = useColorScheme();
  const { locations } = locationStore();

  const { isLoading, error, data, refetch } = useWeatherData({
    latitude: locations[0]?.locationCoords?.coords?.latitude,
    longitude: locations[0]?.locationCoords?.coords?.longitude,
  });

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full ${colorScheme === "dark" ? "bg-black" : "bg-light"}`}
    >
      {isLoading ? (
        <View className="justify-center w-full h-full">
          <Loader />
        </View>
      ) : error ? (
        <Text className="w-1/2 m-auto">{JSON.stringify(error, null, 2)}</Text>
      ) : (
        <ScrollView contentContainerClassName="gap-y-4">
          <Text>{JSON.stringify(locations, null, 2) || null}</Text>
          <Text>{JSON.stringify(data?.current, null, 2) || null}</Text>
          {/* <components.Brief theme={colorScheme} />
          <components.Detail theme={colorScheme} />
          <components.Hourly theme={colorScheme} />
          <components.Daily theme={colorScheme} /> */}
          {/* <components.Charts theme={colorScheme} />
        <components.AirQuality theme={colorScheme} />
        <components.Wind theme={colorScheme} /> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
{
  /* <Text className="w-1/2 m-auto">{JSON.stringify(data, null, 2)}</Text> */
}
