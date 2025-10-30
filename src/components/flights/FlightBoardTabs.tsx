import { FlightBoardType } from '../../types/flight';
import { Plane, PlaneLanding } from 'lucide-react';

interface FlightBoardTabsProps {
  activeTab: FlightBoardType;
  onTabChange: (tab: FlightBoardType) => void;
}

export default function FlightBoardTabs({
  activeTab,
  onTabChange,
}: FlightBoardTabsProps) {
  return (
    <div className="flex border-b border-gray-200 bg-white">
      <button
        onClick={() => onTabChange('departure')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-colors ${
          activeTab === 'departure'
            ? 'border-b-2 border-primary-600 text-primary-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Plane className="w-5 h-5" />
        <span>Departures</span>
      </button>

      <button
        onClick={() => onTabChange('arrival')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition-colors ${
          activeTab === 'arrival'
            ? 'border-b-2 border-primary-600 text-primary-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <PlaneLanding className="w-5 h-5" />
        <span>Arrivals</span>
      </button>
    </div>
  );
}
