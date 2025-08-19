import { Text, View } from "react-native";

import images from "@/src/constants/images";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useState } from "react";

const Brief = ({ theme }) => {
  const [colorFromImg, setColorFromImg] = useState("text-[#666]");

  return (
    <View className="gap-2 mx-5 ">
      <View className="mx-auto overflow-hidden w-96 h-96 rounded-2xl">
        <Image
          style={{ width: "100%", height: "100%" }}
          source={images.introduction}
        />
      </View>

      <View className="py-2 mt-2">
        <View className="flex-row flex-wrap items-center ">
          <Text
            className={`font-orbitron-regular mr-4 text-5xl ${colorFromImg}`}
          >
            {"30৹c"} {/* brief.currentTemp ||  */}
          </Text>

          <Text
            className={`font-orbitron-semiBold self-start text-lg ${colorFromImg}`}
          >
            {"32৹c"} {/* brief.maxTemp ||  */}
          </Text>
          <Text className={`font-orbitron-semiBold text-lg ${colorFromImg}`}>
            /{" "}
          </Text>
          <Text
            className={`font-orbitron-semiBold self-end text-lg ${colorFromImg}`}
          >
            {"25৹c"} {/* brief.minTemp ||  */}
          </Text>
        </View>

        <View>
          <Text
            className={`mt-3 text-2xl leading-none font-genos-light ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {"MON, 18 AUGUST"} {/* brief.dateStamp ||  */}
          </Text>
          <Text
            className={`text-4xl mt-0.5 leading-none font-genos-medium ${theme === "dark" ? "text-outlineDark" : "text-outlineLight"}`}
          >
            {"Shanti Nagar"} {/* city ||  */}
          </Text>
          <Text
            className={`text-2xl leading-none font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {"Haze"} {/* brief.main ||  */}
          </Text>
        </View>

        <View className="relative mt-4">
          <Text
            className={`pr-8 text-lg leading-none font-genos-medium ${theme === "dark" ? "text-outlineDark/90" : "text-outlineLight/90"}`}
          >
            {
              "BRIEF explanation related to todays weather something something something"
            }{" "}
            {/* brief.summary ||  */}
          </Text>
          <View className="absolute right-0 -translate-y-1/2 top-1/2">
            <Entypo
              className="rotate-45"
              name="direction"
              size={20}
              color={theme === "dark" ? "white" : "black"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Brief;
