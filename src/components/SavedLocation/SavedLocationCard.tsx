import useCustomLocation from "@/src/hooks/useCustomLocation";
import useUnsplashImage from "@/src/hooks/useUnsplashImage";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType, ToastRef } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Loader from "../UI/Loader";

const SavedLocationCard = ({
  location,
  theme,
  index,
}: {
  location: LocationDataType;
  theme: string | null | undefined;
  index: number;
}) => {
  const [isLocationToShow, setIsLocationToShow] = useState(false);
  const [removeLocation, setRemoveLocation] = useState(false);

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
              contentFit="cover"
              transition={unsplashLoading ? 0 : 1000}
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
              <>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    setRemoveLocation(!removeLocation);
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
                <Modal
                  animationType="slide"
                  transparent={true}
                  accessible={true}
                  visible={removeLocation}
                  statusBarTranslucent={true}
                  navigationBarTranslucent={true}
                  hardwareAccelerated={true}
                  onRequestClose={() => {
                    setRemoveLocation(!removeLocation);
                  }}
                >
                  <BlurView
                    experimentalBlurMethod="dimezisBlurView"
                    intensity={20}
                    tint={theme === "dark" ? "dark" : "light"}
                    className={`flex-row items-center justify-center gap-2 p-2 bg-clip-padding w-full h-full ${theme === "dark" ? "bg-light" : "bg-dark"}`}
                  >
                    <BlurView
                      experimentalBlurMethod="dimezisBlurView"
                      intensity={80}
                      tint={theme === "dark" ? "dark" : "light"}
                      className="items-center justify-center w-9/12 p-6 overflow-hidden rounded-2xl h-3/12 gap-y-6 bg-light"
                    >
                      <Text
                        className={`text-center font-orbitron-bold ${theme === "dark" ? "text-light" : "text-dark"}`}
                      >
                        Do you want to remove this location?
                      </Text>

                      <View className="flex-row items-center justify-center gap-2 mx-auto">
                        <Pressable
                          className={`items-center justify-center py-1.5 px-2 border-2 border-solid rounded-2xl w-max ${theme === "dark" ? "border-light/50 bg-sky-400" : "border-dark/50 bg-sky-900"}`}
                          onPress={(e) => {
                            e.stopPropagation();
                            locationStoreObj.removeLocation(location?.id);
                            locationStoreObj.addLocationToShow(
                              locationStoreObj.locations[0].id
                            );
                            setRemoveLocation(!removeLocation);
                          }}
                        >
                          <Text
                            className={`text-center font-orbitron-bold ${theme === "dark" ? "text-dark" : "text-light"}`}
                            numberOfLines={1}
                          >
                            Delete
                          </Text>
                        </Pressable>

                        <Pressable
                          className={`items-center justify-center py-1.5 px-2 border-2 border-solid rounded-2xl w-max ${theme === "dark" ? "border-light/50 bg-sky-400" : "border-dark/50 bg-sky-900"}`}
                          onPress={() => setRemoveLocation(!removeLocation)}
                        >
                          <Text
                            className={`text-center font-orbitron-bold ${theme === "dark" ? "text-dark" : "text-light"}`}
                            numberOfLines={1}
                          >
                            Cancel
                          </Text>
                        </Pressable>
                      </View>
                    </BlurView>
                  </BlurView>
                </Modal>
              </>
            )}
          </>
        )}
      </Pressable>
    </View>
  );
};

export default SavedLocationCard;
