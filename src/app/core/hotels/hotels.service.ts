import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private readonly BASE_URL = 'https://beta.id90travel.com/api';

  constructor(private http: HttpClient) {}

  autocomplete(text: string): Observable<any> {

    const headers = new HttpHeaders({
      'X-APP-NAME': 'angular-desktop',
      'X-APP-VERSION': '1018293',
      'Accept': 'application/json, text/plain, */*'
    });

    const params = new HttpParams()
      .set('text', text)
      .set('v', '1018293');

    return this.http.get<any>(
      `${this.BASE_URL}/v1/autocomplete`,
      { headers, params }
    ).pipe(
      tap(res => {
        console.log('AUTOCOMPLETE RESPONSE:', res);
      })
    );
  }

  searchHotels(data: {
    checkin: string;
    checkout: string;
    destination: string;
    latitude: number;
    longitude: number;
    rooms: number;
    guests: number;
  }): Observable<any> {

    const headers = new HttpHeaders({
      'X-API-CALL-V2': 'true',
      'X-APP-NAME': 'angular-desktop',
      'X-APP-VERSION': '1018293',
      'Accept': 'application/json, text/plain, */*'
    });

    let params = new HttpParams()
      .set('checkin', data.checkin)
      .set('checkout', data.checkout)
      .set('destination', data.destination)
      .set('latitude', data.latitude)
      .set('longitude', data.longitude)
      .set('rooms', data.rooms)
      .append('guests[]', data.guests)
      .set('currency', 'USD')
      .set('per_page', 500)
      .set('page', 1)
      .set('v', '1018293');

    return this.http.get<any>(
      `${this.BASE_URL}/v3/hotels.json`,
      { headers, params }
    ).pipe(
      tap(res => {
        console.log('HOTELS RESPONSE:', res);
      })
    );
  }
}
