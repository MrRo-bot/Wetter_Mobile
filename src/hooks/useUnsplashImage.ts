import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { UnsplashType } from "../types/types";

//check its usage how it works
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const useUnsplashImage = (weatherType: string) => {
  const unsplashKey = process.env.EXPO_PUBLIC_UNSPLASH_KEY;

  //check its usage how it works
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  //check its usage how it works
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  const paramsObj = {
    client_id: "",
    query: "",
    page: "1",
    per_page: "10",
    orientation: "squarish",
  };
  if (weatherType && unsplashKey) {
    paramsObj.query = weatherType;
    paramsObj.client_id = unsplashKey;
  }

  const queryString = new URLSearchParams(paramsObj).toString();

  const finalUrl = `https://api.unsplash.com/search/photos?${queryString}`;

  const fetchUnsplashImage = async (): Promise<UnsplashType> => {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch Unsplash image");
    }
    return response.json();
  };

  const getUnsplashImageColors = async (
    imageData: {
      imageIndex: number;
      url: string;
    } | null
  ): Promise<{
    imageIndex: number;
    url: string;
    imageColors: ImageColorsResult;
  }> => {
    if (!imageData?.url) {
      throw new Error("No image URL provided");
    }
    const result = await ImageColors.getColors(imageData?.url, {
      fallback: "#444444",
      quality: "high",
      pixelSpacing: 5,
    });
    return {
      imageIndex: imageData.imageIndex,
      url: imageData.url,
      imageColors: result,
    };
  };

  //getting image
  const {
    isLoading: unsplashLoading,
    error: unsplashError,
    data: unsplashData,
  } = useQuery<UnsplashType>({
    queryKey: ["unsplash", weatherType],
    queryFn: () => fetchUnsplashImage(),
    enabled: !!weatherType,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  //choosing random url
  const imageData = useMemo(() => {
    if (!unsplashData?.results?.length) return null;
    const randomIndex = Math.floor(Math.random() * unsplashData.results.length);
    return {
      imageIndex: randomIndex,
      url: unsplashData.results[randomIndex].urls.regular,
    };
  }, [unsplashData]);

  //getting colors from image
  const {
    isLoading: imageColorsLoading,
    error: imageColorsError,
    data: imageColorsData,
  } = useQuery<{
    imageIndex: number;
    url: string;
    imageColors: ImageColorsResult;
  }>({
    queryKey: ["react_native_image_colors", imageData],
    queryFn: () => getUnsplashImageColors(imageData),
    enabled: !!imageData,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    unsplashLoading,
    unsplashError,
    unsplashData,
    imageColorsLoading,
    imageColorsError,
    imageColorsData,
  };
};

export default useUnsplashImage;
