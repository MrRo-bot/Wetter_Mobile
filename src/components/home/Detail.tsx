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
      className={`p-4 shadow-lg mx-3 rounded-2xl ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <Text
        className={`font-orbitron-regular leading-none text-lg ${theme === "dark" ? "text-light bg-dark" : "text-dark bg-light"}`}
      >
        DETAIL
      </Text>
      <View className="flex-row flex-wrap items-center justify-between mt-4 gap-y-2">
        {detailObj.map((x) => (
          <View
            key={x.icon}
            className={`w-[33%] items-center justify-center p-2 rounded shadow-sm ${theme === "dark" ? "shadow-stone-800 bg-dark/50" : "bg-light/50"}`}
          >
            <Image
              style={{ width: 44, height: 44 }}
              source={x.icon}
              alt={x.heading}
            />
            <Text
              className={`text-xs mt-1 font-orbitron-medium ${theme === "dark" ? "text-light" : "text-dark"}`}
            >
              {x.heading}
            </Text>
            <Text
              className={`text-4xl mt-2 font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
            >
              {x.data}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Detail;
