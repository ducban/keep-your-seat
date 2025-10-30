# Keep Your Seat

A flight board web application that displays real-time flight information for selected airports.

## Features

- Airport selection with search and favorites
- Real-time flight departure and arrival information
- Weather integration via AccuWeather API
- Time zone conversion for flight times
- Flight detail modal with comprehensive information
- Temperature unit toggle (Celsius/Fahrenheit)

## Tech Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Date/Time:** date-fns + date-fns-tz
- **Icons:** Lucide React

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd keep-your-seat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Add your API keys:
     - AccuWeather API key
     - Flight data API key (AviationStack or Airlabs)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── stores/        # Zustand state stores
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── data/          # Static data (airports, etc.)
```

## API Keys Required

- **AccuWeather API:** For weather information
  - Sign up at: https://developer.accuweather.com/
- **Flight Data API:** For flight information
  - AviationStack: https://aviationstack.com/
  - OR Airlabs: https://airlabs.co/

## Development

This project uses:
- TypeScript in strict mode
- ESLint for code linting
- Prettier for code formatting

## License

MIT
