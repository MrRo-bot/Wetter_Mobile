import images from "@/src/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const Hourly = ({ theme }) => {
  return (
    <View
      className={`p-4 mx-3 shadow-lg rounded-2xl ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="relative">
        <Text
          className={`font-orbitron-regular leading-none text-lg ${theme === "dark" ? "text-light bg-dark" : "text-dark bg-light"}`}
        >
          HOURLY
        </Text>
        <View className="absolute right-0 -translate-y-1/2 top-1/2">
          <Entypo
            className="rotate-45"
            name="direction"
            size={12}
            color={theme === "dark" ? "white" : "black"}
          />
        </View>
      </View>
      <View className="flex-row gap-4 mt-6">
        {/* {hourly.slice(0, 24).map((x) => ( */}
        <View
          // key={x.id}
          key={1}
          className={`items-center rounded justify-between py-1 px-4 ${theme === "dark" ? "bg-white/5" : "bg-dark/5"}`} //color first data column to show current hour temperature
        >
          <Text className={`font-genos-medium text-2xl`}>
            {/* {x.currentTemp} */}
            {"23৹c"}
          </Text>
          <Text className={`font-orbitron-semiBold  text-sky-400/50`}>
            {"88%"}
          </Text>
          <Image
            style={{ width: 52, height: 52, marginBlock: 7 }}
            // source={`/${
            //   typeof x.weatherIcon != "object"
            //     ? x.weatherIcon
            //     : x.isDay
            //       ? x.weatherIcon[0]
            //       : x.weatherIcon[1]
            // }.svg`}
            source={images.partly_cloudy_day}
            alt="⚠️"
          />
          <Text className={`font-orbitron-regular text-sm`}>
            {/* {x.windSpeed} */}
            {"12 mph"}
          </Text>
          <Image
            // style={{ transform: `rotate(${x.windDirection}deg)` }}
            style={{
              transform: `rotate(${230}deg)`,
              width: 52,
              height: 52,
              marginBlock: 7,
            }}
            // source={windAlternate}
            source={images.wind}
            alt="wind direction"
          />
          <Text className={`font-orbitron-semiBold text-lg`}>
            {/* {x.hourStamp.toLowerCase()} */}
            {"4pm"}
          </Text>
        </View>
        {/* 
          ))} */}
      </View>
    </View>
  );
};

export default Hourly;
