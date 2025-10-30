import { Star, ChevronRight } from 'lucide-react';
import { useAirportStore } from '../../stores/airportStore';
import FavoriteButton from './FavoriteButton';

export default function FavoritesList() {
  const { getFavoriteAirports, setSelectedAirport, selectedAirport } =
    useAirportStore();

  const favorites = getFavoriteAirports();

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Favorite Airports
          </h3>
        </div>
        <p className="text-gray-500 text-sm">
          No favorite airports yet. Use the ❤️ button to add airports to your
          favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Favorite Airports
        </h3>
        <span className="text-sm text-gray-500">({favorites.length})</span>
      </div>

      <div className="space-y-2">
        {favorites.map((airport) => {
          const isSelected = selectedAirport.iata === airport.iata;

          return (
            <button
              key={airport.iata}
              onClick={() => setSelectedAirport(airport)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                isSelected
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <div
                  className={`font-bold text-lg ${
                    isSelected ? 'text-primary-700' : 'text-gray-700'
                  }`}
                >
                  {airport.iata}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {airport.city}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {airport.name}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FavoriteButton airportIATA={airport.iata} />
                {isSelected && (
                  <div className="text-primary-600">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
