import { Image } from "expo-image";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  let colorScheme = useColorScheme();

  return (
    <>
      <SafeAreaView
        className={`flex flex-col h-full justify-center items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
      >
        <Image source={{ uri: "uv" }} style={{ width: 100, height: 100 }} />
        <Link
          href="/search"
          className={`mx-auto w-max ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
        >
          search
        </Link>
        <Link
          className={`mx-auto w-max ${colorScheme === "dark" ? "text-light" : "text-dark"}`}
          href="/settings"
        >
          settings
        </Link>
      </SafeAreaView>
    </>
  );
}
