import { create } from "zustand";
import { Bears } from "../types/types";

export const useBearStore = create<Bears>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  decreasePopulation: () =>
    set((state) => ({ bears: state.bears > 0 ? state.bears - 1 : 0 })),
  removeAllPopulation: () => set({ bears: 0 }),
  updatePopulation: (newBears: number) => set({ bears: newBears }),
}));
