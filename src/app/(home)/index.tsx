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
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  let theme = useColorScheme();
  let router = useRouter();

  const toastRef = useRef<ToastRef>(null);

  const locationStoreObj = locationStore();
  const { weather, addWeather } = weatherStore();
  const { addAQI } = aqiStore();

  const currentLocObj = locationStoreObj?.getLocationById(
    locationStoreObj?.locationToShow
  )?.locationCoords.coords ??
    locationStoreObj?.locations[0]?.locationCoords.coords ?? {
      latitude: 0,
      longitude: 0,
    };

  const {
    isLoading: weatherLoading,
    data: weatherData,
    isError: weatherIsError,
    error: weatherError,
    dataUpdatedAt: weatherLastUpdated,
    fetchStatus,
    refetch,
  } = useWeatherData(currentLocObj);

  const {
    isLoading: aqiLoading,
    data: aqiData,
    isError: imageIsError,
    error: imageError,
  } = useAqiData(currentLocObj);

  const weatherCode = weather?.daily?.weather_code?.[0]
    ? weatherCodeConv(weather.daily.weather_code[0])
    : "unknown";

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
    const errors = [
      { isError: weatherIsError, message: weatherError },
      { isError: unsplashError, message: unsplashError },
      { isError: imageColorsError, message: imageColorsError },
      { isError: imageIsError, message: imageError },
    ].filter((err) => err.isError && err.message);

    errors.forEach((err) =>
      toastRef.current?.show({
        type: "error",
        description: `${err.message} 😭`,
      })
    );
  }, [
    weatherIsError,
    weatherError,
    unsplashError,
    imageColorsError,
    imageIsError,
    imageError,
  ]);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <SafeAreaView
      edges={["right", "left", "bottom"]}
      className={`relative h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      {weatherLoading || aqiLoading ? (
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

      {!weatherLoading && (
        <AnimatedPressable
          entering={FadeInUp.duration(600)}
          className={`absolute bottom-16 right-10 shadow-2xl w-16 h-16 rounded-full items-center overflow-hidden justify-center border-2 border-solid ${theme === "dark" ? "bg-light/90 border-dark/20" : "bg-dark/75 border-light/40"}`}
          onPress={() => router.navigate("/(home)/locations")}
        >
          <MaterialIcons
            color={theme === "dark" ? "black" : "white"}
            name="reorder"
            size={28}
          />
        </AnimatedPressable>
      )}

      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
