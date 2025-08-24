import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { closestTimestamp, lenAndSpdConv, valRound } from "@/src/utils/math";
import { Image } from "expo-image";
import { Text, useColorScheme, View } from "react-native";

const Detail = () => {
  let theme = useColorScheme();
  const { weather } = weatherStore();
  const currentTimeIndex = weather.hourly.time.indexOf(
    closestTimestamp(weather.current.time, weather.hourly.time)
  );

  const detailObj = [
    {
      icon: images.thermometer,
      heading: "Feels Like",
      data:
        valRound(weather.current.apparent_temperature) +
        weather.current_units.apparent_temperature,
    },
    {
      icon: images.humidity,
      heading: "Humidity",
      data: weather.current.relative_humidity_2m + "%",
    },
    {
      icon: images.uv,
      heading: "UV Index",
      data: weather.daily.uv_index_max[0],
    },
    {
      icon: images.visibility,
      heading: "Visibility",
      data:
        lenAndSpdConv.km(weather.hourly.visibility[currentTimeIndex]) + "km",
    },
    {
      icon: images.pressure,
      heading: "Pressure",
      data:
        valRound(weather.current.surface_pressure) +
        weather.current_units.precipitation,
    },
    {
      icon: images.dew_point,
      heading: "Dew Point",
      data:
        valRound(weather.daily.dew_point_2m_mean[0]) +
        weather.daily_units.dew_point_2m_mean,
    },
  ];

  return (
    <View
      className={`relative overflow-hidden p-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-tealDark" : "bg-tealLight"}`}
    >
      <Text
        className={`absolute h-10 inset-x-0 pl-4 align-middle font-orbitron-semiBold leading-none text-lg  ${theme === "dark" ? "text-light bg-dark/50" : "text-dark bg-white/50"}`}
      >
        DETAIL
      </Text>
      <View className="flex-row flex-wrap items-center justify-between mt-4 gap-y-2">
        {detailObj.map((x) => (
          <View
            key={x.icon}
            className={`w-[32%] items-center justify-center p-2 rounded-2xl ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
          >
            <Image
              contentFit="cover"
              style={{ width: 48, height: 48 }}
              source={x.icon}
              alt={x.heading}
            />
            <Text className={`text-xs mt-1 font-orbitron-bold text-dark`}>
              {x.heading}
            </Text>
            <Text className={`text-2xl mt-2 font-genos-regular text-dark`}>
              {x.data}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Detail;
