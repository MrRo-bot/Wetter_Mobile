import { Stack } from "expo-router";

const IntroLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="location" />
    </Stack>
  );
};
export default IntroLayout;
