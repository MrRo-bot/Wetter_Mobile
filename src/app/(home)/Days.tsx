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

const Days = () => {
  let theme = useColorScheme();
  let { weather } = weatherStore();

  const { daily, daily_units: units } = weather;

  // next 16 days
  const dailyDataFull = Array.from({ length: 16 }, (_, i) => {
    const weatherCode = daily?.weather_code[i];

    return {
      id: i,
      maxTemp: valRound(daily?.temperature_2m_max[i]) + "°",
      minTemp: valRound(daily?.temperature_2m_min[i]) + "°",
      weatherCode,
      weatherIcon: weatherIconFind(weatherCode),
      precipitation:
        daily?.precipitation_probability_max[i] === null
          ? "0%"
          : daily?.precipitation_probability_max[i] +
            units?.precipitation_probability_max,
      windSpeed:
        valRound(daily?.wind_speed_10m_max[i]) +
        " " +
        units?.wind_speed_10m_max,
      windDirection: degConv(daily?.winddirection_10m_dominant[i]).rotationDeg,
      dateStamp: `${
        unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).day
      }, ${unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).month} ${
        unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000).date
      }`.toUpperCase(),

      sunrise: unixConv.timeStamp(new Date(daily?.sunrise[i]).getTime() / 1000)
        .clockTime,
      sunset: unixConv.timeStamp(new Date(daily?.sunset[i]).getTime() / 1000)
        .clockTime,
      summary: `${weatherCodeConv(weatherCode)}. Wind ${degConv(
        daily?.winddirection_10m_dominant[i]
      ).cardinal.toLowerCase()} at ${
        valRound(daily?.wind_speed_10m_max[i]) + " " + units?.wind_speed_10m_max
      }${
        daily?.precipitation_probability_max[i] === null ||
        daily?.precipitation_probability_max[i] === 0
          ? ""
          : `. Chance of precipitation ${daily?.precipitation_probability_max[i]}${units?.precipitation_probability_max}`
      } around ${
        daily?.precipitation_sum[i] > 0
          ? daily?.precipitation_sum[i] + " " + units?.precipitation_sum
          : ""
      }.`,
      weatherMain: weatherCodeConv(weatherCode),
      hourStamp: unixConv.timeStamp(new Date(daily?.time[i]).getTime() / 1000)
        .hour2,
    };
  });

  return (
    <View className={`${theme === "dark" ? "bg-black" : "bg-light"}`}>
      <FlatList
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-4" />}
        data={dailyDataFull}
        renderItem={({ item }: { item: DailyWeatherObjectType }) => {
          let iconKey;
          iconKey =
            !item.weatherIcon || item.weatherIcon === "default"
              ? (iconKey = "default")
              : Array.isArray(item.weatherIcon)
                ? item.weatherCode === 0
                  ? item.weatherIcon[0]
                  : item.weatherIcon[1]
                : item.weatherIcon;

          let icon =
            images[iconKey as keyof WeatherIconsType] || images.default;

          let altText = item.weatherMain;

          return (
            <View
              key={item.id}
              className={`mx-4 p-2 justify-start rounded-2xl gap-3 ${theme === "dark" ? "bg-redDark" : "bg-redLight/50"}`}
            >
              <View className="flex-row items-center justify-start gap-4">
                <View className="w-2/12">
                  <View className="p-2 mx-auto rounded-2xl max-w-max max-h-max bg-dark/30">
                    <Image
                      contentFit="cover"
                      style={{ width: 40, height: 40 }}
                      source={icon}
                      alt={altText}
                    />
                  </View>
                </View>

                <View className="justify-center w-9/12 gap-1">
                  <Text
                    style={{
                      textShadowColor:
                        theme === "dark" ? "text-white" : "text-rose-800",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 6,
                    }}
                    className={`font-orbitron-medium ${theme === "dark" ? "text-white" : "text-rose-800"}`}
                  >
                    {item.dateStamp}
                  </Text>
                  <View className="flex-row gap-1">
                    <Text
                      style={{
                        textShadowColor:
                          theme === "dark" ? "text-white" : "text-rose-800",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 6,
                      }}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-white" : "text-rose-800"}`}
                    >
                      {item.maxTemp}
                    </Text>
                    <Text
                      style={{
                        textShadowColor:
                          theme === "dark" ? "text-white" : "text-rose-800",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 6,
                      }}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-white" : "text-rose-800"}`}
                    >
                      {" "}
                      /{" "}
                    </Text>
                    <Text
                      style={{
                        textShadowColor:
                          theme === "dark" ? "text-white" : "text-rose-800",
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 6,
                      }}
                      className={`font-orbitron-bold ${theme === "dark" ? "text-white" : "text-rose-800"}`}
                    >
                      {item.minTemp}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex-row items-start justify-start gap-4">
                <Text
                  style={{
                    textShadowColor:
                      theme === "dark" ? "text-blue-200" : "text-blue-600",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 6,
                  }}
                  className={`w-2/12 text-sm text-center font-orbitron-semiBold ${theme === "dark" ? "text-blue-200" : "text-blue-600"}`}
                >
                  {item.precipitation}
                </Text>
                <Text
                  className={`w-10/12 text-left max-w-72 font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                >
                  {item.summary}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Days;
