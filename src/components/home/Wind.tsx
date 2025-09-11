import images from "@/src/constants/images";
import { weatherStore } from "@/src/store/weatherStore";
import { degConv, wingSpeed } from "@/src/utils/math";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Text, useColorScheme, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const Wind = () => {
  const theme = useColorScheme();

  const { weather } = weatherStore();

  const rotate = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(-360, {
        duration: wingSpeed(weather?.current?.wind_speed_10m) * 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotate, weather]);

  const fanProps = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate?.value}deg` }],
  }));

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
      className={`px-4 mx-3 overflow-hidden rounded-2xl ${theme === "dark" ? "bg-mustardDark" : "bg-mustardLight"}`}
    >
      <Text
        className={`absolute h-10 inset-x-0 pl-4 align-middle font-orbitron-semiBold leading-none text-lg  ${theme === "dark" ? "text-light bg-dark/50" : "text-dark bg-light/50"}`}
      >
        WIND
      </Text>

      <View className="flex flex-row justify-between align-bottom items-end mt-16 min-h-[8rem]">
        <View className="relative overflow-visible w-44 h-44">
          <Animated.Image
            style={[
              {
                position: "absolute",
                width: "70%",
                left: "7%",
                height: "70%",
                zIndex: 1,
              },
              fanProps,
            ]}
            resizeMode="contain"
            source={images.blades}
          />

          <Image
            cachePolicy={"memory-disk"}
            transition={1000}
            style={{
              position: "absolute",
              zIndex: 0,
              bottom: 0,
              width: "100%",
              height: "80%",
            }}
            source={images.wind_mill}
          />
        </View>

        <View className="mb-2">
          <Text
            accessibilityRole="text"
            accessibilityLabel={`${weather?.current?.wind_speed_10m ?? "..."} ${weather?.current_units?.wind_speed_10m ?? "..."}`}
            className="text-2xl font-orbitron-regular text-dark/90"
          >
            {`${weather?.current?.wind_speed_10m ?? "..."} ${weather?.current_units?.wind_speed_10m ?? "..."}`}
          </Text>
          <Text
            accessibilityRole="text"
            accessibilityLabel={
              degConv(weather?.current?.wind_direction_10m).cardinal ?? "..."
            }
            className={`mt-1 leading-0 font-genos-bold text-dark/60`}
          >
            {degConv(weather?.current?.wind_direction_10m).cardinal ?? "..."}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Wind;
