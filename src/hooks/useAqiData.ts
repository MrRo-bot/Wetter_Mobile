import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { AQIType } from "../types/types";

//react query sets whether status is online or offline
onlineManager.setEventListener((setOnline) => {
  const subscription = NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? false);
  });
  return () => subscription();
});

const isValidCoordinates = (
  coords: {
    latitude: number;
    longitude: number;
  } | null
): coords is { latitude: number; longitude: number } => {
  if (!coords) return false;
  const { latitude, longitude } = coords;
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

//check if focus is in background or foreground
const useAqiData = (
  coordinates: { latitude: number; longitude: number } | null
) => {
  useEffect(() => {
    if (Platform.OS === "web") return;
    const subscription = AppState.addEventListener(
      "change",
      (status: AppStateStatus) => {
        focusManager.setFocused(status === "active");
      }
    );
    return () => subscription.remove();
  }, []);

  const paramsObj = {
    latitude:
      coordinates && isValidCoordinates(coordinates)
        ? String(coordinates.latitude)
        : "",
    longitude:
      coordinates && isValidCoordinates(coordinates)
        ? String(coordinates.longitude)
        : "",
    timezone: "auto",
    forecast_days: "5",
    hourly: [
      "us_aqi",
      "pm10",
      "pm2_5",
      "ozone,sulphur_dioxide",
      "nitrogen_dioxide",
      "carbon_monoxide",
    ].join(","),
    current: [
      "pm10",
      "pm2_5",
      "carbon_monoxide",
      "nitrogen_dioxide",
      "sulphur_dioxide",
      "ozone",
      "us_aqi",
    ].join(","),
    domains: "cams_global",
  };

  const queryString = new URLSearchParams(paramsObj).toString();

  const finalUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?${queryString}`;

  const fetchAQI = async (): Promise<AQIType> => {
    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error("Failed to fetch AQI data");
    return response.json();
  };

  return useQuery<AQIType>({
    queryKey: ["openMeteo_AQI", coordinates],
    queryFn: fetchAQI,
    enabled: isValidCoordinates(coordinates),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
  });
};

export default useAqiData;
