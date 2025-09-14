import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SettingsStateType } from "../types/types";

export const useSettingsStore = create<SettingsStateType>()(
  persist(
    (set, get) => ({
      units: {
        time: "12-hour",
        temperature: "C",
        distance: "km",
        speed: "km/h",
        pressure: "hPa",
        precipitation: "mm",
      },
      updateFreq: "15 Minutes",
      setUnits: (units) => set({ units }),
      setUpdateFreq: (updateFreq) => set({ updateFreq }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
