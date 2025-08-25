import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { locationStore } from "@/src/store/locationStore";
import { weatherStore } from "@/src/store/weatherStore";
import { degConv, unixConv, valRound, weatherCodeConv } from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Text, useColorScheme, View } from "react-native";

const Brief = () => {
  let theme = useColorScheme();
  const { weather } = weatherStore();
  const { locations } = locationStore();

  const weatherCode = weatherCodeConv(weather?.daily?.weather_code[0]);
  const isDay = weather?.current?.is_day;
  const timestring = unixConv.timeStamp(
    new Date(weather?.current?.time).getTime() / 1000
  );

  //getting image based on weather type
  const { imageColorsLoading, imageColorsData, unsplashLoading } =
    useUnsplashImage(weatherCode);

  const imgColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  const windDirection = degConv(weather?.current.wind_direction_10m);
  const windSpeed = `${valRound(weather?.daily.wind_speed_10m_max[0])}${weather?.daily_units.wind_speed_10m_max}`;
  const gustDirection = degConv(weather?.current.wind_gusts_10m);
  const gustSpeed = `${valRound(weather?.daily.wind_gusts_10m_max[0])}${weather?.daily_units.wind_gusts_10m_max}`;
  const precipitationProbability =
    weather?.daily.precipitation_probability_max[0];
  const precipitationUnit = weather?.daily_units.precipitation_probability_max;
  const precipitationSum = weather?.daily.precipitation_sum[0];
  const precipitationSumUnit = weather?.daily_units.precipitation_sum;
  const precipitationText =
    precipitationProbability && precipitationProbability > 0
      ? `. Chance of precipitation ${precipitationProbability}${precipitationUnit}`
      : "";
  const precipitationAmount =
    precipitationSum > 0
      ? ` around ${precipitationSum}${precipitationSumUnit}`
      : "";

  const weatherSummary = `${
    isDay ? "Today" : "Tonight"
  } - ${weatherCode}. Wind ${windDirection.cardinal} at ${windSpeed}. Gusts ${gustDirection.cardinal} at ${gustSpeed}${precipitationText}${precipitationAmount}.`;

  return (
    <View className="gap-2 mx-3 mt-2">
      <View className="w-[calc(100vw-24px)] overflow-hidden h-96 rounded-2xl">
        {imageColorsLoading || unsplashLoading ? (
          <View className={`w-full h-full bg-black/50`} />
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

      <View className="">
        <View className="flex-row flex-wrap items-center my-2">
          <Text
            style={{
              color: imageColorsLoading ? "#11111150" : imgColor,
              textShadowColor: imgColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-regular mr-4 text-5xl`}
          >
            {valRound(weather?.current.temperature_2m)}{" "}
            {weather?.current_units.temperature_2m}
          </Text>

          <Text
            style={{
              color: imageColorsLoading ? "#11111150" : imgColor,
              textShadowColor: imgColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold self-start text-lg`}
          >
            {valRound(weather?.daily.temperature_2m_max[0])}{" "}
            {weather?.daily_units.temperature_2m_max}
          </Text>
          <Text
            style={{
              color: imageColorsLoading ? "#11111150" : imgColor,
              textShadowColor: imgColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold text-lg`}
          >
            /{" "}
          </Text>
          <Text
            style={{
              color: imageColorsLoading ? "#11111150" : imgColor,
              textShadowColor: imgColor,
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 8,
            }}
            className={`font-orbitron-semiBold self-end text-lg`}
          >
            {valRound(weather?.daily.temperature_2m_min[0])}{" "}
            {weather?.daily_units.temperature_2m_min}
          </Text>
        </View>

        <View className="my-2">
          <Text
            className={`text-lg leading-none font-genos-regular uppercase ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {`${timestring?.day?.substring(0, 3)}, ${timestring.month} ${timestring.date}`}
          </Text>
          <Text
            className={`text-4xl leading-none tracking-wider font-genos-medium ${theme === "dark" ? "text-outlineDark" : "text-outlineLight"}`}
          >
            {locations[0].geoAddress[0].district ||
              locations[0].geoAddress[0].city}
          </Text>
          <Text
            className={`text-2xl leading-none font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {weatherCodeConv(weather?.current.weather_code)}
          </Text>
        </View>

        <View className="relative my-2">
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
        </View>
      </View>
    </View>
  );
};

export default Brief;
