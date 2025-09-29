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
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, ScrollView, useColorScheme, View } from "react-native";
import Animated, {
  ReduceMotion,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
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
        accessibilityLiveRegion: "assertive",
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

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.85, {
      stiffness: 900,
      velocity: 0.2,
      damping: 120,
      mass: 4,
      reduceMotion: ReduceMotion.System,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        stiffness: 100,
        velocity: 0.2,
        damping: 10,
        mass: 4,
        reduceMotion: ReduceMotion.System,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.navigate("/(home)/locations");
    }, 200);
  };

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
        <>
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
            <components.Daytime />
            <components.Wind />
            <components.Footer />
          </ScrollView>
          {!weatherLoading && (
            <AnimatedPressable
              entering={SlideInDown.duration(600).reduceMotion(
                ReduceMotion.System
              )}
              className={`absolute bottom-16 right-10 rounded-full shadow-2xl w-16 h-16 items-center overflow-hidden justify-center border-2 border-solid ${theme === "dark" ? "border-light/20" : "border-dark/20"}`}
              style={animatedStyle}
              onPress={handlePress}
            >
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={20}
                className={`items-center justify-center w-full h-full`}
              >
                <MaterialIcons
                  color={theme === "dark" ? "white" : "black"}
                  name="reorder"
                  size={28}
                />
              </BlurView>
            </AnimatedPressable>
          )}
        </>
      )}

      <ToastMessage ref={toastRef} />
    </SafeAreaView>
  );
}
