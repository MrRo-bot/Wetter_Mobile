import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { HourlyWeatherObjectType, WeatherIconsType } from "@/src/types/types";
import {
  closestTimestamp,
  degConv,
  unixConv,
  valRound,
  weatherCodeConv,
  weatherIconFind,
} from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { FlatList, Text, useColorScheme, View } from "react-native";

const Hourly = () => {
  let theme = useColorScheme();
  const { weather } = weatherStore();

  const currentTimeIndex = weather?.hourly.time.indexOf(
    closestTimestamp(weather?.current.time, weather?.hourly.time)
  );

  let listOfHourlyData = [];

  //next 48 hours
  if (weather?.hourly) {
    for (let i = currentTimeIndex; i <= currentTimeIndex + 47; i++) {
      listOfHourlyData.push({
        id: i,
        currentTemp: valRound(weather?.hourly.temperature_2m[i]) + "°",
        precipitation:
          weather?.hourly.precipitation_probability[i] +
          weather?.hourly_units.precipitation_probability,
        weatherIcon: weatherIconFind(weather?.hourly.weather_code[i]),
        weatherCode: weather?.hourly.weather_code[i],
        weatherMain: weatherCodeConv(weather?.hourly.weather_code[i]),
        windSpeed:
          valRound(weather?.hourly.wind_speed_10m[i]) +
          " " +
          weather?.hourly_units.wind_speed_10m,
        wind: degConv(weather?.hourly.wind_direction_10m[i]).cardinal,
        windDirection: degConv(weather?.hourly.wind_direction_10m[i])
          .rotationDeg,
        hourStamp: unixConv?.timeStamp(
          new Date(weather?.hourly.time[i]).getTime() / 1000
        ).hour2,

        //extra info in hours page route
        feels_like: `${valRound(
          weather?.hourly.temperature_2m[i]
        )}° - Feels Like: ${valRound(weather?.hourly.apparent_temperature[i])}°`,
        gust:
          valRound(weather?.hourly.wind_gusts_10m[i]) +
          " " +
          weather?.hourly_units.wind_gusts_10m,
        clouds:
          weather?.hourly.cloud_cover[i] + weather?.hourly_units.cloud_cover,
        humidity:
          weather?.hourly.relative_humidity_2m[i] +
          weather?.hourly_units.relative_humidity_2m,
        dewPoint: valRound(weather?.hourly.dew_point_2m[i]) + "°",
        is_day: weather?.hourly.is_day[i],
      });
    }
  }

  return (
    <View
      className={`relative overflow-hidden py-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-purpleDark" : "bg-purpleLight"}`}
    >
      <View
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-dark/50" : "bg-white/50"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light " : "text-dark "}`}
        >
          HOURLY
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
          data={listOfHourlyData.slice(0, 24)}
          horizontal={true}
          renderItem={({ item }: { item: HourlyWeatherObjectType }) => {
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
                className={` items-center rounded-2xl justify-between py-1 px-3 ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`} //color first data column to show current hour temperature
              >
                <Text className={`font-genos-medium text-2xl`}>
                  {item.currentTemp}
                </Text>
                <Text
                  className={`font-orbitron-semiBold  text-sky-400/50 mt-1`}
                >
                  {item.precipitation}
                </Text>
                <Image
                  contentFit="cover"
                  style={{ width: 48, height: 48, marginBlock: 7 }}
                  source={icon}
                  alt={altText}
                />
                <Text className={`font-orbitron-regular text-sm mt-2`}>
                  {item.windSpeed}
                </Text>
                <Image
                  contentFit="cover"
                  style={{
                    transform: `rotate(${item.windDirection}deg)`,
                    width: 20,
                    height: 20,
                    marginBlock: 7,
                  }}
                  source={images.direction}
                  alt="wind direction"
                />
                <Text className={`font-orbitron-semiBold`}>
                  {item.hourStamp.toLowerCase()}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Hourly;
