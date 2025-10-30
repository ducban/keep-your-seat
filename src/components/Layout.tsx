import { Link, useLocation, Outlet } from 'react-router-dom';
import { Plane, Calendar, Settings } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold text-center">Keep Your Seat</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/')
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            <Plane className="w-6 h-6" />
            <span className="text-xs mt-1">Airport</span>
          </Link>

          <Link
            to="/flights"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/flights')
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Flights</span>
          </Link>

          <Link
            to="/settings"
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              isActive('/settings')
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:text-primary-500'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
