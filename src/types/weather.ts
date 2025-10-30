export interface Weather {
  temperature: number; // in Celsius
  condition: string; // e.g., "Partly Cloudy", "Sunny", "Rainy"
  conditionCode: WeatherConditionCode;
  windSpeed: number; // in km/h
  humidity: number; // percentage
  icon: string; // weather icon code
  lastUpdated: string; // ISO 8601 timestamp
}

export type WeatherConditionCode =
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'overcast'
  | 'rainy'
  | 'thunderstorm'
  | 'foggy'
  | 'windy';

export interface WeatherCondition {
  code: WeatherConditionCode;
  label: string;
  icon: string;
}

// Weather conditions with icons
export const weatherConditions: WeatherCondition[] = [
  { code: 'sunny', label: 'Sunny', icon: '☀️' },
  { code: 'partly-cloudy', label: 'Partly Cloudy', icon: '⛅' },
  { code: 'cloudy', label: 'Cloudy', icon: '☁️' },
  { code: 'overcast', label: 'Overcast', icon: '🌥️' },
  { code: 'rainy', label: 'Rainy', icon: '🌧️' },
  { code: 'thunderstorm', label: 'Thunderstorm', icon: '⛈️' },
  { code: 'foggy', label: 'Foggy', icon: '🌫️' },
  { code: 'windy', label: 'Windy', icon: '💨' },
];
