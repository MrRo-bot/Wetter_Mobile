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
      setAlerts: (alerts) => set({ alerts }),
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
