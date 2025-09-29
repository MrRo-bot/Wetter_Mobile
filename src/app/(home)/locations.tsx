import components from "@/src/constants/components";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";
import Animated, { ReduceMotion, SlideInUp } from "react-native-reanimated";

const Locations = () => {
  const router = useRouter();
  let theme = useColorScheme();
  let { locations } = locationStore();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
          <AnimatedPressable
            accessibilityLabel="Open settings"
            accessibilityHint="Navigates to the settings screen"
            accessible={true}
            android_ripple={{ color: `rgb(255,255,255,0.01)` }}
            accessibilityRole="button"
            entering={SlideInUp.duration(600).reduceMotion(ReduceMotion.System)}
            className={`rounded-full shadow-2xl w-12 h-12 overflow-hidden border-2 border-solid ${theme === "dark" ? "border-light/20" : "border-dark/20"}`}
            onPress={() => router.navigate("/(home)/settings")}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              className={`items-center justify-center w-full h-full`}
            >
              <MaterialIcons
                color={theme === "dark" ? "white" : "black"}
                name="settings"
                size={24}
              />
            </BlurView>
          </AnimatedPressable>
          <AnimatedPressable
            accessibilityLabel="Open settings"
            accessibilityHint="Navigates to the settings screen"
            accessible={true}
            android_ripple={{ color: `rgb(255,255,255,0.01)` }}
            accessibilityRole="button"
            entering={SlideInUp.duration(600).reduceMotion(ReduceMotion.System)}
            className={`rounded-full shadow-2xl w-12 h-12 overflow-hidden border-2 border-solid ${theme === "dark" ? "border-light/20" : "border-dark/20"}`}
            onPress={() => router.navigate("/(home)/searchLocation")}
          >
            <BlurView
              experimentalBlurMethod="dimezisBlurView"
              intensity={20}
              className={`items-center justify-center w-full h-full`}
            >
              <MaterialIcons
                color={theme === "dark" ? "white" : "black"}
                name="search"
                size={24}
              />
            </BlurView>
          </AnimatedPressable>
        </View>
      </View>
      <FlatList
        accessibilityRole="list"
        accessibilityLabel="List of saved locations"
        maxToRenderPerBatch={8}
        windowSize={5}
        data={locations}
        contentContainerClassName="pt-4 pb-8"
        ItemSeparatorComponent={() => <View className="p-3" />}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({
          item,
          index,
        }: {
          item: LocationDataType;
          index: number;
        }) => (
          <components.SavedLocationCard
            index={index}
            location={item}
            theme={theme}
          />
        )}
      />
    </View>
  );
};

export default Locations;
