import { Weather, weatherConditions, WeatherConditionCode } from '../types/weather';
import { Airport } from '../types/airport';

// Cache for weather data (10 minute TTL)
const weatherCache = new Map<string, { data: Weather; timestamp: number }>();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Mock Weather Service
 * Generates simulated weather data based on airport location
 */
export const mockWeatherService = {
  /**
   * Get weather for an airport
   * @param airport - Airport object
   * @returns Mock weather data
   */
  getWeather(airport: Airport): Weather {
    // Check cache first
    const cached = weatherCache.get(airport.iata);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Generate mock weather based on location
    const weather = this.generateWeatherForLocation(airport);

    // Cache the result
    weatherCache.set(airport.iata, {
      data: weather,
      timestamp: Date.now(),
    });

    return weather;
  },

  /**
   * Generate weather data based on airport location
   * Uses latitude to determine general climate patterns
   */
  generateWeatherForLocation(airport: Airport): Weather {
    const { latitude } = airport;

    // Determine climate zone based on latitude
    const absLatitude = Math.abs(latitude);

    let tempRange: [number, number];
    let likelyConditions: WeatherConditionCode[];

    if (absLatitude < 23.5) {
      // Tropical zone
      tempRange = [24, 35];
      likelyConditions = ['sunny', 'partly-cloudy', 'rainy', 'thunderstorm'];
    } else if (absLatitude < 35) {
      // Subtropical zone
      tempRange = [18, 32];
      likelyConditions = ['sunny', 'partly-cloudy', 'cloudy', 'rainy'];
    } else if (absLatitude < 50) {
      // Temperate zone
      tempRange = [10, 25];
      likelyConditions = [
        'partly-cloudy',
        'cloudy',
        'overcast',
        'rainy',
        'windy',
      ];
    } else {
      // Polar/cold zone
      tempRange = [-5, 15];
      likelyConditions = ['cloudy', 'overcast', 'foggy', 'windy'];
    }

    // Generate random values
    const temperature = this.randomInRange(tempRange[0], tempRange[1]);
    const conditionCode =
      likelyConditions[Math.floor(Math.random() * likelyConditions.length)];
    const condition = weatherConditions.find((w) => w.code === conditionCode)!;
    const windSpeed = this.randomInRange(5, 30);
    const humidity = this.randomInRange(40, 90);

    return {
      temperature: Math.round(temperature),
      condition: condition.label,
      conditionCode,
      windSpeed: Math.round(windSpeed),
      humidity: Math.round(humidity),
      icon: condition.icon,
      lastUpdated: new Date().toISOString(),
    };
  },

  /**
   * Generate random number in range
   */
  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  },

  /**
   * Clear weather cache (useful for testing)
   */
  clearCache() {
    weatherCache.clear();
  },
};
