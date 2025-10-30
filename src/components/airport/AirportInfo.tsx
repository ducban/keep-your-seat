import { useState, useEffect } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useAirportStore } from '../../stores/airportStore';
import {
  formatTimeInTimezone,
  formatDateInTimezone,
  getTimeInTimezone,
} from '../../utils/timezone';
import FavoriteButton from './FavoriteButton';

export default function AirportInfo() {
  const { selectedAirport } = useAirportStore();
  const [currentTime, setCurrentTime] = useState<Date>(
    getTimeInTimezone(selectedAirport.timezone)
  );

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeInTimezone(selectedAirport.timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedAirport.timezone]);

  // Reset time when airport changes
  useEffect(() => {
    setCurrentTime(getTimeInTimezone(selectedAirport.timezone));
  }, [selectedAirport]);

  const formattedTime = formatTimeInTimezone(
    currentTime,
    selectedAirport.timezone,
    'HH:mm:ss'
  );

  const formattedDate = formatDateInTimezone(
    currentTime,
    selectedAirport.timezone,
    'EEEE, MMM dd, yyyy'
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Airport Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-primary-600">
              {selectedAirport.iata}
            </h2>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {selectedAirport.name}
          </h3>
          <p className="text-sm text-gray-600">
            {selectedAirport.city}, {selectedAirport.country}
          </p>
        </div>

        {/* Favorite Button */}
        <div className="flex-shrink-0">
          <FavoriteButton airportIATA={selectedAirport.iata} />
        </div>
      </div>

      {/* Time Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-primary-500" />
          <span className="text-sm font-medium text-gray-700">Local Time</span>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900 tabular-nums">
            {formattedTime}
          </div>
          <div className="text-sm text-gray-600">{formattedDate}</div>
        </div>
      </div>

      {/* Coordinates Info (Optional) */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div>
            <span className="font-medium">Latitude:</span>{' '}
            {selectedAirport.latitude.toFixed(4)}
          </div>
          <div>
            <span className="font-medium">Longitude:</span>{' '}
            {selectedAirport.longitude.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  );
}
