export interface DestinationAutocomplete {
  id: string;
  displayName: string;
  lat: string;
  lng: string;
  resultType: DestinationResultType;
  topDestination: string;
  countryCode: string;
  resolution?: number;
  result: any[];
}



export type DestinationResultType =
  | 'MULTICITY'
  | 'AIRPORT'
  | 'NEIGHBORHOOD'
  | 'CITY'
  | 'MULTIREGION'
  | 'airport'
  | 'multicity';
