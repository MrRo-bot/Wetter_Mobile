import { Link, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Intro from "./intro";

export default function Home() {
  let colorScheme = useColorScheme();
  const navigation = useNavigation();
  const isAuth = false;

  useEffect(() => {
    if (!isAuth) navigation.setOptions({ headerShown: false });
  }, [isAuth, navigation]);

  return (
    <SafeAreaView
      className={`flex flex-col h-full justify-center items-center ${colorScheme === "dark" ? "bg-dark" : "bg-light"}`}
    >
      {!isAuth ? (
        <Intro />
      ) : (
        <>
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
        </>
      )}
    </SafeAreaView>
  );
}
