import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

interface SettingsStore {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  toggleTemperatureUnit: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      // Default to Celsius
      temperatureUnit: 'celsius',

      // Set temperature unit
      setTemperatureUnit: (unit: TemperatureUnit) => {
        set({ temperatureUnit: unit });
      },

      // Toggle between Celsius and Fahrenheit
      toggleTemperatureUnit: () => {
        const currentUnit = get().temperatureUnit;
        set({
          temperatureUnit: currentUnit === 'celsius' ? 'fahrenheit' : 'celsius',
        });
      },
    }),
    {
      name: 'settings-storage', // LocalStorage key
    }
  )
);
