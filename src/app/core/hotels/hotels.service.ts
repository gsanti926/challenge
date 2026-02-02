import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HotelSearchParams {
  checkin: string;
  checkout: string;
  destination: string;
  latitude: string | number;
  longitude: string | number;
  rooms: number;
  guests: number[];
  currency: string;
  per_page: number;
  page: number;
  price_low?: string;
  price_high?: string;
  v?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private readonly baseUrl = 'https://beta.id90travel.com/api/v1/hotels/search';
  private readonly appVersion = '1018293';

  constructor(
    private http: HttpClient
  ) {}

  search(paramsObj: HotelSearchParams): Observable<any> {
    let params = new HttpParams()
      .set('checkin', paramsObj.checkin)
      .set('checkout', paramsObj.checkout)
      .set('destination', paramsObj.destination)
      .set('latitude', String(paramsObj.latitude))
      .set('longitude', String(paramsObj.longitude))
      .set('rooms', String(paramsObj.rooms))
      .set('currency', paramsObj.currency)
      .set('per_page', String(paramsObj.per_page))
      .set('page', String(paramsObj.page))
      .set('price_low', paramsObj.price_low ?? '')
      .set('price_high', paramsObj.price_high ?? '')
      .set('v', paramsObj.v ?? this.appVersion);

    (paramsObj.guests || []).forEach(g => {
      params = params.append('guests[]', String(g));
    });

    const headers = new HttpHeaders({
      'X-API-CALL-V2': 'true',
      'X-APP-NAME': 'angular-desktop',
      'X-APP-VERSION': this.appVersion,
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
    });

    return this.http.get<any>(this.baseUrl, { params, headers });
  }
}
