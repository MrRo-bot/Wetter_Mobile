import Loader from "@/src/components/UI/Loader";
import useCustomLocation from "@/src/hooks/useCustomLocation";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";

const LocationCard = ({
  theme,
  location,
}: {
  theme: string | null | undefined;
  location: LocationDataType;
}) => {
  const { unsplashLoading, imageColorsData } = useUnsplashImage(
    location?.geoAddress[0]?.city
  );
  const locations = locationStore();

  const {
    isLoading: locationLoading,
    getLocation,
    location: fetchedLocation,
  } = useCustomLocation();

  useEffect(() => {
    if (!locationLoading && fetchedLocation) {
      locations?.addLocationToShow(fetchedLocation?.id);
    }
  }, [locationLoading, fetchedLocation]);

  return (
    <View className="relative h-48 w-[calc(100vw-28px)] overflow-hidden rounded-lg border-1 border-solid border-gray-500/10">
      <Pressable
        onPress={() =>
          getLocation(
            location.locationCoords.coords.latitude,
            location.locationCoords.coords.longitude
          )
        }
      >
        {unsplashLoading ? (
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
          <View className="items-center justify-center w-full p-1 border-2 border-solid rounded-full border-light/10">
            <Text className="text-lg text-light font-orbitron-bold">
              {location?.geoAddress[0]?.city}
            </Text>
          </View>
        </BlurView>

        <BlurView
          experimentalBlurMethod="dimezisBlurView"
          intensity={20}
          tint={theme === "dark" ? "dark" : "light"}
          className="absolute items-center justify-center p-2 overflow-hidden -translate-y-1/2 rounded-full shadow-sm top-1/2 right-5 bg-clip-padding bg-dark/10"
        >
          <View className="items-center justify-center w-full p-1 border-2 border-solid rounded-full border-light/10">
            <Text className="text-lg text-light font-orbitron-bold">
              {location?.geoAddress[0]?.country}
            </Text>
          </View>
        </BlurView>
      </Pressable>
    </View>
  );
};

const Locations = () => {
  const router = useRouter();
  let theme = useColorScheme();
  let { locations } = locationStore();

  return (
    <View
      className={`px-4 relative h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <FlatList
        data={locations}
        renderItem={({ item }: { item: LocationDataType }) => (
          <LocationCard theme={theme} location={item} />
        )}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-3" />}
      />

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
