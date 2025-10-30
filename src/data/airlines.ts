import { Airline } from '../types/flight';

/**
 * Static airline database
 */
export const airlines: Airline[] = [
  // Vietnam
  { code: 'VN', name: 'Vietnam Airlines' },
  { code: 'VJ', name: 'VietJet Air' },
  { code: 'BL', name: 'Pacific Airlines' },
  { code: 'QH', name: 'Bamboo Airways' },

  // Asia Pacific
  { code: 'SQ', name: 'Singapore Airlines' },
  { code: 'TG', name: 'Thai Airways' },
  { code: 'MH', name: 'Malaysia Airlines' },
  { code: 'CX', name: 'Cathay Pacific' },
  { code: 'KE', name: 'Korean Air' },
  { code: 'OZ', name: 'Asiana Airlines' },
  { code: 'NH', name: 'All Nippon Airways' },
  { code: 'JL', name: 'Japan Airlines' },
  { code: 'BR', name: 'EVA Air' },
  { code: 'CI', name: 'China Airlines' },
  { code: 'PR', name: 'Philippine Airlines' },
  { code: '5J', name: 'Cebu Pacific' },
  { code: 'GA', name: 'Garuda Indonesia' },
  { code: 'QF', name: 'Qantas' },

  // Middle East
  { code: 'EK', name: 'Emirates' },
  { code: 'QR', name: 'Qatar Airways' },
  { code: 'EY', name: 'Etihad Airways' },

  // China
  { code: 'CA', name: 'Air China' },
  { code: 'CZ', name: 'China Southern' },
  { code: 'MU', name: 'China Eastern' },

  // Europe
  { code: 'BA', name: 'British Airways' },
  { code: 'AF', name: 'Air France' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'KL', name: 'KLM' },

  // Americas
  { code: 'AA', name: 'American Airlines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'DL', name: 'Delta Air Lines' },

  // Budget carriers
  { code: 'AK', name: 'AirAsia' },
  { code: 'D7', name: 'AirAsia X' },
  { code: 'FD', name: 'Thai AirAsia' },
  { code: '3K', name: 'Jetstar Asia' },
];

/**
 * Get airline by code
 */
export function getAirlineByCode(code: string): Airline | undefined {
  return airlines.find((airline) => airline.code === code);
}

/**
 * Get random airline
 */
export function getRandomAirline(): Airline {
  return airlines[Math.floor(Math.random() * airlines.length)];
}
