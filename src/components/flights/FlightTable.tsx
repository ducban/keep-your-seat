import { Flight, FlightBoardType } from '../../types/flight';
import FlightRow from './FlightRow';

interface FlightTableProps {
  flights: Flight[];
  type: FlightBoardType;
  onFlightClick?: (flight: Flight) => void;
}

export default function FlightTable({
  flights,
  type,
  onFlightClick,
}: FlightTableProps) {
  const isArrival = type === 'arrival';

  if (flights.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No flights available</p>
      </div>
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
