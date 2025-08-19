import { Text, View } from "react-native";

import images from "@/src/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useState } from "react";

const Brief = ({ theme }) => {
  const [colorFromImg, setColorFromImg] = useState("text-[#666]");

  return (
    <View className="flex gap-2 mx-5">
      <View className="mx-auto overflow-hidden w-80 h-80 rounded-2xl">
        <Image
          style={{ width: "100%", height: "100%" }}
          source={images.introduction}
        />
      </View>

      <View className="py-2 mt-2">
        <View className="flex flex-row flex-wrap">
          <Text className={`mr-4  text-5xl ${colorFromImg}`}>
            {"30৹c"} {/* brief.currentTemp ||  */}
          </Text>

          <Text className={` text-lg ${colorFromImg}`}>
            {"32৹c"} {/* brief.maxTemp ||  */}
          </Text>
          <Text className={` text-lg ${colorFromImg}`}>/ </Text>
          <Text className={` text-lg ${colorFromImg}`}>
            {"25৹c"} {/* brief.minTemp ||  */}
          </Text>
        </View>

        <View>
          <Text className="mt-3 text-sm ">
            {"Mon, 18 August"} {/* brief.dateStamp ||  */}
          </Text>
          <Text className="my-2 text-2xl ">
            {"Shanti Nagar"} {/* city ||  */}
          </Text>
          <Text className="text-sm ">
            {"Haze"} {/* brief.main ||  */}
          </Text>
        </View>

        <View className="relative flex mt-3 text-xs">
          <Text className="pr-8 text-sm ">
            {
              "brief explanation related to todays weather something something something"
            }{" "}
            {/* brief.summary ||  */}
          </Text>
          <View className="absolute right-0 -translate-y-1/2 top-1/2">
            <Entypo
              className="rotate-45"
              name="direction"
              size={20}
              color="black"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Brief;
