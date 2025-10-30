import AirportSearch from '../components/airport/AirportSearch';
import AirportInfo from '../components/airport/AirportInfo';
import WeatherDisplay from '../components/airport/WeatherDisplay';
import FavoritesList from '../components/airport/FavoritesList';

export default function AirportPage() {
  return (
    <div className="min-h-full bg-gray-50 p-4 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Airport Selection
        </h1>
        <p className="text-gray-600 text-sm">
          Search and select an airport to view flight information
        </p>
      </div>

      {/* Airport Search */}
      <div>
        <AirportSearch />
      </div>

      {/* Favorites List */}
      <div>
        <FavoritesList />
      </div>

      {/* Airport Information */}
      <div>
        <AirportInfo />
      </div>

      {/* Weather Display */}
      <div>
        <WeatherDisplay />
      </div>
    </div>
  );
}
