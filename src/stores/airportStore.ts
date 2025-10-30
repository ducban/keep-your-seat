import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Airport } from '../types/airport';
import { airportService } from '../services/airportService';

interface AirportStore {
  selectedAirport: Airport;
  favoriteAirports: string[]; // Array of IATA codes
  setSelectedAirport: (airport: Airport) => void;
  toggleFavorite: (iata: string) => void;
  isFavorite: (iata: string) => boolean;
  getFavoriteAirports: () => Airport[];
}

export const useAirportStore = create<AirportStore>()(
  persist(
    (set, get) => ({
      // Initial state - default to SGN (Ho Chi Minh City)
      selectedAirport: airportService.getDefaultAirport(),
      favoriteAirports: ['SGN'], // Default favorite

      // Set selected airport
      setSelectedAirport: (airport: Airport) => {
        set({ selectedAirport: airport });
      },

      // Toggle favorite status for an airport
      toggleFavorite: (iata: string) => {
        set((state) => {
          const isFavorited = state.favoriteAirports.includes(iata);

          if (isFavorited) {
            // Remove from favorites
            return {
              favoriteAirports: state.favoriteAirports.filter(
                (code) => code !== iata
              ),
            };
          } else {
            // Add to favorites
            return {
              favoriteAirports: [...state.favoriteAirports, iata],
            };
          }
        });
      },

      // Check if airport is favorited
      isFavorite: (iata: string) => {
        return get().favoriteAirports.includes(iata);
      },

      // Get all favorite airports as Airport objects
      getFavoriteAirports: () => {
        const { favoriteAirports } = get();
        return favoriteAirports
          .map((iata) => airportService.getAirportByIATA(iata))
          .filter((airport): airport is Airport => airport !== undefined);
      },
    }),
    {
      name: 'airport-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        selectedAirport: state.selectedAirport,
        favoriteAirports: state.favoriteAirports,
      }),
    }
  )
);
