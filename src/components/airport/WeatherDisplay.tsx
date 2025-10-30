import { useEffect, useState } from 'react';
import { Cloud, Wind, Droplets } from 'lucide-react';
import { useAirportStore } from '../../stores/airportStore';
import { useSettingsStore } from '../../stores/settingsStore';
import { mockWeatherService } from '../../services/mockWeatherService';
import { Weather } from '../../types/weather';
import { convertTemperature, formatTemperature } from '../../utils/temperatureConverter';

export default function WeatherDisplay() {
  const { selectedAirport } = useAirportStore();
  const { temperatureUnit } = useSettingsStore();
  const [weather, setWeather] = useState<Weather | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch weather data when airport changes
  useEffect(() => {
    const weatherData = mockWeatherService.getWeather(selectedAirport);
    setWeather(weatherData);
    setLastUpdated(new Date());
  }, [selectedAirport]);

  // Refresh weather every 10 minutes (simulated)
  useEffect(() => {
    const interval = setInterval(() => {
      const weatherData = mockWeatherService.getWeather(selectedAirport);
      setWeather(weatherData);
      setLastUpdated(new Date());
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [selectedAirport]);

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const tempInUnit = convertTemperature(weather.temperature, temperatureUnit);
  const windInMph = Math.round(weather.windSpeed * 0.621371);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-600" />
          Current Weather
        </h3>
        <span className="text-xs text-gray-500">
          Updated: {lastUpdated.toLocaleTimeString()}
        </span>
      </div>

      {/* Main Weather Display */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{weather.icon}</div>
          <div>
            <div className="text-4xl font-bold text-gray-900">
              {formatTemperature(tempInUnit, temperatureUnit)}
            </div>
            <div className="text-lg text-gray-700 mt-1">{weather.condition}</div>
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-200">
        {/* Wind Speed */}
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-xs text-gray-600">Wind Speed</div>
            <div className="text-sm font-semibold text-gray-900">
              {weather.windSpeed} km/h
              <span className="text-xs text-gray-500 ml-1">
                ({windInMph} mph)
              </span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-xs text-gray-600">Humidity</div>
            <div className="text-sm font-semibold text-gray-900">
              {weather.humidity}%
            </div>
          </div>
        </div>
      </div>

      {/* Mock Data Notice */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-gray-500 italic">
          ⚠️ Mock weather data for development
        </p>
      </div>
    </div>
  );
}
