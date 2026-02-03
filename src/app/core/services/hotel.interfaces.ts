export interface AutocompleteItem {
  id: string;
  displayName: string;
  lat: string;
  lng: string;
  resultType: string;
  topDestination?: string;
  countryCode?: string;
  resolution?: number;
}

export interface HotelLocation {
  city: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
  region?: string;
  state?: string;
}

export interface HotelRatings {
  property?: {
    overallRating?: {
      type: string;
      value: number;
      provider: string;
    };
  };
  guest?: {
    overallRating?: {
      count: number;
      overall: number;
      overallCategory: string;
      provider: string;
    };
  };
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  images: string[];
  location: HotelLocation;
  location_description: string;
  star_rating: number;
  review_rating: number;
  display_rate: number;
  retail_rate: number;
  total: number;
  subtotal: number;
  taxes_and_fees: number;
  nights: number;
  chain?: string;
  amenities: number[];
  ratings?: HotelRatings;
  savings_percent?: number;
  savings_amount?: number;
}

export interface HotelsResponse {
  hotels: Hotel[];
}

export interface HotelSearchParams {
  checkin: string;
  checkout: string;
  destination: string;
  latitude: number;
  longitude: number;
  rooms: number;
  guests: number[];
  currency: string;
  per_page: number;
  page: number;
  price_low?: string;
  price_high?: string;
}
