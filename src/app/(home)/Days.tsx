import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { DailyWeatherObjectType, WeatherIconsType } from "@/src/types/types";
import {
  degConv,
  unixConv,
  valRound,
  weatherCodeConv,
  weatherIconFind,
} from "@/src/utils/math";
import { Image } from "expo-image";
import { FlatList, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Days = () => {
  let theme = useColorScheme();
  let { weather } = weatherStore();

  const { daily, daily_units: units } = weather;

  const dailyDataFull = Array.from({ length: 16 }, (_, i) => {
    const weatherCode = daily?.weather_code[i];

    return {
      id: i,
      maxTemp: `${valRound(daily?.temperature_2m_max[i])}°c`,
      minTemp: `${valRound(daily?.temperature_2m_min[i])}°c`,
      weatherCode,
      weatherIcon: weatherIconFind(weatherCode),
      precipitation:
        daily?.precipitation_probability_max[i] === null
          ? "0%"
          : `${daily?.precipitation_probability_max[i]}${units?.precipitation_probability_max}`,
      windSpeed: `${valRound(daily?.wind_speed_10m_max[i])} ${units?.wind_speed_10m_max}`,
      windDirection: degConv(daily?.winddirection_10m_dominant[i]).rotationDeg,
      dateStamp: `${
        unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).day
      }, ${unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).month} ${
        unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).date
      }`.toUpperCase(),
      weatherMain: weatherCodeConv(weatherCode),
      hourStamp: unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000)
        .hour2,
      sunrise: unixConv.timeStamp(new Date(daily?.sunrise[i]).getTime() / 1000)
        .clockTime,
      sunset: unixConv.timeStamp(new Date(daily?.sunset[i]).getTime() / 1000)
        .clockTime,
      daylightDuration: `${valRound(daily?.daylight_duration[i] / 60 / 60)} hours`,
      surfacePressure: `${valRound(daily?.surface_pressure_mean[i])} ${units?.surface_pressure_mean}`,
      shortwaveRadiation: `${valRound(daily?.shortwave_radiation_sum[i])} ${units?.shortwave_radiation_sum}`,
      uvIndex: `${valRound(daily?.uv_index_max[i])} ${units?.uv_index_max}`,
      summary: `${weatherCodeConv(weatherCode)}. Wind ${degConv(
        daily?.winddirection_10m_dominant[i]
      ).cardinal?.toLowerCase()} at ${
        valRound(daily?.wind_speed_10m_max[i]) + " " + units?.wind_speed_10m_max
      }. Gusts around ${
        valRound(daily?.wind_gusts_10m_max[i]) + " " + units?.wind_gusts_10m_max
      }. ${
        daily?.precipitation_probability_max[i] === null ||
        daily?.precipitation_probability_max[i] === 0
          ? ""
          : `Chance of precipitation ${daily?.precipitation_probability_max[i]}${units?.precipitation_probability_max}`
      } around ${
        daily?.precipitation_sum[i] > 0
          ? daily?.precipitation_sum[i] + " " + units?.precipitation_sum
          : ""
      }.`,
    };
  });

  return (
    <SafeAreaView
      className={`${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <FlatList
        data={dailyDataFull}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: DailyWeatherObjectType }) => {
          const getIconKey = (
            weatherIcon: string | string[],
            weatherCode: number
          ) => {
            if (!weatherIcon || weatherIcon === "default") return "default";
            return Array.isArray(weatherIcon)
              ? weatherIcon[weatherCode === 0 ? 0 : 1]
              : weatherIcon;
          };

          const iconKey = getIconKey(item.weatherIcon, item.weatherCode);

          let icon =
            images[iconKey as keyof WeatherIconsType] || images.default;

          let altText = item?.weatherMain;

          const TEXT_SHADOW_DARK_ONLY = {
            textShadowColor: "dark",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          };

          const TEXT_SHADOW = {
            textShadowColor: theme === "dark" ? "white" : "dark",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          };

          return (
            <View
              className={`mx-4 p-2 justify-start rounded-2xl gap-3 ${theme === "dark" ? "bg-redDark" : "bg-redLight/20"}`}
            >
              <View className="flex-row items-center justify-start gap-4">
                <View className="w-2/12">
                  <View className="p-2 mx-auto rounded-2xl max-w-max max-h-max bg-dark/10">
                    <Image
                      cachePolicy={"memory-disk"}
                      transition={1000}
                      contentFit="cover"
                      style={{ width: 40, height: 40 }}
                      source={icon}
                      alt={altText}
                    />
                  </View>
                </View>

                <View className="justify-center w-10/12 gap-1">
                  <Text
                    style={TEXT_SHADOW_DARK_ONLY}
                    className={`font-orbitron-medium tracking-tighter ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                  >
                    {item?.dateStamp ?? "..."}
                  </Text>
                  <View className="flex-row gap-1">
                    <Text
                      style={TEXT_SHADOW_DARK_ONLY}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                    >
                      {item?.maxTemp ?? "..."}
                    </Text>
                    <Text
                      style={TEXT_SHADOW_DARK_ONLY}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                    >
                      {" "}
                      /{" "}
                    </Text>
                    <Text
                      style={TEXT_SHADOW_DARK_ONLY}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                    >
                      {item?.minTemp ?? "..."}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-start justify-start gap-4">
                <View className="w-2/12">
                  <Text
                    style={TEXT_SHADOW_DARK_ONLY}
                    className={`text-sm text-center font-orbitron-semiBold ${theme === "dark" ? "text-blue-200" : "text-blue-600"}`}
                  >
                    {item?.precipitation ?? "..."}
                  </Text>
                  <View className="mx-auto mt-1">
                    <Image
                      cachePolicy={"memory-disk"}
                      transition={1000}
                      style={{ marginInline: "auto", width: 32, height: 32 }}
                      source={images.sunrise}
                      alt={altText}
                    />
                    <Text
                      style={TEXT_SHADOW_DARK_ONLY}
                      className={`font-genos-semiBold ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                    >
                      {item?.sunrise ?? "..."}
                    </Text>
                  </View>
                  <View className="mx-auto mt-1">
                    <Image
                      cachePolicy={"memory-disk"}
                      transition={1000}
                      style={{ marginInline: "auto", width: 32, height: 32 }}
                      source={images.sunset}
                      alt={altText}
                    />
                    <Text
                      style={TEXT_SHADOW_DARK_ONLY}
                      className={`font-genos-semiBold ${theme === "dark" ? "text-light" : "text-pink-600"}`}
                    >
                      {item?.sunset ?? "..."}
                    </Text>
                  </View>
                </View>
                <View className="w-10/12 max-w-72">
                  <Text
                    className={`text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    {item?.summary ?? "..."}
                  </Text>
                  <Text
                    className={`text-lg text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Daylight :{" "}
                    <Text
                      style={TEXT_SHADOW}
                      className="text-sm font-orbitron-regular"
                    >
                      {item?.daylightDuration ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Radiation :{" "}
                    <Text
                      style={TEXT_SHADOW}
                      className="text-sm font-orbitron-regular"
                    >
                      {item?.shortwaveRadiation ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    UV Index :{" "}
                    <Text
                      style={TEXT_SHADOW}
                      className="text-sm font-orbitron-regular"
                    >
                      {item?.uvIndex ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Pressure :{" "}
                    <Text
                      style={TEXT_SHADOW}
                      className="text-sm font-orbitron-regular"
                    >
                      {item?.surfacePressure ?? "..."}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
        maxToRenderPerBatch={3}
        windowSize={5}
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-3" />}
      />
    </SafeAreaView>
  );
};

export default Days;
