import Loader from "@/src/components/UI/Loader";
import images from "@/src/constants/images";
import useDebounce from "@/src/hooks/useDebounce";
import useLocationSearch from "@/src/hooks/useLocationSearch";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchLocation = () => {
  let theme = useColorScheme();
  const [searchStr, setSearchStr] = useState("");
  const debouncedSearchStr = useDebounce(searchStr, 500);
  const { data, isLoading, error } = useLocationSearch(debouncedSearchStr);

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-dark" : "bg-light"}`}
      edges={["bottom"]}
    >
      <TextInput
        className={`h-10 p-2 m-3 w-[90%] mx-auto rounded-lg border-[1px] border-dotted ${theme === "dark" ? "border-light bg-dark text-light" : "border-dark bg-light text-dark"} placeholder:text-gray-400`}
        placeholder="Search any location"
        onChangeText={(str) => setSearchStr(str)}
      />

      {!data && !isLoading && (
        <View className="items-center justify-center w-full h-full">
          <Image
            style={{ width: 250, height: 250 }}
            contentFit="contain"
            source={images.search}
          />
        </View>
      )}

      {error && (
        <View className="items-center justify-center w-full h-full">
          <Text
            className={`border-1 text-center border-dotted ${theme === "dark" ? "border-light bg-dark text-light" : "border-dark bg-light text-dark"}`}
          >
            Error
          </Text>
        </View>
      )}

      {isLoading ? (
        <View className="items-center justify-center w-full h-full">
          <Loader />
        </View>
      ) : (
        <ScrollView>
          {data?.results?.map((location, index) => (
            <Animated.View
              key={location.id}
              entering={FadeInUp.duration(300).delay(500)}
              className="w-[90%] mx-auto my-2"
            >
              <View
                className={`border-[1px] border-dashed rounded-xl overflow-hidden ${theme === "dark" ? "border-light/70" : "border-dark/30"}`}
              >
                <BlurView
                  experimentalBlurMethod="dimezisBlurView"
                  intensity={theme === "dark" ? 20 : 50}
                  tint={theme === "dark" ? "dark" : "light"}
                  className="flex-row items-center justify-start gap-2 p-3 bg-clip-padding"
                >
                  <View>
                    <Text
                      className={`text-lg font-orbitron-bold ${
                        theme === "dark" ? "text-light" : "text-blue-950"
                      }`}
                    >
                      {location.name}
                    </Text>

                    <Text
                      className={`font-genos-regular text-lg leading-none ${
                        theme === "dark" ? "text-light/70" : "text-dark/70"
                      }`}
                    >
                      {`${location.admin1 ? location.admin1 + ", " : ""}${location.admin2 ? location.admin2 + ", " : ""}${location.admin3 ? location.admin3 + ", " : ""}${location.country ? location.country + "." : ""}`}
                    </Text>

                    {location.population && (
                      <View className="flex-row gap-2">
                        <Text
                          className={`font-genos-medium text-lg ${
                            theme === "dark" ? "text-light" : "text-dark"
                          }`}
                        >
                          Population:{" "}
                        </Text>

                        <Text
                          className={`font-genos-regular text-lg ${
                            theme === "dark" ? "text-light/80" : "text-dark/80"
                          }`}
                        >
                          {location.population
                            ? new Intl.NumberFormat().format(
                                location.population
                              )
                            : ""}
                        </Text>
                      </View>
                    )}
                  </View>
                </BlurView>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SearchLocation;
