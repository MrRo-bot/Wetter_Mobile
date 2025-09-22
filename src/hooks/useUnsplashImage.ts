import NetInfo from "@react-native-community/netinfo";
import {
  focusManager,
  onlineManager,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import ImageColors, { ImageColorsResult } from "react-native-image-colors";
import { useSettingsStore } from "../store/settingsStore";
import { UnsplashType } from "../types/types";
import { updateFreqFunction } from "../utils/math";

onlineManager.setEventListener((setOnline) => {
  const subscription = NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? false);
  });
  return () => subscription();
});

const useUnsplashImage = (imgSearchString: string | null) => {
  const unsplashKey = process.env.EXPO_PUBLIC_UNSPLASH_KEY;
  const { updateFreq } = useSettingsStore();
  const queryClient = useQueryClient();

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

  const finalUrl = useMemo(() => {
    if (!imgSearchString || !unsplashKey) return null;

    const UNSPLASH_IMAGE_PARAMS = {
      client_id: unsplashKey,
      query: imgSearchString,
      orientation: "squarish",
    };

    const queryString = new URLSearchParams(UNSPLASH_IMAGE_PARAMS).toString();
    return `https://api.unsplash.com/search/photos?${queryString}`;
  }, [imgSearchString, unsplashKey]);

  const fetchUnsplashImage = useCallback(async (): Promise<UnsplashType> => {
    if (!finalUrl) throw new Error("No URL available");

    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image: " + response.statusText);
    }
    const data = await response.json();
    if (!data) throw new Error("Unexpected API response format");
    return data;
  }, [finalUrl]);

  const getUnsplashImageColors = useCallback(
    async (imageData: {
      imageIndex: number;
      url: string;
    }): Promise<{
      imageIndex: number;
      url: string;
      imageColors: ImageColorsResult;
    }> => {
      try {
        const result = await ImageColors.getColors(imageData.url, {
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
    },
    []
  );

  const {
    isLoading: unsplashLoading,
    error: unsplashError,
    data: unsplashData,
  } = useQuery<UnsplashType>({
    queryKey: ["unsplash_image", imgSearchString],
    queryFn: fetchUnsplashImage,
    enabled: !!finalUrl,
    staleTime: 15 * 60 * 1000,
    refetchInterval: updateFreqFunction(updateFreq),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const selectedImageData = useMemo(() => {
    if (!unsplashData?.results?.length) return null;

    const randomIndex = Math.floor(Math.random() * unsplashData.results.length);
    return {
      imageIndex: randomIndex,
      url: unsplashData.results[randomIndex].urls.regular,
    };
  }, [unsplashData]);

  const {
    isLoading: imageColorsLoading,
    error: imageColorsError,
    data: imageColorsData,
  } = useQuery({
    queryKey: [
      "image_colors",
      selectedImageData?.url,
      selectedImageData?.imageIndex,
    ],
    queryFn: () => getUnsplashImageColors(selectedImageData!),
    enabled: !!selectedImageData?.url && !unsplashLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (selectedImageData && unsplashData?.results?.length) {
      const currentIndex = selectedImageData.imageIndex;
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * unsplashData.results.length);
      } while (nextIndex === currentIndex && unsplashData.results.length > 1);

      const nextImageUrl = unsplashData.results[nextIndex].urls.regular;
      const nextImageData = { imageIndex: nextIndex, url: nextImageUrl };

      queryClient.prefetchQuery({
        queryKey: ["image_colors_prefetch", nextImageUrl, nextIndex],
        queryFn: () => getUnsplashImageColors(nextImageData),
        staleTime: 1000 * 60 * 5,
      });
    }
  }, [selectedImageData, unsplashData, queryClient, getUnsplashImageColors]);

  return {
    unsplashLoading,
    unsplashError,
    unsplashData,
    imageColorsLoading,
    imageColorsError,
    imageColorsData,
    selectedImageUrl: selectedImageData?.url,
  };
};

export default useUnsplashImage;
