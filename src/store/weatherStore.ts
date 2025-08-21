import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WeatherStoreType } from "../types/types";

export const weatherStore = create<
  WeatherStoreType,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, _get) => ({
      weather: {
        latitude: 0,
        longitude: 0,
        generationtime_ms: 0,
        utc_offset_seconds: 0,
        timezone: "",
        timezone_abbreviation: "",
        elevation: 0,
        current_units: {
          time: "iso8601",
          interval: "seconds",
          temperature_2m: "°C",
          apparent_temperature: "°C",
          relative_humidity_2m: "%",
          is_day: "",
          weather_code: "wmo code",
          surface_pressure: "hPa",
          precipitation: "mm",
          rain: "mm",
          showers: "mm",
          snowfall: "cm",
          wind_speed_10m: "km/h",
          wind_direction_10m: "°",
        },
        current: {
          time: "",
          interval: 0,
          temperature_2m: 0,
          apparent_temperature: 0,
          relative_humidity_2m: 0,
          is_day: 0,
          weather_code: 0,
          surface_pressure: 0,
          precipitation: 0,
          rain: 0,
          showers: 0,
          snowfall: 0,
          wind_speed_10m: 0,
          wind_direction_10m: 0,
        },
        hourly_units: {
          time: "iso8601",
          dew_point_2m: "°C",
          precipitation_probability: "%",
          precipitation: "mm",
          visibility: "m",
          uv_index: "",
        },
        hourly: {
          time: [],
          dew_point_2m: [],
          precipitation_probability: [],
          precipitation: [],
          visibility: [],
          uv_index: [],
        },
      },
      addWeather: (weatherData) =>
        set(() => ({
          weather: weatherData,
        })),
    }),
    {
      name: "weather-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
