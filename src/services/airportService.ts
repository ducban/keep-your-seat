import { airports, defaultAirport } from '../data/airports';
import { Airport, AirportSearchResult } from '../types/airport';

/**
 * Airport Service - Searches and retrieves airport data from static database
 */
export const airportService = {
  /**
   * Search airports by name, city, or IATA code
   * @param query - Search string
   * @returns Array of matching airports with match scores
   */
  searchAirports(query: string): AirportSearchResult[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    // Filter and score airports
    const results = airports
      .map((airport) => {
        let matchScore = 0;

        // Exact IATA match (highest priority)
        if (airport.iata.toLowerCase() === searchTerm) {
          matchScore = 100;
        }
        // IATA starts with search term
        else if (airport.iata.toLowerCase().startsWith(searchTerm)) {
          matchScore = 90;
        }
        // City name exact match
        else if (airport.city.toLowerCase() === searchTerm) {
          matchScore = 80;
        }
        // City name starts with search term
        else if (airport.city.toLowerCase().startsWith(searchTerm)) {
          matchScore = 70;
        }
        // Airport name starts with search term
        else if (airport.name.toLowerCase().startsWith(searchTerm)) {
          matchScore = 60;
        }
        // Contains in city name
        else if (airport.city.toLowerCase().includes(searchTerm)) {
          matchScore = 50;
        }
        // Contains in airport name
        else if (airport.name.toLowerCase().includes(searchTerm)) {
          matchScore = 40;
        }
        // Contains in country name
        else if (airport.country.toLowerCase().includes(searchTerm)) {
          matchScore = 30;
        }

        return { ...airport, matchScore };
      })
      .filter((airport) => airport.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10); // Return top 10 results

    return results;
  },

  /**
   * Get airport by IATA code
   * @param iata - 3-letter IATA code
   * @returns Airport object or undefined
   */
  getAirportByIATA(iata: string): Airport | undefined {
    return airports.find(
      (airport) => airport.iata.toLowerCase() === iata.toLowerCase()
    );
  },

  /**
   * Get all airports
   * @returns Array of all airports
   */
  getAllAirports(): Airport[] {
    return airports;
  },

  /**
   * Get default airport (SGN)
   * @returns Default airport object
   */
  getDefaultAirport(): Airport {
    return defaultAirport;
  },

  /**
   * Get airports by country
   * @param country - Country name
   * @returns Array of airports in that country
   */
  getAirportsByCountry(country: string): Airport[] {
    return airports.filter(
      (airport) =>
        airport.country.toLowerCase() === country.toLowerCase()
    );
  },
};
