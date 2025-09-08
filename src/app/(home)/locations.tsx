import Loader from "@/src/components/UI/Loader";
import useCustomLocation from "@/src/hooks/useCustomLocation";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";

const LocationCard = ({ location }: { location: LocationDataType }) => {
  const { unsplashLoading, imageColorsData } = useUnsplashImage(
    location?.geoAddress[0]?.city ??
      location?.geoAddress[0]?.district ??
      location?.geoAddress[0]?.name
  );
  const locations = locationStore();

  const { isLoading: locationLoading, getLocation } = useCustomLocation();

  useEffect(() => {
    if (!locationLoading) {
      locations?.addLocationToShow(location?.id);
    }
  }, [locationLoading]);

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
          <View className="absolute w-full top-24">
            <Loader />
          </View>
        ) : (
          <Image
            contentFit="cover"
            className="bg-black bg-blend-darken"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: imageColorsData?.url }}
          />
        )}

        <View className="absolute items-center justify-center p-1 overflow-hidden rounded-lg shadow-sm top-2 left-2 bg-dark/10">
          <View className="items-center justify-center w-max p-0.5 border-2 border-solid rounded-lg border-light/10">
            <Text
              className="text-center text-light font-orbitron-bold"
              numberOfLines={1}
            >
              {location?.geoAddress[0]?.city ??
                location?.geoAddress[0]?.district ??
                location?.geoAddress[0]?.name}
            </Text>
          </View>
        </View>

        <View className="absolute items-center justify-center p-1 overflow-hidden rounded-lg shadow-sm bottom-2 right-2 bg-dark/10">
          <View className="items-center justify-center w-max p-0.5 border-2 border-solid rounded-lg border-light/10">
            <Text
              className="text-center text-light font-orbitron-bold"
              numberOfLines={1}
            >
              {location?.geoAddress[0]?.country}
            </Text>
          </View>
        </View>
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
      className={`px-4 pb-10 relative h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      <View className="flex-row items-center justify-between py-2">
        <Pressable
          className={`shadow-2xl w-10 h-10 rounded-full items-center overflow-hidden justify-center`}
          onPress={() => router.navigate("/(home)/settings")}
        >
          <MaterialIcons
            color={theme === "dark" ? "white" : "black"}
            name="settings"
            size={24}
          />
        </Pressable>

        <Text className="text-2xl font-genos-light">Saved Locations</Text>

        <Pressable
          className={`shadow-2xl w-10 h-10 rounded-full items-center overflow-hidden justify-center`}
          onPress={() => router.navigate("/(home)/searchLocation")}
        >
          <MaterialIcons
            color={theme === "dark" ? "white" : "black"}
            name="search"
            size={24}
          />
        </Pressable>
      </View>
      <FlatList
        data={locations}
        renderItem={({ item }: { item: LocationDataType }) => (
          <LocationCard location={item} />
        )}
        maxToRenderPerBatch={8}
        windowSize={5}
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-3" />}
      />
    </View>
  );
};

export default Locations;
