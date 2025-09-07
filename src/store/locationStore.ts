import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocationDataType, LocationStoreType } from "../types/types";

export const locationStore = create<
  LocationStoreType,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      locations: [],
      locationToShow: "",

      addLocation: (location) =>
        set((state) => {
          if (state.locations.some((loc) => loc.id === location.id)) {
            return state;
          }
          return {
            locations: [...state.locations, { ...location }],
          };
        }),

      addLocationToShow: (locationId) =>
        set((state) => ({ ...state, locationToShow: locationId })),

      removeLocation: (locationId: string) =>
        set((state) => ({
          locations: state.locations.filter((loc) => loc.id !== locationId),
        })),

      updateLocationName: (locationId: string, name: any) =>
        set((state) => ({
          locations: state.locations.map((loc) =>
            loc.id === locationId ? { ...loc, name: name } : loc
          ),
        })),

      getLocationById: (locationId: string): LocationDataType | undefined =>
        get().locations.find((loc) => loc.id === locationId),
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
