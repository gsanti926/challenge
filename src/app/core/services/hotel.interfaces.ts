export interface AutocompleteItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  city?: string;
  state?: string;
  country?: string;
  display_name?: string;
}

export interface AutocompleteResponse {
  results: AutocompleteItem[];
}

export interface HotelImage {
  url: string;
  thumbnail_url?: string;
}

export interface HotelAmenity {
  id: number;
  name: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  star_rating: number;
  guest_rating: number;
  review_count: number;
  price: number;
  original_price?: number;
  currency: string;
  images: HotelImage[];
  amenities: HotelAmenity[];
  description?: string;
  thumbnail_url?: string;
}

export interface HotelsResponse {
  hotels: Hotel[];
  total_count: number;
  page: number;
  per_page: number;
  total_pages: number;
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
