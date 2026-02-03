import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AutocompleteItem,
  Hotel,
  HotelsResponse,
  HotelSearchParams
} from './hotel.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'https://beta.id90travel.com/api';
  private appVersion = '1018293';

  constructor(private http: HttpClient) {}

  autocomplete(text: string): Observable<AutocompleteItem[]> {
    const url = `${this.baseUrl}/v1/autocomplete`;
    return this.http.get<AutocompleteItem[]>(url, {
      params: {
        text,
        v: this.appVersion
      }
    });
  }

  searchHotels(params: HotelSearchParams): Observable<HotelsResponse> {
    const url = `${this.baseUrl}/v3/hotels.json`;
    return this.http.get<HotelsResponse>(url, {
      params: {
        checkin: params.checkin,
        checkout: params.checkout,
        destination: params.destination,
        latitude: params.latitude.toString(),
        longitude: params.longitude.toString(),
        rooms: params.rooms.toString(),
        'guests[]': params.guests.map(g => g.toString()),
        currency: params.currency,
        per_page: params.per_page.toString(),
        page: params.page.toString(),
        price_low: params.price_low || '',
        price_high: params.price_high || '',
        v: this.appVersion
      }
    });
  }
}
