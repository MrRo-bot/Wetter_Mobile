import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import { unixConv, weatherCodeConv } from "@/src/utils/math";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Dimensions, Text, useColorScheme, View } from "react-native";

const Daytime = () => {
  let theme = useColorScheme();

  let { weather } = weatherStore();
  const { units: unitSettings } = useSettingsStore();

  const { daily } = weather;

  const weatherCode = weatherCodeConv(daily?.weather_code[0]);

  const { imageColorsLoading, imageColorsData, unsplashLoading } =
    useUnsplashImage(weatherCode);

  const imageColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  const windowWidth = Dimensions.get("window").width;

  const TEXT_SHADOW = {
    textShadowColor: imageColor,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  };

  return (
    <View className="mx-3">
      <View
        style={{ width: windowWidth - 24 }}
        className="relative w-full mx-auto overflow-hidden h-60 rounded-2xl"
      >
        {imageColorsLoading || unsplashLoading ? (
          <View className={`w-full h-full bg-[#44444450]`} />
        ) : (
          <>
            <Image
              accessibilityRole="image"
              accessibilityLabel={`Image based on weather condition ${weatherCode}`}
              transition={unsplashLoading ? 0 : 1000}
              cachePolicy={"memory"}
              contentFit="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: imageColorsData?.url }}
            />

            <BlurView
              accessibilityRole="alert"
              accessibilityLabel={``}
              accessibilityLiveRegion="assertive"
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              tint={theme === "dark" ? "dark" : "light"}
              style={{
                borderColor: imageColor,
                backgroundColor: imageColor,
              }}
              className={`absolute border-[0.5px] border-solid flex-row -left-1 items-center justify-center px-4 py-2 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-sm top-3 bg-clip-padding`}
            >
              <Text>🌄</Text>
              <Text
                style={TEXT_SHADOW}
                className={`ml-2 font-orbitron-semiBold ${theme === "dark" ? "text-light" : "text-dark"}`}
              >
                SUNRISE
              </Text>
            </BlurView>
            <BlurView
              accessibilityRole="alert"
              accessibilityLabel={``}
              accessibilityLiveRegion="assertive"
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              tint={theme === "dark" ? "dark" : "light"}
              style={{
                borderColor: imageColor,
                backgroundColor: imageColor,
              }}
              className={`absolute border-[0.5px] border-solid flex-row -left-1 items-center justify-center px-4 py-2 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-sm top-14 bg-clip-padding`}
            >
              <Text
                style={TEXT_SHADOW}
                className={`font-orbitron-semiBold ${theme === "dark" ? "text-light" : "text-dark"}`}
              >
                {`${
                  unixConv.timeStamp(
                    new Date(daily?.sunrise[0]).getTime() / 1000,
                    unitSettings.time
                  ).clockTime
                }`}
              </Text>
            </BlurView>
            <BlurView
              accessibilityRole="alert"
              accessibilityLabel={``}
              accessibilityLiveRegion="assertive"
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              tint={theme === "dark" ? "dark" : "light"}
              style={{
                borderColor: imageColor,
                backgroundColor: imageColor,
              }}
              className={`absolute border-[0.5px] border-solid flex-row -right-1 items-center justify-center px-4 py-2 overflow-hidden rounded-tl-2xl rounded-bl-2xl shadow-sm top-3 bg-clip-padding`}
            >
              <Text
                style={TEXT_SHADOW}
                className={`mr-2 font-orbitron-semiBold ${theme === "dark" ? "text-light" : "text-dark"}`}
              >
                SUNSET
              </Text>
              <Text>🌇</Text>
            </BlurView>
            <BlurView
              accessibilityRole="alert"
              accessibilityLabel={``}
              accessibilityLiveRegion="assertive"
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              tint={theme === "dark" ? "dark" : "light"}
              style={{
                borderColor: imageColor,
                backgroundColor: imageColor,
              }}
              className={`absolute border-[0.5px] border-solid flex-row -right-1 items-center justify-center px-4 py-2 overflow-hidden rounded-tl-2xl rounded-bl-2xl shadow-sm top-14 bg-clip-padding`}
            >
              <Text
                style={TEXT_SHADOW}
                className={`font-orbitron-semiBold ${theme === "dark" ? "text-light" : "text-dark"}`}
              >
                {`${
                  unixConv.timeStamp(
                    new Date(daily?.sunset[0]).getTime() / 1000,
                    unitSettings.time
                  ).clockTime
                }`}
              </Text>
            </BlurView>
          </>
        )}
      </View>
    </View>
  );
};

export default Daytime;
