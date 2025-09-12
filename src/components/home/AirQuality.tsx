import images from "@/src/constants/images";
import { aqiStore } from "@/src/store/aqiStore";
import { aqiDesc, aqiDetailColors } from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";

const AirQuality = () => {
  let theme = useColorScheme();

  const { aqi } = aqiStore();

  const aqiIndex = aqi?.current?.us_aqi;
  const aqiObject = aqiDesc(aqiIndex);

  const aqiDetail = [
    { title: "PM2.5", value: aqi?.current?.pm2_5 },
    { title: "PM10", value: aqi?.current?.pm10 },
    { title: "O3", value: aqi?.current?.ozone },
    { title: "CO", value: aqi?.current?.carbon_monoxide },
    { title: "SO2", value: aqi?.current?.sulphur_dioxide },
    { title: "NO2", value: aqi?.current?.nitrogen_dioxide },
  ];

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

  const AQI_COLORS: {
    green: string;
    yellow: string;
    orange: string;
    red: string;
    purple: string;
    maroon: string;
    default: string;
    [key: string]: string;
  } = {
    green: "text-green",
    yellow: "text-yellow",
    orange: "text-orange",
    red: "text-red",
    purple: "text-purple",
    maroon: "text-maroon",
    default: "text-dark/50",
  };

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
      className={`relative overflow-hidden py-4 pt-10 px-2 mx-3 rounded-2xl ${theme === "dark" ? "bg-blueDark" : "bg-blueLight"}`}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View aqi charts"
        accessibilityHint="Navigates to charts page for visualisation of aqi data"
        onPress={() => router.navigate("/(home)/Aqi")}
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-slate-600/50" : "bg-light/70"}`}
      >
        <Text
          className={`font-orbitron-bold -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          AIR QUALITY
        </Text>
        <View className="absolute -translate-y-1/2 right-5 top-1/2">
          <Entypo
            accessibilityLabel="Arrow indicating navigation"
            accessibilityRole="image"
            className="rotate-45"
            name="direction"
            size={16}
            color={theme === "dark" ? "navy" : "slateblue"}
          />
        </View>
      </Pressable>
      <View
        accessibilityRole="list"
        accessibilityLabel="Air quality pollutant details"
        className="flex-row flex-wrap items-center justify-between mt-4 gap-y-2"
      >
        {aqiDetail.map((detail) => {
          const colorObj = aqiDetailColors(detail);
          return (
            <View
              accessibilityLabel={`${detail.title}: ${detail.value ?? "unknown"}`}
              key={detail.title}
              style={{
                backgroundColor: colorObj.bgColor,
              }}
              className={`w-[32%] items-center justify-center p-2 rounded-md`}
            >
              <Text
                style={{ color: colorObj.textColor }}
                className={`mt-1 leading-none font-orbitron-bold`}
                accessibilityLabel={`${detail.title ?? "N/A"}`}
              >
                {detail.title ?? "..."}
              </Text>
              <Text
                style={{ color: colorObj.textColor }}
                className={`mt-2 text-2xl leading-none font-genos-regular `}
                accessibilityLabel={`${detail.value ?? "N/A"}`}
              >
                {detail.value ?? "..."}
              </Text>
            </View>
          );
        })}
      </View>
      <View className="flex-row items-center justify-start gap-4 mt-4">
        <View
          className={`p-1 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-900"}`}
        >
          <Text
            className={`${aqiIndex >= 200 ? "text-3xl" : "text-5xl"} leading-none font-orbitron-medium ${AQI_COLORS[aqiData.color as string]}`}
          >
            {aqiIndex ?? "..."}
          </Text>
        </View>
        <View className="w-9/12">
          <Text
            accessibilityLabel={
              aqiData?.level
                ? `AQI level: ${aqiData.level}`
                : "AQI level: data unavailable"
            }
            className={`text-lg font-orbitron-bold ${theme === "dark" ? "text-slate-500" : "text-dark"}`}
          >
            {aqiData?.level ?? "..."}
          </Text>
          <Text
            className={`text-lg tracking-tighter leading-none mt-2 font-genos-medium ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            {aqiData?.desc ?? "..."}
          </Text>
        </View>
      </View>
      <View className="gap-1 mt-2">
        <View className="flex-row mx-auto">
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            0
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            50
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            100
          </Text>
          <Text
            className={`text-xs w-[10%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            150
          </Text>
          <Text
            className={`text-xs w-[20%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            200
          </Text>
          <Text
            className={`text-xs w-[30%] font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            300
          </Text>
          <Text
            className={`text-xs font-genos-semiBold ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            500
          </Text>
        </View>
        <View className="relative w-full h-2 rounded-md">
          <Image
            accessibilityLabel={`Air Quality Index meter showing ${aqiIndex ?? "unknown"}`}
            style={{
              width: "100%",
              height: "100%",
            }}
            source={images.aqi_meter}
          />
          <Text
            accessibilityLabel={`AQI meter position: ${aqiData?.seekBar ? Math.round(aqiData.seekBar) : "unknown"} percent`}
            className="sr-only"
          >
            AQI meter position:{" "}
            {aqiData?.seekBar ? Math.round(aqiData.seekBar) : "unknown"}%
          </Text>
          <View
            style={{ left: `${aqiData?.seekBar}%` }}
            className={`absolute w-2.5 h-2.5 rounded-full ${theme === "dark" ? "bg-light" : "bg-dark"}`}
          ></View>
        </View>
        <View className="flex-row justify-between">
          <Text
            className={`font-genos-medium ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            Good
          </Text>
          <Text
            className={`font-genos-medium ${theme === "dark" ? "text-slate-500" : "text-slate-700"}`}
          >
            Hazardous
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AirQuality;
