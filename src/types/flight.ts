import { Airport } from './airport';

/**
 * Flight Status Enum
 */
export type FlightStatus =
  | 'scheduled'
  | 'en-route'
  | 'delayed'
  | 'delayed-1h'
  | 'delayed-2h'
  | 'cancelled'
  | 'unknown';

/**
 * Flight Status Config for UI display
 */
export interface FlightStatusConfig {
  status: FlightStatus;
  label: string;
  color: string; // Tailwind color class
  bgColor: string; // Tailwind bg color class
}

export const flightStatuses: FlightStatusConfig[] = [
  {
    status: 'scheduled',
    label: 'Scheduled',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
  },
  {
    status: 'en-route',
    label: 'En Route',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
  },
  {
    status: 'delayed',
    label: 'Delayed',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
  },
  {
    status: 'delayed-1h',
    label: 'Delayed >1h',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
  },
  {
    status: 'delayed-2h',
    label: 'Delayed >2h',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
  },
  {
    status: 'cancelled',
    label: 'Cancelled',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
  },
  {
    status: 'unknown',
    label: 'Unknown',
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
  },
];

/**
 * Airline Information
 */
export interface Airline {
  code: string; // 2-letter IATA code (e.g., "VN", "QR")
  name: string; // Full airline name
}

/**
 * Flight Time Information
 */
export interface FlightTime {
  scheduled: string; // ISO 8601 datetime string
  actual?: string; // ISO 8601 datetime string (if available)
  terminal?: string;
  gate?: string;
}

/**
 * Flight Interface
 */
export interface Flight {
  id: string; // Unique identifier
  flightNumber: string; // e.g., "VN123"
  airline: Airline;
  codeshares?: string[]; // Array of codeshare flight numbers

  // Origin and Destination
  origin: Airport;
  destination: Airport;

  // Departure and Arrival times
  departure: FlightTime;
  arrival: FlightTime;

  // Status
  status: FlightStatus;

  // Optional fields
  aircraftType?: string; // e.g., "Boeing 787-9"
}

/**
 * Flight Board Type (Departure or Arrival)
 */
export type FlightBoardType = 'departure' | 'arrival';
