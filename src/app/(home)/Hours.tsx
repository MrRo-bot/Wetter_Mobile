import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { HourlyWeatherObjectType, WeatherIconsType } from "@/src/types/types";
import {
  closestTimestamp,
  degConv,
  lenAndSpdConv,
  unixConv,
  valRound,
  weatherCodeConv,
  weatherIconFind,
} from "@/src/utils/math";
import { Image } from "expo-image";
import { FlatList, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Hours = () => {
  const theme = useColorScheme();

  const { weather } = weatherStore();

  const { hourly, hourly_units: units, current } = weather;

  const currentTimeIndex = hourly?.time.indexOf(
    current?.time && closestTimestamp(current?.time, hourly?.time)
  );

  const hourlyDataFull = Array.from({ length: 47 }, (_, i) => {
    const index = currentTimeIndex + i;
    const weatherCode = hourly?.weather_code[index];

    return {
      id: i,
      currentTemp: `${valRound(hourly?.temperature_2m[index])}°c`,
      precipitation: `${hourly?.precipitation_probability[index]}${units?.precipitation_probability}`,
      precipitationAmount: `${hourly?.precipitation[index]} ${units?.precipitation}`,
      visibility: `${lenAndSpdConv.km(hourly?.visibility[index])} km`,
      uvIndex: `${valRound(hourly?.uv_index[index])}`,
      pressure: `${valRound(hourly?.surface_pressure[index])} ${units?.surface_pressure}`,
      soilTemp: `${valRound(hourly?.soil_temperature_0cm[index])}${units?.soil_temperature_0cm}`,
      radiation: `${valRound(hourly?.direct_normal_irradiance[index])} ${units?.direct_normal_irradiance}`,
      weatherIcon: weatherIconFind(weatherCode),
      weatherCode,
      weatherMain: weatherCodeConv(weatherCode),
      windSpeed: `${valRound(hourly?.wind_speed_10m[index])} ${units?.wind_speed_10m}`,
      wind: degConv(hourly?.wind_direction_10m[index]).cardinal,
      windDirection: degConv(hourly?.wind_direction_10m[index]).rotationDeg,
      hourStamp: unixConv?.timeStamp(
        new Date(hourly?.time[index]).getTime() / 1000
      ).hour2,
      feels_like: `${valRound(
        hourly?.temperature_2m[index]
      )}°c - Feels Like: ${valRound(hourly?.apparent_temperature[index])}°c`,
      gust: `${valRound(hourly?.wind_gusts_10m[index])} ${units?.wind_gusts_10m}`,
      clouds: `${hourly?.cloud_cover[index]}${units?.cloud_cover}`,
      humidity: `${hourly?.relative_humidity_2m[index]}${units?.relative_humidity_2m}`,
      dewPoint: `${valRound(hourly?.dew_point_2m[index])}°`,
      is_day: hourly?.is_day[index],
    };
  });
  return (
    <SafeAreaView
      className={`${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <FlatList
        data={hourlyDataFull}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: HourlyWeatherObjectType }) => {
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

          return (
            <View
              className={`mx-4 p-2 justify-start rounded-2xl gap-6 ${theme === "dark" ? "bg-purpleDark" : "bg-purpleLight/20"}`}
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

                <View
                  className={`relative w-9/12 font-orbitron-bold ${theme === "dark" ? "text-light" : "text-violet-800"}`}
                >
                  <Text
                    style={{
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 6,
                    }}
                    className={`font-orbitron-medium ${theme === "dark" ? "text-light" : "text-violet-800"}`}
                  >
                    {item?.hourStamp ?? "..."}
                  </Text>
                  <Text
                    style={{
                      textShadowOffset: { width: 0, height: 2 },
                      textShadowRadius: 6,
                    }}
                    className={`font-orbitron-medium ${theme === "dark" ? "text-light" : "text-violet-800"}`}
                  >
                    {item?.feels_like ?? "..."}
                  </Text>
                  <Text
                    className={`absolute -bottom-[26px] text-lg font-genos-medium ${theme === "dark" ? "text-light/90" : "text-dark/50"}`}
                  >
                    {item?.weatherMain ?? "..."}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start justify-start gap-4">
                <Text
                  style={{
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 6,
                  }}
                  className={`w-2/12 text-sm text-center font-orbitron-semiBold ${theme === "dark" ? "text-blue-200" : "text-blue-600"}`}
                >
                  {item?.precipitation ?? "..."}
                </Text>

                <View className="w-10/12">
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Wind -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.windSpeed ?? "..."}
                    </Text>{" "}
                    • {item?.wind ?? "..."}
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Gust -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.gust ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Clouds -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.clouds ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Humidity -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.humidity ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Rain -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.precipitationAmount ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Visibility -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.visibility ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Uv index -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.uvIndex ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Pressure -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.pressure ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Ground temp -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.soilTemp ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Radiation -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800 "}`}
                    >
                      {item?.radiation ?? "..."}
                    </Text>
                  </Text>
                  <Text
                    className={`text-lg leading-none text-left font-genos-medium ${theme === "dark" ? "text-light/90" : "text-slate-800/70"}`}
                  >
                    Dew point -{" "}
                    <Text
                      style={{
                        textShadowColor: theme === "dark" ? "white" : "dark",
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 8,
                      }}
                      className={`text-sm font-orbitron-regular ${theme === "dark" ? "text-light" : "text-violet-800"}`}
                    >
                      {item?.dewPoint ?? "..."}
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

export default Hours;
