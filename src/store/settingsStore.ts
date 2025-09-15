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
      updateFreq: "15",
      setUnits: (units) => set({ units }),
      setUpdateFreq: (updateFreq) => set({ updateFreq }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        units: state.units,
        updateFreq: state.updateFreq,
      }),
    }
  )
);
