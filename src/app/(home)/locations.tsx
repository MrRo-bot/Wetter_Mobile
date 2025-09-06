import Loader from "@/src/components/UI/Loader";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { weatherStore } from "@/src/store/weatherStore";
import { weatherCodeConv } from "@/src/utils/math";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";

const Locations = () => {
  const router = useRouter();
  let theme = useColorScheme();

  const { weather } = weatherStore();
  const weatherCode = weatherCodeConv(weather?.daily?.weather_code[0]);

  const { unsplashLoading, imageColorsData } = useUnsplashImage(weatherCode);

  return (
    <View
      className={`px-4 relative h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      {/* FlatList */}
      <ScrollView>
        <View className="relative h-48 w-[calc(100vw-28px)] overflow-hidden rounded-lg border-1 border-solid border-gray-500/10">
          {unsplashLoading && !imageColorsData?.url ? (
            <Loader />
          ) : (
            <Image
              contentFit="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: imageColorsData?.url }}
            />
          )}

          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={20}
            tint={theme === "dark" ? "dark" : "light"}
            className="absolute items-center justify-center p-2 overflow-hidden -translate-y-1/2 rounded-full shadow-sm top-1/2 left-5 bg-clip-padding bg-dark/10"
          >
            <View className="items-center justify-center w-24 h-24 border-2 border-solid rounded-full border-light/10">
              <Text className="text-lg text-light font-orbitron-bold">
                24৹c
              </Text>
            </View>
          </BlurView>

          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={20}
            tint={theme === "dark" ? "dark" : "light"}
            className="absolute items-center justify-center p-2 overflow-hidden -translate-y-1/2 rounded-full shadow-sm top-1/2 right-5 bg-clip-padding bg-dark/10"
          >
            <View className="items-center justify-center w-full p-2 border-2 border-solid rounded-full border-light/10">
              <Text className="text-lg text-light font-orbitron-bold">
                Jabalpur
              </Text>
            </View>
          </BlurView>
        </View>
      </ScrollView>

      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={theme === "dark" ? 20 : 50}
        tint={theme === "dark" ? "dark" : "light"}
        className={`absolute bottom-16 right-10 -translate-y-1/2 shadow-2xl w-16 h-16 rounded-full items-center overflow-hidden bg-clip-padding justify-center border-[1px] border-dashed ${theme === "dark" ? "bg-light border-light/30" : "bg-dark border-dark/30"}`}
      >
        <Pressable onPress={() => router.navigate("/(home)/settings")}>
          <MaterialIcons
            color={theme === "dark" ? "white" : "black"}
            name="settings"
            size={28}
          />
        </Pressable>
      </BlurView>
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={theme === "dark" ? 20 : 50}
        tint={theme === "dark" ? "dark" : "light"}
        className={`absolute bottom-16 left-10 -translate-y-1/2 shadow-2xl w-16 h-16 rounded-full items-center overflow-hidden bg-clip-padding justify-center border-[1px] border-dashed ${theme === "dark" ? "bg-light border-light/30" : "bg-dark border-dark/30"}`}
      >
        <Pressable onPress={() => router.navigate("/(home)/searchLocation")}>
          <MaterialIcons
            color={theme === "dark" ? "white" : "black"}
            name="search"
            size={28}
          />
        </Pressable>
      </BlurView>
    </View>
  );
};

export default Locations;
