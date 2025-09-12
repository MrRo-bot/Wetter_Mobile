import components from "@/src/constants/components";
import { locationStore } from "@/src/store/locationStore";
import { LocationDataType } from "@/src/types/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, useColorScheme, View } from "react-native";

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
