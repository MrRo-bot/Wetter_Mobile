import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocationStoreType } from "../types/types";

export const locationStore = create<
  LocationStoreType,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, _get) => ({
      locations: [],
      addLocation: (location) =>
        set((state) => {
          if (state.locations.some((loc) => loc.id === location.id)) {
            return state;
          }
          return {
            locations: [...state.locations, { ...location }],
          };
        }),
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

//   removeLocation: (id) =>
//     set((state) => ({
//       locations: state.locations.filter((loc) => loc.id !== id),
//     })),

//   updateLocationName: (id, name) =>
//     set((state) => ({
//       locations: state.locations.map((loc) =>
//         loc.id === id ? { ...loc, ...updates } : loc
//       ),
//     })),

//   getLocationById: (id) => get().locations.find((loc) => loc.id === id),
