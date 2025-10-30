import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AirportPage from './pages/AirportPage';
import FlightBoardPage from './pages/FlightBoardPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AirportPage />} />
          <Route path="flights" element={<FlightBoardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
