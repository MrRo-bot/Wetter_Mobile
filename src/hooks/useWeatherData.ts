import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { AppStateStatus } from "react-native";
import { AppState, Platform } from "react-native";
import { WeatherDataType } from "../types/types";

onlineManager.setEventListener((setOnline) => {
  const subscription = NetInfo.addEventListener((state) => {
    setOnline(state.isConnected ?? false);
  });
  return () => subscription();
});

const useWeatherData = (coordinates: {
  latitude: number;
  longitude: number;
}) => {
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

  const isValidCoordinates = (coords: {
    latitude: number;
    longitude: number;
  }) => {
    return (
      typeof coords.latitude === "number" &&
      typeof coords.longitude === "number" &&
      coords.latitude >= -90 &&
      coords.latitude <= 90 &&
      coords.longitude >= -180 &&
      coords.longitude <= 180
    );
  };

  const paramsObj = {
    latitude: "",
    longitude: "",
    timezone: "auto",
    forecast_days: "15",
    forecast_hours: "48",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "surface_pressure",
      "precipitation",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(","),
    hourly: [
      "is_day",
      "dew_point_2m",
      "precipitation_probability",
      "precipitation",
      "visibility",
      "uv_index",
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "surface_pressure",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
      "soil_temperature_0cm",
      "sunshine_duration",
      "direct_normal_irradiance",
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_hours",
      "precipitation_probability_max",
      "sunrise",
      "sunset",
      "daylight_duration",
      "sunshine_duration",
      "uv_index_max",
      "winddirection_10m_dominant",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "shortwave_radiation_sum",
      "dew_point_2m_mean",
      "surface_pressure_mean",
    ].join(","),
  };

  if (coordinates && isValidCoordinates(coordinates)) {
    paramsObj.latitude = coordinates.latitude.toString();
    paramsObj.longitude = coordinates.longitude.toString();
  }

  const queryString = new URLSearchParams(paramsObj).toString();

  const finalUrl = `https://api.open-meteo.com/v1/forecast?${queryString}`;

  const fetchWeather = async (): Promise<WeatherDataType> => {
    const response = await fetch(finalUrl);
    if (!response.ok)
      throw new Error("Failed to fetch weather data: " + response.statusText);
    return response.json();
  };

  return useQuery<WeatherDataType, Error>({
    queryKey: ["openMeteo_weather", coordinates],
    queryFn: fetchWeather,
    enabled: !!coordinates && isValidCoordinates(coordinates),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
};
export default useWeatherData;
