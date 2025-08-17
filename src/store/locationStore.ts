import { create } from "zustand";
import { LocationStoreType } from "../types/types";

export const useLocationStore = create<LocationStoreType>((set, get) => ({
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
}));

// useWeatherStore.js
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useWeatherStore = create(
//   persist(
//     (set) => ({
//       weatherData: {},
//       preferences: { unit: 'Celsius', favoriteCities: [] },
//       setWeather: (city, data) =>
//         set((state) => ({
//           weatherData: { ...state.weatherData, [city]: data },
//         })),
//       setPreferences: (prefs) => set({ preferences: prefs }),
//     }),
//     {
//       name: 'weather-storage',
//       storage: createJSONStorage(() => AsyncStorage),
//     }
//   )
// );

// export default useWeatherStore;
