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
    color: theme === "dark" ? "#999999" : "#222222",
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
              intensity={80}
              tint={theme === "dark" ? "dark" : "light"}
              style={{ backgroundColor: imageColor, borderColor: imageColor }}
              className="absolute border-[1px] border-dotted flex-row items-center justify-center px-4 py-2 overflow-hidden rounded-tr-2xl rounded-br-2xl shadow-sm top-8 bg-clip-padding"
            >
              <Text className="absolute left-2 bottom-2.5">🌄</Text>
              <Text style={TEXT_SHADOW} className="ml-4 font-orbitron-semiBold">
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
              style={{ backgroundColor: imageColor }}
              className="absolute border-[0.5px] border-dotted right-0 flex-row items-center justify-center px-4 py-2 overflow-hidden rounded-tl-2xl rounded-bl-2xl shadow-sm top-8 bg-clip-padding"
            >
              <Text style={TEXT_SHADOW} className="mr-4 font-orbitron-semiBold">
                {`${
                  unixConv.timeStamp(
                    new Date(daily?.sunset[0]).getTime() / 1000,
                    unitSettings.time
                  ).clockTime
                }`}
              </Text>
              <Text className="absolute right-2 bottom-2.5">🌇</Text>
            </BlurView>
          </>
        )}
      </View>
    </View>
  );
};

export default Daytime;
