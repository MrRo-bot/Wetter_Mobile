import Loader from "@/src/components/Loader";
import components from "@/src/constants/components";
import useAqiData from "@/src/hooks/useAqiData";
import useWeatherData from "@/src/hooks/useWeatherData";
import { aqiStore } from "@/src/store/aqiStore";
import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { useEffect } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  let colorScheme = useColorScheme();

  const { locations } = locationStore();
  const { addWeather } = weatherStore();
  const { addAQI } = aqiStore();

  const { isLoading: weatherLoading, data: weatherData } = useWeatherData({
    latitude: locations[0]?.locationCoords?.coords?.latitude,
    longitude: locations[0]?.locationCoords?.coords?.longitude,
  });

  const { isLoading: aqiLoading, data: aqiData } = useAqiData({
    latitude: locations[0]?.locationCoords?.coords?.latitude,
    longitude: locations[0]?.locationCoords?.coords?.longitude,
  });

  useEffect(() => {
    if (weatherData) addWeather(weatherData);
  }, [addWeather, weatherData]);

  useEffect(() => {
    if (aqiData) addAQI(aqiData);
  }, [addAQI, aqiData]);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`h-full ${colorScheme === "dark" ? "bg-black" : "bg-light"}`}
    >
      {weatherLoading && aqiLoading ? (
        <View className="justify-center w-full h-full">
          <Loader />
        </View>
      ) : (
        <ScrollView contentContainerClassName="gap-y-4">
          <components.Brief />
          <components.Detail />
          <components.Hourly />
          <components.Daily />
          <components.Wind />
          <components.Chart />
          <components.AirQuality />
          <components.Footer />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
