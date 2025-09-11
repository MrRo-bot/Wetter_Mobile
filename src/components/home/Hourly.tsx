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
import { router } from "expo-router";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";

const Hourly = () => {
  let theme = useColorScheme();

  const { weather } = weatherStore();

  const { hourly, hourly_units: units, current } = weather;

  const currentTimeIndex = hourly?.time?.indexOf(
    current?.time && closestTimestamp(current?.time, hourly?.time)
  );

  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const index = currentTimeIndex + i;
    const weatherCode = hourly?.weather_code[index];

    return {
      id: i,
      currentTemp: `${valRound(hourly?.temperature_2m[index])}°c`,
      precipitation: `${hourly?.precipitation_probability[index]}${units?.precipitation_probability}`,
      weatherIcon: weatherIconFind(weatherCode),
      weatherCode,
      weatherMain: weatherCodeConv(weatherCode),
      windSpeed: `${valRound(hourly?.wind_speed_10m[index])} ${units?.wind_speed_10m}`,
      wind: degConv(hourly?.wind_direction_10m[index]).cardinal,
      windDirection: degConv(hourly?.wind_direction_10m[index]).rotationDeg,
      hourStamp: unixConv?.timeStamp(
        new Date(hourly?.time[index]).getTime() / 1000
      ).hour2,
    };
  });

  return (
    <View
      style={
        theme === "dark"
          ? {
              shadowColor: "#fff",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }
          : {
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }
      }
      className={`relative overflow-hidden py-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-purpleDark" : "bg-purpleLight"}`}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View hourly weather details"
        accessibilityHint="Navigates to weather forecast for next 48 hours"
        onPress={() => router.navigate("/(home)/Hours")}
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-dark/50" : "bg-light/50"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          HOURLY
        </Text>
        <View className="absolute -translate-y-1/2 right-5 top-1/2">
          <Entypo
            accessibilityLabel="Arrow indicating navigation"
            accessibilityRole="image"
            className="rotate-45"
            name="direction"
            size={16}
            color={theme === "dark" ? "violet" : "purple"}
          />
        </View>
      </Pressable>
      <View className="px-1 mt-6">
        <FlatList
          accessibilityLabel="Hourly weather forecast for the next 24 hours"
          accessibilityHint="Scroll horizontally to view weather for each hour"
          accessibilityRole="list"
          ItemSeparatorComponent={() => <View className="p-1" />}
          data={hourlyData?.slice(0, 24)}
          horizontal={true}
          renderItem={({ item }: { item: HourlyWeatherObjectType }) => {
            let iconKey;
            iconKey =
              !item?.weatherIcon || item?.weatherIcon === "default"
                ? (iconKey = "default")
                : Array.isArray(item?.weatherIcon)
                  ? item?.weatherCode === 0
                    ? item?.weatherIcon[0]
                    : item?.weatherIcon[1]
                  : item?.weatherIcon;

            let icon =
              images[iconKey as keyof WeatherIconsType] || images.default;

            let altText = item?.weatherMain;

            return (
              <View
                accessibilityRole="list"
                accessibilityLabel={`Weather at ${item?.hourStamp?.toLowerCase()}: ${item?.currentTemp}, ${item?.weatherMain}, ${item?.precipitation} precipitation, wind ${item?.windSpeed} from ${item?.wind}`}
                key={item?.id}
                className={` items-center rounded-2xl justify-between py-1 px-3 ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
              >
                <Text className={`font-genos-medium text-2xl`}>
                  {item?.currentTemp ?? "..."}
                </Text>
                <Text
                  className={`font-orbitron-semiBold  text-sky-600/70 mt-1`}
                >
                  {item?.precipitation ?? "..."}
                </Text>
                <Image
                  accessibilityLabel={item?.weatherMain ?? "Weather icon"}
                  accessibilityRole="image"
                  cachePolicy={"memory-disk"}
                  transition={1000}
                  contentFit="cover"
                  style={{ width: 48, height: 48, marginBlock: 7 }}
                  source={icon}
                  alt={altText}
                />
                <Text className={`font-orbitron-regular text-xs mt-1`}>
                  {item?.windSpeed ?? "..."}
                </Text>
                <Image
                  accessibilityLabel={`Wind direction: ${item?.wind}`}
                  accessibilityRole="image"
                  cachePolicy={"memory-disk"}
                  transition={1000}
                  contentFit="cover"
                  style={{
                    transform: `rotate(${item?.windDirection ?? 0}deg)`,
                    width: 16,
                    height: 16,
                    marginBlock: 7,
                  }}
                  source={images.direction}
                  alt="wind direction"
                />
                <Text className={`font-orbitron-semiBold text-sm mt-1`}>
                  {item?.hourStamp?.toLowerCase() ?? "..."}
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
