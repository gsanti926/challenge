export interface Destination {
  id: string;
  displayName: string;
  lat: number;
  lng: number;
  resultType: 'CITY' | 'AIRPORT' | 'HOTEL' | string;
  topDestination: string;
  countryCode: string;
}
