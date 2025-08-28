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
import { Image } from "expo-image";
import { FlatList, Text, useColorScheme, View } from "react-native";

const Hours = () => {
  const theme = useColorScheme();
  const { weather } = weatherStore();

  const { hourly, hourly_units: units, current } = weather;

  const currentTimeIndex = hourly?.time.indexOf(
    closestTimestamp(current?.time, hourly?.time)
  );

  const hourlyDataFull = Array.from({ length: 47 }, (_, i) => {
    const index = currentTimeIndex + i;
    const weatherCode = hourly?.weather_code[index];

    return {
      id: i,
      currentTemp: valRound(hourly?.temperature_2m[index]) + "°",
      precipitation:
        hourly?.precipitation_probability[index] +
        units?.precipitation_probability,
      weatherIcon: weatherIconFind(weatherCode),
      weatherCode,
      weatherMain: weatherCodeConv(weatherCode),
      windSpeed:
        valRound(hourly?.wind_speed_10m[index]) + " " + units?.wind_speed_10m,
      wind: degConv(hourly?.wind_direction_10m[index]).cardinal,
      windDirection: degConv(hourly?.wind_direction_10m[index]).rotationDeg,
      hourStamp: unixConv?.timeStamp(
        new Date(hourly?.time[index]).getTime() / 1000
      ).hour2,

      feels_like: `${valRound(
        hourly?.temperature_2m[index]
      )}° - Feels Like: ${valRound(hourly?.apparent_temperature[index])}°`,
      gust:
        valRound(hourly?.wind_gusts_10m[index]) + " " + units?.wind_gusts_10m,
      clouds: hourly?.cloud_cover[index] + units?.cloud_cover,
      humidity:
        hourly?.relative_humidity_2m[index] + units?.relative_humidity_2m,
      dewPoint: valRound(hourly?.dew_point_2m[index]) + "°",
      is_day: hourly?.is_day[index],
    };
  });
  return (
    <View className={`${theme === "dark" ? "bg-black" : "bg-light"}`}>
      <FlatList
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-4" />}
        data={hourlyDataFull}
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

          console.log(item);

          return (
            <View
              key={item.id}
              className={`mx-4 p-2 justify-start rounded-2xl gap-6 ${theme === "dark" ? "bg-purpleDark" : "bg-purpleLight/50"}`}
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

                <View
                  className={`relative w-9/12 font-orbitron-bold ${theme === "dark" ? "text-white" : "text-violet-800"}`}
                >
                  <Text
                    style={{
                      textShadowColor:
                        theme === "dark" ? "text-white" : "text-violet-800",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 6,
                    }}
                    className={`font-orbitron-medium ${theme === "dark" ? "text-white" : "text-violet-800"}`}
                  >
                    {item.hourStamp}
                  </Text>
                  <Text
                    style={{
                      textShadowColor:
                        theme === "dark" ? "text-white" : "text-violet-800",
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 6,
                    }}
                    className={`font-orbitron-medium ${theme === "dark" ? "text-white" : "text-violet-800"}`}
                  >
                    {item.feels_like}
                  </Text>
                  <Text
                    className={`absolute -bottom-[26px] text-lg font-genos-medium ${theme === "dark" ? "text-white/90" : "text-dark/50"}`}
                  >
                    {item.weatherMain}
                  </Text>
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

                <View className="w-10/12">
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                  >
                    Wind: {item.windSpeed} • {item.wind}
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                  >
                    Gust: {item.gust}
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                  >
                    Clouds: {item.clouds}
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                  >
                    Humidity: {item.humidity}
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-white/70" : "text-slate-800/70"}`}
                  >
                    Dew point: {item.dewPoint}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Hours;
