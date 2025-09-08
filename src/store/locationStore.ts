import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import { LocationDataType, LocationStoreType } from "../types/types";

type PersistedLocationState = Pick<
  LocationStoreType,
  "locations" | "locationToShow"
>;

type LocationPersistOptions = PersistOptions<
  LocationStoreType,
  PersistedLocationState
>;

const customStorage = {
  getItem: async (name: string) => {
    try {
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error(`Failed to get item ${name} from AsyncStorage:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string) => {
    try {
      await AsyncStorage.setItem(name, value);
    } catch (error) {
      console.error(`Failed to set item ${name} in AsyncStorage:`, error);
    }
  },
  removeItem: async (name: string) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (error) {
      console.error(`Failed to remove item ${name} from AsyncStorage:`, error);
    }
  },
};

export const locationStore = create<
  LocationStoreType,
  [["zustand/persist", PersistedLocationState]]
>(
  persist(
    (set, get) => ({
      locations: [],
      locationToShow: "",

      addLocation: (location: LocationDataType) =>
        set((state) => {
          if (state.locations.some((loc) => loc.id === location.id)) {
            console.warn(`Location with ID ${location.id} already exists`);
            return state;
          }
          return {
            locations: [...state.locations, location],
          };
        }),

      addLocationToShow: (locationId: string) =>
        set({ locationToShow: locationId }),

      removeLocation: (locationId: string) =>
        set((state) => ({
          locations: state.locations.filter((loc) => loc.id !== locationId),
        })),

      updateLocationName: (locationId: string, name: string) =>
        set((state) => ({
          locations: state.locations.map((loc) =>
            loc.id === locationId ? { ...loc, name } : loc
          ),
        })),

      getLocationById: (locationId: string): LocationDataType | undefined =>
        get().locations.find((loc) => loc.id === locationId),
    }),
    {
      name: "location-storage",
      storage: createJSONStorage(() => customStorage),
      partialize: (state): PersistedLocationState => ({
        locations: state.locations,
        locationToShow: state.locationToShow,
      }),
      version: 1,
      migrate: (persistedState, version): PersistedLocationState => {
        if (version === 0) {
          return {
            locations: [],
            locationToShow: "",
          };
        }
        return persistedState as PersistedLocationState;
      },
    } as LocationPersistOptions
  )
);
