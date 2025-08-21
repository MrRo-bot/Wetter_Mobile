import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { WeatherDataType } from "../types/types";

//check its usage how it works
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

const useWeatherData = (coordinates: {
  latitude: number;
  longitude: number;
}) => {
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
    latitude: "0",
    longitude: "0",
    timezone: "auto",
    forecast_days: "16",
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "is_day",
      "weather_code",
      "surface_pressure",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "wind_speed_10m",
      "wind_direction_10m",
    ].join(","),
    hourly: [
      "dew_point_2m",
      "precipitation_probability",
      "precipitation",
      "visibility",
      "uv_index",
    ].join(","),
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

  const finalUrl = `https://api.open-meteo.com/v1/forecast?${queryString}`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(finalUrl);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      return response.json();
    } catch (error) {
      return error;
    }
  };

  return useQuery<WeatherDataType>({
    queryKey: ["openMeteo_weather", coordinates],
    queryFn: () => fetchWeather(),
    enabled: !!coordinates,
    staleTime: 15 * 60 * 1000,
  });
};
export default useWeatherData;
