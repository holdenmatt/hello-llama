import { create } from "zustand";

import { ModelName } from "./types";

interface AppState {
  model: ModelName;
  setModel: (model: ModelName) => void;

  temperature: number;
  setTemperature: (temperature: number) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  model: "llama-3.1-70b-versatile",
  setModel: (model) => set({ model }),

  temperature: 0.5,
  setTemperature: (temperature) => set({ temperature }),
}));
