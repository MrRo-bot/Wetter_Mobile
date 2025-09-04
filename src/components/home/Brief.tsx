import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { BriefType } from "@/src/types/types";
import {
  alertIcon,
  degConv,
  unixConv,
  valRound,
  weatherCodeConv,
} from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import NetInfo from "@react-native-community/netinfo";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

const Brief = ({
  weatherRefetch,
  lastUpdated,
  toast,
  queryStatus,
  error,
  imageColorsLoading,
  imageColorsData,
  unsplashLoading,
}: BriefType) => {
  let theme = useColorScheme();

  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [showOffline, setShowOffline] = useState(false);

  const { weather } = weatherStore();
  const { locations } = locationStore();

  const { daily, current, daily_units, current_units } = weather;

  const imageColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  const weatherCode = weatherCodeConv(daily?.weather_code[0]);
  const isDay = current?.is_day;
  const timestring = unixConv.timeStamp(
    new Date(current?.time).getTime() / 1000
  );
  const windDirection = degConv(current?.wind_direction_10m);
  const windSpeed = `${valRound(daily?.wind_speed_10m_max[0])}${daily_units?.wind_speed_10m_max}`;
  const gustDirection = degConv(current?.wind_gusts_10m);
  const gustSpeed = `${valRound(daily?.wind_gusts_10m_max[0])}${daily_units?.wind_gusts_10m_max}`;
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
        description: "Check your internet 🛜",
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
        timeout: 8000,
        description: "success...",
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
              <BlurView
                experimentalBlurMethod="dimezisBlurView"
                intensity={20}
                tint={theme === "dark" ? "dark" : "light"}
                className="absolute flex-row items-center justify-center gap-4 px-4 py-2 overflow-hidden rounded-tr-full rounded-br-full shadow-sm top-12 bg-clip-padding bg-black/10"
              >
                <View className="pr-4 border-r-2 w-60 border-r-solid border-r-light/10">
                  <Text className="text-lg text-white font-orbitron-regular">
                    OFFLINE MODE
                  </Text>
                  <Text className="text-base text-white font-genos-light">
                    Last updated{" "}
                    {Math.round((Date.now() - lastUpdated) / 1000 / 60)}{" "}
                    minute&apos;s ago
                  </Text>
                </View>
                <Pressable onPress={() => handleRefetch()}>
                  <Entypo name="cycle" size={20} color="white" />
                </Pressable>
              </BlurView>
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

          <View className="flex-row items-end justify-between">
            <Text
              className={`text-4xl leading-none tracking-wider font-genos-medium ${theme === "dark" ? "text-outlineDark" : "text-outlineLight"}`}
            >
              {locations[0]?.geoAddress[0].street ??
                locations[0]?.geoAddress[0].city ??
                locations[0]?.geoAddress[0].district}
            </Text>
            {alertIcon(current?.weather_code) === "alert" && (
              <View
                className={`items-center justify-center p-2 w-10 h-10 mr-4 rounded-full ${theme === "dark" ? "bg-gray-500/70" : "bg-gray-500/10"}`}
              >
                <Entypo
                  name="warning"
                  size={16}
                  style={{
                    color: imageColorsLoading ? "#44444450" : imageColor,
                  }}
                />
              </View>
            )}
          </View>

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
