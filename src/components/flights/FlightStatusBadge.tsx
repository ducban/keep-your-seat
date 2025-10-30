import { FlightStatus, flightStatuses } from '../../types/flight';

interface FlightStatusBadgeProps {
  status: FlightStatus;
}

export default function FlightStatusBadge({ status }: FlightStatusBadgeProps) {
  const statusConfig = flightStatuses.find((s) => s.status === status);

  if (!statusConfig) {
    return null;
  }

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.color}`}
    >
      {statusConfig.label}
    </span>
  );
}
