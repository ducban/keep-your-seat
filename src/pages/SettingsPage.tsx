import { useState } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import {
  Settings as SettingsIcon,
  Thermometer,
  Info,
  HelpCircle,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function SettingsPage() {
  const { temperatureUnit, toggleTemperatureUnit } = useSettingsStore();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I search for an airport?',
      answer:
        'Go to the Airport tab and use the search bar at the top. You can search by airport name, city, or IATA code (e.g., "SGN" for Ho Chi Minh City).',
    },
    {
      question: 'How do I add an airport to favorites?',
      answer:
        'On the Airport tab, click the heart icon next to the airport name to add it to your favorites. You can quickly access favorite airports from the list below the search bar.',
    },
    {
      question: 'What do the flight status colors mean?',
      answer:
        'Blue = Scheduled, Green = En Route, Yellow = Delayed, Orange = Delayed >1h, Red = Delayed >2h, Gray = Cancelled or Unknown.',
    },
    {
      question: 'Is this real flight data?',
      answer:
        'Currently, the app uses mock data for testing purposes. Real-time flight data integration will be added in a future update.',
    },
    {
      question: 'How do I switch between Celsius and Fahrenheit?',
      answer:
        'You can toggle between temperature units using the switch in the Preferences section above.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white p-4">
        <div className="flex items-center justify-center gap-2">
          <SettingsIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Preferences Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary-600" />
            Preferences
          </h2>

          {/* Temperature Unit Toggle */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Temperature Unit</p>
              <p className="text-sm text-gray-500">
                Display temperatures in Celsius or Fahrenheit
              </p>
            </div>
            <button
              onClick={toggleTemperatureUnit}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                temperatureUnit === 'fahrenheit'
                  ? 'bg-primary-600'
                  : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  temperatureUnit === 'fahrenheit'
                    ? 'translate-x-9'
                    : 'translate-x-1'
                }`}
              />
              <span
                className={`absolute left-2 text-xs font-medium ${
                  temperatureUnit === 'celsius'
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                °C
              </span>
              <span
                className={`absolute right-2 text-xs font-medium ${
                  temperatureUnit === 'fahrenheit'
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                °F
              </span>
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-primary-600" />
            About
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <p className="font-medium text-gray-900">Keep Your Seat</p>
              <p className="text-gray-500">Version 1.0.0 (Beta)</p>
            </div>
            <p>
              Keep Your Seat is a modern flight board application that provides
              real-time flight information for airports worldwide. Search for
              airports, view departure and arrival schedules, and stay updated
              with flight statuses.
            </p>
            <p>
              <span className="font-medium">Features:</span>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Search 30+ major airports worldwide</li>
              <li>View departure and arrival flight boards</li>
              <li>Real-time local time for each airport</li>
              <li>Weather information with temperature units</li>
              <li>Save favorite airports for quick access</li>
              <li>Color-coded flight status indicators</li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="pb-3 text-sm text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Terms & Privacy Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary-600" />
            Legal
          </h2>
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Terms of Service</h3>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                This application is provided for informational purposes only.
                Flight information is mock data for demonstration. Always verify
                flight details with your airline.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Privacy Policy</h3>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                We respect your privacy. All data (favorites, settings) is stored
                locally on your device. No personal information is collected or
                transmitted to external servers.
              </p>
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Credits</h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              Built with React, TypeScript, Tailwind CSS, and Zustand for state
              management.
            </p>
            <p>Icons provided by Lucide React.</p>
            <p className="text-xs text-gray-500 mt-4">
              © 2025 Keep Your Seat. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
