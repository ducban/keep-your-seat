import { useState, useEffect } from 'react';
import { useAirportStore } from '../stores/airportStore';
import { mockFlightService } from '../services/mockFlightService';
import { Flight, FlightBoardType } from '../types/flight';
import FlightBoardTabs from '../components/flights/FlightBoardTabs';
import FlightTable from '../components/flights/FlightTable';

export default function FlightBoardPage() {
  const { selectedAirport } = useAirportStore();
  const [activeTab, setActiveTab] = useState<FlightBoardType>('departure');
  const [flights, setFlights] = useState<Flight[]>([]);

  // Load flights when airport or tab changes
  useEffect(() => {
    const loadedFlights = mockFlightService.getFlights(
      selectedAirport,
      activeTab
    );
    setFlights(loadedFlights);
  }, [selectedAirport, activeTab]);

  const handleFlightClick = (flight: Flight) => {
    // TODO: Implement flight detail modal in future
    console.log('Flight clicked:', flight);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Airport Info Header */}
      <div className="bg-primary-600 text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{selectedAirport.iata}</h1>
          <p className="text-sm opacity-90">{selectedAirport.name}</p>
        </div>
      </div>

      {/* Tabs */}
      <FlightBoardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Flight Table */}
      <div className="flex-1 overflow-auto">
        <FlightTable
          flights={flights}
          type={activeTab}
          onFlightClick={handleFlightClick}
        />
      </div>
    </div>
  );
}
