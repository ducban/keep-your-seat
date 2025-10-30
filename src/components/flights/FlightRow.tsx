import { Flight, FlightBoardType } from '../../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import { format } from 'date-fns';

interface FlightRowProps {
  flight: Flight;
  type: FlightBoardType;
  onClick?: (flight: Flight) => void;
}

export default function FlightRow({ flight, type, onClick }: FlightRowProps) {
  const isArrival = type === 'arrival';
  const airport = isArrival ? flight.origin : flight.destination;
  const timeInfo = isArrival ? flight.arrival : flight.departure;

  // Determine which time to show
  const scheduledTime = new Date(timeInfo.scheduled);
  const actualTime = timeInfo.actual ? new Date(timeInfo.actual) : null;
  const displayTime = actualTime || scheduledTime;
  const isDelayed = actualTime && actualTime > scheduledTime;

  return (
    <button
      onClick={() => onClick?.(flight)}
      className="w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
    >
      <div className="grid grid-cols-12 gap-2 items-center">
        {/* Destination/Origin - 4 cols */}
        <div className="col-span-4">
          <div className="font-semibold text-gray-900">{airport.city}</div>
          <div className="text-xs text-gray-500">{airport.iata}</div>
        </div>

        {/* Flight Number - 3 cols */}
        <div className="col-span-3">
          <div className="font-medium text-gray-700">{flight.flightNumber}</div>
          <div className="text-xs text-gray-500">{flight.airline.name}</div>
        </div>

        {/* Time - 2 cols */}
        <div className="col-span-2">
          <div
            className={`font-semibold ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}
          >
            {format(displayTime, 'HH:mm')}
          </div>
          {isDelayed && (
            <div className="text-xs text-gray-500 line-through">
              {format(scheduledTime, 'HH:mm')}
            </div>
          )}
        </div>

        {/* Gate - 1 col */}
        <div className="col-span-1 text-center">
          <div className="text-sm font-medium text-gray-700">
            {timeInfo.gate || '-'}
          </div>
        </div>

        {/* Status - 2 cols */}
        <div className="col-span-2 flex justify-end">
          <FlightStatusBadge status={flight.status} />
        </div>
      </div>
    </button>
  );
}
