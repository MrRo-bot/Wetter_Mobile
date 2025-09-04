import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { closestTimestamp, lenAndSpdConv, valRound } from "@/src/utils/math";
import { Image } from "expo-image";
import { Text, useColorScheme, View } from "react-native";

const Detail = () => {
  let theme = useColorScheme();

  const { weather } = weatherStore();

  const { daily, hourly, current, current_units, daily_units } = weather;

  const currentTimeIndex = hourly?.time.indexOf(
    current?.time && closestTimestamp(current?.time, hourly?.time)
  );

  const detailObj = [
    {
      icon: images.thermometer,
      heading: "Feels Like",
      data:
        valRound(current?.apparent_temperature) +
        current_units?.apparent_temperature,
    },
    {
      icon: images.humidity,
      heading: "Humidity",
      data: current?.relative_humidity_2m + "%",
    },
    {
      icon: images.uv,
      heading: "UV Index",
      data: valRound(daily?.uv_index_max[0]),
    },
    {
      icon: images.visibility,
      heading: "Visibility",
      data: lenAndSpdConv.km(hourly?.visibility[currentTimeIndex]) + "km",
    },
    {
      icon: images.pressure,
      heading: "Pressure",
      data: valRound(current?.surface_pressure) + current_units?.precipitation,
    },
    {
      icon: images.dew_point,
      heading: "Dew Point",
      data:
        valRound(daily?.dew_point_2m_mean[0]) + daily_units?.dew_point_2m_mean,
    },
  ];

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
      className={`relative overflow-hidden p-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-tealDark" : "bg-tealLight"}`}
    >
      <Text
        className={`absolute h-10 inset-x-0 pl-4 align-middle font-orbitron-semiBold leading-none text-lg  ${theme === "dark" ? "text-light bg-dark/50" : "text-dark bg-white/50"}`}
      >
        DETAIL
      </Text>
      <View className="flex-row flex-wrap items-center justify-between mt-4 gap-y-2">
        {detailObj.map((detail) => (
          <View
            key={detail?.heading}
            className={`w-[32%] items-center justify-center p-2 rounded-2xl ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
          >
            <Image
              contentFit="cover"
              style={{ width: 48, height: 48 }}
              source={detail?.icon}
              alt={detail?.heading}
            />
            <Text className={`text-xs mt-1 font-orbitron-bold text-dark`}>
              {detail?.heading}
            </Text>
            <Text className={`text-2xl mt-2 font-genos-regular text-dark`}>
              {detail?.data}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Detail;
