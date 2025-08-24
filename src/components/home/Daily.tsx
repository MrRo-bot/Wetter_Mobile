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
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { FlatList, Text, useColorScheme, View } from "react-native";

const Daily = () => {
  let theme = useColorScheme();
  let { weather } = weatherStore();

  let listOfDailyData = [];

  // next 16 days
  for (let i = 0; i <= 15; i++) {
    listOfDailyData.push({
      id: i,
      sunrise: unixConv.timeStamp(
        new Date(weather?.daily.sunrise[i]).getTime() / 1000
      ).clockTime,
      sunset: unixConv.timeStamp(
        new Date(weather?.daily.sunset[i]).getTime() / 1000
      ).clockTime,
      summary: `${weatherCodeConv(
        weather?.daily.weather_code[i]
      )}. Wind ${degConv(
        weather?.daily.winddirection_10m_dominant[i]
      ).cardinal.toLowerCase()} at ${
        valRound(weather?.daily.wind_speed_10m_max[i]) +
        " " +
        weather?.daily_units.wind_speed_10m_max
      }${
        weather?.daily.precipitation_probability_max[i] === null ||
        weather?.daily.precipitation_probability_max[i] === 0
          ? ""
          : `. Chance of precipitation ${weather?.daily.precipitation_probability_max[i]}${weather?.daily_units.precipitation_probability_max}`
      } around ${
        weather?.daily.precipitation_sum[i] > 0
          ? weather?.daily.precipitation_sum[i] +
            weather?.daily_units.precipitation_sum
          : ""
      }`,
      maxTemp: valRound(weather?.daily.temperature_2m_max[i]) + "°",
      minTemp: valRound(weather?.daily.temperature_2m_min[i]) + "°",
      precipitation:
        weather?.daily.precipitation_probability_max[i] === null
          ? "0%"
          : weather?.daily.precipitation_probability_max[i] +
            weather?.daily_units.precipitation_probability_max,
      weatherCode: weather?.daily.weather_code[i],
      weatherIcon: weatherIconFind(weather?.daily.weather_code[i]),
      weatherMain: weatherCodeConv(weather?.daily.weather_code[i]),
      windSpeed:
        valRound(weather?.daily.wind_speed_10m_max[i]) +
        " " +
        weather?.daily_units.wind_speed_10m_max,
      windDirection: degConv(weather?.daily.winddirection_10m_dominant[i])
        .rotationDeg,
      hourStamp: unixConv.timeStamp(
        new Date(weather?.daily.time[i]).getTime() / 1000
      ).hour2,

      dateStamp: `${
        unixConv.timeStamp(new Date(weather?.daily.time[i]).getTime() / 1000)
          .day
      }, ${unixConv.timeStamp(new Date(weather?.daily.time[i]).getTime() / 1000).month} ${
        unixConv.timeStamp(new Date(weather?.daily.time[i]).getTime() / 1000)
          .date
      }`.toUpperCase(),
    });
  }

  return (
    <View
      className={`relative overflow-hidden py-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-redDark" : "bg-redLight"}`}
    >
      <View
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-dark/50" : "bg-white/50"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light " : "text-dark "}`}
        >
          DAILY
        </Text>
        <View className="absolute -translate-y-1/2 right-5 top-1/2">
          <Entypo
            className="rotate-45"
            name="direction"
            size={16}
            color={theme === "dark" ? "white" : "black"}
          />
        </View>
      </View>
      <View className="px-1 mt-6">
        <FlatList
          ItemSeparatorComponent={() => <View className="p-1" />}
          data={listOfDailyData.slice(0, 8)}
          horizontal={true}
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
                className={`items-center rounded-2xl py-1 px-3  ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
              >
                <Text className={`font-genos-medium text-3xl`}>
                  {item.maxTemp}
                </Text>
                <Text className={`font-genos-medium text-3xl`}>
                  {item.minTemp}
                </Text>

                <Text
                  className={`font-orbitron-semiBold  text-sky-600/70 mt-1`}
                >
                  {item.precipitation}
                </Text>
                <Image
                  contentFit="cover"
                  style={{ width: 48, height: 48, marginBlock: 7 }}
                  source={icon}
                  alt={altText}
                />
                <Text className={`font-orbitron-regular text-xs mt-1`}>
                  {item.windSpeed}
                </Text>
                <Image
                  contentFit="cover"
                  style={{
                    transform: `rotate(${item.windDirection}deg)`,
                    width: 16,
                    height: 16,
                    marginBlock: 7,
                  }}
                  source={images.direction}
                  alt="wind direction"
                />
                <Text className={`font-orbitron-semiBold mt-1`}>
                  {item.dateStamp.slice(0, 3)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Daily;
