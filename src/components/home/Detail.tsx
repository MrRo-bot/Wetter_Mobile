import images from "@/src/constants/images";
import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import {
  closestTimestamp,
  lenAndSpdConv,
  pressureConverter,
  valRound,
} from "@/src/utils/math";
import { Image } from "expo-image";
import { Text, useColorScheme, View } from "react-native";

const Detail = () => {
  let theme = useColorScheme();

  const { weather } = weatherStore();
  const { units: unitSettings } = useSettingsStore();

  const { daily, hourly, current, current_units } = weather;

  const currentTimeIndex = hourly?.time.indexOf(
    current?.time && closestTimestamp(current?.time, hourly?.time)
  );

  const detailObj = [
    {
      icon: images.thermometer,
      heading: "Feels Like",
      data: `${valRound(current?.apparent_temperature)}${current_units?.apparent_temperature}`,
    },
    {
      icon: images.humidity,
      heading: "Humidity",
      data: `${valRound(current?.relative_humidity_2m)}%`,
    },
    {
      icon: images.uv,
      heading: "UV Index",
      data: valRound(daily?.uv_index_max[0]),
    },
    {
      icon: images.visibility,
      heading: "Visibility",
      data: `${lenAndSpdConv[unitSettings?.distance](hourly?.visibility[currentTimeIndex])} ${unitSettings?.distance}`,
    },
    {
      icon: images.pressure,
      heading: "Pressure",
      data: `${pressureConverter[unitSettings?.pressure](current?.surface_pressure)} ${unitSettings?.pressure}`,
    },
    {
      icon: images.dew_point,
      heading: "Dew Point",
      data: `${valRound(daily?.dew_point_2m_mean[0])}°`,
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
        className={`absolute h-10 inset-x-0 pl-4 align-middle font-orbitron-semiBold leading-none text-lg  ${theme === "dark" ? "text-light bg-dark/50" : "text-dark bg-light/50"}`}
      >
        DETAIL
      </Text>
      <View
        accessibilityRole="list"
        className="flex-row flex-wrap items-center justify-between mt-4 gap-y-2"
      >
        {detailObj.map((detail) => (
          <View
            accessibilityLabel={`Weather detail: ${detail?.heading}, ${detail?.data}`}
            key={detail?.heading}
            className={`w-[32%] items-center justify-center p-1 rounded-2xl ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
          >
            <Image
              accessibilityElementsHidden={true}
              contentFit="cover"
              style={{ width: 44, height: 44 }}
              source={detail?.icon}
              alt={detail?.heading}
            />
            <Text
              className={`text-xs mt-1 font-orbitron-bold text-dark leading-none`}
            >
              {detail?.heading ?? "..."}
            </Text>
            <Text
              className={`text-2xl mt-2 font-genos-regular text-dark leading-none`}
            >
              {detail?.data ?? "N/A"}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Detail;
