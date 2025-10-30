import { Flight, FlightStatus, FlightBoardType } from '../types/flight';
import { Airport } from '../types/airport';
import { airportService } from './airportService';
import { getRandomAirline } from '../data/airlines';
import { addHours, addMinutes, format } from 'date-fns';

/**
 * Mock Flight Service
 * Generates realistic flight data for testing
 */

// Aircraft types
const aircraftTypes = [
  'Airbus A320',
  'Airbus A321',
  'Airbus A330',
  'Airbus A350',
  'Boeing 737-800',
  'Boeing 787-9',
  'Boeing 777-300ER',
  'ATR 72-600',
];

// Cache for generated flights (by airport IATA code)
const flightCache = new Map<string, { data: Flight[]; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Generate a random flight number
 */
function generateFlightNumber(airlineCode: string): string {
  const number = Math.floor(Math.random() * 9000) + 100; // 100-9999
  return `${airlineCode}${number}`;
}

/**
 * Generate random gate
 */
function generateGate(): string {
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 6)); // A-F
  const number = Math.floor(Math.random() * 30) + 1; // 1-30
  return `${letter}${number}`;
}

/**
 * Generate random terminal
 */
function generateTerminal(): string {
  const terminals = ['1', '2', 'T1', 'T2', 'International', 'Domestic'];
  return terminals[Math.floor(Math.random() * terminals.length)];
}

/**
 * Generate random flight status
 */
function generateStatus(): FlightStatus {
  const random = Math.random();

  if (random < 0.5) return 'scheduled'; // 50%
  if (random < 0.7) return 'en-route'; // 20%
  if (random < 0.85) return 'delayed'; // 15%
  if (random < 0.92) return 'delayed-1h'; // 7%
  if (random < 0.97) return 'delayed-2h'; // 5%
  if (random < 0.99) return 'cancelled'; // 2%
  return 'unknown'; // 1%
}

/**
 * Generate delay in minutes based on status
 */
function generateDelay(status: FlightStatus): number {
  switch (status) {
    case 'delayed':
      return Math.floor(Math.random() * 45) + 15; // 15-60 minutes
    case 'delayed-1h':
      return Math.floor(Math.random() * 60) + 60; // 60-120 minutes
    case 'delayed-2h':
      return Math.floor(Math.random() * 120) + 120; // 120-240 minutes
    default:
      return 0;
  }
}

/**
 * Get random airport (excluding the given airport)
 */
function getRandomDestination(excludeIATA: string): Airport {
  const allAirports = airportService.getAllAirports();
  const filtered = allAirports.filter((a) => a.iata !== excludeIATA);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/**
 * Generate a single flight
 */
function generateFlight(
  id: number,
  baseAirport: Airport,
  type: FlightBoardType,
  baseTime: Date
): Flight {
  const airline = getRandomAirline();
  const flightNumber = generateFlightNumber(airline.code);
  const otherAirport = getRandomDestination(baseAirport.iata);
  const status = generateStatus();
  const delayMinutes = generateDelay(status);

  // Determine origin and destination
  const isArrival = type === 'arrival';
  const origin = isArrival ? otherAirport : baseAirport;
  const destination = isArrival ? baseAirport : otherAirport;

  // Calculate flight duration (1-10 hours based on distance approximation)
  const latDiff = Math.abs(origin.latitude - destination.latitude);
  const lonDiff = Math.abs(origin.longitude - destination.longitude);
  const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  const flightDuration = Math.floor(distance * 0.5 + 1); // Rough estimate in hours

  // Generate scheduled times
  const departureScheduled = baseTime;
  const arrivalScheduled = addHours(departureScheduled, flightDuration);

  // Generate actual times (with delay if applicable)
  const departureActual =
    status !== 'scheduled' && status !== 'cancelled'
      ? addMinutes(departureScheduled, delayMinutes)
      : undefined;
  const arrivalActual =
    departureActual && status === 'en-route'
      ? addMinutes(arrivalScheduled, delayMinutes)
      : undefined;

  // Random codeshare (30% chance)
  const hasCodeshare = Math.random() < 0.3;
  const codeshares = hasCodeshare
    ? [generateFlightNumber(getRandomAirline().code)]
    : undefined;

  return {
    id: `${baseAirport.iata}-${type}-${id}`,
    flightNumber,
    airline,
    codeshares,
    origin,
    destination,
    departure: {
      scheduled: departureScheduled.toISOString(),
      actual: departureActual?.toISOString(),
      terminal: generateTerminal(),
      gate: generateGate(),
    },
    arrival: {
      scheduled: arrivalScheduled.toISOString(),
      actual: arrivalActual?.toISOString(),
      terminal: generateTerminal(),
      gate: generateGate(),
    },
    status,
    aircraftType: aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)],
  };
}

/**
 * Generate flights for an airport
 */
function generateFlightsForAirport(
  airport: Airport,
  type: FlightBoardType,
  count: number = 25
): Flight[] {
  const flights: Flight[] = [];
  const now = new Date();

  // Generate flights spread across -2 hours to +8 hours
  for (let i = 0; i < count; i++) {
    // Random time offset between -120 and +480 minutes
    const minuteOffset = Math.floor(Math.random() * 600) - 120;
    const baseTime = addMinutes(now, minuteOffset);

    const flight = generateFlight(i, airport, type, baseTime);
    flights.push(flight);
  }

  // Sort by scheduled departure/arrival time
  flights.sort((a, b) => {
    const timeA =
      type === 'departure' ? a.departure.scheduled : a.arrival.scheduled;
    const timeB =
      type === 'departure' ? b.departure.scheduled : b.arrival.scheduled;
    return new Date(timeA).getTime() - new Date(timeB).getTime();
  });

  return flights;
}

/**
 * Mock Flight Service API
 */
export const mockFlightService = {
  /**
   * Get flights for an airport
   * @param airport - Airport object
   * @param type - 'departure' or 'arrival'
   * @returns Array of flights
   */
  getFlights(airport: Airport, type: FlightBoardType): Flight[] {
    const cacheKey = `${airport.iata}-${type}`;

    // Check cache
    const cached = flightCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Generate new flights
    const flights = generateFlightsForAirport(airport, type);

    // Cache results
    flightCache.set(cacheKey, {
      data: flights,
      timestamp: Date.now(),
    });

    return flights;
  },

  /**
   * Get a single flight by ID
   * @param flightId - Flight ID
   * @returns Flight object or undefined
   */
  getFlightById(flightId: string): Flight | undefined {
    // Search through all cached flights
    for (const [, cached] of flightCache) {
      const flight = cached.data.find((f) => f.id === flightId);
      if (flight) return flight;
    }
    return undefined;
  },

  /**
   * Clear flight cache (useful for testing)
   */
  clearCache() {
    flightCache.clear();
  },
};
