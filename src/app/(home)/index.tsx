import Loader from "@/src/components/UI/Loader";
import ToastMessage from "@/src/components/UI/ToastMessage";
import components from "@/src/constants/components";
import useAqiData from "@/src/hooks/useAqiData";
import useWeatherData from "@/src/hooks/useWeatherData";
import { aqiStore } from "@/src/store/aqiStore";
import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { ToastRef } from "@/src/types/types";
import { useEffect, useRef } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  let colorScheme = useColorScheme();
  const toastRef = useRef<ToastRef>(null);

  const { locations } = locationStore();
  const { addWeather } = weatherStore();
  const { addAQI } = aqiStore();

  const {
    isLoading: weatherLoading,
    data: weatherData,
    isError: weatherIsError,
    error: weatherError,
    dataUpdatedAt: weatherLastUpdated,
    fetchStatus,
    refetch,
  } = useWeatherData({
    latitude: locations[0]?.locationCoords?.coords?.latitude,
    longitude: locations[0]?.locationCoords?.coords?.longitude,
  });

  const {
    isLoading: aqiLoading,
    data: aqiData,
    isError: imageIsError,
    error: imageError,
  } = useAqiData({
    latitude: locations[0]?.locationCoords?.coords?.latitude,
    longitude: locations[0]?.locationCoords?.coords?.longitude,
  });

  useEffect(() => {
    if (weatherData) addWeather(weatherData);
  }, [addWeather, weatherData]);

  useEffect(() => {
    if (aqiData) addAQI(aqiData);
  }, [addAQI, aqiData]);

  useEffect(() => {
    weatherIsError &&
      toastRef.current?.show({
        type: "error",
        description: weatherError + " 😭",
      });
  }, [weatherError, weatherIsError]);

  useEffect(() => {
    imageIsError &&
      toastRef.current?.show({
        type: "error",
        description: imageError + " 😭",
      });
  }, [imageError, imageIsError]);

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
        <ScrollView contentContainerClassName="gap-y-8">
          <components.Brief
            weatherRefetch={refetch}
            lastUpdated={weatherLastUpdated}
            toast={toastRef}
            queryStatus={fetchStatus}
            error={weatherError}
          />
          <components.Detail />
          <components.Hourly />
          <components.Daily />
          <components.Chart />
          <components.AirQuality />
          <components.Wind />
          <components.Footer />
        </ScrollView>
      )}
      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
