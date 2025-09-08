import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { AQIType } from "../types/types";

//react query sets whether status is online or offline
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

//check if focus is in background or foreground
const useAqiData = (coordinates: { latitude: number; longitude: number }) => {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }

  //effect for subscribing to change in app state
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  const paramsObj = {
    latitude: "",
    longitude: "",
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

  if (
    coordinates &&
    typeof coordinates.latitude === "number" &&
    typeof coordinates.longitude === "number"
  ) {
    paramsObj.latitude = String(coordinates?.latitude);
    paramsObj.longitude = String(coordinates?.longitude);
  }

  const queryString = new URLSearchParams(paramsObj).toString();

  const finalUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?${queryString}`;

  const fetchAQI = async () => {
    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error("Failed to fetch AQI data");
      return response.json();
    } catch (error) {
      return error;
    }
  };

  return useQuery<AQIType>({
    queryKey: ["openMeteo_AQI", coordinates],
    queryFn: () => fetchAQI(),
    enabled: !!coordinates,
    staleTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};

export default useAqiData;
