import { TemperatureUnit } from '../stores/settingsStore';

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Convert temperature to specified unit
 * @param temperature - Temperature in Celsius
 * @param unit - Target unit
 * @returns Converted temperature
 */
export function convertTemperature(
  temperature: number,
  unit: TemperatureUnit
): number {
  if (unit === 'fahrenheit') {
    return Math.round(celsiusToFahrenheit(temperature));
  }
  return Math.round(temperature);
}

/**
 * Format temperature with unit symbol
 * @param temperature - Temperature value (already in correct unit)
 * @param unit - Temperature unit
 * @returns Formatted string (e.g., "28°C" or "82°F")
 */
export function formatTemperature(
  temperature: number,
  unit: TemperatureUnit
): string {
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${Math.round(temperature)}${symbol}`;
}
