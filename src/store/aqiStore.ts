import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AqiStoreType } from "../types/types";

export const aqiStore = create<AqiStoreType, [["zustand/persist", unknown]]>(
  persist(
    (set, _get) => ({
      aqi: {
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
          pm10: "μg/m³",
          pm2_5: "μg/m³",
          carbon_monoxide: "μg/m³",
          nitrogen_dioxide: "μg/m³",
          sulphur_dioxide: "μg/m³",
          ozone: "μg/m³",
          us_aqi: "USAQI",
        },
        current: {
          time: "",
          interval: 0,
          pm10: 0,
          pm2_5: 0,
          carbon_monoxide: 0,
          nitrogen_dioxide: 0,
          sulphur_dioxide: 0,
          ozone: 0,
          us_aqi: 0,
        },
        hourly_units: {
          us_aqi: "USAQI",
          time: "iso8601",
          pm10: "μg/m³",
          pm2_5: "μg/m³",
          ozone: "μg/m³",
          sulphur_dioxide: "μg/m³",
          nitrogen_dioxide: "μg/m³",
          carbon_monoxide: "μg/m³",
        },
        hourly: {
          us_aqi: [],
          time: [],
          pm10: [],
          pm2_5: [],
          ozone: [],
          sulphur_dioxide: [],
          nitrogen_dioxide: [],
          carbon_monoxide: [],
        },
      },
      addAQI: (aqiData) => set(() => ({ aqi: aqiData })),
    }),
    {
      name: "aqi-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
