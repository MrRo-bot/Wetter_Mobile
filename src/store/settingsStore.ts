import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SettingsStateType } from "../types/types";

export const useSettingsStore = create<SettingsStateType>()(
  persist(
    (set) => ({
      units: {
        time: "12-hour",
        temperature: "celsius",
        distance: "km",
        speed: "kmh",
        pressure: "hPa",
        precipitation: "mm",
      },
      alerts: {
        weatherAlerts: {
          severe: true,
          advisory: true,
        },
        rainAndSnow: false,
        chanceOfPrecipitation: "60",
        aqi: "0",
        dailyNotification: true,
        time: "08:00",
      },
      updateFreq: "15 Minutes",

      setUnits: (units) => set({ units }),

      setWeatherAlert: (type: "severe" | "advisory") =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            weatherAlerts: {
              ...state.alerts.weatherAlerts,
              [type]: !state.alerts.weatherAlerts[type],
            },
          },
        })),

      toggleRainAndSnow: () =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            rainAndSnow: !state.alerts.rainAndSnow,
          },
        })),

      setChanceOfPrecipitation: (value: string) =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            chanceOfPrecipitation: value,
          },
        })),

      setAQI: (value: string) =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            aqi: value,
          },
        })),

      toggleDailyNotification: () =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            dailyNotification: !state.alerts.dailyNotification,
          },
        })),

      setTime: (value: string) =>
        set((state) => ({
          alerts: {
            ...state.alerts,
            time: value,
          },
        })),

      setUpdateFreq: (updateFreq) => set({ updateFreq }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        units: state.units,
        alerts: state.alerts,
        updateFreq: state.updateFreq,
      }),
    }
  )
);
