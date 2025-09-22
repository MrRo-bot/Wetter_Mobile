import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { useSettingsStore } from "../store/settingsStore";
import { AQIType } from "../types/types";
import { updateFreqFunction } from "../utils/math";

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
  const { updateFreq } = useSettingsStore();

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

  const AQI_PARAMS = {
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

  const queryString = new URLSearchParams(AQI_PARAMS).toString();

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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchInterval: updateFreqFunction(updateFreq),
    refetchIntervalInBackground: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useAqiData;
