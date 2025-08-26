import images from "@/src/constants/images";
import { aqiStore } from "@/src/store/aqiStore";
import { AQIHourlyType } from "@/src/types/types";
import { aqiDesc } from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Text, useColorScheme, View } from "react-native";

const AirQuality = () => {
  let theme = useColorScheme();
  const { aqi } = aqiStore();
  const aqiIndex = aqi?.current.us_aqi;
  const aqiObject = aqiDesc(aqiIndex);

  const aqiForecast: {
    day1: AQIHourlyType[];
    day2: AQIHourlyType[];
    day3: AQIHourlyType[];
    day4: AQIHourlyType[];
    day5: AQIHourlyType[];
    day6: AQIHourlyType[];
    day7: AQIHourlyType[];
  } = {
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
    day6: [],
    day7: [],
  };

  for (let i = 1; i <= 7; i++) {
    const start = (i - 1) * 24;
    const end = i * 24;
    aqiForecast[`day${i}`] = {
      us_aqi: aqi?.hourly.us_aqi.slice(start, end),
      carbon_monoxide: aqi?.hourly.carbon_monoxide.slice(start, end),
      nitrogen_dioxide: aqi?.hourly.nitrogen_dioxide.slice(start, end),
      ozone: aqi?.hourly.ozone.slice(start, end),
      pm10: aqi?.hourly.pm10.slice(start, end),
      pm2_5: aqi?.hourly.pm2_5.slice(start, end),
      sulphur_dioxide: aqi?.hourly.sulphur_dioxide.slice(start, end),
      time: aqi?.hourly.time.slice(start, end),
    };
  }

  const aqiData = {
    level: aqiObject?.level,
    desc: aqiObject?.desc,
    seekBar:
      aqiIndex <= 50
        ? (aqiIndex / 5) * 1.285
        : aqiIndex <= 100
          ? (aqiIndex / 5) * 1.185
          : aqiIndex <= 150
            ? (aqiIndex / 5) * 1.115
            : aqiIndex <= 200
              ? (aqiIndex / 5) * 1.105
              : aqiIndex <= 300
                ? (aqiIndex / 5) * 1.065
                : aqiIndex <= 400
                  ? aqiIndex / 5
                  : aqiIndex < 500
                    ? aqiIndex / 5
                    : 96,
    color: aqiObject?.color,
  };

  const aqiLevelColor =
    aqiData?.color === "green"
      ? "text-green"
      : aqiData?.color === "yellow"
        ? "text-yellow"
        : aqiData?.color === "orange"
          ? "text-orange"
          : aqiData?.color === "red"
            ? "text-red"
            : aqiData?.color === "purple"
              ? "text-purple"
              : aqiData?.color === "maroon"
                ? "text-maroon"
                : "text-dark/50";

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
      className={`relative overflow-hidden py-4 pt-10 px-2 mx-3 rounded-2xl ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-light/10" : "bg-dark/10"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          AIR QUALITY
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
      <View className="gap-4 mt-4">
        <Text
          className={`text-4xl leading-none font-orbitron-medium ${aqiLevelColor}`}
        >
          {aqiIndex}
        </Text>
        <View>
          <Text
            className={`text-lg font-orbitron-bold ${theme === "dark" ? "text-light/80" : "text-dark/80"}`}
          >
            {aqiData?.level}
          </Text>
          <Text
            className={`text-xl leading-none mt-2 font-genos-medium ${theme === "dark" ? "text-light/50" : "text-dark/50"}`}
          >
            {aqiData?.desc}
          </Text>
        </View>
      </View>
      <View className="gap-1 mt-2">
        <View className="flex-row mx-auto">
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            0
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            50
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            100
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            150
          </Text>
          <Text
            className={`text-xs w-[20%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            200
          </Text>
          <Text
            className={`text-xs w-[30%] font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            300
          </Text>
          <Text
            className={`text-xs font-genos-semiBold ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            500
          </Text>
        </View>
        <View className="relative w-full h-2 rounded-md">
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={images.aqi_meter}
          />
          <View
            style={{ left: `${aqiData?.seekBar}%` }}
            className={`absolute w-2.5 h-2.5 rounded-full ${theme === "dark" ? "bg-light" : "bg-black"}`}
          ></View>
        </View>
        <View className="flex-row justify-between">
          <Text
            className={`font-genos-medium ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            Good
          </Text>
          <Text
            className={`font-genos-medium ${theme === "dark" ? "text-light/70" : "text-dark/70"}`}
          >
            Hazardous
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AirQuality;
