import { ScrollView, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAqiData from "@/src/hooks/useAqiData";
import useWeatherData from "@/src/hooks/useWeatherData";
import { aqiStore } from "@/src/store/aqiStore";
import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { useEffect } from "react";

export default function Home() {
  let colorScheme = useColorScheme();

  const { weather, addWeather } = weatherStore();
  const { locations } = locationStore();
  const { aqi, addAQI } = aqiStore();

  const { isLoading: weatherLoading, data: weatherData } = useWeatherData({
    latitude: locations[0].locationCoords.coords.latitude,
    longitude: locations[0].locationCoords.coords.longitude,
  });

  const { isLoading: aqiLoading, data: aqiData } = useAqiData({
    latitude: locations[0].locationCoords.coords.latitude,
    longitude: locations[0].locationCoords.coords.longitude,
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
      <ScrollView contentContainerClassName="gap-y-4">
        <Text className="mx-4">
          QUERY RESPONSE:{" "}
          {!weatherLoading && weather && JSON.stringify(weather, null, 2)}
        </Text>
        {/* <Text className="mx-4">
          QUERY RESPONSE: {!aqiLoading && aqi && JSON.stringify(aqi, null, 2)}
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}
// {weatherLoading ? (
//   <View className="justify-center w-full h-full">
//     <Loader />
//   </View>
// ) : weatherError ? (
//   <>
//     <Text className="w-1/2 m-auto">
//       {JSON.stringify(weatherError, null, 2)}
//     </Text>
//   </>
// ) : (
//   <ScrollView contentContainerClassName="gap-y-4">

//     {/* <components.Brief theme={colorScheme} />
//     <components.Detail theme={colorScheme} />
//     <components.Hourly theme={colorScheme} />
//     <components.Daily theme={colorScheme} /> */}
//     {/* <components.Charts theme={colorScheme} />
//   <components.AirQuality theme={colorScheme} />
//   <components.Wind theme={colorScheme} /> */}
//   </ScrollView>
// )}
