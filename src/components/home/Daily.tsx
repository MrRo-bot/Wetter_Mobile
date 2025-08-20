import images from "@/src/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { Text, View } from "react-native";

const Daily = ({ theme }) => {
  return (
    <View
      className={`relative overflow-hidden p-4 pt-10 mx-3 rounded-2xl ${theme === "dark" ? "bg-redDark" : "bg-redLight"}`}
    >
      <View
        className={`absolute h-10 inset-x-0 pl-4 ${theme === "dark" ? "bg-dark/50" : "bg-white/50"}`}
      >
        <Text
          className={`font-orbitron-regular -translate-y-1/2 top-1/2 leading-none text-lg ${theme === "dark" ? "text-light " : "text-dark "}`}
        >
          DAILY
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
      <View className="flex-row gap-4 mt-6">
        {/* {daily.slice(0, 6).map((x) => ( */}
        <View
          // key={x.id}
          key={1}
          className={`items-center rounded-2xl py-1 px-4  ${theme === "dark" ? "bg-light/80" : "bg-light/90"}`}
        >
          <Text className={`font-genos-medium text-2xl`}>
            {/* {x.maxTemp} */}
            {"36৹"}
          </Text>
          <Text className={`font-genos-medium text-2xl`}>
            {/* {x.minTemp} */}
            {"26৹"}
          </Text>

          <Text className={`font-orbitron-semiBold  text-sky-400/50`}>
            {/* {x.precipitation} */}
            {"21%"}
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
            source={images.overcast}
            alt="⚠️"
          />
          <Text className={`font-orbitron-regular text-sm`}>
            {/* {x.windSpeed} */}
            {"12 kmph"}
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
            {/* {x.dateStamp.slice(0, 3)} */}
            {"MON"}
          </Text>
        </View>
        {/* ))} */}
      </View>
    </View>
  );
};

export default Daily;
