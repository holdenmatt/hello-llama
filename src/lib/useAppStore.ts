import { create } from "zustand";

interface AppState {
  temperature: number;
  setTemperature: (temperature: number) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  temperature: 0.5,
  setTemperature: (temperature) => set({ temperature }),
}));
