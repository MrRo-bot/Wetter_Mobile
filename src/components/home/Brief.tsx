import images from "@/src/constants/images";
import { locationStore } from "@/src/store/locationStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import { BriefType } from "@/src/types/types";
import {
  alertIcon,
  degConv,
  unixConv,
  valRound,
  weatherCodeConv,
} from "@/src/utils/math";
import Entypo from "@expo/vector-icons/Entypo";
import NetInfo from "@react-native-community/netinfo";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const Brief = ({
  weatherRefetch,
  lastUpdated,
  toast,
  queryStatus,
  error,
  imageColorsLoading,
  imageColorsData,
  unsplashLoading,
}: BriefType) => {
  let theme = useColorScheme();

  const router = useRouter();

  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [showOffline, setShowOffline] = useState(false);

  const { weather } = weatherStore();
  const locations = locationStore();
  const { units: unitSettings } = useSettingsStore();

  const { daily, current, daily_units, current_units } = weather;

  const imageColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  const weatherCode = weatherCodeConv(daily?.weather_code[0]);
  const isDay = current?.is_day;
  const timestring = unixConv.timeStamp(
    new Date(current?.time).getTime() / 1000,
    unitSettings.time
  );
  const windDirection = degConv(current?.wind_direction_10m);
  const windSpeed = `${daily?.wind_speed_10m_max[0]} ${daily_units?.wind_speed_10m_max === "kn" ? "knots" : daily_units?.wind_speed_10m_max}`;
  const gustDirection = degConv(current?.wind_gusts_10m);
  const gustSpeed = `${daily?.wind_gusts_10m_max[0]} ${daily_units?.wind_gusts_10m_max === "kn" ? "knots" : daily_units?.wind_gusts_10m_max}`;
  const precipitationProbability = daily?.precipitation_probability_max[0];
  const precipitationSum = daily?.precipitation_sum[0];
  const precipitationText =
    precipitationProbability && precipitationProbability > 0
      ? `, Chance of precipitation ${precipitationProbability}${daily_units?.precipitation_probability_max}`
      : "";
  const precipitationAmount =
    precipitationSum > 0
      ? ` around ${precipitationSum.toFixed(2)} ${daily_units?.precipitation_sum}`
      : "";
  const weatherSummary = `${isDay ? "Today" : "Tonight"} - ${weatherCode}, Wind ${windDirection?.cardinal} at ${windSpeed}, Gusts ${gustDirection?.cardinal} at ${gustSpeed}${precipitationText}${precipitationAmount}.`;

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state?.isConnected);
      if (!state.isConnected) {
        setShowOffline(true);
      }
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        setShowOffline(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRefetch = () => {
    if (isConnected) {
      weatherRefetch();
      setShowOffline(false);
    } else {
      toast.current?.show({
        type: "error",
        description: "Check your internet 🛜",
        accessibilityLiveRegion: "assertive",
      });
    }
  };

  useEffect(() => {
    queryStatus === "fetching" &&
      toast.current?.show({
        type: "pending",
        description: "Connecting to weather service...",
      });
    queryStatus === "idle" &&
      toast.current?.show({
        type: "success",
        description: "Weather data updated",
      });
    error &&
      toast.current?.show({
        type: "error",
        description: error.message || "Failed to fetch weather data",
        accessibilityLiveRegion: "assertive",
      });
  }, [error, queryStatus, toast]);

  const windowWidth = Dimensions.get("window").width;

  const TEXT_SHADOW = {
    color: imageColor ? imageColor : "#44444450",
    textShadowColor: imageColor,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = 1;
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.95, {
      stiffness: 900,
      velocity: 0.2,
      damping: 120,
      mass: 4,
      reduceMotion: ReduceMotion.System,
    });
    setTimeout(() => {
      scale.value = withSpring(1, {
        stiffness: 100,
        velocity: 0.2,
        damping: 10,
        mass: 4,
        reduceMotion: ReduceMotion.System,
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.navigate("/(home)/Days");
    }, 200);
  };

  return (
    <View className="gap-2 mx-3 mt-2">
      <View
        style={{ width: windowWidth - 24, backgroundColor: imageColor }}
        className="relative w-full mx-auto overflow-hidden h-96 rounded-2xl"
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
            {showOffline && (
              <BlurView
                accessibilityRole="alert"
                accessibilityLabel={`Offline mode. Last updated ${Math.round((Date.now() - lastUpdated) / 1000 / 60)} ${Math.round((Date.now() - lastUpdated) / 1000 / 60) <= 1 ? "minute" : "minutes"} ago`}
                accessibilityLiveRegion="assertive"
                experimentalBlurMethod="dimezisBlurView"
                intensity={20}
                tint={theme === "dark" ? "dark" : "light"}
                className="absolute flex-row items-center justify-center gap-4 px-4 py-2 overflow-hidden rounded-tr-full rounded-br-full shadow-sm top-12 bg-clip-padding bg-dark/10"
              >
                <View className="pr-4 border-r-2 w-60 border-r-solid border-r-light/10">
                  <Text className="text-lg text-light font-orbitron-regular">
                    OFFLINE MODE
                  </Text>
                  <Text className="text-base text-light font-genos-light">
                    Last updated{" "}
                    {Math.round((Date.now() - lastUpdated) / 1000 / 60)}{" "}
                    {Math.round((Date.now() - lastUpdated) / 1000 / 60) <= 1
                      ? "minute"
                      : "minutes"}{" "}
                    ago
                  </Text>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Refresh weather data when internet is turned on"
                  onPress={() => (
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
                    handleRefetch()
                  )}
                >
                  <Entypo name="cycle" size={20} color="white" />
                </Pressable>
              </BlurView>
            )}
          </>
        )}
      </View>

      <View>
        <View className="flex-row flex-wrap items-center my-4">
          <Text
            style={TEXT_SHADOW}
            className={`font-orbitron-regular mr-4 text-5xl leading-none`}
          >
            {current?.temperature_2m
              ? valRound(current?.temperature_2m)
              : "..."}{" "}
            {current_units?.temperature_2m ?? "..."}
          </Text>

          <Text
            style={TEXT_SHADOW}
            className={`font-orbitron-semiBold self-start text-lg leading-none`}
          >
            {daily?.temperature_2m_max[0]
              ? valRound(daily?.temperature_2m_max[0])
              : "..."}{" "}
            {daily_units?.temperature_2m_max ?? "..."}
          </Text>
          <Text
            style={TEXT_SHADOW}
            className={`font-orbitron-semiBold text-lg leading-none`}
          >
            /{" "}
          </Text>
          <Text
            style={TEXT_SHADOW}
            className={`font-orbitron-semiBold self-end text-lg leading-none`}
          >
            {daily?.temperature_2m_min[0]
              ? valRound(daily?.temperature_2m_min[0])
              : "..."}{" "}
            {daily_units?.temperature_2m_min ?? "..."}
          </Text>
        </View>

        <View className="gap-1">
          <Text
            className={`text-lg leading-none font-genos-regular uppercase ${theme === "dark" ? "text-outlineDark/70" : "text-outlineLight/70"}`}
          >
            {`${timestring?.day?.substring(0, 3) ?? "..."}, ${timestring?.month ?? "..."} ${timestring?.date ?? "..."}`}
          </Text>

          <View className="flex-row items-end justify-between w-max">
            <Text
              numberOfLines={2}
              className={`text-4xl flex-wrap tracking-wider leading-none font-genos-medium ${theme === "dark" ? "text-outlineDark" : "text-outlineLight"}`}
            >
              {locations?.getLocationById(locations?.locationToShow)
                ?.geoAddress[0]?.city ??
                locations?.getLocationById(locations?.locationToShow)
                  ?.geoAddress[0]?.street ??
                locations?.getLocationById(locations?.locationToShow)
                  ?.geoAddress[0]?.district ??
                locations?.getLocationById(locations?.locationToShow)
                  ?.geoAddress[0]?.name ??
                locations?.getLocationById(locations?.locationToShow)
                  ?.geoAddress[0]?.subregion}
            </Text>
            {alertIcon(current?.weather_code) === "alert" && (
              <View
                className={`items-center justify-center p-1 mr-4 rounded-full ${theme === "dark" ? "bg-gray-500/30" : "bg-gray-500/10"}`}
              >
                <Image
                  accessibilityRole="image"
                  accessibilityLabel="Weather alert icon"
                  style={{ marginInline: "auto", width: 18, height: 18 }}
                  source={images.alert}
                  alt={"alert"}
                />
              </View>
            )}
          </View>

          <Text
            className={`text-2xl leading-none font-genos-regular ${theme === "dark" ? "text-light" : "text-dark"}`}
          >
            {weatherCodeConv(current?.weather_code) ?? "..."}
          </Text>

          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel="View daily weather forecast"
            accessibilityHint="Navigates to daily weather forecast"
            style={animatedStyle}
            onPress={handlePress}
            android_ripple={{
              color: `rgb(255,255,255,0.01)`,
            }}
            className="relative mt-1 transition-colors duration-500"
          >
            <Text
              accessibilityLabel={`Weather summary: ${weatherSummary ?? "No weather data"}`}
              className={`pr-8 text-lg leading-none font-genos-medium ${theme === "dark" ? "text-outlineDark/70" : "text-outlineLight/70"}`}
            >
              {weatherSummary ?? "..."}
            </Text>
            <View className="absolute -translate-y-1/2 right-2 top-1/2">
              <Entypo
                accessibilityLabel="Arrow indicating navigation"
                accessibilityRole="image"
                className="rotate-45"
                name="direction"
                size={20}
                color={theme === "dark" ? "white" : "black"}
              />
            </View>
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
};

export default Brief;
