import Loader from "@/src/components/UI/Loader";
import ToastMessage from "@/src/components/UI/ToastMessage";
import components from "@/src/constants/components";
import useAqiData from "@/src/hooks/useAqiData";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import useWeatherData from "@/src/hooks/useWeatherData";
import { aqiStore } from "@/src/store/aqiStore";
import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { ToastRef } from "@/src/types/types";
import { weatherCodeConv } from "@/src/utils/math";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  let theme = useColorScheme();
  let router = useRouter();

  const toastRef = useRef<ToastRef>(null);

  const { locations } = locationStore();
  const { weather, addWeather } = weatherStore();
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

  const weatherCode = weatherCodeConv(weather?.daily?.weather_code[0]);

  const {
    imageColorsLoading,
    imageColorsData,
    unsplashLoading,
    unsplashError,
    imageColorsError,
  } = useUnsplashImage(weatherCode);

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
        description: `${weatherError} 😭`,
      });
  }, [weatherError, weatherIsError]);

  useEffect(() => {
    unsplashError &&
      toastRef.current?.show({
        type: "error",
        description: `${unsplashError} 😭`,
      });
  }, [unsplashError]);

  useEffect(() => {
    imageColorsError &&
      toastRef.current?.show({
        type: "error",
        description: `${imageColorsError} 😭`,
      });
  }, [imageColorsError]);

  useEffect(() => {
    imageIsError &&
      toastRef.current?.show({
        type: "error",
        description: `${imageError} 😭`,
      });
  }, [imageError, imageIsError]);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`relative h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
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
            imageColorsLoading={imageColorsLoading}
            imageColorsData={imageColorsData}
            unsplashLoading={unsplashLoading}
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

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={theme === "dark" ? 20 : 50}
        tint={theme === "dark" ? "dark" : "light"}
        className={`absolute bottom-16 right-10 shadow-2xl w-16 h-16 rounded-full items-center overflow-hidden bg-clip-padding justify-center border-[1px] border-dashed ${theme === "dark" ? "bg-light border-light/30" : "bg-dark border-dark/30"}`}
      >
        <Pressable onPress={() => router.navigate("/(home)/locations")}>
          <MaterialIcons
            color={theme === "dark" ? "white" : "black"}
            name="reorder"
            size={28}
          />
        </Pressable>
      </BlurView>

      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
