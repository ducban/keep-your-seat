import { Flight, FlightBoardType } from '../../types/flight';
import FlightRow from './FlightRow';
import EmptyState from '../common/EmptyState';
import { Plane, PlaneLanding } from 'lucide-react';

interface FlightTableProps {
  flights: Flight[];
  type: FlightBoardType;
  onFlightClick?: (flight: Flight) => void;
  isLoading?: boolean;
}

export default function FlightTable({
  flights,
  type,
  onFlightClick,
  isLoading = false,
}: FlightTableProps) {
  const isArrival = type === 'arrival';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500">Loading flights...</p>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <EmptyState
        icon={isArrival ? PlaneLanding : Plane}
        title={`No ${isArrival ? 'arrivals' : 'departures'} found`}
        description={`There are currently no ${isArrival ? 'arriving' : 'departing'} flights for this airport.`}
      />
    );
  }

  return (
    <div className="bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 p-4 bg-gray-100 border-b border-gray-300 text-xs font-semibold text-gray-700 uppercase">
        <div className="col-span-4">{isArrival ? 'From' : 'To'}</div>
        <div className="col-span-3">Flight</div>
        <div className="col-span-2">Time</div>
        <div className="col-span-1 text-center">Gate</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {/* Flight Rows */}
      <div className="divide-y divide-gray-200">
        {flights.map((flight) => (
          <FlightRow
            key={flight.id}
            flight={flight}
            type={type}
            onClick={onFlightClick}
          />
        ))}
      </div>
    </div>
  );
}
