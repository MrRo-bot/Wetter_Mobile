import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Pressable, Text, useColorScheme, View } from "react-native";

import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";

import useUnsplashImage from "@/src/hooks/useUnsplashImage";

import { degConv, unixConv, valRound, weatherCodeConv } from "@/src/utils/math";
import { router } from "expo-router";

const Brief = () => {
  let theme = useColorScheme();
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

  return (
    <View className="gap-2 mx-3 mt-2">
      <View className="w-[calc(100vw-24px)] overflow-hidden h-96 rounded-2xl">
        {imageColorsLoading || unsplashLoading ? (
          <View className={`w-full h-full bg-[#11111150]`} />
        ) : (
          <Image
            contentFit="cover"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: imageColorsData?.url }}
          />
        )}
      </View>

      <View>
        <View className="flex-row flex-wrap items-center my-4">
          <Text
            style={{
              color: imageColorsLoading ? "#11111150" : imageColor,
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
              color: imageColorsLoading ? "#11111150" : imageColor,
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
              color: imageColorsLoading ? "#11111150" : imageColor,
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
              color: imageColorsLoading ? "#11111150" : imageColor,
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
            {locations[0]?.geoAddress[0].district ||
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
