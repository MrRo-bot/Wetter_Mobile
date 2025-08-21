import images from "@/src/constants/images";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const Detail = ({ theme }) => {
  const detailObj = [
    {
      icon: images.thermometer,
      heading: "Feels Like",
      data: "37c",
    },
    {
      icon: images.humidity,
      heading: "Humidity",
      data: "79%",
    },
    {
      icon: images.uv,
      heading: "UV Index",
      data: "8",
    },
    {
      icon: images.visibility,
      heading: "Visibility",
      data: "3km",
    },
    {
      icon: images.pressure,
      heading: "Pressure",
      data: "958",
    },
    {
      icon: images.dew_point,
      heading: "Dew Point",
      data: "26c",
    },
  ];

  return (
    <View
      className={`relative overflow-hidden p-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-tealDark" : "bg-tealLight"}`}
    >
      <Text
        className={`absolute h-10 inset-x-0 pl-4 align-middle font-orbitron-regular leading-none text-lg  ${theme === "dark" ? "text-light bg-dark/50" : "text-dark bg-white/50"}`}
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
              style={{ width: 44, height: 44 }}
              source={x.icon}
              alt={x.heading}
            />
            <Text className={`text-xs mt-1 font-orbitron-medium text-dark`}>
              {x.heading}
            </Text>
            <Text className={`text-4xl mt-2 font-genos-regular text-dark`}>
              {x.data}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Detail;
