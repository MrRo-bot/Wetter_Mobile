import Loader from "@/src/components/UI/Loader";
import useCustomLocation from "@/src/hooks/useCustomLocation";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType, ToastRef } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  useColorScheme,
  View,
} from "react-native";

const LocationCard = ({
  location,
  theme,
}: {
  location: LocationDataType;
  theme: string | null | undefined;
}) => {
  const [isLocationToShow, setIsLocationToShow] = useState(false);

  const toastRef = useRef<ToastRef>(null);

  const router = useRouter();

  const locationStoreObj = locationStore();

  const { unsplashLoading, imageColorsData } = useUnsplashImage(
    location?.geoAddress[0]?.city ??
      location?.geoAddress[0]?.street ??
      location?.geoAddress[0]?.district
  );

  const { getLocation, errorMsg } = useCustomLocation();

  useEffect(() => {
    errorMsg &&
      toastRef?.current?.show({
        type: "error",
        description: `${errorMsg} 😭`,
        accessibilityLiveRegion: "assertive",
      });
  }, [errorMsg]);

  useEffect(() => {
    if (isLocationToShow) {
      locationStoreObj?.addLocationToShow(location?.id);
    }
  }, [isLocationToShow]);

  const imageColor =
    imageColorsData?.imageColors?.platform === "android" ||
    imageColorsData?.imageColors?.platform === "web"
      ? theme === "dark"
        ? imageColorsData?.imageColors?.vibrant
        : imageColorsData?.imageColors?.muted
      : theme === "dark"
        ? imageColorsData?.imageColors?.quality
        : imageColorsData?.imageColors?.primary;

  return (
    <View className="relative z-0 h-48 w-[calc(100vw-28px)] overflow-hidden rounded-lg border-[2px] border-solid border-gray-500/40">
      <Pressable
        onPress={() => {
          getLocation(
            location.locationCoords.coords.latitude,
            location.locationCoords.coords.longitude
          );
          setIsLocationToShow(true);
          router.dismissTo("/(home)");
        }}
      >
        {unsplashLoading ? (
          <View className="absolute items-center justify-center w-full h-48">
            <Loader />
          </View>
        ) : (
          <>
            <View
              className={`absolute z-20 items-center justify-center w-full h-48 ${theme === "dark" ? "bg-dark/30" : "bg-dark/10"}`}
            ></View>
            <Image
              accessibilityLabel={`Image of ${location?.geoAddress[0]?.city ?? "location"}`}
              cachePolicy={"memory-disk"}
              transition={1000}
              contentFit="cover"
              className="z-10"
              style={{
                width: "100%",
                height: "100%",
              }}
              source={{ uri: imageColorsData?.url }}
            />
          </>
        )}

        {!unsplashLoading && (
          <>
            <View
              style={{ backgroundColor: imageColor }}
              className={`absolute z-50 items-center justify-center p-0.5 overflow-hidden rounded-lg shadow-sm top-2 left-2`}
            >
              <View className="items-center justify-center p-1 border-2 border-solid rounded-lg w-max border-dark/50">
                <Text
                  className="text-center text-light font-orbitron-bold"
                  numberOfLines={1}
                >
                  {location?.geoAddress[0]?.city ??
                    location?.geoAddress[0]?.street ??
                    location?.geoAddress[0]?.district}
                </Text>
              </View>
            </View>

            <View
              style={{ backgroundColor: imageColor }}
              className={`absolute z-50 items-center justify-center p-0.5 overflow-hidden rounded-lg shadow-sm top-14 left-2`}
            >
              <View className="items-center justify-center p-1 border-2 border-solid rounded-lg w-max border-dark/50">
                <Text
                  className="text-sm text-center text-light font-orbitron-medium"
                  numberOfLines={1}
                >
                  {location?.geoAddress[0]?.country}
                </Text>
              </View>
            </View>

            {locationStoreObj.locations.length > 1 && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  Alert.alert(
                    "Delete Location",
                    "Are you sure you want to delete this location?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                          locationStoreObj.removeLocation(location?.id);
                          locationStoreObj.addLocationToShow(
                            locationStoreObj.locations[0].id
                          );
                        },
                      },
                    ]
                  );
                }}
                className={`absolute z-50 items-center justify-center p-0.5 overflow-hidden rounded-full shadow-sm top-2 right-2 bg-light/80`}
              >
                <View className="items-center justify-center p-1 border-2 border-solid rounded-full w-max border-dark/50">
                  <MaterialIcons
                    name="delete-outline"
                    className="shadow-2xl"
                    size={24}
                    color={imageColor}
                  />
                </View>
              </Pressable>
            )}
          </>
        )}
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
        <Text
          className={`font-orbitron-bold leading-none ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          SAVED LOCATIONS
        </Text>
        <View className="flex-row items-center justify-center gap-2">
          <Pressable
            accessibilityLabel="Open settings"
            accessibilityHint="Navigates to the settings screen"
            accessible={true}
            accessibilityRole="button"
            className={`shadow-2xl w-12 h-12 rounded-full items-center overflow-hidden justify-center ${theme === "dark" ? "bg-slate-400/10" : "bg-slate-100/80"}`}
            onPress={() => router.navigate("/(home)/settings")}
          >
            <MaterialIcons
              color={theme === "dark" ? "white" : "black"}
              name="settings"
              size={24}
            />
          </Pressable>

          <Pressable
            accessibilityLabel="Open location search"
            accessibilityHint="Navigates to the location search screen"
            accessible={true}
            accessibilityRole="button"
            className={`shadow-2xl w-12 h-12 rounded-full items-center overflow-hidden justify-center ${theme === "dark" ? "bg-slate-400/10" : "bg-slate-100/80"}`}
            onPress={() => router.navigate("/(home)/searchLocation")}
          >
            <MaterialIcons
              color={theme === "dark" ? "white" : "black"}
              name="search"
              size={24}
            />
          </Pressable>
        </View>
      </View>
      <FlatList
        accessibilityRole="list"
        accessibilityLabel="List of saved locations"
        data={locations}
        renderItem={({ item }: { item: LocationDataType }) => (
          <LocationCard location={item} theme={theme} />
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
