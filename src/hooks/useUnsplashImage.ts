import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { UnsplashType } from "../types/types";

onlineManager.setEventListener((setOnline) => {
  const subscription = NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? false);
  });
  return () => subscription();
});

const useUnsplashImage = (imgSearchString: string | null) => {
  //imgSearchString can be place,weather type or anything else

  const unsplashKey = process.env.EXPO_PUBLIC_UNSPLASH_KEY;

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        if (Platform.OS !== "web") {
          focusManager.setFocused(status === "active");
        }
      }
    );
    return () => subscription.remove();
  }, []);

  const paramsObj = {
    client_id: "",
    query: "",
    orientation: "squarish",
  };
  if (imgSearchString && unsplashKey) {
    paramsObj.query = imgSearchString;
    paramsObj.client_id = unsplashKey;
  }

  const queryString = new URLSearchParams(paramsObj).toString();

  const finalUrl = `https://api.unsplash.com/search/photos?${queryString}`;

  //function for getting image from unsplash
  const fetchUnsplashImage = async (): Promise<UnsplashType> => {
    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image: " + response.statusText);
    }
    const data = response.json();
    if (!data) throw new Error("Unexpected API response format");
    return data;
  };

  //function for getting image colors
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

    try {
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
    } catch (error) {
      throw new Error("Failed to extract colors: " + error);
    }
  };

  //getting image
  const {
    isLoading: unsplashLoading,
    error: unsplashError,
    data: unsplashData,
  } = useQuery<UnsplashType>({
    queryKey: ["unsplash_image", imgSearchString],
    queryFn: fetchUnsplashImage,
    enabled: !!imgSearchString,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  //choosing random url
  const imageData = !unsplashData?.results?.length
    ? null
    : {
        imageIndex: Math.floor(Math.random() * unsplashData.results.length),
        url: unsplashData.results[
          Math.floor(Math.random() * unsplashData.results.length)
        ].urls.regular,
      };

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
    queryKey: ["react_native_image_colors", imageData?.url],
    queryFn: () => getUnsplashImageColors(imageData),
    enabled: !!imageData?.url,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnReconnect: true,
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
