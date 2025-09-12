import Loader from "@/src/components/UI/Loader";
import components from "@/src/constants/components";
import images from "@/src/constants/images";
import useCustomLocation from "@/src/hooks/useCustomLocation";
import useDebounce from "@/src/hooks/useDebounce";
import useLocationSearch from "@/src/hooks/useLocationSearch";
import { locationStore } from "@/src/store/locationStore";
import { LocationSearchItemType, ToastRef } from "@/src/types/types";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, TextInput, useColorScheme, View } from "react-native";
import Animated, { ReduceMotion, SlideInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchLocation = () => {
  let theme = useColorScheme();

  const toastRef = useRef<ToastRef>(null);
  const [searchStr, setSearchStr] = useState("");

  const debouncedSearchStr = useDebounce(searchStr, 1000);
  const { data, isLoading, error } = useLocationSearch(debouncedSearchStr);

  const {
    isLoading: locationLoading,
    getLocation,
    location: fetchedLocation,
    errorMsg,
  } = useCustomLocation();

  const locations = locationStore();

  useEffect(() => {
    errorMsg &&
      toastRef?.current?.show({
        type: "error",
        description: `${errorMsg} 😭`,
        accessibilityLiveRegion: "assertive",
      });
  }, [errorMsg]);

  useEffect(() => {
    if (!locationLoading && fetchedLocation) {
      locations?.addLocation(fetchedLocation);
      locations?.addLocationToShow(fetchedLocation?.id);
    }
  }, [locationLoading, fetchedLocation]);

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <TextInput
        accessibilityLabel="Search for a city, country, or place"
        accessibilityHint="Enter a location name to find it"
        className={`h-10 p-2 m-3 w-[90%] mx-auto rounded-lg border-[1px] border-dotted ${theme === "dark" ? "border-light bg-dark text-light" : "border-dark bg-light text-dark"} placeholder:text-gray-400`}
        placeholder="Search any location"
        onChangeText={(str) => setSearchStr(str)}
      />

      {!data && !isLoading && (
        <View className="items-center justify-center w-full h-full">
          <View>
            <Image
              accessibilityLabel="Illustration of a magnifying glass for location search"
              style={{ width: 250, height: 250 }}
              contentFit="contain"
              source={images.search}
            />
            <Text
              className={`mt-10 py-1 font-orbitron-bold leading-none ${theme === "dark" ? "text-light" : "text-dark"}`}
            >
              Search for city, country or a place
            </Text>
          </View>
        </View>
      )}

      {error && (
        <View className="items-center justify-center w-full h-full">
          <Text
            className={`border-1 text-center border-dotted ${theme === "dark" ? "border-light bg-dark text-light" : "border-dark bg-light text-dark"}`}
            accessibilityLabel={`Error: ${error.message || "Failed to load search results"}`}
            accessibilityRole="alert"
          >
            {error.message ||
              "Failed to load search results. Please try again."}
          </Text>
        </View>
      )}

      {isLoading ? (
        <View className="items-center justify-center w-full h-full">
          <Loader />
        </View>
      ) : data?.results ? (
        <FlatList
          accessibilityRole="list"
          accessibilityLabel="Location Search results"
          maxToRenderPerBatch={8}
          windowSize={5}
          data={data?.results}
          contentContainerClassName="pt-4 pb-8"
          ItemSeparatorComponent={() => <View className="p-2" />}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({
            item,
            index,
          }: {
            item: LocationSearchItemType;
            index: number;
          }) => (
            <components.LocationSearchItem
              index={index}
              theme={theme}
              location={item}
              getLocation={getLocation}
            />
          )}
        />
      ) : (
        <Animated.View
          entering={SlideInDown.duration(300)
            .delay(200)
            .reduceMotion(ReduceMotion.System)}
          className="items-center justify-center w-full h-full"
        >
          <View>
            <Image
              accessibilityLabel="Illustration of a magnifying glass for location search"
              style={{ width: 250, height: 250 }}
              contentFit="contain"
              source={images.search}
            />
            <Text
              className={`mt-10 py-1 text-xl text-center font-orbitron-bold leading-none ${theme === "dark" ? "text-light" : "text-dark"}`}
            >
              No results found
            </Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default SearchLocation;
