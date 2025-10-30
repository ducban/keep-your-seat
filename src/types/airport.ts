export interface Airport {
  iata: string; // 3-letter IATA code (e.g., SGN, LAX)
  name: string; // Full airport name
  city: string; // City name
  country: string; // Country name
  timezone: string; // IANA timezone (e.g., Asia/Ho_Chi_Minh)
  latitude: number; // Latitude coordinate
  longitude: number; // Longitude coordinate
}

export interface AirportSearchResult extends Airport {
  matchScore?: number; // For ranking search results
}
