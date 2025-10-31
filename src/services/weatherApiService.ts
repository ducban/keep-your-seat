import { Weather, WeatherConditionCode } from '../types/weather';
import { Airport } from '../types/airport';

/**
 * Open-Meteo Weather API Service
 * FREE API - No API key required
 * Documentation: https://open-meteo.com/en/docs
 */

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Cache structure
interface WeatherCache {
  data: Weather;
  timestamp: number;
}

const cache = new Map<string, WeatherCache>();

/**
 * Map WMO Weather codes to our app's weather conditions
 * WMO Code reference: https://www.noaa.gov/weather
 */
function mapWeatherCode(code: number): {
  condition: string;
  conditionCode: WeatherConditionCode;
} {
  // Clear sky
  if (code === 0) {
    return { condition: 'Clear', conditionCode: 'clear' };
  }
  // Mainly clear, partly cloudy, and overcast
  if (code >= 1 && code <= 3) {
    return { condition: 'Partly Cloudy', conditionCode: 'partly-cloudy' };
  }
  // Fog
  if (code === 45 || code === 48) {
    return { condition: 'Foggy', conditionCode: 'cloudy' };
  }
  // Drizzle
  if (code >= 51 && code <= 55) {
    return { condition: 'Light Rain', conditionCode: 'rainy' };
  }
  // Freezing Drizzle
  if (code >= 56 && code <= 57) {
    return { condition: 'Freezing Rain', conditionCode: 'rainy' };
  }
  // Rain
  if (code >= 61 && code <= 65) {
    return { condition: 'Rainy', conditionCode: 'rainy' };
  }
  // Freezing Rain
  if (code >= 66 && code <= 67) {
    return { condition: 'Freezing Rain', conditionCode: 'rainy' };
  }
  // Snow fall
  if (code >= 71 && code <= 75) {
    return { condition: 'Snowy', conditionCode: 'snowy' };
  }
  // Snow grains
  if (code === 77) {
    return { condition: 'Snowy', conditionCode: 'snowy' };
  }
  // Rain showers
  if (code >= 80 && code <= 82) {
    return { condition: 'Rainy', conditionCode: 'rainy' };
  }
  // Snow showers
  if (code >= 85 && code <= 86) {
    return { condition: 'Snowy', conditionCode: 'snowy' };
  }
  // Thunderstorm
  if (code >= 95 && code <= 99) {
    return { condition: 'Stormy', conditionCode: 'stormy' };
  }

  // Default
  return { condition: 'Partly Cloudy', conditionCode: 'partly-cloudy' };
}

/**
 * Get weather icon based on condition code
 */
function getWeatherIcon(conditionCode: WeatherConditionCode): string {
  const icons: Record<WeatherConditionCode, string> = {
    clear: '☀️',
    'partly-cloudy': '⛅',
    cloudy: '☁️',
    rainy: '🌧️',
    stormy: '⛈️',
    snowy: '❄️',
  };
  return icons[conditionCode];
}

/**
 * Fetch weather data from Open-Meteo API
 */
async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<Weather> {
  const url = new URL(BASE_URL);
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('current', 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m');
  url.searchParams.append('timezone', 'auto');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract current weather data
    const current = data.current;
    const weatherMapping = mapWeatherCode(current.weather_code);

    const weather: Weather = {
      temperature: Math.round(current.temperature_2m),
      condition: weatherMapping.condition,
      conditionCode: weatherMapping.conditionCode,
      windSpeed: Math.round(current.wind_speed_10m),
      humidity: current.relative_humidity_2m,
      icon: getWeatherIcon(weatherMapping.conditionCode),
      lastUpdated: new Date().toISOString(),
    };

    return weather;
  } catch (error) {
    console.error('Failed to fetch weather from Open-Meteo:', error);
    throw error;
  }
}

/**
 * Get weather for an airport with caching
 */
export async function getWeatherForAirport(
  airport: Airport
): Promise<Weather> {
  const cacheKey = `${airport.iata}-${airport.latitude}-${airport.longitude}`;

  // Check cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    // Fetch fresh data
    const weather = await fetchWeatherData(airport.latitude, airport.longitude);

    // Cache it
    cache.set(cacheKey, {
      data: weather,
      timestamp: Date.now(),
    });

    return weather;
  } catch (error) {
    // If fetch fails and we have cached data, return stale data
    if (cached) {
      console.warn('Using stale weather data due to API error');
      return cached.data;
    }

    // If no cached data, throw error to trigger fallback
    throw error;
  }
}

/**
 * Clear weather cache (useful for testing)
 */
export function clearWeatherCache(): void {
  cache.clear();
}

/**
 * Weather API Service
 */
export const weatherApiService = {
  getWeatherForAirport,
  clearWeatherCache,
};
