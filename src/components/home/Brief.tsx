import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Pressable, Text, useColorScheme, View } from "react-native";

import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";

import useUnsplashImage from "@/src/hooks/useUnsplashImage";

import { ToastRef, WeatherDataType } from "@/src/types/types";
import { degConv, unixConv, valRound, weatherCodeConv } from "@/src/utils/math";
import NetInfo from "@react-native-community/netinfo";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { router } from "expo-router";
import { RefObject, useEffect, useState } from "react";

const Brief = ({
  weatherRefetch,
  lastUpdated,
  toast,
  queryStatus,
  error,
}: {
  weatherRefetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<WeatherDataType, Error>>;
  lastUpdated: number;
  toast: RefObject<ToastRef | null>;
  queryStatus: "fetching" | "idle" | "paused";
  error: Error | null;
}) => {
  let theme = useColorScheme();
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [showOffline, setShowOffline] = useState(false);

  const { weather } = weatherStore();
  const { locations } = locationStore();

  const { daily, current, daily_units, current_units } = weather;

  //weather code day/night indicator and current time
  const weatherCode = weatherCodeConv(daily?.weather_code[0]);
  const isDay = current?.is_day;
  const timestring = unixConv.timeStamp(
    new Date(current?.time).getTime() / 1000
  );

  //getting image based on weather type
  const { imageColorsLoading, imageColorsData, unsplashLoading } =
    useUnsplashImage(weatherCode);

  //Getting color data from image
  const imageColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  //Process wind and gust data
  const windDirection = degConv(current?.wind_direction_10m);
  const windSpeed = `${valRound(daily?.wind_speed_10m_max[0])}${daily_units?.wind_speed_10m_max}`;
  const gustDirection = degConv(current?.wind_gusts_10m);
  const gustSpeed = `${valRound(daily?.wind_gusts_10m_max[0])}${daily_units?.wind_gusts_10m_max}`;

  //Build precipitation text
  const precipitationProbability = daily?.precipitation_probability_max[0];
  const precipitationSum = daily?.precipitation_sum[0];
  const precipitationText =
    precipitationProbability && precipitationProbability > 0
      ? `. Chance of precipitation ${precipitationProbability}${daily_units?.precipitation_probability_max}`
      : "";
  const precipitationAmount =
    precipitationSum > 0
      ? ` around ${precipitationSum} ${daily_units?.precipitation_sum}`
      : "";

  //Generate weather summary
  const weatherSummary = `${isDay ? "Today" : "Tonight"} - ${weatherCode}. Wind ${windDirection?.cardinal} at ${windSpeed}. Gusts ${gustDirection?.cardinal} at ${gustSpeed}${precipitationText}${precipitationAmount}.`;

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state?.isConnected);
      if (!state.isConnected) {
        setShowOffline(true);
      }
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setShowOffline(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRefetch = () => {
    if (isConnected) {
      weatherRefetch();
      setShowOffline(false);
    } else {
      toast.current?.show({
        type: "error",
        description: "Please check your internet 😭",
      });
    }
  };

  useEffect(() => {
    queryStatus === "fetching" &&
      toast.current?.show({
        type: "pending",
        description: "connecting...",
      });

    queryStatus === "idle" &&
      toast.current?.show({
        type: "success",
        description: "Weather fetched...",
      });

    error !== null &&
      toast.current?.show({
        type: "error",
        description: "Error or Data not found!!!",
      });
  }, [error, queryStatus, toast]);

  return (
    <View className="gap-2 mx-3 mt-2">
      <View className="relative w-[calc(100vw-24px)] overflow-hidden h-96 rounded-2xl">
        {imageColorsLoading || unsplashLoading ? (
          <View className={`w-full h-full bg-[#44444450]`} />
        ) : (
          <>
            <Image
              contentFit="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: imageColorsData?.url }}
            />
            {showOffline && (
              <View className="absolute flex-row items-center justify-center gap-3 px-4 py-2 rounded-tr-full rounded-br-full top-12 bg-black/70">
                <View className="pr-4 border-r-2 w-60 border-r-solid border-r-light/10">
                  <Text className="text-lg text-white font-orbitron-regular">
                    OFFLINE MODE
                  </Text>
                  <Text className="text-base text-white font-genos-light">
                    Last updated{" "}
                    {Math.round((Date.now() - lastUpdated) / 1000 / 60)} minutes
                    ago
                  </Text>
                </View>
                <Pressable onPress={() => handleRefetch()}>
                  <Entypo
                    name="cycle"
                    size={20}
                    color={theme === "dark" ? "black" : "white"}
                  />
                </Pressable>
              </View>
            )}
          </>
        )}
      </View>

      <View>
        <View className="flex-row flex-wrap items-center my-4">
          <Text
            style={{
              color: imageColorsLoading ? "#44444450" : imageColor,
              textShadowColor: imageColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-regular mr-4 text-5xl leading-none`}
          >
            {valRound(current?.temperature_2m)} {current_units?.temperature_2m}
          </Text>

          <Text
            style={{
              color: imageColorsLoading ? "#44444450" : imageColor,
              textShadowColor: imageColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold self-start text-lg leading-none`}
          >
            {valRound(daily?.temperature_2m_max[0])}{" "}
            {daily_units?.temperature_2m_max}
          </Text>
          <Text
            style={{
              color: imageColorsLoading ? "#44444450" : imageColor,
              textShadowColor: imageColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold text-lg leading-none`}
          >
            /{" "}
          </Text>
          <Text
            style={{
              color: imageColorsLoading ? "#44444450" : imageColor,
              textShadowColor: imageColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold self-end text-lg leading-none`}
          >
            {valRound(daily?.temperature_2m_min[0])}{" "}
            {daily_units?.temperature_2m_min}
          </Text>
        </View>

        <View className="gap-1">
          <Text
            className={`text-lg leading-none font-genos-regular uppercase ${theme === "dark" ? "text-outlineDark/70" : "text-outlineLight/70"}`}
          >
            {`${timestring?.day?.substring(0, 3)}, ${timestring.month} ${timestring.date}`}
          </Text>

          <Text
            className={`text-4xl leading-none tracking-wider font-genos-medium ${theme === "dark" ? "text-outlineDark" : "text-outlineLight"}`}
          >
            {locations[0]?.geoAddress[0].street ??
              locations[0]?.geoAddress[0].district ??
              locations[0]?.geoAddress[0].city}
          </Text>

          <Text
            className={`text-2xl leading-none font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {weatherCodeConv(current?.weather_code)}
          </Text>

          <Pressable
            onPress={() => router.navigate("/(home)/Days")}
            className="relative mt-1"
          >
            <Text
              className={`pr-8 text-lg leading-none font-genos-medium ${theme === "dark" ? "text-outlineDark/70" : "text-outlineLight/70"}`}
            >
              {weatherSummary}
            </Text>
            <View className="absolute right-0 -translate-y-1/2 top-1/2">
              <Entypo
                className="rotate-45"
                name="direction"
                size={20}
                color={theme === "dark" ? "white" : "black"}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Brief;
