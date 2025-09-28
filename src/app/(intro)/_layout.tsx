import { Stack } from "expo-router";
import { Platform } from "react-native";

const IntroLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: Platform.OS ? "ios_from_right" : "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="location" />
    </Stack>
  );
};
export default IntroLayout;
